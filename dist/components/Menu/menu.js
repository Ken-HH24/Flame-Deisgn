import React, { createContext, useState } from 'react';
import classNames from '../../utils/classNames';
export var MenuContext = createContext({
    mode: 'horizontal',
    activeIndex: '0',
});
var Menu = function (props) {
    var mode = props.mode, className = props.className, defaultActiveIndex = props.defaultActiveIndex, onSelect = props.onSelect, children = props.children, style = props.style;
    var classes = classNames('menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizental': mode === 'horizontal'
    });
    var _a = useState(defaultActiveIndex), activeIndex = _a[0], setAcitveIndex = _a[1];
    var handleMenuClick = function (index) {
        setAcitveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    var passedContext = {
        mode: mode,
        activeIndex: activeIndex || '0',
        onSelect: handleMenuClick
    };
    var renderChildren = function () {
        return React.Children.map(children, function (child, index) {
            var childElement = child;
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: childElement.props.index || index.toString()
                });
            }
            else {
                console.error('Menu Component should not have a child which is not a MenuItem Component');
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
Menu.defaultProps = {
    mode: 'horizontal',
    defaultActiveIndex: '0'
};
export default Menu;
