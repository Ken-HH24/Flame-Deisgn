import React from 'react';
import classNames from '../../utils/classNames';
var TabItem = function (props) {
    var className = props.className, children = props.children;
    var classes = classNames('tab-item-content', className);
    return (React.createElement("div", { className: classes }, children));
};
TabItem.displayName = 'TabItem';
export default TabItem;
