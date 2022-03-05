import React, {CSSProperties, ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";

export class PanelWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {path, elementNodeInfo = {}} = wrapperProps;
        const {ui = {}} = elementNodeInfo;
        const {tabIndex} = ui;
        const style: CSSProperties = {
            padding: '10px',
            minWidth: '100px',
            minHeight: '100px',
            border: '1px black solid'
        }
        return (
            <div
                tabIndex={tabIndex}
                key={path}
                style={style}>
                {children}
            </div>
        )
    }

}
