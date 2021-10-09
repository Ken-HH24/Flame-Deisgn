import React from 'react';
import { InputProps } from './input';
import { AutoCompleteProps } from './autoComplete';
export declare type IInputComponent = React.FC<InputProps> & {
    AutoComplete: React.FC<AutoCompleteProps>;
};
declare const TransInput: IInputComponent;
export default TransInput;
