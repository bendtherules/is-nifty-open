import * as React from 'react';
import * as moment from 'moment-timezone';
import * as classnames from 'classnames';
import "./Component.css";
import { HolidayList } from '../../Data';
import { Utils, HolidayAnswer } from "../../Utils";

export interface OpenXDayMiniProps {
    xDay: moment.Moment;
    dateDescription: string;
    allHolidays: HolidayList;
}

export class OpenXDayMini extends React.Component<OpenXDayMiniProps, {}> {
    xDay: moment.Moment;
    dateDescription: string;
    allHolidays: HolidayList;

    answer: HolidayAnswer;

    constructor(props: OpenXDayMiniProps) {
        super(props);
        this.xDay = props.xDay;
        this.dateDescription = props.dateDescription;
        this.allHolidays = props.allHolidays;

        this.answer = Utils.getHolidayAnswerOnDate(this.xDay, this.allHolidays);
    }

    render() {
        const textColorClass = (this.answer.open ? "green-text" : "red-text");

        return (
            <div className={"OpenXDayMini"} >
                <div className="OpenXDayMini-inner">
                    <div className={classnames([textColorClass, "openOrCloseText"])}>
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