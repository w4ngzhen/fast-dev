import {CONTAINERS, ElementNode} from "../ElementNode";
import _ from "lodash";
import React from "react";
import {TYPE_WRAPPER} from "./BaseWrapper";
import {Managers} from "../manager/Managers";

export class WrapperRenderer {

    renderRootElementNode(rootEleNode: ElementNode | undefined,
                          managers: Managers) {
        if (!rootEleNode) {
            return undefined;
        }
        return this.renderElementNode(rootEleNode, '/' + rootEleNode.type, managers);
    }

    private renderElementNode(eleNode: ElementNode, path: string, managers: Managers): JSX.Element | undefined {
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
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode, managers});
        } else {
            const childrenComp = children.map((child, idx) => {
                const childPath = path + '/' + child.type + '_' + idx;
                return this.renderElementNode(child, childPath, managers);
            });
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode, managers}, childrenComp);
        }
        return comp;
    }
}
