import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { IsNiftyOpenApp } from './Components/IsNiftyOpenApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
  <IsNiftyOpenApp />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
