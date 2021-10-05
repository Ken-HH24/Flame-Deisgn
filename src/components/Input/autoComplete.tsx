import React, { KeyboardEvent, ChangeEvent, ReactElement, useEffect, useState, useRef } from 'react';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from '../../utils/classNames';
import Input, { InputProps } from './input';
import Icon from '../Icon/icon';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface DataSourceObject {
    value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchData: (value: string) => DataSourceType[] | Promise<DataSourceType[]>
    renderOption?: (item: DataSourceType) => ReactElement;
    onSelect?: (item: DataSourceType) => void;
}


const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {
        fetchData,
        renderOption,
        onSelect,
        ...restProps
    } = props;
    const [inputValue, setInputValue] = useState<string>('');
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const debounceValue: string = useDebounce(inputValue);
    const triggerSearch = useRef(true);
    const componentRef = useRef<HTMLDivElement>(null);
    useClickOutside(componentRef, () => { setSuggestions([]) });

    useEffect(() => {
        if (debounceValue.length && triggerSearch.current) {
            const result = fetchData(debounceValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then((res) => {
                    setLoading(false);
                    setSuggestions(res);
                })
            } else {
                setSuggestions(result);
            }
        } else {
            setSuggestions([]);
        }
        // eslint-disable-next-line
    }, [debounceValue]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        triggerSearch.current = true;
        setInputValue(value);
    }

    const handleSuggestionClick = (suggestion: DataSourceType) => {
        triggerSearch.current = false;
        setInputValue(suggestion.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(suggestion);
        }
    }

    const renderSuggestions = () => {
        if (loading) {
            return (
                <div className='auto-complete-loading-wrapper'>
                    <Icon icon={faSpinner} size='2x' spin></Icon>         
                </div>
            )
        } else if(suggestions.length) {
            return (
                <ul className='auto-complete-items-wrapper'>
                    {
                        suggestions.map((suggestion, index) => {
                            const classes = classNames('auto-complete-item', {
                                'highlight-suggestion': index === highlightIndex
                            })
                            return (
                                <li
                                    key={index}
                                    className={classes}
                                    onClick={() => { handleSuggestionClick(suggestion) }}
                                    onMouseEnter={() => { setHighlightIndex(index) }}
                                >
                                    {renderOption ? renderOption(suggestion) : suggestion.value}
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
                    handleSuggestionClick(suggestions[highlightIndex]);
                }
                break;
            case 'ArrowDown':
                if (highlightIndex === suggestions.length - 1) {
                    setHighlightIndex(-1);
                } else {
                    setHighlightIndex(highlightIndex + 1);
                }
                break;
            case 'ArrowUp':
                if (highlightIndex === -1) {
                    setHighlightIndex(suggestions.length - 1);
                } else {
                    setHighlightIndex(highlightIndex - 1);
                }
                break;
            case 'Escape':
                setSuggestions([]);
                break;
            default:
                break;
        }
    }

    return (
        <div
            className='auto-complete-wrapper'
            ref={componentRef}
            {...restProps}
        >
            <Input
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            ></Input>
            {renderSuggestions()}
        </div>
    )
}

export default AutoComplete;