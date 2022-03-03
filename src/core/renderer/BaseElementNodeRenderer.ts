import {PageRenderer} from "./impl/PageRenderer";
import {PanelRenderer} from "./impl/PanelRenderer";
import {ButtonRenderer} from "./impl/ButtonRenderer";
import {InputRenderer} from "./impl/InputRenderer";
import {ElementNode} from "../ElementNode";
import {TabsRenderer} from "./impl/TabsRenderer";
import {TabPaneRenderer} from "./impl/TabPaneRenderer";
import {TableRenderer} from "./impl/TableRenderer";
import {TableColumnRenderer} from "./impl/TableColumnRenderer";

export interface BaseElementNodeRenderer {
    type: string;
    render: (elementNode: ElementNode, path: string) => JSX.Element;
}

const list = [
    new PageRenderer(),
    new PanelRenderer(),
    new ButtonRenderer(),
    new InputRenderer(),
    new TabsRenderer(),
    new TabPaneRenderer(),
    new TableRenderer(),
    new TableColumnRenderer()
];

const RENDERER_RECORDS: Record<string, BaseElementNodeRenderer> = {};
list.forEach(item => {
    RENDERER_RECORDS[item.type] = item;
})

export {RENDERER_RECORDS};
