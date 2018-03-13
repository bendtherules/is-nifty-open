import * as React from 'react';
import './App.css';
import { OpenXDay } from '../OpenXDay';
import { allHolidays } from '../../Data';

class IsNiftyOpenApp extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="OpenXDay-container">
          <OpenXDay question={OpenXDay.OpenOrClose.Open} allHolidays={allHolidays} />
        </div>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
