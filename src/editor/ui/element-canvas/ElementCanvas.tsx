import {useState} from "react";
import ComponentDefine from "../../../core/ComponentDefine";
import ComponentDefineRenderer from "../../../core/ComponentDefineRenderer";
import {useDrop} from "react-dnd";

export function ElementCanvas() {
    const [rootComponentDefine, setRootComponentDefine] =
        useState<ComponentDefine>({
            type: 'page',
            name: 'Page',
            width: '100%',
            height: '100%',
            children: [{
                type: 'panel',
                name: 'Panel',
                width: '',
                height: '',
                children: [{
                    type: 'button',
                    name: 'Button',
                    width: '100%',
                    height: '100%',
                }, {
                    type: 'panel',
                    name: 'Panel',
                    width: '300px',
                    height: '150px',
                    children: [
                        {
                            type: 'button',
                            name: 'Button',
                            width: '100%',
                            height: '100%',
                        }
                    ]
                }]
            }]
        });

    const [collectedProps, dropRef] = useDrop(() => ({
        accept: 'ComponentTagListItem',
        hover: (item, monitor) => {
            console.log(item);
            console.log(monitor.isOver({ shallow: true }))
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
            {ComponentDefineRenderer.renderDefine(rootComponentDefine)}
        </div>
    );
}
