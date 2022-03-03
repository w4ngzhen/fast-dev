import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";
import {Tabs} from "antd";
import _ from "lodash";

export class TabPaneRenderer implements BaseElementNodeRenderer {

    type: string = 'tabPane';

    render(elementNode: ElementNode, path: string): JSX.Element {
        const {ui = {}} = elementNode;
        const {tabKey, tabName} = ui;
        return (
            <Tabs.TabPane
                key={tabKey}
                tab={tabName}
            />
        )
    }

}
