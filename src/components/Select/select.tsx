import React, { createContext, InputHTMLAttributes, useState, useRef } from 'react';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { SelectItemProps } from './selectItem';
import useClickOutside from '../../hooks/useClickOutside';

type changeCallBack = (value: string, index: number, isChosen: boolean) => void;

export interface SelectProps extends Omit<InputHTMLAttributes<HTMLElement>, 'onChange'> {
    mode?: 'single' | 'multiple';
    onVisibleChange?: (isVisible: boolean) => void;
    onChange?: changeCallBack;
}

export interface ISelectContext {
    chosenIndex: number[];
    handleItemClick: (index: number, value: string) => void;
    onChange?: changeCallBack;
}

export const SelectContext = createContext<ISelectContext>({
    chosenIndex: [],
    handleItemClick: (index: number, value: string) => { }
});

const Select: React.FC<SelectProps> = (props) => {
    const {
        mode,
        onVisibleChange,
        onChange,
        children,
        ...restProps
    } = props;

    const [panelShow, setPanelShow] = useState(false);
    const [chosenIndex, setChosenIndex] = useState<number[]>([]);
    const inputValue = useRef('');
    const componentRef = useRef<HTMLDivElement>(null);
    useClickOutside(componentRef, () => { handlePanelShow(false) })

    const handleItemClick = (index: number, value: string) => {
        const chosenIndexArr = [...chosenIndex];
        const position = chosenIndex.indexOf(index);
        if (position === -1) {
            mode === 'single' ? setChosenIndex([index]) : setChosenIndex([...chosenIndexArr, index]);
            inputValue.current = (mode === 'single') ? value : ' ';
        } else {
            chosenIndexArr.splice(position, 1);
            mode === 'single' ? setChosenIndex([index]) : setChosenIndex([...chosenIndexArr]);
            inputValue.current = (mode === 'single') ? '' : (chosenIndex.length > 0 ? ' ' : '');
        }

        if (mode === 'single') {
            handlePanelShow(false);
        }
    }

    const handlePanelShow = (isVisible: boolean) => {
        onVisibleChange && onVisibleChange(isVisible);
        setPanelShow(isVisible);
    }

    const handleInputClick = () => {
        handlePanelShow(!panelShow);
    }

    const handleOptionClick = (index: number) => {
        const chosenIndexArr = [...chosenIndex];
        const position = chosenIndexArr.indexOf(index);
        if (position !== -1) {
            chosenIndexArr.splice(position, 1);
            setChosenIndex([...chosenIndexArr]);
        }
    }

    const renderPanel = () => {
        const selectItems = React.Children.map(children, (child, index) => {
            const childrenElement = child as React.FunctionComponentElement<SelectItemProps>;
            const { displayName } = childrenElement.type;
            if (displayName === 'SelectItem') {
                return React.cloneElement(childrenElement, {
                    index: childrenElement.props.index || index,
                })
            } else {
                console.error('Select Component should not have a child which is not a SelectItem Component');
            }
        });

        return (
            <ul className='select-items-wrapper'>
                {selectItems}
            </ul>
        )
    }

    const renderMutipleOption = () => {
        const options = React.Children.map(children, (child, index) => {
            const childrenElement = child as React.FunctionComponentElement<SelectItemProps>;
            const { value } = childrenElement.props;
            if (chosenIndex.includes(index)) {
                return (
                    <div
                        className='select-option-item'
                        onClick={(e) => {
                            e.preventDefault();
                            handleOptionClick(index);
                        }}
                    >
                        <span className='select-option-value'>{value}</span>
                        <Icon icon={faTimes} theme='primary'></Icon>
                    </div>
                ) 
            }
        })
        
        if (options && options.length > 0) {
            inputValue.current = ' ';
        } else {
            inputValue.current = '';
        }

        return (
            <div className='select-option-wrapper'>
                {options}
            </div>
        )
    }

    return (
        <div className='select-wrapper' {...restProps} ref={componentRef}>
            <div className='select-input-wrapper'>
                <input
                    readOnly
                    placeholder='请选择'
                    className='select-input'
                    value={inputValue.current}
                ></input>
                <div
                    onClick={handleInputClick}
                    className={`select-input-icon ${panelShow ? 'panelShow' : ''}`}
                >
                    <Icon icon={faAngleDown} />
                </div>
                {mode === 'multiple' && renderMutipleOption()}
            </div>
            <SelectContext.Provider value={{chosenIndex, handleItemClick, onChange}}>
                <Transition
                    in={panelShow}
                    timeout={300}
                >
                    {renderPanel()}
                </Transition>
            </SelectContext.Provider>
        </div>
    )
}

Select.defaultProps = {
    mode: 'multiple'
}

export default Select;