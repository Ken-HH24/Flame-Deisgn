import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';

function App() {
  return (
    <div className="App">
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
  );
}

export default App;
