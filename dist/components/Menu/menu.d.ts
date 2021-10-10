import React, { CSSProperties } from 'react';
export declare type MenuMode = 'vertical' | 'horizontal';
export interface MenuProps {
    mode?: MenuMode;
    style?: CSSProperties;
    defaultActiveIndex?: string;
    onSelect?: (index: string) => void;
}
export interface IMenuContext {
    mode: MenuMode;
    activeIndex: string;
    handleItemClick: (index: string) => void;
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
