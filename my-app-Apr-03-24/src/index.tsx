import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RandmonNum from './RandomNum';
import App from './Inc&dec';
import TempConvert from './TempChange'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
 <>
    <App />
    <TempConvert/>
    <RandmonNum />
    </>
);

