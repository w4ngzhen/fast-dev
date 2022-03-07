import React, {ChangeEventHandler, FocusEventHandler, FormEventHandler, ReactNode} from "react";
import {createElementBlurEvent, createElementFocusEvent, createInputValueChangeEvent} from "../../event/inner/InnerEvent";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";
import {ElementNode} from "../../ElementNode";
import {Input} from "../../component/Input";

export class InputWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path} = wrapperProps;
        const {value, tabIndex, focused} = elementNodeInfo;
        const innerOnChange: ChangeEventHandler<HTMLInputElement> =
            (e) => {
                e.stopPropagation(); // 阻止数据变更，使用上层数据
                const value = e.currentTarget.value;
                const event = createInputValueChangeEvent(path, value);
                window.dispatchEvent(event);
            };

        const innerOnFocus: FocusEventHandler<HTMLInputElement> =
            (e) => {
                e.stopPropagation();
                const event = createElementFocusEvent(path);
                window.dispatchEvent(event);
            }
        const innerOnBlur: FocusEventHandler<HTMLInputElement> =
            (e) => {
                e.stopPropagation();
                const event = createElementBlurEvent(path);
                window.dispatchEvent(event);
            }
        return (
            <Input
                key={path}
                style={{}}
                value={value}
                tabIndex={tabIndex}
                focused={focused}

                onChange={innerOnChange}
                onFocus={innerOnFocus}
                onBlur={innerOnBlur}
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
