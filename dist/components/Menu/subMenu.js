var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useContext, useState } from 'react';
import { MenuContext } from './menu';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';
var SubMenu = function (props) {
    var title = props.title, index = props.index, className = props.className, children = props.children;
    var _a = useState(false), menuOpen = _a[0], setMenuOpen = _a[1];
    var menuContext = useContext(MenuContext);
    var renderSubMenu = function () {
        var submenuClasses = classNames('submenu-item', {
            'submenu-display': menuOpen,
            'submenu-vertical': menuContext.mode === 'vertical',
            'submenu-horizontal': menuContext.mode === 'horizontal'
        });
        var submenuChildren = React.Children.map(children, function (child, i) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: index + "-" + (childElement.props.index || i)
                });
            }
            else {
                console.error('Submenu Component should not have a child which is not a MenuItem Compoenent');
            }
        });
        return (React.createElement(Transition, { in: menuOpen, timeout: 300, animation: 'zoom-in-right' },
            React.createElement("ul", { className: submenuClasses }, submenuChildren)));
    };
    var classes = classNames('menu-item', 'submenu', className, {
        'active': menuContext.activeIndex === index,
        'isVertical': menuContext.mode === 'vertical',
        'isOpen': menuOpen
    });
    var handleClick = function (e) {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };
    var timer;
    var handleHover = function (e, toggle) {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(function () {
            setMenuOpen(toggle);
        }, 300);
    };
    var clickEvent = menuContext.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvent = menuContext.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleHover(e, true); },
        onMouseLeave: function (e) { handleHover(e, false); }
    } : {};
    return (React.createElement("li", __assign({ className: classes }, hoverEvent),
        React.createElement("div", __assign({ className: 'submenu-title' }, clickEvent),
            title,
            React.createElement(Icon, { theme: 'dark', icon: faAngleDown })),
        renderSubMenu()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
