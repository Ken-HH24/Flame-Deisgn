import React, { useContext, useState } from 'react';
import { MenuItemProps } from './menuItem';
import { MenuContext } from './menu';
import classNames from '../../utils/classNames';

export interface SubMenuProps {
    title: string;
    index?: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const { title, index, className, children } = props;
    const [ menuOpen, setMenuOpen ] = useState(false);
    const menuContext = useContext(MenuContext);

    const renderSubMenu = () => {
        const submenuClasses = classNames('submenu-item', {
            'submenu-display': menuOpen,
            'submenu-vertical': menuContext.mode === 'vertical',
            'submenu-horizontal': menuContext.mode === 'horizontal'
        });

        const submenuChildren = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${childElement.props.index || i}`
                })
            } else {
                console.error('Submenu Component should not have a child which is not a MenuItem Compoenent');
            }
        })
        
        return (
            <ul className={submenuClasses}>
                {submenuChildren}
            </ul>
        )
    }

    const classes = classNames(
        'menu-item',
        'submenu',
        className,
        {
            'active': menuContext.activeIndex === index
        }
    );

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    }

    let timer: any;
    const handleHover = (e: React.MouseEvent, toggle: boolean) => {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(() => {
            setMenuOpen(toggle);
        }, 300);
    }

    const clickEvent = menuContext.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    
    const hoverEvent = menuContext.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleHover(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleHover(e, false) }
    } : {}

    return (
        <li className={classes} {...hoverEvent}>
            <div
                className='submenu-title'
                {...clickEvent}
            >
                {title}
            </div>
            {renderSubMenu()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;