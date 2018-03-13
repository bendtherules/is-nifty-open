import * as React from 'react';
import './App.css';
import { OpenXDay } from '../OpenXDay';
import { allHolidays } from '../../Data';
import { Utils } from "../../Utils";

class IsNiftyOpenApp extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="OpenXDay-container">
          <OpenXDay
            question={OpenXDay.OpenOrClose.Open}
            xDay={Utils.createTodayDateInIndiaTZ()}
            allHolidays={allHolidays}
          />
        </div>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
