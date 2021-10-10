import React, { createContext, useState, CSSProperties } from 'react';
import classNames from '../../utils/classNames';
import { MenuItemProps } from './menuItem';

export type MenuMode = 'vertical' | 'horizontal';

export interface MenuProps {
    mode?: MenuMode;
    style?: CSSProperties;
    defaultActiveIndex?: string;
    onSelect?: (index: string) => void;
}

export interface IMenuContext {
    mode: MenuMode;
    activeIndex: string;
    handleItemClick: (index: string) => void;
}

export const MenuContext = createContext<IMenuContext>({
    mode: 'horizontal',
    activeIndex: '',
    handleItemClick: (index: string) => { }
});

const Menu: React.FC<MenuProps> = (props) => {
    const {
        mode,
        defaultActiveIndex,
        onSelect,
        children,
        ...restProps
    } = props;

    const [activeIndex, setAcitveIndex] = useState(defaultActiveIndex || '');

    const handleItemClick = (index: string) => {
        setAcitveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    }

    const renderMenuItem = () => {
        return React.Children.map(children, (child, index) => {
            const childrenElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childrenElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childrenElement, {
                    index: childrenElement.props.index || index.toString()
                })
            }
        })
    }

    const classes = classNames('menu-wrapper', {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode === 'horizontal'
    })

    return (
        <div className={classes} {...restProps}>
            <MenuContext.Provider value={{mode: mode || 'horizontal', activeIndex, handleItemClick}}>
                {renderMenuItem()}
            </MenuContext.Provider>
        </div>
    )
}

Menu.defaultProps = {
    mode: 'horizontal'
}

export default Menu;