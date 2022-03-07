import {Tabs} from "antd";
import React, {ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";

export class TabPaneWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo} = wrapperProps;
        const {tabKey, tabName} = elementNodeInfo;
        return (
            <Tabs.TabPane
                key={tabKey}
                tabKey={tabKey}
                tab={tabName}
            >
                {children}
            </Tabs.TabPane>
        )
    }

}
