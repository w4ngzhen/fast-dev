import {useDrop} from "react-dnd";
import React from "react";
import {useRenderer} from "../../core/hook/useRenderer";
import {ROOT_TYPE} from "../../core/wrapper/BaseWrapper";
import {DesignMask} from "../design-mask/DesignMask";
import {observer} from "mobx-react-lite";

export const DesignCanvas = observer(() => {

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
                            event: {
                                onClick: 'console.log(path, context)'
                            }
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
                    ui: {},
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
        elementNodeMapper: eleNode => eleNode,
        componentMapper: (comp: JSX.Element, type: string, path: string) => {
            // todo 如果是设计模式并且是能够独立使用的组件（局部根元素）
            if (ROOT_TYPE.indexOf(type) >= 0) {
                return (
                    <DesignMask
                        key={path}
                        type={type}
                        path={path}
                        selected={false}
                    >
                        {comp}
                    </DesignMask>
                );
            }
            return comp;
        }
    });

    console.log(rootComp)

    const [collectedProps, dropRef] = useDrop(() => ({
        accept: 'ComponentTagListItem',
        hover: (item, monitor) => {
        },
        collect: monitor => ({
            isOver: monitor.isOver(),
        })
    }));

    const style = {
        background: collectedProps.isOver ? 'pink' : 'white'
    };

    return (
        <div style={{width: '100%', height: '100%', ...style}} ref={dropRef}>
            {rootComp}
        </div>
    );
})
