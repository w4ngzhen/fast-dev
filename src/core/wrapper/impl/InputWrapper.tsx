import React, {ChangeEventHandler} from "react";
import {Input} from "antd";
import {createInputValueChange} from "../../event/InputChangeEvent";
import {WrapperProps} from "../WrapperProps";

export class InputWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps) {
        super(props);
    }

    render(): JSX.Element {
        const {elementNodeInfo, path} = this.props;
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
