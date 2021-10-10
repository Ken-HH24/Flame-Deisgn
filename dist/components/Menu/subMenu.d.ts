import React from 'react';
export interface SubMenuProps {
    title: string;
    index?: string;
    onDisplay?: (isDisplay: boolean) => void;
}
declare const SubMenu: React.FC<SubMenuProps>;
export default SubMenu;
