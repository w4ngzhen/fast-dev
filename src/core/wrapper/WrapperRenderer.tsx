import {ElementNode} from "../ElementNode";
import _ from "lodash";
import React from "react";
import {TYPE_WRAPPER} from "./BaseWrapper";
import {Managers} from "../manager/Managers";

export interface RenderArgs {
    rootEleNode: ElementNode | undefined;
    managers: Managers;
    elementNodeMapper?: (eleNode: ElementNode) => ElementNode;
    componentMapper?: (comp: JSX.Element, type: string, path: string) => JSX.Element
}

export class WrapperRenderer {

    renderRootElementNode(renderArgs: RenderArgs) {
        const {
            rootEleNode,
            managers,
            elementNodeMapper,
            componentMapper
        } = renderArgs;
        if (!rootEleNode) {
            return undefined;
        }
        return this.renderElementNode(
            rootEleNode,
            '/' + rootEleNode.type,
            managers,
            elementNodeMapper,
            componentMapper);
    }

    private renderElementNode(
        eleNode: ElementNode,
        path: string,
        managers: Managers,
        elementNodeMapper?: (eleNode: ElementNode) => ElementNode,
        componentMapper?: (comp: JSX.Element, type: string, path: string) => JSX.Element,): JSX.Element | undefined {
        if (!eleNode) {
            return undefined;
        }

        // 提供切面供以后进行操作，现在原样返回
        eleNode = elementNodeMapper ? elementNodeMapper(eleNode) : eleNode;

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
                return this.renderElementNode(child, childPath, managers, elementNodeMapper, componentMapper);
            });
            comp = typeWrapper.render({path: path, elementNodeInfo: eleNode, managers}, childrenComp);
        }



        return componentMapper ? componentMapper(comp, eleNode.type, path) : comp;
    }
}
