import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Alert, { BaseAlertProps } from './alert';

const clickProps: BaseAlertProps = {
    title: 'title',
    content: 'Hello World'
}

const testProps: BaseAlertProps = {
    type: 'success',
    ...clickProps
}

describe('test Alert Component', () => {
    it('should the component disappear when the closed button is clicked', async () => {
        const wrapper = render(<Alert {...clickProps}></Alert>);
        const alertElement = wrapper.container.querySelector('.alert');
        expect(alertElement).toBeInTheDocument();
        fireEvent.click(wrapper.container.querySelector('.closed-icon') as HTMLElement);
        await waitFor(() => {
            expect(alertElement).not.toBeInTheDocument();
        })
    });

    it('should the component render in the right way', () => {
        const wrapper = render(<Alert {...testProps}></Alert>);
        const container = wrapper.container.querySelector('div');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('alert alert-success');
    });

})