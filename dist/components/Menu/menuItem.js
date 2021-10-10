import React, { useContext } from 'react';
import classNames from '../../utils/classNames';
import { MenuContext } from './menu';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, children = props.children;
    var menuContext = useContext(MenuContext);
    var handleItemClick = function () {
        menuContext.handleItemClick(index);
    };
    var classes = classNames('menu-item', {
        'disabled': disabled,
        'active': menuContext.activeIndex === index
    });
    return (React.createElement("div", { className: classes, onClick: handleItemClick }, children));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
