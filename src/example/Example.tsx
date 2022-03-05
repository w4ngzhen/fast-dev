import {useRenderer} from "../core/hook/useRenderer";
import React from "react";
import {observer} from "mobx-react-lite";

export const Example = observer(() => {
    const rootComp = useRenderer({
        type: 'page',
        children: [{
            type: 'panel',
            children: [
                {
                    type: 'button',
                    ui: {
                        tabIndex: 1
                    },
                },
                {
                    type: 'panel',
                    ui: {
                        tabIndex: 3
                    },
                    children: [
                        {
                            type: 'button',
                            event: {
                                onClick: 'console.log(managers)'
                            }
                        }
                    ]
                },
                {type: 'panel', children: [{type: 'input', ui: {tabIndex: 2}, value: ''}]},
                {
                    type: 'panel',
                    ui: {
                        tabIndex: 1
                    },
                    children: [{
                        type: 'tabs',
                        ui: {
                            activeTabKey: 'tab2'
                        },
                        children:
                            [
                                {
                                    type: 'tabPane', ui: {tabKey: 'tab1', tabName: 'TabOne'}, children: [{
                                        type: 'input',
                                        ui: {tabIndex: 1},
                                    }]
                                },
                                {type: 'tabPane', ui: {tabKey: 'tab2', tabName: 'TabTwo'}}
                            ]
                    },]
                },
                {
                    type: 'table',
                    ui: {},
                    dataSource: [
                        {key: '1', name: 'wz', age: 26},
                        {key: '2', name: 'zw', age: 63}
                    ],
                    children: [
                        {
                            type: 'tableColumn',
                            dataIndex: 'name',
                            ui: {
                                title: 'Name',
                            }
                        },
                        {
                            type: 'tableColumn',
                            dataIndex: 'age',
                            ui: {
                                title: 'Age',
                            }
                        }
                    ]
                }
            ]
        }]
    });
    return rootComp || <></>;
});
