import * as React from 'react';
import './App.css';
import { OpenToday } from '../OpenToday';
import { allHolidays } from '../../Data';

const logo = require('./logo.svg');

class IsNiftyOpenApp extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <OpenToday question={OpenToday.OpenOrClose.Open} allHolidays={allHolidays}/>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
