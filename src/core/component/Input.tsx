import React, {ChangeEventHandler, CSSProperties, FocusEventHandler, FormEventHandler} from "react";
import './index.css';

interface InputProps {
    value?: string | number;
    style?: CSSProperties;
    tabIndex?: number;
    focused?: boolean;

    onChange?: ChangeEventHandler<HTMLInputElement>;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = (props) => {
    const {

        value,
        style,
        tabIndex,
        focused,

        onChange,
        onFocus,
        onBlur

    } = props;

    const styles: CSSProperties = {}
    if (focused) {
        styles.borderColor = '#40a9ff';
        styles.boxShadow = '0 0 0 2px rgb(24 144 255 / 20%)';
        styles.borderRightWidth = '1px !important';
        styles.outline = '0';
    }

    return (
        <input
            type="text"
            tabIndex={tabIndex}
            className={'my-input'}
            style={{...styles, ...style}}

            value={value || ''}

            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
}
