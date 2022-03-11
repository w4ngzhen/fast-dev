import React, {FC, useState} from "react";
import './design-mask.css';
import cl from 'classnames';
import {useDrag, useDrop} from "react-dnd";
import HtmlUtils from "../../utils/HtmlUtils";
import _ from "lodash";

export type DesignMaskProps = {
    type: string;
    path: string;

    hovered?: boolean;
    onPathHovered?: (path: string) => void;

    selected?: boolean;
    onPathSelected?: (path: string) => void;
}

export const DesignMask: FC<DesignMaskProps> =
    (props) => {
        const {
            type,
            path,

            hovered,
            onPathHovered,

            selected,
            onPathSelected
        } = props;

        const [collectedProps, dropRef] = useDrop(() => ({
            accept: 'ComponentTagListItem',
            hover: (item, monitor) => {
            },
            collect: monitor => {
                return ({
                isOver: monitor.isOver(),
            })}
        }));

        const className = cl(
            'design-mask',
            {
                'outline-blue': !collectedProps.isOver && selected,
                'outline-blue-dash': !selected && (collectedProps.isOver || hovered),
                'inline-block': ['a', 'span', 'button', 'b', 'i'].includes(type),
            }
        );

        return (
            <div
                data-mask-path={path}
                className={className}
                ref={dropRef}
                onClick={(e) => {
                    e.stopPropagation();
                    onPathSelected && onPathSelected(path);
                }}
                onMouseMove={e => {
                    e.stopPropagation();
                    onPathHovered && onPathHovered(path);
                }}
            >
                {props.children}
            </div>
        )
    }
