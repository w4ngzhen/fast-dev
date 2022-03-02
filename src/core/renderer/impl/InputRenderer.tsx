import {ChangeEventHandler} from "react";
import {Input} from "antd";
import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";
import {createInputValueChange} from "../../event/InputChangeEvent";

export class InputRenderer implements BaseElementNodeRenderer {
    type: string = 'input';

    render(schema: ElementNode, path: string): JSX.Element {
        const {ui = {}} = schema;
        const value = ui.value || '';
        const innerOnChange: ChangeEventHandler<HTMLInputElement> =
            (e) => {
                e.stopPropagation(); // 阻止数据变更，使用上层数据
                const value = e.target.value;
                const event = createInputValueChange(path, value);
                window.dispatchEvent(event);
            };
        return <Input style={{}} value={value} onChange={innerOnChange}/>
    }
}
