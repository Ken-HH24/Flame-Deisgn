import React from 'react';
declare type MenuMode = 'vertical' | 'horizontal';
declare type selectCallback = (index: string) => void;
export interface MenuProps {
    mode?: MenuMode;
    className?: string;
    defaultActiveIndex?: string;
    onSelect?: selectCallback;
    style?: React.CSSProperties;
}
export interface IMenuContext {
    mode: MenuMode;
    activeIndex: string;
    onSelect?: selectCallback;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
