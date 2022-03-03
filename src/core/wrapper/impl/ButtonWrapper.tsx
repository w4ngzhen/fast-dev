import React, {CSSProperties} from "react";
import _ from "lodash";
import {EventManager} from "../../event/EventManager";
import {Button} from "antd";
import {WrapperProps} from "../WrapperProps";

export class ButtonWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render() {
        const {elementNodeInfo, path} = this.props;
        const {ui = {}, event = {}} = elementNodeInfo;
        const style: CSSProperties = {
            width: ui.width,
            height: ui.height,
        }

        const {onClick} = event;
        let onClickFunc;
        if (!_.isEmpty(onClick)) {
            EventManager.Instance.register(path, 'onClick', onClick);
            onClickFunc = () => {
                EventManager.Instance.fire(path, 'onClick');
            }
        } else {
            onClickFunc = () => {
            };
        }
        const {text} = ui;
        return (
            <Button
                key={path}
                style={style}
                type='primary'
                onClick={onClickFunc}>
                {text}
            </Button>
        )
    }
}
