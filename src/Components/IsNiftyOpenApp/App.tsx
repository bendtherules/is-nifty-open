import * as React from 'react';
import './App.css';
import { OpenToday } from '../OpenToday';
import { allHolidays } from '../../Data';

class IsNiftyOpenApp extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="OpenToday-container">
          <OpenToday question={OpenToday.OpenOrClose.Open} allHolidays={allHolidays} />
        </div>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
