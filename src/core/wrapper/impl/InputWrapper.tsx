import React, {ChangeEventHandler, FormEventHandler, ReactNode} from "react";
import {Input} from "antd";
import {createInputValueChangeEvent} from "../../event/InputChangeEvent";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {ElementNode} from "../../ElementNode";

export class InputWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path} = wrapperProps;
        const {ui = {}} = elementNodeInfo;
        const {value, tabIndex} = ui;
        const innerOnInput: FormEventHandler<HTMLInputElement> =
            (e) => {
                e.stopPropagation(); // 阻止数据变更，使用上层数据
                const value = e.currentTarget.value;
                const event = createInputValueChangeEvent(path, value);
                window.dispatchEvent(event);
            };
        return (
            <Input
                key={path}
                style={{}}
                value={value}
                tabIndex={tabIndex}
                onInput={innerOnInput}
            />
        )
    }
}

export interface InputElementNode extends Omit<ElementNode, 'children'> {
    type: 'input';
    ui: {
        size: {
            width: string;
            height: string;
        } | string
        placeholder: string;
        prefixIcon: string;
        postfixIcon: string;
    };
    event: {
        onChange: string;
    }
}
