import React from 'react';
import Tabs from './tabs';
import TabItem from './tabItem';

const TabDemo = () => {
    return (
        <Tabs>
            <TabItem label='111'>Hello World</TabItem>
            <TabItem label='222' disabled>See you</TabItem>
            <TabItem label='333'>Bye Bye</TabItem>
        </Tabs>
    )
}

export default TabDemo;