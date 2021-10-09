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
import React, { useEffect, useState, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from '../../utils/classNames';
import Input from './input';
import Icon from '../Icon/icon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
var AutoComplete = function (props) {
    var fetchData = props.fetchData, renderOption = props.renderOption, onSelect = props.onSelect, restProps = __rest(props, ["fetchData", "renderOption", "onSelect"]);
    var _a = useState(''), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState(-1), highlightIndex = _b[0], setHighlightIndex = _b[1];
    var _c = useState([]), suggestions = _c[0], setSuggestions = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var debounceValue = useDebounce(inputValue);
    var triggerSearch = useRef(true);
    var componentRef = useRef(null);
    useClickOutside(componentRef, function () { setSuggestions([]); });
    useEffect(function () {
        if (debounceValue.length && triggerSearch.current) {
            var result = fetchData(debounceValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (res) {
                    setLoading(false);
                    setSuggestions(res);
                });
            }
            else {
                setSuggestions(result);
            }
        }
        else {
            setSuggestions([]);
        }
        // eslint-disable-next-line
    }, [debounceValue]);
    var handleInputChange = function (e) {
        var value = e.target.value.trim();
        triggerSearch.current = true;
        setInputValue(value);
    };
    var handleSuggestionClick = function (suggestion) {
        triggerSearch.current = false;
        setInputValue(suggestion.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(suggestion);
        }
    };
    var renderSuggestions = function () {
        if (loading) {
            return (React.createElement("div", { className: 'auto-complete-loading-wrapper' },
                React.createElement(Icon, { icon: faSpinner, size: '2x', spin: true })));
        }
        else if (suggestions.length) {
            return (React.createElement("ul", { className: 'auto-complete-items-wrapper' }, suggestions.map(function (suggestion, index) {
                var classes = classNames('auto-complete-item', {
                    'highlight-suggestion': index === highlightIndex
                });
                return (React.createElement("li", { key: index, className: classes, onClick: function () { handleSuggestionClick(suggestion); }, onMouseEnter: function () { setHighlightIndex(index); } }, renderOption ? renderOption(suggestion) : suggestion.value));
            })));
        }
    };
    var handleKeyDown = function (e) {
        switch (e.key) {
            case 'Enter':
                if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[highlightIndex]);
                }
                break;
            case 'ArrowDown':
                if (highlightIndex === suggestions.length - 1) {
                    setHighlightIndex(-1);
                }
                else {
                    setHighlightIndex(highlightIndex + 1);
                }
                break;
            case 'ArrowUp':
                if (highlightIndex === -1) {
                    setHighlightIndex(suggestions.length - 1);
                }
                else {
                    setHighlightIndex(highlightIndex - 1);
                }
                break;
            case 'Escape':
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    return (React.createElement("div", __assign({ className: 'auto-complete-wrapper', ref: componentRef }, restProps),
        React.createElement(Input, { value: inputValue, onChange: handleInputChange, onKeyDown: handleKeyDown }),
        renderSuggestions()));
};
export default AutoComplete;
