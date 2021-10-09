import React from 'react';
import Alert from './components/Alert/alert';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';
import AutoComplete from './components/Input/autoComplete';
import Select from './components/Select/select';
// import Input from './components/Input/input';
import SelectItem from './components/Select/selectItem';
import Upload from './components/Upload/upload';
function getAlert() {
    return (React.createElement("div", { id: 'alert-wrapper' },
        React.createElement(Alert, { title: 'aaa', content: 'bbbbb', closeable: false }),
        React.createElement(Alert, { content: 'bbbbb', type: 'danger' }),
        React.createElement(Alert, { title: 'aaa', content: 'bbbbb', type: 'warning' }),
        React.createElement(Alert, { content: 'bbbbb', type: 'success' })));
}
function getMenu() {
    return (React.createElement("div", { id: 'menu-wrapper' },
        React.createElement(Menu, { mode: 'vertical', style: { width: '200px' } },
            React.createElement(MenuItem, null, "Hello"),
            React.createElement(MenuItem, { disabled: true }, "World"),
            React.createElement(SubMenu, { title: 'test' },
                React.createElement(MenuItem, null, "testa"),
                React.createElement(MenuItem, null, "testbcsdf")),
            React.createElement(MenuItem, { index: '5' }, "javascript"))));
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
function App() {
    return (React.createElement("div", { className: "App" },
        getAlert(),
        getMenu(),
        getTabs(),
        getInput(),
        getSelect(),
        getUpload()));
}
export default App;
