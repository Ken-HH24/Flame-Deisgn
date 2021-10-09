import React from 'react';
import { SelectProps } from './select';
import { SelectItemProps } from './selectItem';
export declare type ISelectComponent = React.FC<SelectProps> & {
    SelectItem: React.FC<SelectItemProps>;
};
declare const TransSelect: ISelectComponent;
export default TransSelect;
