import React from 'react';
import Menu, { MenuProps } from './menu';
import MenuItem, { MenuItemProps } from './menuItem';
import SubMenu, { SubMenuProps } from './subMenu';

export type IMenuComponent = React.FC<MenuProps> & {
    MenuItem: React.FC<MenuItemProps>,
    SubMenu: React.FC<SubMenuProps>
}

const TransMenu = Menu as IMenuComponent;
TransMenu.MenuItem = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;