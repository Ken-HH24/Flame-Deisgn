import React from 'react';
import Tabs, { TabsProps } from './tabs';
import TabItem, { TabItemProps } from './tabItem';

export type ITabComponent = React.FC<TabsProps> & {
    TabItem: React.FC<TabItemProps>
}

const TransTab = Tabs as ITabComponent;
TransTab.TabItem = TabItem;
export default TransTab;