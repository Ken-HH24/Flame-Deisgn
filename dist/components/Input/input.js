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
import React from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';
var Input = function (props) {
    var _a;
    var disabled = props.disabled, size = props.size, icon = props.icon, prepend = props.prepend, append = props.append, restProps = __rest(props, ["disabled", "size", "icon", "prepend", "append"]);
    var classes = classNames('input-wrapper', (_a = {
            'disabled': disabled
        },
        _a["input-wrapper-" + size] = size,
        _a));
    return (React.createElement("div", { className: classes },
        prepend && React.createElement("div", { className: 'input-prepend' }, prepend),
        React.createElement("div", { className: 'input-inner' },
            React.createElement("input", __assign({ className: 'input-item' }, restProps)),
            icon && React.createElement("div", { className: 'input-icon-wrapper' },
                React.createElement(Icon, { className: 'input-icon', icon: icon }))),
        append && React.createElement("div", { className: 'input-append' }, append)));
};
Input.defaultProps = {
    disabled: false,
    size: 'default'
};
export default Input;
