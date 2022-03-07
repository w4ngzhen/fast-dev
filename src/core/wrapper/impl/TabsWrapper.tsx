import {Tabs} from "antd";
import React, {ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {createTabsKeyChangeEvent} from "../../event/inner/InnerEvent";

export class TabsWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {path, elementNodeInfo} = wrapperProps;
        const {activeTabKey} = elementNodeInfo;
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
