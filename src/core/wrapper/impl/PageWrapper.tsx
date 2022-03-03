import React, {CSSProperties, ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";

export class PageWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        let style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }
        const {path} = wrapperProps;
        return (
            <div
                key={path}
                style={style}
            >
                {children}
            </div>
        )
    }

}
