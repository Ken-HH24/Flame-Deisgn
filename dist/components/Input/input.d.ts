import { IconProp } from '@fortawesome/fontawesome-svg-core';
import React, { ChangeEvent, InputHTMLAttributes, ReactElement } from 'react';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
    disabled?: boolean;
    size?: 'sm' | 'default' | 'lg';
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
declare const Input: React.FC<InputProps>;
export default Input;
