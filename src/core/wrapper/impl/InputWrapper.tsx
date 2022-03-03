import React, {ChangeEventHandler, ReactNode} from "react";
import {Input} from "antd";
import {createInputValueChange} from "../../event/InputChangeEvent";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {ElementNode} from "../../ElementNode";

export class InputWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path} = wrapperProps;
        const {ui = {}} = elementNodeInfo;
        const value = ui.value || '';
        const innerOnChange: ChangeEventHandler<HTMLInputElement> =
            (e) => {
                e.stopPropagation(); // 阻止数据变更，使用上层数据
                const value = e.target.value;
                const event = createInputValueChange(path, value);
                window.dispatchEvent(event);
            };
        return (
            <Input
                key={path}
                style={{}}
                value={value}
                onChange={innerOnChange}
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
