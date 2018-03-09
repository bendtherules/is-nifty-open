import * as React from 'react';
import * as Moment from 'moment';
import * as Linq from 'linq';
import * as classnames from 'classnames';
import "./Component.css";
import { Holiday, HolidayList, getWeekendHoliday } from '../../Data/index';
import { ClosedReason } from '../ClosedReason';

export class OpenToday extends React.Component<{
    question: OpenToday.OpenOrClose,
    allHolidays: HolidayList
}, {}> {
    question: OpenToday.OpenOrClose;
    allHolidays: HolidayList;
    answer: { open: boolean, holiday: Holiday | undefined };

    constructor(props: { question: OpenToday.OpenOrClose, allHolidays: HolidayList }) {
        super(props);
        this.question = props.question;
        this.allHolidays = props.allHolidays;

        this.processAnswer();
    }

    processAnswer(): void {
        var todayDateTime = Moment();

        {
            const matchingHoliday = Linq
                .from<Holiday>(this.allHolidays)
                .firstOrDefault(
                    (eachHoliday, _tmp) => todayDateTime.isSame(eachHoliday.Date, 'day')
                );

            if (matchingHoliday === null) {
                this.answer = { open: true, holiday: undefined };
            } else {
                this.answer = { open: false, holiday: matchingHoliday };
            }
        }

        {
            const weekendHoliday = getWeekendHoliday(todayDateTime);

            if (typeof weekendHoliday !== "undefined") {
                this.answer = { open: false, holiday: weekendHoliday };
            }
        }
    }

    render() {
        const answerBoolean = (this.question === OpenToday.OpenOrClose.Open ? this.answer.open : !this.answer.open);
        const bgColorClass = (this.answer.open ? "green" : "red");

        return (
            <div className={classnames([bgColorClass, "OpenToday"])} >
                <div className="question">
                    <span>
                        Is Nifty50 (NSE) {this.question} today?
                    </span>
                </div>
                <div className="answerComposite">
                    <div className="answerBoolean">
                        <span>
                            {answerBoolean ? "Yes" : "No"}
                        </span>
                    </div>

                    {!this.answer.open ? <ClosedReason holiday={this.answer.holiday as Holiday} /> : undefined}

                </div>
            </div>
        );
    }
}

export module OpenToday {
    export enum OpenOrClose {
        Open = 'open',
        Close = 'closed'
    }
}