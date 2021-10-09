import React from 'react';
export declare type ButtonType = 'default' | 'primary' | 'warning' | 'success' | 'danger' | 'link';
export declare type ButtonSize = 'normal' | 'lg' | 'sm';
interface BaseButtonProps {
    className?: string;
    btnType?: ButtonType;
    size?: ButtonSize;
    disabled?: boolean;
    href?: string;
    children?: React.ReactNode;
}
declare type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
declare type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;
export declare type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: React.FC<ButtonProps>;
export default Button;
