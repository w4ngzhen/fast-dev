import {Tabs} from "antd";
import React, {ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";

export class TabPaneWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path} = wrapperProps;
        const {ui = {}} = elementNodeInfo;
        const {tabKey, tabName} = ui;
        return (
            <Tabs.TabPane
                key={path}
                tabKey={tabKey}
                tab={tabName}
            >
                {children}
            </Tabs.TabPane>
        )
    }

}
