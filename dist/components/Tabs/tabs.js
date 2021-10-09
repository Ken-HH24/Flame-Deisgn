import React, { useState } from 'react';
import classNames from '../../utils/classNames';
var Tabs = function (props) {
    var defaultActiveIndex = props.defaultActiveIndex, onSelect = props.onSelect, mode = props.mode, className = props.className, children = props.children;
    var _a = useState(defaultActiveIndex), activeIndex = _a[0], setActiveIndex = _a[1];
    var renderNavbar = function () {
        var navbarElement = React.Children.map(children, function (child, index) {
            var childrenElement = child;
            var displayName = childrenElement.type.displayName;
            var elementIndex = childrenElement.props.index || index;
            var navbarClasses = classNames('tab-item-label', {
                'active': elementIndex === activeIndex,
                'disabled': childrenElement.props.disabled
            });
            var handleLabelClick = function () {
                setActiveIndex(elementIndex);
                if (onSelect) {
                    onSelect(elementIndex);
                }
            };
            if (displayName === 'TabItem') {
                return (React.createElement("li", { className: navbarClasses, onClick: handleLabelClick }, childrenElement.props.label));
            }
            else {
                console.error('Tabs Component should not have a child witch is not a TabItem Component');
            }
        });
        return navbarElement;
    };
    var renderContent = function () {
        return React.Children.map(children, function (child, index) {
            if (index === activeIndex) {
                var childrenElement = child;
                return (React.createElement(React.Fragment, null, childrenElement));
            }
        });
    };
    var classes = classNames('tabs', className);
    return (React.createElement("div", { className: classes },
        React.createElement("ul", { className: "tab-item-navbar " + mode }, renderNavbar()),
        renderContent()));
};
Tabs.defaultProps = {
    defaultActiveIndex: 0,
    mode: 'default'
};
export default Tabs;
