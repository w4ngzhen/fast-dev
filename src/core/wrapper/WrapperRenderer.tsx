import {CONTAINERS, ElementNode} from "../ElementNode";
import _ from "lodash";
import React from "react";
import {TYPE_WRAPPER} from "./BaseWrapper";

export class WrapperRenderer {
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
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode});
        } else {
            const childrenComp = children.map((child, idx) => {
                const childPath = path + '/' + child.type + '_' + idx;
                return this.renderElementNode(child, childPath);
            });
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode}, childrenComp);
        }
        return comp;
    }
}
