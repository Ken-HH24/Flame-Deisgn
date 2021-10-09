import React from 'react';
import { TabsProps } from './tabs';
import { TabItemProps } from './tabItem';
export declare type ITabComponent = React.FC<TabsProps> & {
    TabItem: React.FC<TabItemProps>;
};
declare const TransTab: ITabComponent;
export default TransTab;
