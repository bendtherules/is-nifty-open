import * as moment from 'moment-timezone';
import * as Linq from 'linq';
import { Holiday, HolidayList, getWeekendHolidayOnDate } from '../Data';

export interface HolidayAnswer {
    open: boolean;
    holiday: Holiday | undefined;
}

export enum OpenOrClose {
    Open = 'open',
    Close = 'closed'
}

export const enum OpenOrCloseOrClosed {
    Open = "open",
    Close = "close",
    Closed = "closed"
}

export const enum DayNames {
    today = "today",
    tomorrow = "tomorrow",
    yesterday = "yesterday",
}

export class Utils {
    static invertOpenOrClose(openOrClose: OpenOrClose) {
        return (openOrClose === OpenOrClose.Open) ? OpenOrClose.Close : OpenOrClose.Open;
    }

    static createTodayDateInIndiaTZ(): moment.Moment {
        return moment.tz(moment.tz.guess()).tz("Asia/Kolkata");
    }

    static createSomeDateInIndiaTZ(dateString: string): moment.Moment {
        return moment.tz(dateString, moment.tz.guess()).tz("Asia/Kolkata");
    }

    static checkSameDayInSameTZ(moment1: moment.Moment, moment2: moment.Moment, raiseErrorTZMismatch: boolean = true) {
        // tslint:disable-next-line:triple-equals
        if (raiseErrorTZMismatch && (moment1.tz() != moment2.tz())) {
            throw new Error("Timezones don't match");
        }

        // tslint:disable-next-line:triple-equals
        return (moment1.clone().startOf("day").format() == moment2.clone().startOf("day").format());
    }

    static checkSameYearInSameTZ(moment1: moment.Moment, moment2: moment.Moment, raiseErrorTZMismatch: boolean = true) {
        // tslint:disable-next-line:triple-equals
        if (raiseErrorTZMismatch && (moment1.tz() != moment2.tz())) {
            throw new Error("Timezones don't match");
        }

        // tslint:disable-next-line:triple-equals
        return (moment1.clone().startOf("year").format() == moment2.clone().startOf("year").format());
    }

    static getHolidayAnswerOnDate(xDay: moment.Moment, allHolidays: HolidayList): HolidayAnswer {
        let tmpHolidayAnswer: HolidayAnswer;

        {
            const eventHoliday = this.getEventHolidayOnDate(xDay, allHolidays);

            if (typeof eventHoliday !== "undefined") {
                tmpHolidayAnswer = { open: false, holiday: eventHoliday };
            } else {
                tmpHolidayAnswer = { open: true, holiday: undefined };
            }
        }

        {
            const weekendHoliday = getWeekendHolidayOnDate(xDay);

            if (typeof weekendHoliday !== "undefined") {
                tmpHolidayAnswer = { open: false, holiday: weekendHoliday };
            }
        }

        return tmpHolidayAnswer;
    }

    static getEventHolidayOnDate(xDay: moment.Moment, allHolidays: HolidayList): Holiday | undefined {
        {
            const matchingHoliday = Linq
                .from<Holiday>(allHolidays)
                .firstOrDefault(
                    (eachHoliday, _tmp) => Utils.checkSameDayInSameTZ(xDay, eachHoliday.Date)
                );

            if (matchingHoliday === null) {
                return undefined;
            } else {
                return matchingHoliday;
            }
        }
    }

    static findNextOpenOrEventCloseFromDate(
        xDay: moment.Moment,
        allHolidays: HolidayList,
        openOrClose: OpenOrClose): moment.Moment | undefined {

        let currentDay = xDay.clone().add(1, "day");

        while (this.checkSameYearInSameTZ(currentDay, xDay)) {
            var eventHolidayOnCurrentDay: boolean = this.getEventHolidayOnDate(currentDay, allHolidays) !== undefined;
            var openOnCurrentDay: boolean = this.getHolidayAnswerOnDate(currentDay, allHolidays).open;

            if ((openOrClose === OpenOrClose.Open) && (openOnCurrentDay)) {
                return currentDay;
            }

            if ((openOrClose === OpenOrClose.Close) && (eventHolidayOnCurrentDay)) {
                return currentDay;
            }

            currentDay = currentDay.add(1, "day");
        }

        return undefined;
    }

    static mapAbsoluteDateToRelativeDayName(xDay: moment.Moment): DayNames | undefined {
        // Redirect to relative if day is within +-1 day of today
        let tmpToday = Utils.createTodayDateInIndiaTZ();
        let tmpTomorrow = tmpToday.clone().add(1, "d");
        let tmpYesterday = tmpToday.clone().subtract(1, "d");

        if (Utils.checkSameDayInSameTZ(xDay, tmpToday)) {

            return DayNames.today;

        } else if (Utils.checkSameDayInSameTZ(xDay, tmpTomorrow)) {

            return DayNames.tomorrow;

        } else if (Utils.checkSameDayInSameTZ(xDay, tmpYesterday)) {

            return DayNames.yesterday;

        } else {

            return undefined;

        }
    }
}