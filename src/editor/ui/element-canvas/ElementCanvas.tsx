import React, {useState} from "react";
import {useDrop} from "react-dnd";
import BaseSchema from "../../../schema/BaseSchema";
import {SchemaDesignBlockRenderer} from "../../render/SchemaDesignBlockRenderer";
import {Button} from "antd";

export function ElementCanvas() {
    const [schemaDesignBlockRenderer] = useState(new SchemaDesignBlockRenderer());

    const [rootBaseSchema, setRootBaseSchema] =
        useState<BaseSchema>({
            type: 'page',
            name: 'Page',
            width: '100%',
            height: '100%',
            isContainer: true,
            children: [{
                type: 'panel',
                name: 'Panel',
                width: '',
                height: '',
                isContainer: true,
                children: [{
                    type: 'button',
                    name: 'Button',
                    width: '100%',
                    height: '100%',
                    isContainer: false,
                }, {
                    type: 'panel',
                    name: 'Panel',
                    width: '300px',
                    height: '150px',
                    isContainer: true,
                    children: [
                        {
                            type: 'button',
                            name: 'Button',
                            width: '100%',
                            height: '100%',
                            isContainer: false,
                        }
                    ]
                }]
            }]
        });

    schemaDesignBlockRenderer.schema = rootBaseSchema;

    const [collectedProps, dropRef] = useDrop(() => ({
        accept: 'ComponentTagListItem',
        hover: (item, monitor) => {
            console.log(item);
            console.log(monitor.isOver({shallow: true}))
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
            {schemaDesignBlockRenderer.renderDesignBlock()}
        </div>
    );
}
