import React, { useState, useContext } from 'react';
import classNames from '../../utils/classNames';
import Icon from '../Icon';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';


export interface SubMenuProps {
    title: string;
    index?: string;
    onDisplay?: (isDisplay: boolean) => void;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {
        title,
        index,
        onDisplay,
        children
    } = props;

    const [isDisplay, setIsDisplay] = useState(false);
    const menuContext = useContext(MenuContext);

    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setIsDisplay(toggle);
            if (onDisplay) {
                onDisplay(toggle);
            }
        }, 300);
    }

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onDisplay) {
            onDisplay(!isDisplay);
        }
        setIsDisplay(!isDisplay);
    }

    const hoverEvent = menuContext.mode === 'horizontal' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}

    const clickEvent = menuContext.mode === 'vertical' ? {
        onClick: handleClick
    } : {}

    const renderSubMenuItem = () => {
        const subMenuItems = React.Children.map(children, (child, i) => {
            const childrenElement = child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childrenElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childrenElement, {
                    index: `${index}-${childrenElement.props.index || i}`
                });
            }
        });

        const classes = classNames('sub-menu-children', {
            'sub-menu-vertical': menuContext.mode === 'vertical',
            'sub-menu-horizontal': menuContext.mode === 'horizontal'
        })

        return <div className={classes}>
            {subMenuItems}
        </div>
    }

    const classes = classNames('sub-menu-title', {
        'submenu-active': menuContext.activeIndex.split('-')[0] === index?.toString()
    })
    
    return (
        <div className='sub-menu-wrapper' {...hoverEvent}>
            <div className={classes} {...clickEvent}>
                {title}
                <div className={`sub-menu-icon ${isDisplay ? 'display' : ''}`}>
                    <Icon icon={faAngleDown} />
                </div>
            </div>
            {isDisplay && renderSubMenuItem()}
        </div>
    )
}

SubMenu.displayName = 'SubMenu';
export default SubMenu;