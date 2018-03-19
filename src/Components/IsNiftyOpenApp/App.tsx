import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as moment from 'moment-timezone';
import './App.css';
import { OpenXDay } from '../OpenXDay';
import { OpenXDayMini } from '../OpenXDayMini';
import { NextOpenCloseMini } from '../NextOpenCloseMini';
import { allHolidays } from '../../Data';
import { Utils, OpenOrClose } from "../../Utils";

enum OpenOrCloseOrClosed {
  Open = "open",
  Close = "close",
  Closed = "closed"
}

class IsNiftyOpenApp extends React.Component {
  calcOpenOrCloseForOpenCloseMini(xDay: moment.Moment) {
    var isTodayEventHoliday = Utils.getEventHolidayOnDate(xDay, allHolidays) !== undefined;

    return isTodayEventHoliday ? OpenOrClose.Open : OpenOrClose.Close;
  }

  renderOpenXDay(questionString: OpenOrCloseOrClosed): React.ReactElement<{}> {
    var question: OpenOrClose;
    if (questionString === OpenOrCloseOrClosed.Open) {
      question = OpenOrClose.Open;
    } else {
      question = OpenOrClose.Close;
    }

    const xDay = Utils.createTodayDateInIndiaTZ();
    const xPlusOneDay = xDay.clone().add(1, "d");

    return (
      <div className="IsNiftyOpenApp">
        <div className="upper-half">
          <div className="OpenXDay-container">
            <OpenXDay
              question={question}
              xDay={xDay}
              allHolidays={allHolidays}
            />
          </div>
        </div>
        <div className="lower-half">
          <div className="OpenXPlusOneDay-container">
            <OpenXDayMini
              xDay={xPlusOneDay}
              dateDescription={"tomorrow"}
              allHolidays={allHolidays}
            />
          </div>
          <div className="NextOpenClose-container">
            <NextOpenCloseMini
              xDay={xDay}
              openOrClose={this.calcOpenOrCloseForOpenCloseMini(xDay)}
              allHolidays={allHolidays}
            />
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact={true}
            path='/:openOrClosed(open|close[d]?)'
            render={(props) => { return this.renderOpenXDay(props.match.params.openOrClosed); }}
          />
          <Redirect to="/open" />
        </Switch>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
