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
import React, { useState, useContext } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from './menu';
var SubMenu = function (props) {
    var title = props.title, index = props.index, onDisplay = props.onDisplay, children = props.children;
    var _a = useState(false), isDisplay = _a[0], setIsDisplay = _a[1];
    var menuContext = useContext(MenuContext);
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setIsDisplay(toggle);
            if (onDisplay) {
                onDisplay(toggle);
            }
        }, 300);
    };
    var handleClick = function (e) {
        e.preventDefault();
        if (onDisplay) {
            onDisplay(!isDisplay);
        }
        setIsDisplay(!isDisplay);
    };
    var hoverEvent = menuContext.mode === 'horizontal' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); }
    } : {};
    var clickEvent = menuContext.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var renderSubMenuItem = function () {
        var subMenuItems = React.Children.map(children, function (child, i) {
            var childrenElement = child;
            var displayName = childrenElement.type.displayName;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childrenElement, {
                    index: index + "-" + (childrenElement.props.index || i)
                });
            }
        });
        var classes = classNames('sub-menu-children', {
            'sub-menu-vertical': menuContext.mode === 'vertical',
            'sub-menu-horizontal': menuContext.mode === 'horizontal'
        });
        return React.createElement("div", { className: classes }, subMenuItems);
    };
    var classes = classNames('sub-menu-title', {
        'submenu-active': menuContext.activeIndex.split('-')[0] === (index === null || index === void 0 ? void 0 : index.toString())
    });
    return (React.createElement("div", __assign({ className: 'sub-menu-wrapper' }, hoverEvent),
        React.createElement("div", __assign({ className: classes }, clickEvent),
            title,
            React.createElement("div", { className: "sub-menu-icon " + (isDisplay ? 'display' : '') },
                React.createElement(Icon, { icon: faAngleDown }))),
        isDisplay && renderSubMenuItem()));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
