import {CONTAINERS, ElementNode} from "../ElementNode";
import _ from "lodash";
import React from "react";
import {PageWrapper} from "./impl/PageRenderer";
import {ButtonWrapper} from "./impl/ButtonWrapper";
import {InputWrapper} from "./impl/InputWrapper";
import {PanelWrapper} from "./impl/PanelWrapper";
import {TableWrapper} from "./impl/TableWrapper";
import {TableColumnWrapper} from "./impl/TableColumnWrapper";
import {TabsWrapper} from "./impl/TabsWrapper";
import {TabPaneWrapper} from "./impl/TabPaneWrapper";

export const TYPE_WRAPPER: {
    [key: string]: React.ClassType<any, any, any>
} = {
    'page': PageWrapper,
    'button': ButtonWrapper,
    'input': InputWrapper,
    'panel': PanelWrapper,

    'table': TableWrapper,
    'tableColumn': TableColumnWrapper,

    'tabs': TabsWrapper,
    'tabPane': TabPaneWrapper
};


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
