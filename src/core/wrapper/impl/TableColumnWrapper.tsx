import {Table} from "antd";
import React from "react";
import { WrapperProps } from "../WrapperProps";

export class TableColumnWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const {elementNodeInfo, path} = this.props;
        const {dataIndex, ui = {}} = elementNodeInfo;
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
