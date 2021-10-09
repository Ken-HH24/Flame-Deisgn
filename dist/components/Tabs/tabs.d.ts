import React from 'react';
declare type TabsMode = 'default' | 'card';
declare type selectCallback = (index: number) => void;
export interface TabsProps {
    defaultActiveIndex?: number;
    onSelect?: selectCallback;
    className?: string;
    mode?: TabsMode;
}
declare const Tabs: React.FC<TabsProps>;
export default Tabs;
