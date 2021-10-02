import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { AlertType, BaseAlertProps } from './alert';

const clickProps: BaseAlertProps = {
    title: 'title',
    content: 'Hello World'
}

const testProps: BaseAlertProps = {
    type: AlertType.Success,
    ...clickProps
}

describe('test Alert Component', () => {
    it('should the component disappear when the closed button is clicked', () => {
        const wrapper = render(<Alert {...clickProps}></Alert>);
        const container = wrapper.container.querySelector('div');
        expect(container).toBeInTheDocument();
        fireEvent.click(wrapper.container.querySelector('i') as HTMLElement);
        expect(container).not.toBeInTheDocument();
    });

    it('should the component render in the right way', () => {
        const wrapper = render(<Alert {...testProps}></Alert>);
        const container = wrapper.container.querySelector('div');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('alert alert-success');
    });

})