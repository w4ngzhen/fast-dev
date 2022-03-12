import React, {FC, useRef, useState} from "react";
import './design-mask.css';
import cl from 'classnames';
import {useDrag, useDrop} from "react-dnd";
import {IconRemove} from "../../core/icon/IconRemove";

export type DesignMaskProps = {
    type: string;
    path: string;

    hovered?: boolean;
    onPathHovered?: (path: string) => void;

    selected?: boolean;
    onPathSelected?: (path: string) => void;
}

export const DesignMask: FC<DesignMaskProps> = (props) => {
    const {
        type,
        path,

        hovered,
        onPathHovered,

        selected,
        onPathSelected
    } = props;

    const refObject = useRef<HTMLDivElement | null>(null);

    // 能够作为拖入目标
    const [dropProps, dropRef] = useDrop(() => ({
        accept: ['ComponentTagListItem', 'DesignMask'],
        hover: (item, monitor) => {
        },
        collect: monitor => {
            return ({
                isOver: monitor.isOver({shallow: true}),
            })
        }
    }));

    // 自身也能够拖动
    const [dragProps, dragRef] = useDrag(() => ({
        type: 'DesignMask'
    }));

    // 既是可被drop也可以drag
    dragRef(dropRef(refObject));

    // 功能栏目
    const tools = (
        <span>

        </span>
    );

    const className = cl(
        'design-mask',
        {
            'outline-blue': !dropProps.isOver && selected,
            'outline-blue-dash': !selected && (dropProps.isOver || hovered),
            'inline-block': ['a', 'span', 'button', 'b', 'i'].includes(type),
        }
    );

    return (
        <div
            data-mask-path={path}
            className={className}
            ref={refObject}
            onClick={(e) => {
                e.stopPropagation();
                onPathSelected && onPathSelected(path);
            }}
            onMouseMove={e => {
                e.stopPropagation();
                onPathHovered && onPathHovered(path);
            }}
        >
            {selected && <IconRemove className='icon' onClick={() => {
                                     }}/>}
            {props.children}
        </div>
    )
}
