import React from 'react';
import Alert from './components/Alert/alert';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import AutoComplete from './components/Input/autoComplete';
import Select from './components/Select/select';
// import Input from './components/Input/input';
import SelectItem from './components/Select/selectItem';
import Upload from './components/Upload/upload';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
function getAlert() {
    return (React.createElement("div", { id: 'alert-wrapper' },
        React.createElement(Alert, { title: 'aaa', content: 'bbbbb', closeable: false }),
        React.createElement(Alert, { content: 'bbbbb', type: 'danger' }),
        React.createElement(Alert, { title: 'aaa', content: 'bbbbb', type: 'warning' }),
        React.createElement(Alert, { content: 'bbbbb', type: 'success' })));
}
var getTabs = function () {
    return (React.createElement(Tabs, null,
        React.createElement(TabItem, { label: '111' }, "Hello World"),
        React.createElement(TabItem, { label: '222', disabled: true }, "See you"),
        React.createElement(TabItem, { label: '333' }, "Bye Bye")));
};
var data = [
    { id: '1', value: 'abcdefg' },
    { id: '2', value: 'React.js' },
    { id: '3', value: 'javascript' },
    { id: '4', value: 'vue vuex tutorial' }
];
function handleFetchData(value) {
    return data.filter(function (item) { return item.value.includes(value); });
}
function renderOption(item) {
    var obj = item;
    return (React.createElement(React.Fragment, null,
        React.createElement("span", null, obj.value)));
}
var getInput = function () {
    return (React.createElement(AutoComplete, { fetchData: handleFetchData, renderOption: renderOption, onSelect: function (item) { console.log(item); }, style: {
            width: '500px',
            margin: '0 auto'
        } }));
};
function getSelect() {
    return (React.createElement(Select, { style: {
            marginTop: '100px',
            width: '500px',
            margin: '0 auto'
        } },
        React.createElement(SelectItem, { value: '111' }),
        React.createElement(SelectItem, { value: '222', disabled: true }),
        React.createElement(SelectItem, { value: '333' })));
}
function getUpload() {
    return (React.createElement(Upload, { action: 'https://jsonplaceholder.typicode.com/posts', 
        // action='http://localhost:8000/upload'
        multiple: true, drag: true }, "upload file"));
}
function getMenu() {
    return (React.createElement(Menu, { mode: 'horizontal' },
        React.createElement(MenuItem, null, "111"),
        React.createElement(MenuItem, { disabled: true }, "222"),
        React.createElement(SubMenu, { title: '333' },
            React.createElement(MenuItem, null, "aaa"),
            React.createElement(MenuItem, null, "bbb"))));
}
function App() {
    return (React.createElement("div", { className: "App" },
        getAlert(),
        getTabs(),
        getInput(),
        getSelect(),
        getUpload(),
        getMenu()));
}
export default App;
