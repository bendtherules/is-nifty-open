import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as moment from 'moment-timezone';
import './App.css';
import { OpenXDay } from '../OpenXDay';
import { OpenXDayMini } from '../OpenXDayMini';
import { NextOpenCloseMini } from '../NextOpenCloseMini';
import { allHolidays } from '../../Data';
import { Utils, OpenOrClose } from "../../Utils";

const enum OpenOrCloseOrClosed {
  Open = "open",
  Close = "close",
  Closed = "closed"
}

const enum DayNames {
  today = "today",
  tomorrow = "tomorrow",
  yesterday = "yesterday",
}

class IsNiftyOpenApp extends React.Component {
  static mapAbsoluteDateToRelativeDayName(xDay: moment.Moment): DayNames | undefined {
    // Redirect to relative if day is within +-1 day of today
    let tmpToday = Utils.createTodayDateInIndiaTZ();
    let tmpTomorrow = tmpToday.clone().add(1, "d");
    let tmpYesterday = tmpToday.clone().subtract(1, "d");

    if (Utils.checkSameDayInSameTZ(xDay, tmpToday)) {

      return DayNames.today;

    } else if (Utils.checkSameDayInSameTZ(xDay, tmpTomorrow)) {

      return DayNames.tomorrow;

    } else if (Utils.checkSameDayInSameTZ(xDay, tmpYesterday)) {

      return DayNames.yesterday;

    } else {

      return undefined;

    }
  }

  calcOpenOrCloseForOpenCloseMini(xDay: moment.Moment) {
    var isTodayEventHoliday = Utils.getEventHolidayOnDate(xDay, allHolidays) !== undefined;

    return isTodayEventHoliday ? OpenOrClose.Open : OpenOrClose.Close;
  }

  returnRedirectToDayNamePathIfPossible(openOrClose: OpenOrClose, xDay: moment.Moment): JSX.Element | undefined {
    var relativeDayName = IsNiftyOpenApp.mapAbsoluteDateToRelativeDayName(xDay);
    if (relativeDayName !== undefined) {
      return this.redirectToOpenRelativeDay(openOrClose, relativeDayName);
    } else {
      return undefined;
    }
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
      if (dateText === undefined) {
        return this.redirectToOpenRelativeDay(question);
      }
      dateText = dateText.toLowerCase();

      switch (dateText) {
        case DayNames.today:
          xDay = Utils.createTodayDateInIndiaTZ();
          break;

        case DayNames.tomorrow:
          xDay = Utils.createTodayDateInIndiaTZ().add(1, "d");
          break;

        case DayNames.yesterday:
          xDay = Utils.createTodayDateInIndiaTZ().subtract(1, "d");
          break;

        default:
          let possiblyXDay = Utils.createSomeDateInIndiaTZ(dateText);
          if (possiblyXDay.isValid()) {
            {
              // Redirect to day name path if possible
              let redirectDayNamePath = this.returnRedirectToDayNamePathIfPossible(question, possiblyXDay);
              if (redirectDayNamePath !== undefined) {
                return redirectDayNamePath;
              }
            }

            // Else continue
            xDay = possiblyXDay;
          } else {
            return this.redirectToOpenRelativeDay(question);
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

  redirectToOpenRelativeDay(question: OpenOrClose = OpenOrClose.Open, dayName: DayNames = DayNames.today): JSX.Element {
    return (<Redirect to={`/${question}/${dayName}`} />);
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
          {this.redirectToOpenRelativeDay()}
        </Switch>
      </div>
    );
  }
}

export { IsNiftyOpenApp };
