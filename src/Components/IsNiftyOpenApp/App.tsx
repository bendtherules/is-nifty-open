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

  renderAllPanels(questionString: OpenOrCloseOrClosed, dateText: string): React.ReactElement<{}> {
    var question: OpenOrClose;
    if (questionString === OpenOrCloseOrClosed.Open) {
      question = OpenOrClose.Open;
    } else {
      question = OpenOrClose.Close;
    }

    let xDay: moment.Moment, xPlusOneDay: moment.Moment;
    {
      const enum DateNames {
        today = "today",
        tomorrow = "tomorrow",
        yesterday = "yesterday",
      }

      if (dateText === undefined) {
        return this.redirectToOpenToday(question);
      }
      dateText = dateText.toLowerCase();

      switch (dateText) {
        case DateNames.today:
          xDay = Utils.createTodayDateInIndiaTZ();
          break;

        case DateNames.tomorrow:
          xDay = Utils.createTodayDateInIndiaTZ().add(1, "d");
          break;

        case DateNames.yesterday:
          xDay = Utils.createTodayDateInIndiaTZ().subtract(1, "d");
          break;

        default:
          let possiblyXDay = Utils.createSomeDateInIndiaTZ(dateText);
          if (possiblyXDay.isValid()) {
            xDay = possiblyXDay;
          } else {
            return this.redirectToOpenToday(question);
          }
          break;
      }

    }
    xPlusOneDay = xDay.clone().add(1, "d");

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

  redirectToOpenToday(question: OpenOrClose = OpenOrClose.Open) {
    return (<Redirect to={`/${question}/today`} />);
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            exact={true}
            path='/:openOrClosed(open|close[d]?)/:dateText?'
            render={(props) => {
              return this.renderAllPanels(
                props.match.params.openOrClosed,
                props.match.params.dateText);
            }}
          />
          {this.redirectToOpenToday()}
        </Switch>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
