import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";
import {Table} from "antd";

export class TableColumnRenderer implements BaseElementNodeRenderer {

    type: string = 'tableColumn';

    render(elementNode: ElementNode, path: string): JSX.Element {
        const {dataIndex, ui = {}} = elementNode;
        const {title = ''} = ui;
        return (
            <Table.Column
                key={path}
                title={title}
                dataIndex={dataIndex}
            />
        )
    }
}
