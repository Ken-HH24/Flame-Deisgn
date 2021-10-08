import React from 'react';
import Select, { SelectProps } from './select';
import SelectItem, { SelectItemProps } from './selectItem';

export type ISelectComponent = React.FC<SelectProps> & {
    SelectItem: React.FC<SelectItemProps>
}

const TransSelect = Select as ISelectComponent;
TransSelect.SelectItem = SelectItem;
export default TransSelect;