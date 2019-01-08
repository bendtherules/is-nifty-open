import * as moment from 'moment-timezone';

export interface Holiday {
    Description: string;
    Date: moment.Moment;
    // Use it later, if needed
    Day: string;
}

export type HolidayList = Array<Holiday>;

export const allHolidays: HolidayList =
    [
        { "Description": "Mahashivratri", "Date": parseDateInIndiaTZ("2019-3-04"), "Day": "Monday" },
        { "Description": "Holi", "Date": parseDateInIndiaTZ("2019-3-21"), "Day": "Thursday" },
        { "Description": "Mahavir Jayanti", "Date": parseDateInIndiaTZ("2019-4-17"), "Day": "Wednesday" },
        { "Description": "Good Friday", "Date": parseDateInIndiaTZ("2019-4-19"), "Day": "Friday" },
        { "Description": "Maharashtra Day", "Date": parseDateInIndiaTZ("2019-5-1"), "Day": "Wednesday" },
        { "Description": "Id-Ul-Fitar (Ramzan ID)", "Date": parseDateInIndiaTZ("2019-6-05"), "Day": "Wednesday" },
        { "Description": "Bakri ID", "Date": parseDateInIndiaTZ("2019-8-12"), "Day": "Monday" },
        { "Description": "Independence Day", "Date": parseDateInIndiaTZ("2019-8-15"), "Day": "Thursday" },
        { "Description": "Ganesh Chaturthi", "Date": parseDateInIndiaTZ("2019-9-02"), "Day": "Monday" },
        { "Description": "Moharram", "Date": parseDateInIndiaTZ("2019-9-10"), "Day": "Tuesday" },
        { "Description": "Mahatama Gandhi Jayanti", "Date": parseDateInIndiaTZ("2019-10-2"), "Day": "Wednesday" },
        { "Description": "Dasera", "Date": parseDateInIndiaTZ("2019-10-08"), "Day": "Tuesday" },
        { "Description": "Diwali-Balipratipada", "Date": parseDateInIndiaTZ("2019-10-28"), "Day": "Monday" },
        { "Description": "Gurunanak Jayanti", "Date": parseDateInIndiaTZ("2019-11-12"), "Day": "Tuesday" },
        { "Description": "Christmas", "Date": parseDateInIndiaTZ("2019-12-25"), "Day": "Wednesday" },
    ];

function parseDateInIndiaTZ(dateString: string): moment.Moment {
    return moment.tz(dateString, "YYYY-MM-DD", "Asia/Kolkata");
}

export enum ISOWeekDay {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7
}

export function isWeekend(date: moment.Moment): boolean {
    const dateWeekDay = date.isoWeekday();
    if ((dateWeekDay === ISOWeekDay.Saturday) ||
        (dateWeekDay === ISOWeekDay.Sunday)) {
        return true;
    } else {
        return false;
    }
}

export function getWeekendHolidayOnDate(date: moment.Moment): Holiday | undefined {
    if (isWeekend(date)) {
        const dateWeekDay = date.isoWeekday();
        return { "Description": "Weekend", "Date": date, "Day": ISOWeekDay[dateWeekDay] };
    } else {
        return undefined;
    }
}
