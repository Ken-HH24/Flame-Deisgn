import React from 'react';
import { render, cleanup, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete';

const data = [
    { id: '1', value: 'abcdefg' },
    { id: '2', value: 'React.js' },
    { id: '3', value: 'javascript' },
    { id: '4', value: 'vue vuex tutorial' }
];

function handleFetchData(value: string) {
    return data.filter((item) => item.value.includes(value));
}

function renderOption(item: DataSourceType) {
    const obj = item as DataSourceType<{ id: number, value: string }>;

    return (
        <div>
            <h2>{obj.id}</h2>
            <span>{obj.value}</span>
        </div>
    )
}

const testProps: AutoCompleteProps = {
    placeholder: 'test',
    fetchData: handleFetchData,
    onSelect: jest.fn()
}

const renderProps: AutoCompleteProps = {
    placeholder: 'test',
    fetchData: handleFetchData,
    renderOption: renderOption
}

let wrapper: RenderResult, inputNode: HTMLInputElement;

describe('test AutoComplete Component', () => {
    beforeEach(() => {
        wrapper = render(<AutoComplete {...testProps}></AutoComplete>)
        inputNode = wrapper.getByPlaceholderText('test') as HTMLInputElement;
    })

    it('test basic behaviour', async () => {
        fireEvent.change(inputNode, { target: { value: 'vue' } });
        await waitFor(() => {
            expect(wrapper.queryByText('vue vuex tutorial')).toBeInTheDocument();
        })

        fireEvent.click(wrapper.getByText('vue vuex tutorial'));
        expect(testProps.onSelect).toBeCalledWith({ id: '4', value: 'vue vuex tutorial' });
        expect(inputNode.value).toBe('vue vuex tutorial');
    })

    it('if it supports keyboard event', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await waitFor(() => {
            expect(wrapper.queryByText('abcdefg')).toBeInTheDocument();
        })

        const firstResult = wrapper.queryByText('abcdefg');
        const secondeResult = wrapper.queryByText('React.js');

        fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
        expect(firstResult).toHaveClass('highlight-suggestion');

        fireEvent.keyDown(inputNode, { key: 'ArrowDown' });
        expect(secondeResult).toHaveClass('highlight-suggestion');

        fireEvent.keyDown(inputNode, { key: 'ArrowUp' });
        expect(firstResult).toHaveClass('highlight-suggestion');
    })

    it('check click outside if works out', async () => {
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await waitFor(() => {
            expect(wrapper.queryByText('abcdefg')).toBeInTheDocument();
        })

        fireEvent.click(document);
        expect(wrapper.queryByText('abcdefg')).not.toBeInTheDocument();
    })

    it('check if the right renderOption works', async () => {
        cleanup();
        wrapper = render(<AutoComplete {...renderProps}></AutoComplete>);
        inputNode = wrapper.getByPlaceholderText('test') as HTMLInputElement;
        fireEvent.change(inputNode, { target: { value: 'a' } });
        await waitFor(() => {
            expect(wrapper.queryByText('abcdefg')).toBeInTheDocument();
        })

        expect(wrapper.getByText('1')).toBeInTheDocument();
    })
})