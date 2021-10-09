import React, { useContext } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { SelectContext } from './select';
var SelectItem = function (props) {
    var value = props.value, disabled = props.disabled, index = props.index;
    var selectContext = useContext(SelectContext);
    var isChosen = selectContext.chosenIndex.includes(index);
    var classes = classNames('select-item', {
        'disabled': disabled,
        'chosen': isChosen
    });
    var handleSelectItem = function () {
        var handleItemClick = selectContext.handleItemClick, onChange = selectContext.onChange;
        handleItemClick(index, value);
        if (onChange) {
            onChange(value, index, isChosen);
        }
    };
    return (React.createElement("div", { className: classes, onClick: handleSelectItem },
        value,
        isChosen &&
            React.createElement("div", { className: 'select-item-icon-wrapper' },
                React.createElement(Icon, { icon: faCheck, theme: 'primary' }))));
};
SelectItem.displayName = 'SelectItem';
export default SelectItem;
