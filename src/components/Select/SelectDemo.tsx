import React from 'react'
import Select from './select';
import SelectItem from './selectItem';

function SelectDemo() {
    return (
        <Select
            style={{
                marginTop: '100px',
                width: '500px',
                margin: '0 auto'
            }}
        >
            <SelectItem value='111'></SelectItem>
            <SelectItem value='222' disabled></SelectItem>
            <SelectItem value='333'></SelectItem>
        </Select>
    )
}

export default SelectDemo;