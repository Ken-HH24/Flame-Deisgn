import React from 'react';
export interface TabItemProps {
    label: string;
    index?: number;
    disabled?: boolean;
    className?: string;
}
declare const TabItem: React.FC<TabItemProps>;
export default TabItem;
