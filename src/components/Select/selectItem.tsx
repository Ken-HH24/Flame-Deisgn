import React, { useContext } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon/icon';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { SelectContext } from './select';

interface BaseSelectItemProps {
    value: string;
    index?: number;
    disabled?: boolean;
}

export type SelectItemProps = BaseSelectItemProps & React.BaseHTMLAttributes<HTMLElement>;

const SelectItem: React.FC<SelectItemProps> = (props) => {
    const {
        value,
        disabled,
        index
    } = props;
    const selectContext = useContext(SelectContext);
    const isChosen = selectContext.chosenIndex.includes(index!);

    const classes = classNames('select-item', {
        'disabled': disabled,
        'chosen': isChosen
    })

    const handleSelectItem = () => {
        const { handleItemClick, onChange } = selectContext;
        handleItemClick(index!, value);
        if (onChange) {
            onChange(value, index!, isChosen)
        }
    }
    
    return (
        <div
            className={classes}
            onClick={handleSelectItem}
        >
            {value}
            {
                isChosen &&
                <div className='select-item-icon-wrapper'>
                    <Icon icon={faCheck} theme='primary' />
                </div>
            }
        </div>
    )
}

SelectItem.displayName = 'SelectItem';
export default SelectItem;