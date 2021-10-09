import React from 'react';
interface BaseSelectItemProps {
    value: string;
    index?: number;
    disabled?: boolean;
}
export declare type SelectItemProps = BaseSelectItemProps & React.BaseHTMLAttributes<HTMLElement>;
declare const SelectItem: React.FC<SelectItemProps>;
export default SelectItem;
