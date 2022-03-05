import {ElementNode} from "../ElementNode";
import {makeAutoObservable} from "mobx";
import _ from "lodash";
import DataUtils from "../../utils/DataUtils";

interface Tick {
    timestamp: number;
    elementNode: ElementNode | undefined;
}

export class ElementNodeManager {

    get currentElementNode(): ElementNode | undefined {
        if (this.ticks.length === 0) {
            return undefined;
        }
        const {elementNode} = this.ticks[this.ticks.length - 1];
        return elementNode;
    }

    private ticks: Tick[] = [];

    private readonly tickStoreCount: number;

    constructor({tickStoreCount}: { tickStoreCount: number } = {tickStoreCount: 1}) {
        this.tickStoreCount = tickStoreCount;
        makeAutoObservable(this);
    }

    init(elementNode: ElementNode) {
        this.produceTick(elementNode);
    }

    update(path: string, patch: any) {
        if (!this.currentElementNode) {
            return;
        }
        const clonedNode = _.cloneDeep(this.currentElementNode);
        const targetNode = DataUtils.getElementNodeByPath(clonedNode, path);
        // 不合并children
        delete patch.children;
        _.mergeWith(targetNode, patch);
        this.produceTick(clonedNode);
    }

    private produceTick(elementNode: ElementNode) {
        // if (this.ticks.length >= this.tickStoreCount) {
        //     return;
        // }
        this.ticks.push({
            timestamp: new Date().getTime(),
            elementNode: elementNode
        })
    }

    goBack() {
        if (this.ticks.length === 1) {
            // the init state
            return;
        }
        this.ticks.splice(this.ticks.length - 1, 1);
    }
}
