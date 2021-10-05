import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import Input from './components/Input/input';
import AutoComplete, { DataSourceType } from './components/Input/autoComplete';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
      <Menu>
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

const getInput = () => {
  return (
    <div>
      <Input
        prepend='https://'
        append='.com'
        icon={faCoffee}
        disabled
      ></Input>
      <Input size='sm' />
      <Input />
      <Input size='lg' />
    </div>
  )
}

const data = [
  { id: '1', value: 'abcdefg' },
  { id: '2', value: 'React.js' },
  { id: '3', value: 'javascript' },
  { id: '4', value: 'vue vuex tutorial' }
]

function handleFetchData(value: string) {
  return data.filter((item) => item.value.includes(value));
}

interface ITest {
  id: number;
  value: string;
}
 
function renderOption(item: DataSourceType) {
  const obj = item as DataSourceType<ITest>;
  return (
    <>
      <span>{obj.value}</span>
    </>
  )
}

function App() {
  return (
    <div className="App">
      {getAlert()}
      {getMenu()}
      {getTabs()}
      {/* {getInput()} */}
      <AutoComplete
        fetchData={handleFetchData}
        renderOption={renderOption}
        onSelect={(item) => { console.log(item) }}
        style={{
          width: '500px',
          margin: '0 auto'
        }}
      ></AutoComplete>
    </div>
  );
}

export default App;
