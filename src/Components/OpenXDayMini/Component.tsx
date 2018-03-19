import * as React from 'react';
import * as moment from 'moment-timezone';
import * as Linq from 'linq';
import * as classnames from 'classnames';
import "./Component.css";
import { Holiday, HolidayList, getWeekendHoliday } from '../../Data/index';

export interface OpenXDayProps {
    xDay: moment.Moment;
    dateDescription: string;
    allHolidays: HolidayList;
}

export class OpenXDayMini extends React.Component<OpenXDayProps, {}> {
    xDay: moment.Moment;
    dateDescription: string;
    allHolidays: HolidayList;

    answer: { open: boolean, holiday: Holiday | undefined };

    static checkSameDayInSameTZ(moment1: moment.Moment, moment2: moment.Moment, raiseErrorTZMismatch: boolean = true) {
        // tslint:disable-next-line:triple-equals
        if (raiseErrorTZMismatch && (moment1.tz() != moment2.tz())) {
            throw new Error("Timezones don't match");
        }

        // tslint:disable-next-line:triple-equals
        return (moment1.startOf("day").format() == moment2.startOf("day").format());
    }

    constructor(props: OpenXDayProps) {
        super(props);
        this.xDay = props.xDay;
        this.dateDescription = props.dateDescription;
        this.allHolidays = props.allHolidays;

        this.processAnswer();
    }

    processAnswer(): void {
        {
            const matchingHoliday = Linq
                .from<Holiday>(this.allHolidays)
                .firstOrDefault(
                    (eachHoliday, _tmp) => OpenXDayMini.checkSameDayInSameTZ(this.xDay, eachHoliday.Date)
                );

            if (matchingHoliday === null) {
                this.answer = { open: true, holiday: undefined };
            } else {
                this.answer = { open: false, holiday: matchingHoliday };
            }
        }

        {
            const weekendHoliday = getWeekendHoliday(this.xDay);

            if (typeof weekendHoliday !== "undefined") {
                this.answer = { open: false, holiday: weekendHoliday };
            }
        }
    }

    render() {
        const bgColorClass = (this.answer.open ? "green" : "red");

        return (
            <div className={classnames([bgColorClass, "OpenXDayMini"])} >
                <div className="OpenXDayMini-inner">
                    <div className="openOrCloseText">
                        {this.answer.open ? "Open" : "Closed"}
                    </div>
                    <div className="dateDescription">
                        {this.dateDescription}
                    </div>
                </div>
            </div>
        );
    }
}

export module OpenXDayMini {
    export enum OpenOrClose {
        Open = 'open',
        Close = 'closed'
    }
}