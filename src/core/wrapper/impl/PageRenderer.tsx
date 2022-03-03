import React, {CSSProperties} from "react";
import {WrapperProps} from "../WrapperProps";

export class PageWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        let style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }
        return (
            <div
                style={style}
            />
        )
    }

}
