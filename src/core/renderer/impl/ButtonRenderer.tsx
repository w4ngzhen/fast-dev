import {CSSProperties} from "react";
import {Button} from "antd";
import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";
import {EventManager} from "../../event/EventManager";
import _ from "lodash";

export class ButtonRenderer implements BaseElementNodeRenderer {

    type: string = 'button';

    render(schema: ElementNode, path: string): JSX.Element {
        const {ui = {}, event = {}} = schema;
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
