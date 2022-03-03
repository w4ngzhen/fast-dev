import {Table} from "antd";
import React, {ReactNode} from "react";
import {BaseWrapper} from "../BaseWrapper";
import {WrapperProps} from "../WrapperProps";

export class TableColumnWrapper implements BaseWrapper {

    render(wrapperProps: WrapperProps,
           children?: ReactNode[]): JSX.Element {
        const {path, elementNodeInfo} = wrapperProps;
        const {dataIndex, ui = {}} = elementNodeInfo;
        const {title = ''} = ui;
        return (
            <Table.Column
                key={dataIndex}
                title={title}
                dataIndex={dataIndex}
            />
        )
    }
}
