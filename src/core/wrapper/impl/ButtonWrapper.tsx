import React, {CSSProperties, ReactNode} from "react";
import _ from "lodash";
import {EventManager} from "../../event/EventManager";
import {Button} from "antd";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {ElementNode} from "../../ElementNode";

export class ButtonWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path} = wrapperProps;
        const {ui = {}, event = {}} = elementNodeInfo;
        const {width, height} = ui;
        const style: CSSProperties = {
            width,
            height
        }

        const {onClick} = event;
        let onClickFunc;
        if (!_.isEmpty(onClick)) {
            EventManager.Instance.register(path, 'onClick', onClick);
            onClickFunc = () => {
                EventManager.Instance.fire(path, 'onClick');
            }
        } else {
            EventManager.Instance.unRegister(path, 'onClick');
            onClickFunc = () => {};
        }
        const {text = 'button'} = ui;
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

export interface ButtonElementNode extends Omit<ElementNode, 'children'> {
    type: 'button';
    ui: {
        size: {
            width: string;
            height: string;
        }
        icon: string;
        text: string;
    };
    event: {
        onClick: string;
    }
}
