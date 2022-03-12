import {useRenderer} from "../core/hook/useRenderer";
import React from "react";
import {observer} from "mobx-react-lite";

export const Example = observer(() => {
    const initElementNode = {
        type: 'page',
        children: [{
            type: 'panel',
            children: [
                {
                    type: 'button',
                    tabIndex: 1
                },
                {
                    type: 'panel',
                    tabIndex: 3,
                    children: [
                        {
                            type: 'button',
                            onClick: 'console.log(path, context)'
                        }
                    ]
                },
                {
                    type: 'panel', children: [
                        {
                            type: 'input',
                            tabIndex: 2,
                            focused: true,
                            value: 'hello'
                        }
                    ]
                },
                {
                    type: 'panel',
                    tabIndex: 1,
                    children: [{
                        type: 'tabs',
                        activeTabKey: 'tab2',
                        children:
                            [
                                {
                                    type: 'tabPane',
                                    tabKey: 'tab1', tabName: 'TabOne',
                                    children: [{
                                        type: 'input',
                                        tabIndex: 1
                                    }]
                                },
                                {
                                    type: 'tabPane',
                                    tabKey: 'tab2', tabName: 'TabTwo',
                                }
                            ]
                    },]
                },
                {
                    type: 'table',
                    dataSource: [
                        {key: '1', name: 'wz', age: 26},
                        {key: '2', name: 'zw', age: 63}
                    ],
                    children: [
                        {
                            type: 'tableColumn',
                            dataIndex: 'name',
                            title: 'Name',
                        },
                        {
                            type: 'tableColumn',
                            dataIndex: 'age',
                            title: 'Age',
                        }
                    ]
                }
            ]
        }]
    };
    const rootComp = useRenderer({
        initElementNode,
    });
    return rootComp || <></>;
});
