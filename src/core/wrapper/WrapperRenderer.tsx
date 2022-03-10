import {ElementNode} from "../ElementNode";
import _ from "lodash";
import React from "react";
import {ROOT_TYPE, TYPE_WRAPPER} from "./BaseWrapper";
import {Managers} from "../manager/Managers";
import {DesignMask} from "../../editor/DesignMask";

export class WrapperRenderer {

    renderRootElementNode(rootEleNode: ElementNode | undefined,
                          managers: Managers,
                          designMode?: boolean) {
        if (!rootEleNode) {
            return undefined;
        }
        return this.renderElementNode(rootEleNode, '/' + rootEleNode.type, managers, !!designMode);
    }

    private renderElementNode(
        eleNode: ElementNode,
        path: string,
        managers: Managers,
        designMode: boolean): JSX.Element | undefined {
        if (!eleNode) {
            return undefined;
        }

        // 提供切面供以后进行操作，现在原样返回
        eleNode = WrapperRenderer.elementNodePeek(eleNode);

        // 获取对应 ElementNode 的renderer
        const typeWrapper = TYPE_WRAPPER[eleNode.type];
        if (!typeWrapper) {
            return undefined;
        }
        const children = eleNode.children || [];
        let comp;
        if (_.isEmpty(children)) {
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode, managers});
        } else {
            const childrenComp = children.map((child, idx) => {
                const childPath = path + '/' + child.type + '_' + idx;
                return this.renderElementNode(child, childPath, managers, designMode);
            });
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode, managers}, childrenComp);
        }

        // todo 如果是设计模式并且是能够独立使用的组件（局部根元素）
        if (designMode && ROOT_TYPE.indexOf(eleNode.type) >= 0) {
            comp = (
                <DesignMask
                    type={eleNode.type} path={path}
                    selected={false}
                >
                    {comp}
                </DesignMask>
            );
        }

        return comp;
    }

    private static elementNodePeek(elementNode: ElementNode) {
        return elementNode;
    }
}
