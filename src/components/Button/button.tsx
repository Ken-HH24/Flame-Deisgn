import React from 'react';
import classNames from '../../utils/classNames';

export type ButtonType = 'default' | 'primary' | 'warning' | 'success' | 'danger' | 'link';
export type ButtonSize = 'normal' | 'lg' | 'sm';

interface BaseButtonProps {
    className?: string;
    btnType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    href?: string;
    children?: React.ReactNode;
}

type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
    const {
        className,
        btnType,
        size,
        disabled,
        href,
        children,
        ...restProps
    } = props;
    
    const classes = classNames(
        'btn',
        className,
        {
            [`btn-${btnType}`]: btnType,
            [`btn-${size}`]: size,
            'disabled': (btnType === 'link') && disabled
        }
    );

    if (btnType === 'link') {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >
                {children}
            </a>
        )
    } else {
        return (
            <button
                className={classes}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </button>
        )
    }
}

Button.defaultProps = {
    btnType: 'default',
    size: 'normal',
    disabled: false
}

export default Button;