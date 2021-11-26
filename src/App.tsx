import React from 'react';
import DialogDemo from './components/Dialog/demo';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

function App() {
  return (
    <div className="App">
      <DialogDemo />
    </div>
  );
}

export default App;
