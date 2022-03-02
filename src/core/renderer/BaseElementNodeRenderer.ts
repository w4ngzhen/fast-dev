import {PageRenderer} from "./impl/PageRenderer";
import {PanelRenderer} from "./impl/PanelRenderer";
import {ButtonRenderer} from "./impl/ButtonRenderer";
import {InputRenderer} from "./impl/InputRenderer";
import {ElementNode} from "../ElementNode";

export interface BaseElementNodeRenderer {
    type: string;
    render: (elementNode: ElementNode, path: string) => JSX.Element;
}

const list = [
    new PageRenderer(),
    new PanelRenderer(),
    new ButtonRenderer(),
    new InputRenderer()
];

const RENDERER_RECORDS: Record<string, BaseElementNodeRenderer> = {};
list.forEach(item => {
    RENDERER_RECORDS[item.type] = item;
})

export {RENDERER_RECORDS};
