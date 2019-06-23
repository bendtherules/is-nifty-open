import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import * as moment from 'moment-timezone';
import GithubCorner from 'react-github-corner';
import './App.css';
import { DateSwitchBar } from '../DateSwitchBar';
import { OpenXDay } from '../OpenXDay';
import { OpenXDayMini } from '../OpenXDayMini';
import { NextOpenCloseMini } from '../NextOpenCloseMini';
import { allHolidays } from '../../Data';
import { Utils, OpenOrClose, OpenOrCloseOrClosed, DayNames } from "../../Utils";

class IsNiftyOpenApp extends React.Component {
  calcOpenOrCloseForOpenCloseMini(xDay: moment.Moment) {
    var isTodayEventHoliday = Utils.getEventHolidayOnDate(xDay, allHolidays) !== undefined;

    return isTodayEventHoliday ? OpenOrClose.Open : OpenOrClose.Close;
  }

  returnRedirectToDayNamePathIfPossible(openOrClose: OpenOrClose, xDay: moment.Moment): JSX.Element | undefined {
    var relativeDayName = Utils.mapAbsoluteDateToRelativeDayName(xDay);
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
        <div className="top-bar">
          <GithubCorner
            href="https://github.com/bendtherules/is-nifty-open"
            bannerColor="rgb(64, 64, 64)"
            octoColor="rgba(255, 255, 255, 0.9)"
            size={80}
            direction="right"
          />
          <div className="DateSwitchBar-container">
            <DateSwitchBar />
          </div>
        </div>
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
        <div className="disclaimer">
          {`This data is taken from Karanataka ETV Flipkart holidays list,
            but doesn't include optional holidays.
            There is no gurantee that this data is correct or will be kept updated.`}
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
