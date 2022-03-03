import {EventManager} from "../event/EventManager";
import {CONTAINERS, ElementNode} from "../ElementNode";
import React from "react";
import _ from "lodash";
import {RENDERER_RECORDS} from "./BaseElementNodeRenderer";
import {TYPE_WRAPPER} from "../wrapper/WrapperRenderer";

export class ElementRenderer {

    private readonly eventManager: EventManager;

    constructor() {
        this.eventManager = new EventManager();
    }

    render(elementNode: ElementNode, path: string): JSX.Element | undefined {
        console.log(path);
        if (!elementNode) {
            return undefined;
        }
        // 获取对应 ElementNode 的renderer
        const nodeRenderer = RENDERER_RECORDS[elementNode.type];
        if (!nodeRenderer) {
            return undefined;
        }
        const children = elementNode.children || [];
        let comp;
        if (!CONTAINERS.includes(elementNode.type) || _.isEmpty(children)) {
            comp = nodeRenderer.render(elementNode, path);
        } else {
            const wrapperChildren = children.map((child, idx) => {
                const childPath = path + '/' + child.type + '_' + idx;
                return this.render(child, childPath);
            });
            comp = React.cloneElement(nodeRenderer.render(elementNode, path), {key: path}, wrapperChildren);
        }

        return (
            <>{comp}</>
        );
    }

    renderElementNode(eleNode: ElementNode, path: string): JSX.Element | undefined {
        if (!eleNode) {
            return undefined;
        }
        // 获取对应 ElementNode 的renderer
        const typeWrapper = TYPE_WRAPPER[eleNode.type];
        if (!typeWrapper) {
            return undefined;
        }
        const children = eleNode.children || [];
        let comp;
        if (!CONTAINERS.includes(eleNode.type) || _.isEmpty(children)) {
            comp = React.createElement(typeWrapper, {key: path, path, elementNodeInfo: eleNode});
        } else {
            const childrenComp = children.map((child, idx) => {
                const childPath = path + '/' + child.type + '_' + idx;
                return this.renderElementNode(child, childPath);
            });
            comp = React.createElement(typeWrapper, {key: path, path, elementNodeInfo: eleNode}, childrenComp);
        }
        return (
            <>{comp}</>
        );
    }
}
