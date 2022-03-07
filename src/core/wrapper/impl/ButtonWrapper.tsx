import React, {CSSProperties, ReactNode} from "react";
import _ from "lodash";
import {EventManager} from "../../manager/EventManager";
import {Button} from "antd";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {ElementNode} from "../../ElementNode";

export class ButtonWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path, managers: {eventManager}} = wrapperProps;
        const {text = 'button', tableIndex, event = {}} = elementNodeInfo;

        const {onClick} = event;
        let onClickFunc;
        if (!_.isEmpty(onClick)) {
            eventManager.register(path, 'onClick', onClick);
            onClickFunc = () => {
                eventManager.fire(path, 'onClick');
            }
        } else {
            eventManager.unRegister(path, 'onClick');
            onClickFunc = () => {
            };
        }
        return (
            <Button
                tabIndex={tableIndex}
                key={path}
                type='primary'
                onClickCapture={onClickFunc}>
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
