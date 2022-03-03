import {CSSProperties} from "react";
import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";

export class PageRenderer implements BaseElementNodeRenderer {

    type: string = 'page';

    render(schema: ElementNode, path: string): JSX.Element {
        let style: CSSProperties = {
            width: '100%',
            height: '100%',
            padding: '10px'
        }
        return (
            <div
                key={path}
                style={style}
            />
        )
    }

}
