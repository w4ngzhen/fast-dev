import React, {FC} from "react";
import './design-mask.css';
import cl from 'classnames';

export type DesignMaskProps = {
    type: string;
    path: string;
    selected?: false;
}

export const DesignMask: FC<DesignMaskProps> =
    (props) => {
        const {type, path, selected} = props;
        const className = cl(
            'design-mask',
            {
                'outline-blue': selected,
                'inline-block': ['a', 'span', 'button', 'b', 'i'].includes(type),
            }
        );

        return (
            <div
                className={className}
                data-path={path}
            >
                {props.children}
            </div>
        )
    }
