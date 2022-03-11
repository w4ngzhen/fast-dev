import React from "react";
import * as Icon from "@ant-design/icons";
import {InfoCircleOutlined} from "@ant-design/icons";
import {useDrag} from "react-dnd";

interface ComponentTagListItemProps {
    icon: string,
    label: string,
}

const ComponentTagListItem = (props: ComponentTagListItemProps) => {

    const {icon, label} = props;

    const [, dragRef] = useDrag(() => ({
        type: 'ComponentTagListItem',
        item: {}
    }))

    // @ts-ignore todo
    const iconElement = Icon[icon];
    const iconComp = iconElement ? React.createElement(iconElement) : null;

    return (
        <div className={'component-tag-list-item'} ref={dragRef}>
            <div className={'component-tag-list-item__icon'}>
                {iconComp}
            </div>
            <div className={'component-tag-list-item__label'}>
                <p>{label}</p>
            </div>
            <div className={'component-tag-list-item_info'}>
                <InfoCircleOutlined onClick={() => console.log('click icon')}/>
            </div>
        </div>
    );
};

export default ComponentTagListItem;
