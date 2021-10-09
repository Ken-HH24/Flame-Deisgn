// import React from 'react';
// import ReactDOM from 'react-dom';
// import './styles/index.scss';
// import App from './App';
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
export { default as Alert } from './components/Alert';
export { default as Button } from './components/Button';
export { default as Icon } from './components/Icon';
export { default as Input } from './components/Input';
export { default as Menu } from './components/Menu';
export { default as Progress } from './components/Progress';
export { default as Select } from './components/Select';
export { default as Tabs } from './components/Tabs';
export { default as Transition } from './components/Transition';
export { default as Upload } from './components/Upload';
