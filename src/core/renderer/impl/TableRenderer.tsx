import {BaseElementNodeRenderer} from "../BaseElementNodeRenderer";
import {ElementNode} from "../../ElementNode";
import {Table} from "antd";

export class TableRenderer implements BaseElementNodeRenderer {
    type: string = 'table';

    render(elementNode: ElementNode, path: string): JSX.Element {
        const {dataSource} = elementNode;
        return (
            <Table
                key={path}
                dataSource={dataSource}
            />
        );
    }
}
