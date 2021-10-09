import React, { useContext } from 'react';
import { MenuContext } from './menu';
import classNames from '../../utils/classNames';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, children = props.children, style = props.style;
    var menuContext = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'disabled': disabled,
        'active': menuContext.activeIndex === index
    });
    var handleItemClick = function () {
        if (menuContext.onSelect && !disabled && typeof index === 'string') {
            menuContext.onSelect(index);
        }
    };
    return (React.createElement("li", { style: style, className: classes, onClick: handleItemClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
