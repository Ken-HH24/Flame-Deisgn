import React from 'react';
import Alert from './components/Alert/alert';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import AutoComplete, { DataSourceType } from './components/Input/autoComplete';
import Select from './components/Select/select';
// import Input from './components/Input/input';
import SelectItem from './components/Select/selectItem';
import Upload from './components/Upload/upload';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

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
        type='danger'
      />

      <Alert
        title='aaa'
        content='bbbbb'
        type='warning'
      />
      <Alert
        content='bbbbb'
        type='success'
      />
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

const getInput = () => {
  return (
    <AutoComplete
      fetchData={handleFetchData}
      renderOption={renderOption}
      onSelect={(item) => { console.log(item) }}
      style={{
        width: '500px',
        margin: '0 auto'
      }}
    ></AutoComplete>
  )
}

function getSelect() {
  return (
    <Select
        style={{
          marginTop: '100px',
          width: '500px',
          margin: '0 auto'
        }}
      >
        <SelectItem value='111'></SelectItem>
        <SelectItem value='222' disabled></SelectItem>
        <SelectItem value='333'></SelectItem>
    </Select>
  )
}

function getUpload() {
  return (
    <Upload
      action='https://jsonplaceholder.typicode.com/posts'
      // action='http://localhost:8000/upload'
      multiple
      drag
    >upload file</Upload>
  )
}

function getMenu() {
  return (
    <Menu mode='horizontal'>
      <MenuItem>111</MenuItem>
      <MenuItem disabled>222</MenuItem>
      <SubMenu title='333'>
        <MenuItem>aaa</MenuItem>
        <MenuItem>bbb</MenuItem>
      </SubMenu>
    </Menu>
  )
}

function App() {
  return (
    <div className="App">
      {getAlert()}
      {getTabs()}
      {getInput()}
      {getSelect()}
      {getUpload()}
      {getMenu()}
    </div>
  );
}

export default App;
