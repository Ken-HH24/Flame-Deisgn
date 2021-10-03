import React, { useState } from 'react';
import classNames from '../../utils/classNames';
import { TabItemProps } from './tabItem';

type TabsMode = 'default' | 'card';
type selectCallback = (index: number) => void;

export interface TabsProps {
    defaultActiveIndex?: number;
    onSelect?: selectCallback;
    className?: string;
    mode?: TabsMode;
}

const Tabs: React.FC<TabsProps> = (props) => {
    const { defaultActiveIndex, onSelect, mode, className, children } = props;
    const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);

    const renderNavbar = () => {
        const navbarElement = React.Children.map(children, (child, index) => {
            const childrenElement = child as React.FunctionComponentElement<TabItemProps>;
            const { displayName } = childrenElement.type;
            const elementIndex = childrenElement.props.index || index;
            const navbarClasses = classNames('tab-item-label', {
                'active': elementIndex === activeIndex,
                'disabled': childrenElement.props.disabled
            });

            const handleLabelClick = () => {
                setActiveIndex(elementIndex);
                if (onSelect) {
                    onSelect(elementIndex);
                }
            }

            if (displayName === 'TabItem') {
                return (
                    <li
                        className={navbarClasses}
                        onClick={handleLabelClick}
                    >
                        {childrenElement.props.label}
                    </li>
                )
            } else {
                console.error('Tabs Component should not have a child witch is not a TabItem Component');
            }
        });

        return navbarElement;
    }

    const renderContent = () => {
        return React.Children.map(children, (child, index) => {
            if (index === activeIndex) {
                const childrenElement = child as React.FunctionComponentElement<TabItemProps>;
                return (
                    <React.Fragment>
                        {childrenElement}
                    </React.Fragment>
                )
            }
        })
    }

    const classes = classNames('tabs', className);
    return (
        <div className={classes}>
           <ul className={`tab-item-navbar ${mode}`}>
                {renderNavbar()}
            </ul>
            {renderContent()}
        </div>
    )
}

Tabs.defaultProps = {
    defaultActiveIndex: 0,
    mode: 'default'
}
export default Tabs;