import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Newapp from './customeHook';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App /> // comment this line to see custome hook
    // <Newapp /> // uncomment this line to see custome hook
);

