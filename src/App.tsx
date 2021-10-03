import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';

function getAlert() {
  return (
    <div id='alert-wrapper'>
      <Alert
        title='aaa'
        content='bbbbb'
        closeable={false}
      />
      <Alert
        content='bbbbb'
        type={AlertType.Danger}
      />

      <Alert
        title='aaa'
        content='bbbbb'
        type={AlertType.Warning}
      />
      <Alert
        content='bbbbb'
        type={AlertType.Success}
      />
    </div>
  )
}

function getMenu() {
  return (
    <div id='menu-wrapper'>
      <Menu mode='vertical' onSelect={(index)=>{alert(index)}}>
        <MenuItem>Hello</MenuItem>
        <MenuItem disabled>World</MenuItem>
        <SubMenu title='test'>
          <MenuItem>testa</MenuItem>
          <MenuItem>testbcsdf</MenuItem>
        </SubMenu>
        <MenuItem index='5'>javascript</MenuItem>
      </Menu>
    </div>
  )
}

const getTabs = () => {
  return (
    <Tabs>
      <TabItem label='111'>Hello World</TabItem>
      <TabItem label='222' disabled>See you</TabItem>
      <TabItem label='333'>Bye Bye</TabItem>
    </Tabs>
  )
}

function App() {
  return (
    <div className="App">
      {getAlert()}
      {getMenu()}
      {getTabs()}
    </div>
  );
}

export default App;
