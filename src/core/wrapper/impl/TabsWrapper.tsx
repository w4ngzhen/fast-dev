import {Tabs} from "antd";
import React from "react";
import { WrapperProps } from "../WrapperProps";

export class TabsWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const {ui = {}} = this.props.elementNodeInfo;
        const {activeTabKey} = ui;
        return (
            <Tabs
                defaultActiveKey={activeTabKey as string}
            />
        );
    }

}
