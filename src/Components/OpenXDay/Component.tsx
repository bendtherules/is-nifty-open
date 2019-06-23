import * as React from 'react';
import * as moment from 'moment-timezone';
import * as classnames from 'classnames';
import "./Component.css";
import { Holiday, HolidayList } from '../../Data/index';
import { ClosedReason } from '../ClosedReason';
import { Utils, HolidayAnswer, OpenOrClose } from "../../Utils";

export interface OpenXDayProps {
    question: OpenOrClose;
    xDay: moment.Moment;
    allHolidays: HolidayList;
}

export class OpenXDay extends React.Component<OpenXDayProps, {}> {
    question: OpenOrClose;
    xDay: moment.Moment;
    allHolidays: HolidayList;

    answer: HolidayAnswer;

    constructor(props: OpenXDayProps) {
        super(props);
        this.updateFromProps(props);
    }

    componentWillUpdate(nextProps: OpenXDayProps, nextState: {}) {
        this.updateFromProps(nextProps);
    }

    updateFromProps(props: OpenXDayProps) {
        this.question = props.question;
        this.xDay = props.xDay;
        this.allHolidays = props.allHolidays;

        this.answer = Utils.getHolidayAnswerOnDate(this.xDay, this.allHolidays);
    }

    render() {
        const answerBoolean = (this.question === OpenOrClose.Open ? this.answer.open : !this.answer.open);
        const bgColorClass = (this.answer.open ? "green" : "red");

        return (
            <div className={classnames([bgColorClass, "OpenXDay"])} >
                <div className="question">
                    <span>
                        Is Flipkart {this.question} today?
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