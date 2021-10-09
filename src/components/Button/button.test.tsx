import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps } from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: 'danger',
    size: 'lg',
    className: 'btn-test'
}

const linkProps: ButtonProps = {
    btnType: 'link',
    href: 'http://baidu.com'
}

const disabledProps: ButtonProps = {
    onClick: jest.fn(),
    disabled: true
}

describe('test Button Component', () => {
    it('should render the correct default component', () => {
        const wrapper = render(<Button {...defaultProps}>Hello</Button>);
        const element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>Hello</Button>);
        const element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn btn-danger btn-lg btn-test');
    });

    it('should render a Link when the btnType equals to the link', () => {
        const wrapper = render(<Button {...linkProps}>Hello</Button>);
        const element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn btn-link');
        expect(element.tagName).toEqual('A');
    });

    it('should render a disabled Button when its props have disabled attribute', () => {
        const wrapper = render(<Button {...disabledProps}>Hello</Button>);
        const element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        fireEvent.click(element);
        expect(disabledProps.onClick).not.toHaveBeenCalled();
    });
})