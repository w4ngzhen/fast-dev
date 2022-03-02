import {CSSProperties} from "react";
import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";

export class PanelRenderer implements BaseElementNodeRenderer {

    type: string = 'panel';

    render(schema: ElementNode, path: string): JSX.Element {
        const style: CSSProperties = {
            // width: '100%',
            // height: '100%',
            padding: '10px',
            minWidth: '100px',
            minHeight: '100px',
            border: '1px black solid'
        }
        return <div style={style}/>
    }

}
