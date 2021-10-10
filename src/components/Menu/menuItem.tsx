import React, { useContext } from 'react';
import classNames from '../../utils/classNames';
import { MenuContext } from './menu';

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        children
    } = props;

    const menuContext = useContext(MenuContext);

    const handleItemClick = () => {
        menuContext.handleItemClick(index!);
    }

    const classes = classNames('menu-item', {
        'disabled': disabled,
        'active': menuContext.activeIndex === index
    })

    return(
        <div
            className={classes}
            onClick={handleItemClick}
        >
            {children}
        </div>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem;