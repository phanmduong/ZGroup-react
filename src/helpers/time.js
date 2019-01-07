import moment from "moment";

export function formatTime(time, format = "llll") {
    return convertTime(time).format(format);
}

/**
 * convert timestamp to moment
 */
export function convertTime(time) {
    return moment.unix(time);
}