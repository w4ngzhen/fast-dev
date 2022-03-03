import {ElementNode} from "./ElementNode";

interface NodeUpdateCallback {
    (node: ElementNode): void;
}

interface Tick {
    elementNode: ElementNode;
    // todo data
}

export class ElementNodeManager {

    static Instance: ElementNodeManager;

    static init(nodeUpdateCb: NodeUpdateCallback) {
        if (ElementNodeManager.Instance) {
            return;
        }
        ElementNodeManager.Instance
            = (window as any)['$ElementNodeManager$']
            = new ElementNodeManager(nodeUpdateCb);
    }

    private readonly ticks: Tick[];

    private nodeUpdateCb: NodeUpdateCallback;

    private constructor(nodeUpdateCb: NodeUpdateCallback) {
        this.nodeUpdateCb = nodeUpdateCb;
        this.ticks = [];
    }

    update(path: string, nodeInfo: any) {

    }
}
