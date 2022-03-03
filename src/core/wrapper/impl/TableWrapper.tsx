import {Table} from "antd";
import React, {ReactNode} from "react";
import { WrapperProps } from "../WrapperProps";
import {BaseWrapper} from "../BaseWrapper";

export class TableWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {elementNodeInfo, path} = wrapperProps;
        const {dataSource} = elementNodeInfo;
        return (
            <Table
                key={path}
                dataSource={dataSource}>
                {/*{children}*/}
                <Table.Column title="Name" dataIndex="name" key="name" />
                <Table.Column title="Age" dataIndex="age" key="age" />
            </Table>
        );
    }
}
