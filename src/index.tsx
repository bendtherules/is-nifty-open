import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IsNiftyOpenApp } from './Components/IsNiftyOpenApp';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <IsNiftyOpenApp />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
