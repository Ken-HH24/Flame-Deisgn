import React from 'react';
import classNames from '../../utils/classNames';

export interface TabItemProps {
    label: string;
    index?: number;
    disabled?: boolean;
    className?: string; 
}

const TabItem: React.FC<TabItemProps> = (props) => {
    const { className, children } = props;
    const classes = classNames('tab-item-content', className);

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

TabItem.displayName = 'TabItem';
export default TabItem;