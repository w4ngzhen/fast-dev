import {ReactNode} from "react";
import {InputWrapper} from "./impl/InputWrapper";
import {PageWrapper} from "./impl/PageWrapper";
import {ButtonWrapper} from "./impl/ButtonWrapper";
import {PanelWrapper} from "./impl/PanelWrapper";
import {TableWrapper} from "./impl/TableWrapper";
import {TableColumnWrapper} from "./impl/TableColumnWrapper";
import {TabsWrapper} from "./impl/TabsWrapper";
import {TabPaneWrapper} from "./impl/TabPaneWrapper";
import {WrapperProps} from "./WrapperProps";
import {Managers} from "../manager/Managers";

export interface BaseWrapper {
    render(
        wrapperProps: WrapperProps,
        childrenReactNode?: ReactNode,
    ): JSX.Element;
}

export const TYPE_WRAPPER: {
    [key: string]: BaseWrapper
} = {
    'page': new PageWrapper(),
    'button': new ButtonWrapper(),
    'input': new InputWrapper(),
    'panel': new PanelWrapper(),

    'table': new TableWrapper(),
    'tableColumn': new TableColumnWrapper(),

    'tabs': new TabsWrapper(),
    'tabPane': new TabPaneWrapper()
};
