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
        { "Description": "New year", "Date": parseDateInIndiaTZ("2019-1-01"), "Day": "Tuesday" },
        { "Description": "Republic Day", "Date": parseDateInIndiaTZ("2019-1-26"), "Day": "Saturday" },
        { "Description": "Maha Shivaratri", "Date": parseDateInIndiaTZ("2019-3-04"), "Day": "Monday" },
        { "Description": "Good Friday", "Date": parseDateInIndiaTZ("2019-4-19"), "Day": "Friday" },
        { "Description": "May Day", "Date": parseDateInIndiaTZ("2019-5-1"), "Day": "Wednesday" },
        { "Description": "Khutub-E-Ramzan", "Date": parseDateInIndiaTZ("2019-6-05"), "Day": "Wednesday" },
        { "Description": "Independence Day", "Date": parseDateInIndiaTZ("2019-8-15"), "Day": "Thursday" },
        { "Description": "Varasiddhi Vinayaka Vrata", "Date": parseDateInIndiaTZ("2019-9-02"), "Day": "Monday" },
        { "Description": "Mahatama Gandhi Jayanti", "Date": parseDateInIndiaTZ("2019-10-2"), "Day": "Wednesday" },
        { "Description": "Mahanavami", "Date": parseDateInIndiaTZ("2019-10-07"), "Day": "Monday" },
        { "Description": "Kannada Rayothsava", "Date": parseDateInIndiaTZ("2019-11-01"), "Day": "Friday" },
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
