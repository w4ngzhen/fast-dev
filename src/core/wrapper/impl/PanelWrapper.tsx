import React, {CSSProperties} from "react";
import {WrapperProps} from "../WrapperProps";

export class PanelWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const style: CSSProperties = {
            padding: '10px',
            minWidth: '100px',
            minHeight: '100px',
            border: '1px black solid'
        }
        return (
            <div
                style={style}
            />
        )
    }

}
