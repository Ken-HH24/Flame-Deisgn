import React, { createContext, useState } from 'react';
import { MenuItemProps } from './menuItem';
import classNames from '../../utils/classNames';

type MenuMode = 'vertical' | 'horizontal';
type selectCallback = (index: string) => void;

export interface MenuProps {
    mode?: MenuMode;
    className?: string;
    defaultActiveIndex?: string;
    onSelect?: selectCallback;
    style?: React.CSSProperties;
}

export interface IMenuContext{
    mode: MenuMode;
    activeIndex: string;
    onSelect?: selectCallback;
}

export const MenuContext = createContext<IMenuContext>({
    mode: 'horizontal',
    activeIndex: '0',
})

const Menu: React.FC<MenuProps> = (props) => {
    const {
        mode,
        className,
        defaultActiveIndex,
        onSelect,
        children,
        style
    } = props;

    const classes = classNames(
        'menu',
        className,
        {
            'menu-vertical': mode === 'vertical',
            'menu-horizental': mode === 'horizontal'
        }
    );

    const [activeIndex, setAcitveIndex] = useState(defaultActiveIndex);
    const handleMenuClick = (index: string) => {
        setAcitveIndex(index);
        if (onSelect) {
            onSelect(index);
        }
    }

    const passedContext: IMenuContext = {
        mode: mode!,
        activeIndex: activeIndex || '0',
        onSelect: handleMenuClick
    };
    
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: childElement.props.index || index.toString()
                });
            } else {
                console.error('Menu Component should not have a child which is not a MenuItem Component');
            }
        });
    }

    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    mode: 'horizontal',
    defaultActiveIndex: '0'
}

export default Menu;