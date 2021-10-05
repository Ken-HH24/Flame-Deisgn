import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: 'sm' | 'default' | 'lg';
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        ...restProps
    } = props;

    const classes = classNames('input-wrapper', {
        'disabled': disabled,
        [`input-wrapper-${size}`]: size,
    })

    return (
        <div className={classes}>
            {prepend && <div className='input-prepend'>{prepend}</div>}
            
            <div className='input-inner'>
                <input className='input-item' {...restProps}></input>
                {icon && <div className='input-icon-wrapper'><Icon className='input-icon' icon={icon} /></div>}
            </div>
            {append && <div className='input-append'>{append}</div>}
        </div>
    )
}

Input.defaultProps = {
    disabled: false,
    size: 'default'
}

export default Input;