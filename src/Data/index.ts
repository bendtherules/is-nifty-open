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
        { "Description": "Republic Day", "Date": parseDateInIndiaTZ("2018-1-26"), "Day": "Friday" },
        { "Description": "Mahashivratri", "Date": parseDateInIndiaTZ("2018-2-13"), "Day": "Tuesday" },
        { "Description": "Holi", "Date": parseDateInIndiaTZ("2018-3-2"), "Day": "Friday" },
        { "Description": "Mahavir Jayanti", "Date": parseDateInIndiaTZ("2018-3-29"), "Day": "Thursday" },
        { "Description": "Good Friday", "Date": parseDateInIndiaTZ("2018-3-30"), "Day": "Friday" },
        { "Description": "Maharashtra Day", "Date": parseDateInIndiaTZ("2018-5-1"), "Day": "Tuesday" },
        { "Description": "Independence Day", "Date": parseDateInIndiaTZ("2018-8-15"), "Day": "Wednesday" },
        { "Description": "Bakri ID", "Date": parseDateInIndiaTZ("2018-8-22"), "Day": "Wednesday" },
        { "Description": "Ganesh Chaturthi", "Date": parseDateInIndiaTZ("2018-9-13"), "Day": "Thursday" },
        { "Description": "Moharram", "Date": parseDateInIndiaTZ("2018-9-20"), "Day": "Thursday" },
        { "Description": "Mahatama Gandhi Jayanti", "Date": parseDateInIndiaTZ("2018-10-2"), "Day": "Tuesday" },
        { "Description": "Dasera", "Date": parseDateInIndiaTZ("2018-10-18"), "Day": "Thursday" },
        { "Description": "Diwali-Laxmi Pujan", "Date": parseDateInIndiaTZ("2018-11-7"), "Day": "Wednesday" },
        { "Description": "Diwali-Balipratipada", "Date": parseDateInIndiaTZ("2018-11-8"), "Day": "Thursday" },
        { "Description": "Gurunanak Jayanti", "Date": parseDateInIndiaTZ("2018-11-23"), "Day": "Friday" },
        { "Description": "Christmas", "Date": parseDateInIndiaTZ("2018-12-25"), "Day": "Tuesday" },
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

export function getWeekendHoliday(date: moment.Moment): Holiday | undefined {
    if (isWeekend(date)) {
        const dateWeekDay = date.isoWeekday();
        return { "Description": "Weekend", "Date": date, "Day": ISOWeekDay[dateWeekDay] };
    } else {
        return undefined;
    }
}