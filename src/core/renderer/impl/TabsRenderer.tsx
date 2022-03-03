import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";
import {Tabs} from "antd";
import _ from "lodash";

export class TabsRenderer implements BaseElementNodeRenderer {

    type: string = 'tabs';

    render(elementNode: ElementNode, path: string): JSX.Element {
        const {ui = {}} = elementNode;
        const {activeTabKey} = ui;
        return (
            <Tabs
                key={path}
                defaultActiveKey={activeTabKey as string}
            />
        )
    }

}
