import React from 'react';
import AutoComplete, { DataSourceType } from './autoComplete';

const data = [
    { id: '1', value: 'abcdefg' },
    { id: '2', value: 'React.js' },
    { id: '3', value: 'javascript' },
    { id: '4', value: 'vue vuex tutorial' }
]

function handleFetchData(value: string) {
    return data.filter((item) => item.value.includes(value));
}

interface ITest {
    id: number;
    value: string;
}

function renderOption(item: DataSourceType) {
    const obj = item as DataSourceType<ITest>;
    return (
        <>
            <span>{obj.value}</span>
        </>
    )
}

const InputDemo = () => {
    return (
        <AutoComplete
            fetchData={handleFetchData}
            renderOption={renderOption}
            onSelect={(item) => { console.log(item) }}
            style={{
                width: '500px',
                margin: '0 auto'
            }}
        ></AutoComplete>
    )
}

export default InputDemo;