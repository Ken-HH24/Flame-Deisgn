import React, { useContext } from 'react';
import { MenuContext } from './menu';
import classNames from '../../utils/classNames';

export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        className,
        children,
        style
    } = props;
    const menuContext = useContext(MenuContext);

    const classes = classNames(
        'menu-item',
        className,
        {
            'disabled': disabled,
            'active': menuContext.activeIndex === index
        }
    )

    const handleItemClick = () => {
        if (menuContext.onSelect && !disabled && typeof index === 'string') {
            menuContext.onSelect(index);
        }
    }

    return (
        <li
            style={style}
            className={classes}
            onClick={handleItemClick}
        >
            {children}
        </li>
    )
}

MenuItem.displayName = 'MenuItem';
export default MenuItem;