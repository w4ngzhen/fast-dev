import {useRenderer} from "../core/hook/useRenderer";

export function Example() {
    const {elementRenderer, elementNode} = useRenderer({
        type: 'page',
        children: [{
            type: 'panel',
            children: [
                {
                    type: 'button',
                },
                {
                    type: 'panel',
                    children: [
                        {
                            type: 'button',
                            event: {
                                onClick: 'console.log()'
                            }
                        }
                    ]
                },
                {type: 'panel', children: [{type: 'input', value: ''}]}
            ]
        }]
    });
    return elementRenderer.render(elementNode, '/' + elementNode.type) || <></>;
}
