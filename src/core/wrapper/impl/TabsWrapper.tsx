import {Tabs} from "antd";
import React, {ChangeEventHandler, ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {createInputValueChangeEvent, createTabsKeyChangeEvent} from "../../event/InputChangeEvent";

export class TabsWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {path, elementNodeInfo} = wrapperProps;
        const {ui = {}} = elementNodeInfo;
        const {activeTabKey} = ui;
        return (
            <Tabs
                key={path}
                activeKey={activeTabKey as string}
                onTabClick={(tabKey, e) => {
                    const event = createTabsKeyChangeEvent(path, tabKey);
                    window.dispatchEvent(event);
                }}
            >
                {children}
            </Tabs>
        );
    }

}
