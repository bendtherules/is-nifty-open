import * as React from 'react';
import * as moment from 'moment-timezone';
import * as Linq from 'linq';
import * as classnames from 'classnames';
import "./Component.css";
import { Holiday, HolidayList, getWeekendHoliday } from '../../Data/index';
import { ClosedReason } from '../ClosedReason';

export interface OpenXDayProps {
    question: OpenXDay.OpenOrClose;
    xDay: moment.Moment;
    allHolidays: HolidayList;
}

export class OpenXDay extends React.Component<OpenXDayProps, {}> {
    question: OpenXDay.OpenOrClose;
    xDay: moment.Moment;
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
        this.question = props.question;
        this.xDay = props.xDay;
        this.allHolidays = props.allHolidays;

        this.processAnswer();
    }

    processAnswer(): void {
        {
            const matchingHoliday = Linq
                .from<Holiday>(this.allHolidays)
                .firstOrDefault(
                    (eachHoliday, _tmp) => OpenXDay.checkSameDayInSameTZ(this.xDay, eachHoliday.Date)
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
        const answerBoolean = (this.question === OpenXDay.OpenOrClose.Open ? this.answer.open : !this.answer.open);
        const bgColorClass = (this.answer.open ? "green" : "red");

        return (
            <div className={classnames([bgColorClass, "OpenXDay"])} >
                <div className="question">
                    <span>
                        Is Nifty50 {this.question} today?
                    </span>
                </div>
                <div className="answerComposite">
                    <div className="answerComposite-inner">
                        <div className="answerBoolean">
                            <span>
                                {answerBoolean ? "Yes" : "No"}
                            </span>
                        </div>
                        <div className="answerReason">
                            {!this.answer.open ? <ClosedReason holiday={this.answer.holiday as Holiday} /> : undefined}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export module OpenXDay {
    export enum OpenOrClose {
        Open = 'open',
        Close = 'closed'
    }
}