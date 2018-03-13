import * as moment from 'moment-timezone';

export class Utils {
    static createTodayDateInIndiaTZ(): moment.Moment {
        return moment.tz(moment.tz.guess()).tz("Asia/Kolkata");
    }
}