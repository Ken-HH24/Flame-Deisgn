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
import React, { useState } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Transition from '../Transition/transition';
var Alert = function (props) {
    var _a;
    var className = props.className, type = props.type, title = props.title, content = props.content, closeable = props.closeable, restProps = __rest(props, ["className", "type", "title", "content", "closeable"]);
    var classes = classNames('alert', className, (_a = {},
        _a["alert-" + type] = type,
        _a));
    var _b = useState(true), isShow = _b[0], setIsShow = _b[1];
    return (React.createElement(React.Fragment, null, React.createElement(Transition, { in: isShow, timeout: 300, animation: 'zoom-in-right' },
        React.createElement("div", __assign({ className: classes }, restProps),
            title && React.createElement("h4", { className: 'alert-title' }, title),
            closeable &&
                React.createElement(Icon, { className: 'closed-icon', size: 'sm', icon: faTimes, onClick: function () { setIsShow(false); } }),
            React.createElement("span", { className: 'alert-content' }, content)))));
};
Alert.defaultProps = {
    type: 'default',
    closeable: true
};
export default Alert;
