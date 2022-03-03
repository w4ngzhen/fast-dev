import {Table} from "antd";
import React from "react";
import { WrapperProps } from "../WrapperProps";

export class TableWrapper extends React.Component<WrapperProps, any> {

    constructor(props: WrapperProps, context: any) {
        super(props, context);
    }

    render(): JSX.Element {
        const {dataSource} = this.props.elementNodeInfo;
        return (
            <Table
                dataSource={dataSource}
            />
        );
    }
}
