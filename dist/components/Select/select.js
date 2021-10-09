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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { createContext, useState, useRef } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import useClickOutside from '../../hooks/useClickOutside';
export var SelectContext = createContext({
    chosenIndex: [],
    handleItemClick: function (index, value) { }
});
var Select = function (props) {
    var mode = props.mode, onVisibleChange = props.onVisibleChange, onChange = props.onChange, children = props.children, restProps = __rest(props, ["mode", "onVisibleChange", "onChange", "children"]);
    var _a = useState(false), panelShow = _a[0], setPanelShow = _a[1];
    var _b = useState([]), chosenIndex = _b[0], setChosenIndex = _b[1];
    var inputValue = useRef('');
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { handlePanelShow(false); });
    var handleItemClick = function (index, value) {
        var chosenIndexArr = __spreadArray([], chosenIndex, true);
        var position = chosenIndex.indexOf(index);
        if (position === -1) {
            mode === 'single' ? setChosenIndex([index]) : setChosenIndex(__spreadArray(__spreadArray([], chosenIndexArr, true), [index], false));
            inputValue.current = (mode === 'single') ? value : ' ';
        }
        else {
            chosenIndexArr.splice(position, 1);
            mode === 'single' ? setChosenIndex([index]) : setChosenIndex(__spreadArray([], chosenIndexArr, true));
            inputValue.current = (mode === 'single') ? '' : (chosenIndex.length > 0 ? ' ' : '');
        }
        if (mode === 'single') {
            handlePanelShow(false);
        }
    };
    var handlePanelShow = function (isVisible) {
        onVisibleChange && onVisibleChange(isVisible);
        setPanelShow(isVisible);
    };
    var handleInputClick = function () {
        handlePanelShow(!panelShow);
    };
    var handleOptionClick = function (index) {
        var chosenIndexArr = __spreadArray([], chosenIndex, true);
        var position = chosenIndexArr.indexOf(index);
        if (position !== -1) {
            chosenIndexArr.splice(position, 1);
            setChosenIndex(__spreadArray([], chosenIndexArr, true));
        }
    };
    var renderPanel = function () {
        var selectItems = React.Children.map(children, function (child, index) {
            var childrenElement = child;
            var displayName = childrenElement.type.displayName;
            if (displayName === 'SelectItem') {
                return React.cloneElement(childrenElement, {
                    index: childrenElement.props.index || index,
                });
            }
            else {
                console.error('Select Component should not have a child which is not a SelectItem Component');
            }
        });
        return (React.createElement("ul", { className: 'select-items-wrapper' }, selectItems));
    };
    var renderMutipleOption = function () {
        var options = React.Children.map(children, function (child, index) {
            var childrenElement = child;
            var value = childrenElement.props.value;
            if (chosenIndex.includes(index)) {
                return (React.createElement("div", { className: 'select-option-item', onClick: function (e) {
                        e.preventDefault();
                        handleOptionClick(index);
                    } },
                    React.createElement("span", { className: 'select-option-value' }, value),
                    React.createElement(Icon, { icon: faTimes, theme: 'primary' })));
            }
        });
        if (options && options.length > 0) {
            inputValue.current = ' ';
        }
        else {
            inputValue.current = '';
        }
        return (React.createElement("div", { className: 'select-option-wrapper' }, options));
    };
    return (React.createElement("div", __assign({ className: 'select-wrapper' }, restProps, { ref: componentRef }),
        React.createElement("div", { className: 'select-input-wrapper' },
            React.createElement("input", { readOnly: true, placeholder: '\u8BF7\u9009\u62E9', className: 'select-input', value: inputValue.current }),
            React.createElement("div", { onClick: handleInputClick, className: "select-input-icon " + (panelShow ? 'panelShow' : '') },
                React.createElement(Icon, { icon: faAngleDown })),
            mode === 'multiple' && renderMutipleOption()),
        React.createElement(SelectContext.Provider, { value: { chosenIndex: chosenIndex, handleItemClick: handleItemClick, onChange: onChange } },
            React.createElement(Transition, { in: panelShow, timeout: 300 }, renderPanel()))));
};
Select.defaultProps = {
    mode: 'multiple'
};
export default Select;
