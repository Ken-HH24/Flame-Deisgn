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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { createContext, useState } from 'react';
import classNames from '../../utils/classNames';
export var MenuContext = createContext({
    mode: 'horizontal',
    activeIndex: '',
    handleItemClick: function (index) { }
});
var Menu = function (props) {
    var mode = props.mode, defaultActiveIndex = props.defaultActiveIndex, onSelect = props.onSelect, children = props.children, restProps = __rest(props, ["mode", "defaultActiveIndex", "onSelect", "children"]);
    var _a = useState(defaultActiveIndex || ''), activeIndex = _a[0], setAcitveIndex = _a[1];
    var handleItemClick = function (index) {
        setAcitveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var renderMenuItem = function () {
        return React.Children.map(children, function (child, index) {
            var childrenElement = child;
            var displayName = childrenElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childrenElement, {
                    index: childrenElement.props.index || index.toString()
                });
            }
        });
    };
    var classes = classNames('menu-wrapper', {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    });
    return (React.createElement("div", __assign({ className: classes }, restProps),
        React.createElement(MenuContext.Provider, { value: { mode: mode || 'horizontal', activeIndex: activeIndex, handleItemClick: handleItemClick } }, renderMenuItem())));
};
Menu.defaultProps = {
    mode: 'horizontal'
};
export default Menu;
