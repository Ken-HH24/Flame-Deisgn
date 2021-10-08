import React from 'react';
import Input, { InputProps } from './input';
import AutoComplete, { AutoCompleteProps } from './autoComplete';

export type IInputComponent = React.FC<InputProps> & {
    AutoComplete: React.FC<AutoCompleteProps>
}

const TransInput = Input as IInputComponent;
TransInput.AutoComplete = AutoComplete;

export default TransInput;