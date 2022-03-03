import {Tabs} from "antd";
import React from "react";
import { WrapperProps } from "../WrapperProps";

export class TabPaneWrapper extends React.Component<WrapperProps, any> {


    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const {ui = {}} = this.props.elementNodeInfo;
        const {tabKey, tabName} = ui;
        return (
            <Tabs.TabPane
                tabKey={tabKey}
                tab={tabName}
            />
        )
    }

}
