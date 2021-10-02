import React from 'react';
import classNames from '../../utils/classNames';

export enum ButtonType {
    Default = 'default',
    Primary = 'primary',
    Warning = 'warning',
    Success = 'success',
    Danger = 'danger',
    Link = 'link'
}

export enum ButtonSize {
    Normal = 'normal',
    Large = 'lg',
    Small = 'sm'
}

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
            'disabled': (btnType === ButtonType.Link) && disabled
        }
    );

    if (btnType === ButtonType.Link) {
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
    btnType: ButtonType.Default,
    size: ButtonSize.Normal,
    disabled: false
}

export default Button;