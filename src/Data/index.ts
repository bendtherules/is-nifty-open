import * as Moment from 'moment';

export interface Holiday {
    Description: string;
    Date: Moment.Moment;
    // Use it later, if needed
    Day: string;
}

export type HolidayList = Array<Holiday>;

export const allHolidays: HolidayList =
    [
        { "Description": "Republic Day", "Date": Moment("2018-1-26"), "Day": "Friday" },
        { "Description": "Mahashivratri", "Date": Moment("2018-2-13"), "Day": "Tuesday" },
        { "Description": "Holi", "Date": Moment("2018-3-2"), "Day": "Friday" },
        { "Description": "Mahavir Jayanti", "Date": Moment("2018-3-29"), "Day": "Thursday" },
        { "Description": "Good Friday", "Date": Moment("2018-3-30"), "Day": "Friday" },
        { "Description": "Maharashtra Day", "Date": Moment("2018-5-1"), "Day": "Tuesday" },
        { "Description": "Independence Day", "Date": Moment("2018-8-15"), "Day": "Wednesday" },
        { "Description": "Bakri ID", "Date": Moment("2018-8-22"), "Day": "Wednesday" },
        { "Description": "Ganesh Chaturthi", "Date": Moment("2018-9-13"), "Day": "Thursday" },
        { "Description": "Moharram", "Date": Moment("2018-9-20"), "Day": "Thursday" },
        { "Description": "Mahatama Gandhi Jayanti", "Date": Moment("2018-10-2"), "Day": "Tuesday" },
        { "Description": "Dasera", "Date": Moment("2018-10-18"), "Day": "Thursday" },
        { "Description": "Diwali-Laxmi Pujan", "Date": Moment("2018-11-7"), "Day": "Wednesday" },
        { "Description": "Diwali-Balipratipada", "Date": Moment("2018-11-8"), "Day": "Thursday" },
        { "Description": "Gurunanak Jayanti", "Date": Moment("2018-11-23"), "Day": "Friday" },
        { "Description": "Christmas", "Date": Moment("2018-12-25"), "Day": "Tuesday" },
    ];

export enum ISOWeekDay {
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7
}

export function isWeekend(date: Moment.Moment): boolean {
    const dateWeekDay = date.isoWeekday();
    if ((dateWeekDay === ISOWeekDay.Saturday) ||
        (dateWeekDay === ISOWeekDay.Sunday)) {
        return true;
    } else {
        return false;
    }
}

export function getWeekendHoliday(date: Moment.Moment): Holiday | undefined {
    if (isWeekend(date)) {
        const dateWeekDay = date.isoWeekday();
        return { "Description": "Weekend", "Date": date, "Day": ISOWeekDay[dateWeekDay] };
    } else {
        return undefined;
    }
}