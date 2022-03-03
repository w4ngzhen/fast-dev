import {Tabs} from "antd";
import React, {ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";

export class TabsWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {path, elementNodeInfo} = wrapperProps;
        const {ui = {}} = elementNodeInfo;
        const {activeTabKey} = ui;
        return (
            <Tabs
                key={path}
                defaultActiveKey={activeTabKey as string}
            >
                {children}
            </Tabs>
        );
    }

}
