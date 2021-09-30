import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button
        size={ButtonSize.Large}
        disabled={true}
      >Hello</Button>

      <Button
        btnType={ButtonType.Link}
        href='http://baidu.com'
      >Hello</Button>
      <Button
        btnType={ButtonType.Link}
        href='http://baidu.com'
        disabled={true}
      >Hello</Button>

      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Primary}
      >Hello</Button>

      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Danger}
      >Hello</Button>
      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Success}
      >Hello</Button>
      <Button
        size={ButtonSize.Large}
        btnType={ButtonType.Warning}
      >Hello</Button>
    </div>
  );
}

export default App;
