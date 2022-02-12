import {useState} from "react";
import {useDrop} from "react-dnd";
import BaseSchema from "../../../schema/BaseSchema";
import {SchemaDesignBlockRenderer} from "../../render/SchemaDesignBlockRenderer";

export function ElementCanvas() {
    const [schemaDesignBlockRenderer] = useState(new SchemaDesignBlockRenderer());

    const [rootBaseSchema, setRootBaseSchema] =
        useState<BaseSchema>({
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
