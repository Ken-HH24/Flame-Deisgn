import React, { InputHTMLAttributes } from 'react';
declare type changeCallBack = (value: string, index: number, isChosen: boolean) => void;
export interface SelectProps extends Omit<InputHTMLAttributes<HTMLElement>, 'onChange'> {
    mode?: 'single' | 'multiple';
    onVisibleChange?: (isVisible: boolean) => void;
    onChange?: changeCallBack;
}
export interface ISelectContext {
    chosenIndex: number[];
    handleItemClick: (index: number, value: string) => void;
    onChange?: changeCallBack;
}
export declare const SelectContext: React.Context<ISelectContext>;
declare const Select: React.FC<SelectProps>;
export default Select;
