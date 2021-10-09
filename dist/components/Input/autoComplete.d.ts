import React, { ReactElement } from 'react';
import { InputProps } from './input';
interface DataSourceObject {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchData: (value: string) => DataSourceType[] | Promise<DataSourceType[]>;
    renderOption?: (item: DataSourceType) => ReactElement;
    onSelect?: (item: DataSourceType) => void;
}
declare const AutoComplete: React.FC<AutoCompleteProps>;
export default AutoComplete;
