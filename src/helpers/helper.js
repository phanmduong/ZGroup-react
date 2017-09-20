/* eslint-disable no-undef */

import jwt from 'jsonwebtoken';
import * as env from '../constants/env';
import _ from 'lodash';

export function shortenStr(str, length) {
    if (str.length > length) {
        return str.slice(0, length - 3) + "...";
    } else {
        return str;
    }
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isEmptyInput(input) {
    return input === null || input === undefined || input.toString().trim().length <= 0;
}

export function avatarEmpty(input) {
    if (input === null || input === undefined || input.trim() === 'http://' || input.trim() === 'https://') {
        return true;
    }
    return false;
}

export function confirm(type, title, html, success, cancel) {
    //  warning, error, success, info and question
    swal({
        title,
        type,
        html,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "#c50000",
        confirmButtonText:
            'Xác nhận',
        cancelButtonText:
            'Huỷ'
    }).then(function () {
        success();
    }.bind(this), function (dismiss) {
        if (cancel) {
            cancel(dismiss);
        }
    });
}

export function showErrorNotification(message) {
    showNotification(message, "top", "right", "danger");
}

export function showWarningNotification(message) {
    showNotification(message, "top", "right", "warning");
}

export function showNotificationMessage(message, icon, color) {
    showNotification(message, "bottom", "left", "info", icon);
    $(".alert-info.alert-with-icon.animated.fadeInDown:last-child").css("background-color", color);
}

export function showNotification(message, from = "top", align = "right", type = "success", icon = "notifications") {
    // type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    $.notify({
        icon,
        message

    }, {
        type,
        url_target: '_blank',
        timer: 3000,
        placement: {
            from: from,
            align: align
        }
    });
}

export function showTypeNotification(message, type) {
    showNotification(message, 'top', 'right', type);
}

export function encodeToken(data) {
    return jwt.sign({
        data: data
    }, env.SECRET_TOKEN, {expiresIn: env.EXPIRES_IN});
}

export function decodeToken(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, env.SECRET_TOKEN, function (err, decoded) {
            console.log('err' + err);
            console.log(decoded);
            if (err) {
                reject(err);
            }
            resolve(decoded);
        });
    });
}

export function saveDataLoginLocal(data) {
    localStorage.setItem(env.NAME_DATA_LOGIN_SAVE_LOCAL, data);
}

export function removeDataLoginLocal() {
    localStorage.removeItem(env.NAME_DATA_LOGIN_SAVE_LOCAL);
}

export function getTokenLocal() {
    let dataLocal = decodeToken(localStorage.getItem(env.NAME_DATA_LOGIN_SAVE_LOCAL));
    return new Promise(function (resolve, reject) {
        dataLocal.then(function (data) {
            if (data) {
                resolve(data.token);
            }
        }).catch(function () {
            reject(null);
        });
    });
}

export function setFormValidation(id) {
    $(id).validate({
        errorPlacement: function (error, element) {
            $(element).parent('div').addClass('has-error');
        }
    });
}

export function convertMoneyToK(input) {
    let str = String(input);
    if (str.length > 3) return `${str.substr(0, str.length - 3)}K`;
    return input;
}

export function formatPhone(phone) {
    if (phone)
        if (phone.length === 10) {
            return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
        } else {
            return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1.$2.$3');
        }
}


export function updateArrayElement(element, array) {
    return array.map((el) => {
        if (el.id === element) {
            return {
                ...el,
                ...element
            };
        }
        return el;
    });
}

export function getShortName(name) {

    let n = name.trim().split(" ");
    if (n.length > 1)
        return n[n.length - 2] + ' ' + n[n.length - 1];
    return name;
}

export function dotNumber(number) {
    if (number)
        return number.toString().replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return number;
}

export function calculatorRating(ratingNumbers, avgRatings) {
    let sumScore = 0;
    let sum = 0;
    ratingNumbers.forEach(function (value, index) {
        sumScore += value * avgRatings[index];
        sum += value;
    });

    //round 2 decimal
    return Math.round(sumScore * 100 / sum) / 100;
}

export function isClassWait(className) {
    return className.indexOf('.') > -1;
}

export function sweetAlertSuccess(message) {
    swal({
        title: "Thành công",
        text: message,
        type: "success",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-success"
    });
}

export function sweetAlertError(message) {
    swal({
        title: "Thất bại",
        text: message,
        type: "error",
        buttonsStyling: false,
        confirmButtonClass: "btn btn-error"
    });
}

export function intersect(array1, array2) {
    return array1.filter(cardLabel => array2.filter(t => t.id === cardLabel.id).length > 0);
}

export function convertTimeToSecond(time) {
    let a = time.split(':'); // split it at the colons

    if (isEmptyInput(a[2]))
        return (+a[0]) * 60 * 60 + (+a[1]) * 60;

    if (isEmptyInput(a[1]))
        return (+a[0]) * 60 * 60;

    if (isEmptyInput(a[0]))
        return 0;

// minutes are worth 60 seconds. Hours are worth 60 minutes.
    return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
}

export function calculatorAttendanceStaff(check_in_time, check_out_time, start_teaching_time, end_teaching_time) {
    check_in_time = convertTimeToSecond(check_in_time);
    check_out_time = convertTimeToSecond(check_out_time);
    start_teaching_time = convertTimeToSecond(start_teaching_time);
    end_teaching_time = convertTimeToSecond(end_teaching_time);

    let before_teaching_span = convertTimeToSecond("00:15:00");
    let after_teaching_span = convertTimeToSecond("00:15:00");
    let start_time = start_teaching_time - before_teaching_span;
    let end_time = end_teaching_time + after_teaching_span;
    let required_attend_span = end_time - start_time;
    let require_teaching_span = end_teaching_time - start_teaching_time;

    let empty_arrive_span;
    let early_arrive_span;
    let teaching_span;
    let late_arrive_span;
    let early_leave_span;
    let late_leave_span;

    if (check_in_time <= start_time) {

        empty_arrive_span = 0;

        early_arrive_span = (before_teaching_span / required_attend_span) * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {

            teaching_span = (require_teaching_span / required_attend_span) * 100;

            early_leave_span = 0;

            late_leave_span = (after_teaching_span / required_attend_span) * 100;


        }

        else if (check_out_time >= end_teaching_time) {

            teaching_span = (require_teaching_span / required_attend_span) * 100;

            early_leave_span = 0;

            late_leave_span = ((check_out_time - end_teaching_time) / required_attend_span) * 100;

        }

        else {

            teaching_span = ((check_out_time - start_teaching_time) / required_attend_span) * 100;

            early_leave_span = ((end_teaching_time - check_out_time) / required_attend_span) * 100;

            late_leave_span = 0;

        }

    }

    else if (check_in_time <= start_teaching_time) {

        empty_arrive_span = ((check_in_time - start_time) / required_attend_span) * 100;

        early_arrive_span = ((start_teaching_time - check_in_time) / required_attend_span) * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {

            teaching_span = (require_teaching_span / required_attend_span) * 100;

            early_leave_span = 0;

            late_leave_span = (after_teaching_span / required_attend_span) * 100;

        }

        else if (check_out_time >= end_teaching_time) {

            teaching_span = (require_teaching_span / required_attend_span) * 100;

            early_leave_span = 0;

            late_leave_span = ((check_out_time - end_teaching_time) / required_attend_span) * 100;

        }

        else {

            teaching_span = ((check_out_time - start_teaching_time) / required_attend_span) * 100;

            early_leave_span = ((end_teaching_time - check_out_time) / required_attend_span) * 100;

            late_leave_span = 0;

        }

    }

    else {

        empty_arrive_span = (before_teaching_span / required_attend_span) * 100;

        early_arrive_span = 0;

        late_arrive_span = ((check_in_time - start_teaching_time) / required_attend_span) * 100;

        if (check_out_time >= end_time) {

            teaching_span = ((end_teaching_time - check_in_time) / required_attend_span) * 100;

            early_leave_span = 0;

            late_leave_span = (after_teaching_span / required_attend_span) * 100;

        }

        else if (check_out_time >= end_teaching_time) {

            teaching_span = ((end_teaching_time - check_in_time) / required_attend_span) * 100;

            early_leave_span = 0;

            late_leave_span = ((check_out_time - end_teaching_time) / required_attend_span) * 100;


        }

        else {

            teaching_span = ((check_out_time - check_in_time) / required_attend_span) * 100;

            early_leave_span = ((end_teaching_time - check_out_time) / required_attend_span) * 100;

            late_leave_span = 0;

        }
    }

    let data = {
        empty_arrive_span,
        early_arrive_span,
        teaching_span,
        late_arrive_span,
        early_leave_span,
        late_leave_span,
    };
    return data;
}

export function calculatorAttendanceShift(check_in_time, check_out_time, start_shift_time, end_shift_time, most_early_time, most_late_time) {
    check_in_time = convertTimeToSecond(check_in_time);
    check_out_time = convertTimeToSecond(check_out_time);
    start_shift_time = convertTimeToSecond(start_shift_time);
    end_shift_time = convertTimeToSecond(end_shift_time);
    most_early_time = convertTimeToSecond(most_early_time);
    most_late_time = convertTimeToSecond(most_late_time);

    let before_shift_span = convertTimeToSecond("00:05:00");
    let after_shift_span = convertTimeToSecond("00:05:00");
    let start_working_time = most_early_time - before_shift_span;

    let end_working_time = most_late_time + after_shift_span;

    let working_time = end_working_time - start_working_time;
    let start_time = start_shift_time - before_shift_span;
    let end_time = end_shift_time + after_shift_span;
    let require_shift_span = end_shift_time - start_shift_time;

    let empty_arrive_span;
    let early_arrive_span;
    let shift_span;
    let late_arrive_span;
    let early_leave_span;
    let late_leave_span;
    let empty_leave_span;

    let early_span = (start_time - start_working_time) * 100 / working_time;
    let late_span = (end_working_time - end_time) * 100 / working_time;

    if (check_in_time <= start_time) {

        empty_arrive_span = 0;

        early_arrive_span = (before_shift_span / working_time) * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {

            shift_span = (require_shift_span / working_time) * 100;

            early_leave_span = 0;

            late_leave_span = (after_shift_span / working_time) * 100;

            empty_leave_span = 0;

        }

        else if (check_out_time >= end_shift_time) {

            shift_span = (require_shift_span / working_time) * 100;

            early_leave_span = 0;

            late_leave_span = ((check_out_time - end_shift_time) / working_time) * 100;

            empty_leave_span = ((end_time - check_out_time) / working_time) * 100;
        }

        else {

            shift_span = ((check_out_time - start_shift_time) / working_time) * 100;

            early_leave_span = ((end_shift_time - check_out_time) / working_time) * 100;

            late_leave_span = 0;

            empty_leave_span = (after_shift_span / working_time) * 100;

        }

    }

    else if (check_in_time <= start_shift_time) {

        empty_arrive_span = ((check_in_time - start_time) / working_time) * 100;

        early_arrive_span = ((start_shift_time - check_in_time) / working_time) * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {

            shift_span = (require_shift_span / working_time) * 100;

            early_leave_span = 0;

            late_leave_span = (after_shift_span / working_time) * 100;

            empty_leave_span = 0;

        }

        else if (check_out_time >= end_shift_time) {

            shift_span = (require_shift_span / working_time) * 100;

            early_leave_span = 0;

            late_leave_span = ((check_out_time - end_shift_time) / working_time) * 100;

            empty_leave_span = ((end_time - check_out_time) / working_time) * 100;
        }

        else {

            shift_span = ((check_out_time - start_shift_time) / working_time) * 100;

            early_leave_span = ((end_shift_time - check_out_time) / working_time) * 100;

            late_leave_span = 0;

            empty_leave_span = (after_shift_span / working_time) * 100;

        }

    }

    else {

        empty_arrive_span = (before_shift_span / working_time) * 100;

        early_arrive_span = 0;

        late_arrive_span = ((check_in_time - start_shift_time) / working_time) * 100;

        if (check_out_time >= end_time) {

            shift_span = ((end_shift_time - check_in_time) / working_time) * 100;

            early_leave_span = 0;

            late_leave_span = (after_shift_span / working_time) * 100;

            empty_leave_span = 0;

        }

        else if (check_out_time >= end_shift_time) {

            shift_span = ((end_shift_time - check_in_time) / working_time) * 100;

            early_leave_span = 0;

            late_leave_span = ((check_out_time - end_shift_time) / working_time) * 100;

            empty_leave_span = ((end_time - check_out_time) / working_time) * 100;

        }

        else {

            shift_span = ((check_out_time - check_in_time) / working_time) * 100;

            early_leave_span = ((end_shift_time - check_out_time) / working_time) * 100;

            late_leave_span = 0;

            empty_leave_span = (after_shift_span / working_time) * 100;
        }
    }

    let data = {
        early_span,
        late_span,
        empty_arrive_span,
        early_arrive_span,
        shift_span,
        late_arrive_span,
        early_leave_span,
        late_leave_span,
        empty_leave_span
    };
    return data;
}

export function groupBy(collection, iteratee, props) {
    return _.chain(collection)
        .groupBy(iteratee)
        .toPairs()
        .map(function (currentItem) {
            return _.zipObject(props, currentItem);
        })
        .value();
}

export function createFileUrl(file) {
    return `<div><a class="text-rose comment-card-url" target="_blank" href="${file.url}">${file.name}</a></div>`;
}