import {EventManager} from "../event/EventManager";
import {CONTAINERS, ElementNode} from "../ElementNode";
import React from "react";
import _ from "lodash";
import {RENDERER_RECORDS} from "./BaseElementNodeRenderer";

export class ElementRenderer {

    private readonly eventManager: EventManager;

    constructor() {
        this.eventManager = new EventManager();
    }

    render(elementNode: ElementNode, path: string): JSX.Element | undefined {
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
            comp = React.cloneElement(nodeRenderer.render(elementNode, path), {}, wrapperChildren);
        }

        return (
            <>{comp}</>
        );
    }
}
