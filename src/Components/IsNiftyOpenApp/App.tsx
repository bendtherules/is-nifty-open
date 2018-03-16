import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { OpenXDay } from '../OpenXDay';
import { allHolidays } from '../../Data';
import { Utils } from "../../Utils";

enum OpenOrCloseOrClosed {
  Open = "open",
  Close = "close",
  Closed = "closed"
}

class IsNiftyOpenApp extends React.Component {
  renderOpenXDay(questionString: OpenOrCloseOrClosed): React.ReactElement<{}> {
    var question: OpenXDay.OpenOrClose;
    if (questionString === OpenOrCloseOrClosed.Open) {
      question = OpenXDay.OpenOrClose.Open;
    } else {
      question = OpenXDay.OpenOrClose.Close;
    }

    return (
      <div className="OpenXDay-container">
        <OpenXDay
          question={question}
          xDay={Utils.createTodayDateInIndiaTZ()}
          allHolidays={allHolidays}
        />
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
