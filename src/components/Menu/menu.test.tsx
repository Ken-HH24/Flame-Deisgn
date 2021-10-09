import React from 'react';
import { render, cleanup, RenderResult, fireEvent, waitFor } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

const testMenuProps: MenuProps = {
    defaultActiveIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const verticalMenuProps: MenuProps = {
    mode: 'vertical',
    onSelect: jest.fn()
}

function generateMenu(props: MenuProps) {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem index='5'>
                xyz
            </MenuItem>
            <SubMenu title='submenu'>
                <MenuItem>
                    drop1
                </MenuItem>
                <MenuItem>
                    drop2
                </MenuItem>
            </SubMenu>
        </Menu>
    )
}

const createStyleFile = () => {
    const cssFile: string = `
        .submenu-item {
            display: none;
        }

        .submenu-item.submenu-display{
            display: block;
        }
    `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style;
}

let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;

describe('test Menu and MenuItem Component', () => {
    beforeEach(() => {
        wrapper = render(generateMenu(testMenuProps));
        // wrapper.container.appendChild(createStyleFile());
        menuElement = wrapper.container.querySelector('ul')!;
        activeElement = wrapper.getByText('active');
        disabledElement = wrapper.getByText('disabled');
    });

    it('should render the right component with props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu test');
        expect(activeElement).toHaveClass('menu-item active');
        expect(disabledElement).toHaveClass('menu-item disabled');
    });

    it('should render the component with right event', () => {
        expect(menuElement).toBeInTheDocument();
        const xyzElement = wrapper.getByText('xyz');
       
        fireEvent.click(xyzElement);
        expect(xyzElement).toHaveClass('menu-item active');
        expect(testMenuProps.onSelect).toBeCalledWith('5');
       
        fireEvent.click(disabledElement);
        expect(disabledElement).not.toHaveClass('active');
        expect(testMenuProps.onSelect).not.toBeCalledWith('1');
    });

    it('should render the component in the vertical direction', () => {
        cleanup();
        const wrapper = render(generateMenu(verticalMenuProps));
        const menuElement = wrapper.container.querySelector('ul');
        expect(menuElement).toHaveClass('menu menu-vertical');
    });

    it('should show the submenu when hover on the submenu-item', async () => {
        const { queryByText, getByText } = wrapper;
        expect(queryByText('drop1')).not.toBeInTheDocument();

        fireEvent.mouseEnter(getByText('submenu'));
        await waitFor(() => {
            expect(queryByText('drop1')).toBeVisible();
        });
        
        fireEvent.click(queryByText('drop1')!);
        expect(testMenuProps.onSelect).toBeCalledWith('3-0');

        fireEvent.mouseLeave(getByText('submenu'));
        await waitFor(() => {
            expect(queryByText('drop1')).not.toBeInTheDocument();
        })
    });

    it('should show the submenu when click the submenu-item in the vertical mode', async () => {
        cleanup();
        const wrapper = render(generateMenu(verticalMenuProps));
        const { queryByText, getByText } = wrapper;
        // wrapper.container.appendChild(createStyleFile());

        expect(queryByText('drop1')).not.toBeInTheDocument();

        fireEvent.click(getByText('submenu'));
        expect(queryByText('drop1')).toBeVisible();

        fireEvent.click(queryByText('drop1')!);
        expect(verticalMenuProps.onSelect).toBeCalledWith('3-0');

        fireEvent.click(getByText('submenu'));
        await waitFor(() => {
            expect(queryByText('drop1')).not.toBeInTheDocument();
        })
    })
})