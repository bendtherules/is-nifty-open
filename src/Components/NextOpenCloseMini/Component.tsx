import * as React from 'react';
import * as moment from 'moment-timezone';
import "./Component.css";
import { HolidayList } from '../../Data';
import { Utils, OpenOrClose } from "../../Utils";

export interface NextOpenCloseMiniProps {
    xDay: moment.Moment;
    openOrClose: OpenOrClose;
    allHolidays: HolidayList;
}

export class NextOpenCloseMini extends React.Component<NextOpenCloseMiniProps, {}> {
    xDay: moment.Moment;
    openOrClose: OpenOrClose;
    allHolidays: HolidayList;

    nextOpenOrCloseDate: moment.Moment | undefined;

    constructor(props: NextOpenCloseMiniProps) {
        super(props);
        this.xDay = props.xDay;
        this.openOrClose = props.openOrClose;
        this.allHolidays = props.allHolidays;

        this.nextOpenOrCloseDate = Utils.findNextOpenOrEventCloseFromDate(
            this.xDay, this.allHolidays, this.openOrClose);
    }

    getOpeningClosingString() {
        return this.openOrClose === OpenOrClose.Open ? "opening" : "holiday";
    }

    getOpeningClosingClassName() {
        return this.openOrClose === OpenOrClose.Open ? "green-text" : "red-text";
    }

    renderDate(): JSX.Element[] {
        const tmpNextDate = this.nextOpenOrCloseDate as moment.Moment;
        var nextDateString = tmpNextDate.from(this.xDay);
        return [
            (
                <div className="openCloseDecription" key="title">
                    Next <span className={this.getOpeningClosingClassName()}>{this.getOpeningClosingString()}</span>
                </div>
            ),
            (
                <div className="dateDescription" key="subTitle">
                    {nextDateString}
                </div>
            )
        ];
    }

    renderNotFound(): JSX.Element[] {
        return [
            (
                <div className="openCloseDecription" key="title">
                    No more {this.getOpeningClosingString()}s
                </div>
            ),
            (
                <div className="dateDescription" key="subTitle">
                    this year
                </div>
            )
        ];
    }

    render() {

        return (
            <div className="NextOpenCloseMini">
                <div className="NextOpenCloseMini-inner">
                    {this.nextOpenOrCloseDate === undefined ? this.renderNotFound() : this.renderDate()}
                </div>
            </div>
        );
    }
}