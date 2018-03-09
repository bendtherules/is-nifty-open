import * as React from 'react';
import * as Moment from 'moment';
import * as Linq from 'linq';
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
        var todayDateTime = Moment("2018-03-11");

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

        return (
            <div className="OpenToday">
                <div className="question">Is Nifty50 (NSE) {this.question} today?</div>
                <div className="answerComposite">
                    <div className="answerBoolean">
                        {answerBoolean ? "Yes" : "No"}
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