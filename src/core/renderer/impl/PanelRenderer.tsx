import {CSSProperties} from "react";
import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";

export class PanelRenderer implements BaseElementNodeRenderer {

    type: string = 'panel';

    render(schema: ElementNode, path: string): JSX.Element {
        const style: CSSProperties = {
            padding: '10px',
            minWidth: '100px',
            minHeight: '100px',
            border: '1px black solid'
        }
        return (
            <div
                key={path}
                style={style}
            />
        )
    }

}
