import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

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
        <MenuItem>
          Hello
        </MenuItem>
        <MenuItem disabled>
          World
        </MenuItem>
        <SubMenu title='test'>
          <MenuItem>
            testa
          </MenuItem>
          <MenuItem>
            testbcsdf
          </MenuItem>
        </SubMenu>
        <MenuItem index='5'>
          javascript
        </MenuItem>
      </Menu>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      {getAlert()}
      {getMenu()}
    </div>
  );
}

export default App;
