import * as React from 'react';
import { Holiday } from '../../Data/index';

type ObjectWithHoliday = { holiday: Holiday };

export class ClosedReason extends React.Component<ObjectWithHoliday, {}> {
    holiday: Holiday;

    constructor(props: ObjectWithHoliday) {
        super(props);
        this.holiday = props.holiday;
    }

    render() {
        return (
            <div className="answerReason">
                <div className="holidayPrefixText">
                    Closed due to
                        </div>
                <div className="holidayName">
                    {this.holiday.Description}
                </div>
            </div>
        );
    }
}