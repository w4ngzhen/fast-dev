import {useRenderer} from "../core/hook/useRenderer";

export function Example() {
    const {wrapperRenderer, elementNode} = useRenderer({
        type: 'page',
        children: [{type: 'panel'}]
        // children: [{
        //     type: 'panel',
        //     children: [
        //         {
        //             type: 'button',
        //         },
        //         {
        //             type: 'panel',
        //             children: [
        //                 {
        //                     type: 'button',
        //                     event: {
        //                         onClick: 'console.log()'
        //                     }
        //                 }
        //             ]
        //         },
        //         {type: 'panel', children: [{type: 'input', value: ''}]},
        //         {
        //             type: 'panel',
        //             children: [ {
        //                 type: 'tabs',
        //                 ui: {
        //                     activeTabKey: 'tab2'
        //                 },
        //                 children:
        //                     [
        //                         {
        //                             type: 'tabPane', ui: {tabKey: 'tab1', tabName: 'TabOne'}, children: [{
        //                                 type: 'input'
        //                             }]
        //                         },
        //                         {type: 'tabPane', ui: {tabKey: 'tab2', tabName: 'TabTwo'}}
        //                     ]
        //             },]
        //         },
        //         {
        //             type: 'table', ui: {}, dataSource: [
        //                 {name: 'wz', age: 26},
        //                 {name: 'zw', age: 63}
        //             ], children: [
        //                 {
        //                     type: 'tableColumn',
        //                     dataIndex: 'name',
        //                     ui: {
        //                         title: 'Name',
        //                     }
        //                 },
        //                 {
        //                     type: 'tableColumn',
        //                     dataIndex: 'age',
        //                     ui: {
        //                         title: 'Age',
        //                     }
        //                 }
        //             ]
        //         }
        //     ]
        // }]
    });
    return wrapperRenderer.renderElementNode(elementNode, '/' + elementNode.type) || <></>;
}
