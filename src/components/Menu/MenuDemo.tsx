import React from 'react';
import Menu from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';

function MenuDemo() {
    return (
        <Menu mode='vertical'>
            <MenuItem>111</MenuItem>
            <MenuItem disabled>222</MenuItem>
            <SubMenu title='333'>
                <MenuItem>aaa</MenuItem>
                <MenuItem>bbb</MenuItem>
            </SubMenu>
        </Menu>
    )
}

export default MenuDemo;