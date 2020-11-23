/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import * as env from '../constants/env';
import _ from 'lodash';
import moment from 'moment';
import XLSX from 'xlsx';
import * as  FILE_SAVER from 'file-saver';
import {CIRCLE_PICKER_COLORS, DATE_FORMAT_SQL, PHONE_HEAD_3, PHONE_HEAD_4} from '../constants/constants';
import {isEmpty} from "./entity/mobx";

/*eslint no-console: 0 */
export function shortenStr(str, length) {
    if (!isEmptyInput(str) && str.length > length) {
        return str.slice(0, length - 3) + '...';
    } else {
        return str;
    }
}

export function checkFileSize(file, sizeMB) {
    let sizeBytes = sizeMB * 1024 * 1024;
    if (file.size > sizeBytes) {
        showWarningNotification('Vui lòng chọn file có kích thước nhỏ hơn ' + sizeMB + ' MB.');
        return false;
    }
    return true;
}

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function isEmptyInput(input) {
    return input === null || input === undefined || input.toString().trim().length <= 0;
}

export function avatarEmpty(input) {
    if (isEmptyInput(input) || input.trim() === 'http://' || input.trim() === 'https://') {
        return true;
    }
    return false;
}

export function checkThirdPartyImageUrl(url) {
    if (isEmptyInput(url) || (url && url instanceof String)) return false;
    return url.indexOf('google') > 0;
}

export function confirm(type, title, html, success, cancel) {
    //  warning, error, success, info and question
    swal({
        title,
        type,
        html,
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#c50000',
        confirmButtonText: 'Xác nhận',
        cancelButtonText: 'Huỷ'
    }).then(
        function () {
            success();
        }.bind(this),
        function (dismiss) {
            if (cancel) {
                cancel(dismiss);
            }
        }
    );
}

export function showErrorMessage(title, html) {
    //  warning, error, success, info and question
    swal({
        title,
        error: 'warning',
        html,
        showCloseButton: true,
        // showCancelButton: true,
        confirmButtonColor: '#c50000',
        cancelButtonText: 'Huỷ'
    }).then(
        function () {
            // success();
        }.bind(this),
        function () {
            // if (cancel) {
            // cancel(dismiss);
            // }
        }
    );
}

export function showErrorNotification(message) {
    showNotification(message, 'top', 'right', 'danger');
}

export function showWarningNotification(message) {
    showNotification(message, 'top', 'right', 'warning');
}

export function showNotificationMessage(message, icon, color) {
    showNotification(message, 'bottom', 'left', 'info', icon);
    $('.alert-info.alert-with-icon.animated.fadeInDown:last-child').css('background-color', color);
}

export function showNotification(
    message,
    from = 'top',
    align = 'right',
    type = 'success',
    icon = 'notifications'
) {
    // type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    $.notify(
        {
            icon,
            message
        },
        {
            type,
            url_target: '_blank',
            timer: 3000,
            placement: {
                from: from,
                align: align
            }
        }
    );
}

export function showTypeNotification(message, type) {
    showNotification(message, 'top', 'right', type);
}

export function encodeToken(data) {
    return jwt.sign(
        {
            data: data
        },
        env.SECRET_TOKEN,
        {expiresIn: env.EXPIRES_IN}
    );
}

export function decodeToken(token) {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, env.SECRET_TOKEN, function (err, decoded) {
            console.log('err: ' + err);
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
        dataLocal
            .then(function (data) {
                if (data) {
                    resolve(data.token);
                }
            })
            .catch(function () {
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
    if (isEmptyInput(name)) return null;
    let n = name.trim().split(' ');
    if (n.length > 1) return n[n.length - 2] + ' ' + n[n.length - 1];
    return name;
}

export function dotNumber(number) {
    if (!isFinite(number)) return '0';
    if (number == 0) return '0';
    if (isEmptyInput(number)) return 0;
    if (number) return number.toString().replace(/\./g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

export function round2(first, second) {
    return Math.round(first * 100 / second) / 100;
}

export function isClassWait(type) {
    return type == 'waiting';
}

export function sweetAlertSuccess(message, success) {
    swal({
        title: 'Thành công',
        text: message,
        type: 'success',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-success'
    }).then(
        () => {
            if (success) {
                success();
            }
        });
}

export function sweetAlertWaring(message) {
    swal({
        title: 'Thông báo',
        text: message,
        type: 'warning',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-warning'
    });
}

export function sweetAlertError(message) {
    swal({
        title: 'Thất bại',
        text: message,
        type: 'error',
        buttonsStyling: false,
        confirmButtonClass: 'btn btn-error'
    });
}

export function intersect(array1, array2) {
    return array1.filter((cardLabel) => array2.filter((t) => t.id === cardLabel.id).length > 0);
}

export function convertTimeToSecond(time) {
    let a = time.split(':'); // split it at the colons

    if (isEmptyInput(a[2])) return +a[0] * 60 * 60 + +a[1] * 60;

    if (isEmptyInput(a[1])) return +a[0] * 60 * 60;

    if (isEmptyInput(a[0])) return 0;

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    return +a[0] * 60 * 60 + +a[1] * 60 + +a[2];
}

export function xoa_dau(str = '') {
    if (isEmptyInput(str)) return str;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

export function calculatorAttendanceStaff(
    check_in_time,
    check_out_time,
    start_teaching_time,
    end_teaching_time
) {
    check_in_time = convertTimeToSecond(check_in_time);
    check_out_time = convertTimeToSecond(check_out_time);
    start_teaching_time = convertTimeToSecond(start_teaching_time);
    end_teaching_time = convertTimeToSecond(end_teaching_time);

    let before_teaching_span = convertTimeToSecond('00:15:00');
    let after_teaching_span = convertTimeToSecond('00:15:00');
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

        early_arrive_span = before_teaching_span / required_attend_span * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {
            teaching_span = require_teaching_span / required_attend_span * 100;

            early_leave_span = 0;

            late_leave_span = after_teaching_span / required_attend_span * 100;
        } else if (check_out_time >= end_teaching_time) {
            teaching_span = require_teaching_span / required_attend_span * 100;

            early_leave_span = 0;

            late_leave_span = (check_out_time - end_teaching_time) / required_attend_span * 100;
        } else {
            teaching_span = (check_out_time - start_teaching_time) / required_attend_span * 100;

            early_leave_span = (end_teaching_time - check_out_time) / required_attend_span * 100;

            late_leave_span = 0;
        }
    } else if (check_in_time <= start_teaching_time) {
        empty_arrive_span = (check_in_time - start_time) / required_attend_span * 100;

        early_arrive_span = (start_teaching_time - check_in_time) / required_attend_span * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {
            teaching_span = require_teaching_span / required_attend_span * 100;

            early_leave_span = 0;

            late_leave_span = after_teaching_span / required_attend_span * 100;
        } else if (check_out_time >= end_teaching_time) {
            teaching_span = require_teaching_span / required_attend_span * 100;

            early_leave_span = 0;

            late_leave_span = (check_out_time - end_teaching_time) / required_attend_span * 100;
        } else {
            teaching_span = (check_out_time - start_teaching_time) / required_attend_span * 100;

            early_leave_span = (end_teaching_time - check_out_time) / required_attend_span * 100;

            late_leave_span = 0;
        }
    } else {
        empty_arrive_span = before_teaching_span / required_attend_span * 100;

        early_arrive_span = 0;

        late_arrive_span = (check_in_time - start_teaching_time) / required_attend_span * 100;

        if (check_out_time >= end_time) {
            teaching_span = (end_teaching_time - check_in_time) / required_attend_span * 100;

            early_leave_span = 0;

            late_leave_span = after_teaching_span / required_attend_span * 100;
        } else if (check_out_time >= end_teaching_time) {
            teaching_span = (end_teaching_time - check_in_time) / required_attend_span * 100;

            early_leave_span = 0;

            late_leave_span = (check_out_time - end_teaching_time) / required_attend_span * 100;
        } else {
            teaching_span = (check_out_time - check_in_time) / required_attend_span * 100;

            early_leave_span = (end_teaching_time - check_out_time) / required_attend_span * 100;

            late_leave_span = 0;
        }
    }

    let data = {
        empty_arrive_span,
        early_arrive_span,
        teaching_span,
        late_arrive_span,
        early_leave_span,
        late_leave_span
    };
    return data;
}

export function calculatorAttendanceShift(
    check_in_time,
    check_out_time,
    start_shift_time,
    end_shift_time,
    most_early_time,
    most_late_time
) {
    check_in_time = convertTimeToSecond(check_in_time);
    check_out_time = convertTimeToSecond(check_out_time);
    start_shift_time = convertTimeToSecond(start_shift_time);
    end_shift_time = convertTimeToSecond(end_shift_time);
    most_early_time = convertTimeToSecond(most_early_time);
    most_late_time = convertTimeToSecond(most_late_time);

    let before_shift_span = convertTimeToSecond('00:05:00');
    let after_shift_span = convertTimeToSecond('00:05:00');
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

        early_arrive_span = before_shift_span / working_time * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {
            shift_span = require_shift_span / working_time * 100;

            early_leave_span = 0;

            late_leave_span = after_shift_span / working_time * 100;

            empty_leave_span = 0;
        } else if (check_out_time >= end_shift_time) {
            shift_span = require_shift_span / working_time * 100;

            early_leave_span = 0;

            late_leave_span = (check_out_time - end_shift_time) / working_time * 100;

            empty_leave_span = (end_time - check_out_time) / working_time * 100;
        } else {
            shift_span = (check_out_time - start_shift_time) / working_time * 100;

            early_leave_span = (end_shift_time - check_out_time) / working_time * 100;

            late_leave_span = 0;

            empty_leave_span = after_shift_span / working_time * 100;
        }
    } else if (check_in_time <= start_shift_time) {
        empty_arrive_span = (check_in_time - start_time) / working_time * 100;

        early_arrive_span = (start_shift_time - check_in_time) / working_time * 100;

        late_arrive_span = 0;

        if (check_out_time >= end_time) {
            shift_span = require_shift_span / working_time * 100;

            early_leave_span = 0;

            late_leave_span = after_shift_span / working_time * 100;

            empty_leave_span = 0;
        } else if (check_out_time >= end_shift_time) {
            shift_span = require_shift_span / working_time * 100;

            early_leave_span = 0;

            late_leave_span = (check_out_time - end_shift_time) / working_time * 100;

            empty_leave_span = (end_time - check_out_time) / working_time * 100;
        } else {
            shift_span = (check_out_time - start_shift_time) / working_time * 100;

            early_leave_span = (end_shift_time - check_out_time) / working_time * 100;

            late_leave_span = 0;

            empty_leave_span = after_shift_span / working_time * 100;
        }
    } else {
        empty_arrive_span = before_shift_span / working_time * 100;

        early_arrive_span = 0;
        late_arrive_span = (check_in_time - start_shift_time) / working_time * 100;

        if (check_out_time >= end_time) {
            early_leave_span = 0;

            late_leave_span = (check_out_time - end_shift_time) / working_time * 100;

            empty_leave_span = (end_time - check_out_time) / working_time * 100;
        } else {
            shift_span = (check_out_time - check_in_time) / working_time * 100;

            late_arrive_span = (check_in_time - start_shift_time) / working_time * 100;

            if (check_out_time >= end_time) {
                shift_span = (end_shift_time - check_in_time) / working_time * 100;

                early_leave_span = 0;

                late_leave_span = after_shift_span / working_time * 100;

                empty_leave_span = 0;
            } else if (check_out_time >= end_shift_time) {
                shift_span = (end_shift_time - check_in_time) / working_time * 100;

                early_leave_span = (end_shift_time - check_out_time) / working_time * 100;

                late_leave_span = 0;

                empty_leave_span = after_shift_span / working_time * 100;
            }
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

/*eslint-disable */
export function iOS() {
    var iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];

    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
                return true;
            }
        }
    }

    return false;
}

/* eslint-enable */

export function initMaterial() {
    2;
    // init sidebar material
    /* eslint-disable */

    try {
        //init scroll
        if (isWindows && !$('body').hasClass('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }

        if (typeof md !== 'undefined') {
            mobile_menu_visible = 0;
            toggle_initialized = false;
            $toggle.click(function () {
                if (mobile_menu_visible == 1) {
                    $('html').removeClass('nav-open');

                    $('.close-layer').remove();
                    setTimeout(function () {
                        $toggle.removeClass('toggled');
                    }, 400);

                    mobile_menu_visible = 0;
                } else {
                    setTimeout(function () {
                        $toggle.addClass('toggled');
                    }, 430);

                    main_panel_height = $('.main-panel')[0].scrollHeight;
                    $layer = $('<div class="close-layer"></div>');
                    $layer.css('height', main_panel_height + 'px');
                    $layer.appendTo('.main-panel');

                    setTimeout(function () {
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function () {
                        $('html').removeClass('nav-open');
                        mobile_menu_visible = 0;

                        $layer.removeClass('visible');

                        setTimeout(function () {
                            $layer.remove();
                            $toggle.removeClass('toggled');
                        }, 400);
                    });

                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;
                }
            });

            md.initRightMenu();
        }
        $(window).resize(function () {
            md.initSidebarsCheck();

            // reset the seq for charts drawing animations
            seq = seq2 = 0;
        });
    } catch (err) {
    }
    /* eslint-enable */
}

export function closeSidebar() {
    /* eslint-disable */
    try {
        if (typeof md !== 'undefined') {
            $('html').removeClass('nav-open');

            $('.close-layer').remove();
            setTimeout(function () {
                if (typeof $toggle !== 'undefined') {
                    $toggle.removeClass('toggled');
                }
            }, 400);

            mobile_menu_visible = 0;
        }
    } catch (err) {
    }
    /* eslint-enable */
}

export function onesignalSetUserId(userId) {
    /* eslint-disable */
    if (window.OneSignal) {
        window.OneSignal.sendTag('user_id', userId, function (tagsSent) {
            console.log('tag ok ', tagsSent);
        });
    }
    /* eslint-enable */
}

export function getHoursTime(time) {
    let a = time.split(':');

    return Number(a[0]);
}

export function sumTimeShiftOfWeek(shiftRegistersWeek, userId) {
    let sum = 0;

    shiftRegistersWeek.dates.map(function (date) {
        date.shifts.map(function (shift) {
            if (shift.user && shift.user.id === userId) {
                sum += convertTimeToSecond(shift.end_time) - convertTimeToSecond(shift.start_time);
            }
        });
    });

    return convertSecondToTime(sum);
}

export function sumTimeWorkShiftOfWeek(shiftRegistersWeek, userId) {
    let sum = 0;

    shiftRegistersWeek.dates.map(function (date) {
        date.shifts.map(function (shift) {
            let user = shift.users.filter((user) => user.id === userId)[0];
            if (user) {
                sum += convertTimeToSecond(shift.end_time) - convertTimeToSecond(shift.start_time);
            }
        });
    });

    return convertSecondToTime(sum);
}

export function convertSecondToTime(timeSecond) {
    let second = addZeroTime(timeSecond % 60);

    timeSecond /= 60;

    let minutes = addZeroTime(timeSecond % 60);

    timeSecond /= 60;

    let hours = addZeroTime(timeSecond);

    if (hours != 0) {
        return '' + hours + ':' + minutes + ':' + second;
    } else {
        return minutes + ':' + second;
    }
}

function addZeroTime(time) {
    if (time === 0) {
        return '00';
    }

    if (time < 10) return '0' + time;

    return time;
}

export function formatTime(time, formatBefore, formatAtfer) {
    let timeIsValid = moment(time, formatBefore).isValid();
    return timeIsValid ? moment(time, formatBefore).format(formatAtfer) : null;
}

export function generateDatatableLanguage(item) {
    return {
        lengthMenu: `Hiển thị _MENU_ ${item} trên 1 trang`,
        zeroRecords: 'Không có kết quả nào phù hợp',
        processing: 'Đang xử lý...',
        info: 'Hiển trị trang _PAGE_ trên tổng số _PAGES_ trang',
        infoEmpty: 'Không có dữ liệu',
        infoFiltered: `(lọc từ _MAX_ ${item})`,
        search: 'Tìm kiếm: ',
        paginate: {
            first: 'đầu',
            last: 'cuối',
            next: 'tiếp',
            previous: 'trước'
        },
        emptyTable: `Không có ${item} sản phẩm`
    };
}

export function transformToTree(arr, nameParent, nameChildren) {
    let nodes = {};
    arr = arr.map((item) => {
        return {...item};
    });
    return arr.filter(function (obj) {
        let id = obj[nameParent],
            parentId = obj[nameChildren];

        nodes[id] = _.defaults(obj, nodes[id], {children: []});
        parentId && (nodes[parentId] = nodes[parentId] || {children: []})['children'].push(obj);

        return !parentId;
    });
}

export function changeToSlug(title) {
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    // eslint-disable-next-line
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, '-');
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng

    // eslint-disable-next-line
    slug = slug.replace(/\-\-\-\-\-/gi, '-');

    // eslint-disable-next-line
    slug = slug.replace(/\-\-\-\-/gi, '-');

    // eslint-disable-next-line
    slug = slug.replace(/\-\-\-/gi, '-');

    // eslint-disable-next-line
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';

    // eslint-disable-next-line
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    //In slug ra textbox có id “slug”
    return slug;
}

export function changeToSlugSpace(title) {
    let slug = title;

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    // eslint-disable-next-line

    return slug;
}

function get_header_row(sheet) {
    let headers = [];
    if (!sheet['!ref']) {
        showErrorNotification("File lỗi. Hệ thống không lấy được tên cột");
        return null;
    }
    let range = XLSX.utils.decode_range(sheet['!ref']);
    let C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
        let cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]; /* find the cell in the first row */

        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}

export function readExcel(file, isSkipReadFile, ignoreHeader = true) {
    let promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type: 'binary'});
            /* Get first worksheet */
            const wsname = wb.SheetNames.filter((sheetname) => wb.Sheets[sheetname]['!ref'])[0];
            const ws = wb.Sheets[wsname];


            if (isSkipReadFile) {
                let range = XLSX.utils.decode_range(ws['!ref']);
                range.s.r = 1; // <-- zero-indexed, so setting to 1 will skip row 0
                ws['!ref'] = XLSX.utils.encode_range(range);
            }
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, {header: ignoreHeader});

            const header = get_header_row(ws);
            if (!header) resolve(data);
            if (ignoreHeader) {
                resolve(data);
            } else {
                resolve({rows: data, header: header});
            }

        };
        reader.readAsBinaryString(file);
    });

    return promise;
}

export function splitComma(value) {
    return value.split(',').join(', ');
}

function sheetToArrayBit(s) {
    if (typeof ArrayBuffer !== 'undefined') {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    } else {
        let buf = new Array(s.length);
        for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
    }
}

function exportTable(tableid, type) {
    let wb = XLSX.utils.table_to_book(document.getElementById(tableid), {sheet: 'Sheet JS'});
    let wbout = XLSX.write(wb, {bookType: type, bookSST: true, type: 'binary'});
    let fname = 'test.' + type;
    try {
        FILE_SAVER.saveAs(new Blob([sheetToArrayBit(wbout)], {type: 'application/octet-stream'}), fname);
    } catch (e) {
        if (typeof console != 'undefined') console.log(e, wbout);
    }
    return wbout;
}

export function exportTableToExcel(tableid, type) {
    return exportTable(tableid, type || 'xlsx');
}

export function newWorkBook() {
    return XLSX.utils.book_new();
}

export function appendArrayToWorkBook(json, wb, sheetname, cols, cmts, merges) {
    let sheet = XLSX.utils.aoa_to_sheet(json);
    if (cols) sheet['!cols'] = cols;
    if (cmts) {
        cmts.forEach((item) => {
            XLSX.utils.cell_add_comment(sheet[item.cell], item.note, '');
        });
    }
    if (merges) sheet['!merges'] = merges;

    XLSX.utils.book_append_sheet(wb, sheet, sheetname);
    return wb;
}

export function appendJsonToWorkBook(json, wb, sheetname, cols=[], cmts=[], merges=[]) {
    let sheet = XLSX.utils.json_to_sheet(json);
    if (cols) sheet['!cols'] = cols;
    if (cmts) {
        cmts.forEach((item) => {
            XLSX.utils.cell_add_comment(sheet[item.cell], item.note, '');
        });
    }
    if (merges) sheet['!merges'] = merges;
    XLSX.utils.book_append_sheet(wb, sheet, sheetname);
    return wb;
}

export function saveWorkBookToExcel(wb, filename, bookType = "xlsx") {
    let wbout = XLSX.write(wb, {bookType: bookType, bookSST: true, type: 'binary'});
    let fname = (filename ? filename : 'datasheet') + '.' + bookType;
    try {
        FILE_SAVER.saveAs(new Blob([sheetToArrayBit(wbout)], {type: 'application/octet-stream'}), fname);
    } catch (e) {
        if (typeof console != 'undefined') console.log(e, wbout);
    }
}

export function saveContentToFile(content, filename) {
    try {
        FILE_SAVER.saveAs(new Blob([content], {type: "image/svg+xml;charset=utf-8"}), filename);
    } catch (e) {
        if (typeof console != 'undefined') console.log(e, content);
    }
}

export function renderExcelColumnArray(arr) {
    return arr.map((obj) => {
        return {wch: obj};
    });
}

export function superSortCategories(categories) {
    categories.reverse();
    let result = [];
    let index = -1,
        id = 0,
        gen = 0;
    let medium = superFilter(id, categories, gen);
    result.splice(index + 1, 0, ...medium);
    for (let j = 0; j < categories.length; j++) {
        let tmp = medium[j];
        if (tmp) {
            index = result.indexOf(tmp);
            gen = tmp.gen;
            let a = superFilter(tmp.id, categories, gen);
            result.splice(index + 1, 0, ...a);
            medium = [...medium, ...a];
        }
    }
    return result;
}

export function superFilter(id, inter, gen) {
    let first = '';
    for (let j = 0; j < gen; j++) first += '--';
    let res = inter.filter((children) => children.parent_id === id);
    const newArr = res.map((children) => {
        return {
            ...children,
            ...{
                gen: gen + 1,
                label: first + children.name
            }
        };
    });
    return newArr;
}

export function childrenBeginAddChild(properties, price) {
    const combineTwoArr = (children_support, value, id) => {
        let children = [];
        children_support.forEach((child) => {
            value.forEach((val) => {
                children.push({
                    id: null,
                    child_images_url: '[]',
                    check: false,
                    price: price,
                    barcode: '',
                    properties: [
                        ...child.properties,
                        {
                            property_item_id: id,
                            value: val.value
                        }
                    ]
                });
            });
        });
        return children;
    };
    let children = [];
    let children_support = [
        {
            id: null,
            child_images_url: '',
            check: false,
            price: price,
            barcode: '',
            properties: []
        }
    ];
    properties.forEach((pro) => {
        children = combineTwoArr(children_support, pro.value, pro.property_item_id);
        children_support = children;
    });
    return children;
}

export function isNull(data) {
    return data === null || data === undefined;
}

export function compareTwoChildren(child1, child2) {
    const propertyNotIn = (property) => {
        let check = true;
        child2.properties.forEach((pro) => {
            if (property.property_item_id === pro.property_item_id && property.value === pro.value) {
                check = false;
            }
        });
        return check;
    };
    let same = true;
    if (child1.properties.length === child2.properties.length) {
        child1.properties.forEach((property) => {
            if (propertyNotIn(property)) same = false;
        });
    } else {
        same = false;
    }
    return same;
}

export function childNotLoaded(child, children_loaded) {
    let check = true;
    children_loaded.forEach((child_loaded) => {
        if (compareTwoChildren(child_loaded, child)) check = false;
    });
    return check;
}

export function childrenLoadedEditSuccess(property_list, children_loaded) {
    let children_from_property_list = childrenBeginAddChild(property_list);
    let children_not_loaded = children_from_property_list.filter((child) =>
        childNotLoaded(child, children_loaded)
    );
    return [...children_loaded, ...children_not_loaded];
}

export function convertDataDetailTeacher(data, filter) {
    let result = [];
    let merges = [];
    let index = 0;
    let i = 1;
    let j = 1;
    let jj = 1;
    data.map((item) => {
        let attendances = filter
            ? item.attendances.filter((itemFilter) => itemFilter[filter])
            : item.attendances;
        if (attendances && attendances.length > 0) {
            index++;
            let attendanceBefore = attendances[0];
            attendances.map(function (attendance) {
                i++;
                if (attendance.class_name !== attendanceBefore.class_name) {
                    merges.push({s: {r: jj, c: 3}, e: {r: i - 2, c: 3}});
                    jj = i - 1;
                    attendanceBefore = attendance;
                }
                result.push({
                    STT: index,
                    'Họ và tên': attendance.user.name,
                    Ngày: attendance.time,
                    Lớp: attendance.class_name,
                    'Thời gian': attendance.start_time + ' - ' + attendance.end_time,
                    'Checkin lúc': attendance.check_in ? attendance.check_in.created_at : '',
                    'Checkout lúc': attendance.check_out ? attendance.check_out.created_at : '',
                    'Lỗi vi phạm': attendance.message
                });
            });
            merges.push({s: {r: j, c: 1}, e: {r: i - 1, c: 1}});
            merges.push({s: {r: jj, c: 3}, e: {r: i - 1, c: 3}});
            merges.push({s: {r: j, c: 0}, e: {r: i - 1, c: 0}});
            j = i;
            jj = i;
        }
    });
    if (result && result.length > 0) {
        return {
            data: result,
            merges: merges
        };
    } else {
        return {
            data: [
                {
                    STT: '',
                    'Họ và tên': '',
                    Ngày: '',
                    Lớp: '',
                    'Thời gian': '',
                    'Checkin lúc': '',
                    'Checkout lúc': '',
                    'Lỗi vi phạm': ''
                }
            ],
            merges: merges
        };
    }
}

export function convertDataDetailSalesMarketing(data, filter) {
    let result = [];
    let merges = [];
    let index = 0;
    let i = 1;
    let j = 1;
    data.map((item) => {
        let attendances = filter
            ? item.attendances.filter((itemFilter) => itemFilter[filter])
            : item.attendances;
        if (attendances && attendances.length > 0) {
            index++;
            attendances.map(function (attendance) {
                i++;
                result.push({
                    STT: index,
                    'Họ và tên': attendance.user.name,
                    Ngày: attendance.date,
                    Ca: attendance.name + `: ${attendance.start_time} - ${attendance.end_time}`,
                    Tuần: attendance.start_time + ' - ' + attendance.end_time,
                    'Checkin lúc': attendance.check_in ? attendance.check_in.created_at : '',
                    'Checkout lúc': attendance.check_out ? attendance.check_out.created_at : '',
                    'Lỗi vi phạm': attendance.message
                });
            });
            merges.push({s: {r: j, c: 1}, e: {r: i - 1, c: 1}});
            merges.push({s: {r: j, c: 0}, e: {r: i - 1, c: 0}});
            j = i;
        }
    });
    if (result && result.length > 0) {
        return {
            data: result,
            merges: merges
        };
    } else {
        return {
            data: [
                {
                    STT: '',
                    'Họ và tên': '',
                    Ngày: '',
                    Ca: '',
                    Tuần: '',
                    'Checkin lúc': '',
                    'Checkout lúc': '',
                    'Lỗi vi phạm': ''
                }
            ],
            merges: merges
        };
    }
}

export function convertDataGeneral(data) {
    return data && data.length > 0
        ? data.map((item, index) => {
            let staff = item.attendances[0].user;
            return {
                STT: index + 1,
                'Họ và tên': staff.name,
                'Đi làm': item.total_attendance,
                'Đúng luật': item.total_lawful,
                'Bỏ làm': item.total_not_work,
                'Checkin muộn': item.total_checkin_late,
                'Checkout sớm': item.total_checkout_early,
                'Không checkin': item.total_not_checkin,
                'Không checkout': item.total_not_checkout
            };
        })
        : [
            {
                STT: '',
                'Họ và tên': '',
                'Đi làm': '',
                'Đúng luật': '',
                'Bỏ làm': '',
                'Checkin muộn': '',
                'Checkout sớm': '',
                'Không checkin': '',
                'Không checkout': ''
            }
        ];
}

export function validateLinkImage(link, defaultUrl) {
    if (isEmptyInput(link) || avatarEmpty(link) || link == '""') return defaultUrl ? defaultUrl : env.NO_IMAGE;
    if (link.substring(0, 4) === 'http') {
        return link;
    }
    return 'http://' + link;
}

export function hslToHex(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function randomMonoChromeHEX(degree) {
    return hslToHex(degree, 99, Math.floor(Math.random() * 40) + 50);
}

export function shortString(str, maxLength) {
    let arrStr = str.trim().split(' ');
    arrStr = arrStr.slice(0, Math.min(arrStr.length, maxLength));
    const result = arrStr.join(' ');
    if (arrStr.length < maxLength) return str;
    return result + ' ...';
}

export function convertDotMoneyToK(data) {
    data = data + "";
    if (data && data.length > 3) {
        if (data[data.length - 4] === '.' || data[data.length - 4] === ',') {
            return data.substring(0, data.length - 4) + 'K';
        }
        return data.substring(0, data.length - 3) + 'K';
    }
    return data;
}

export function prefixAvatarUrl(url, prefix = 'http') {
    let tmpAva = url;
    if (tmpAva) {
        if (tmpAva.slice(0, 4) !== 'http') {
            tmpAva = (prefix + '://').concat(tmpAva);
            return tmpAva;
        }
    } else return "";
    return tmpAva;
}

export function parseTime(x) {
    let date, month, year, hour;
    if (moment(x, 'HH:mm DD-MM-YYYY').format('HH:mm') !== 'Invalid date') {
        hour = moment(x, 'HH:mm DD-MM-YYYY').format('HH:mm');
        date = moment(x, 'HH:mm DD-MM-YYYY').format('DD');
        month = moment(x, 'HH:mm DD-MM-YYYY').format('MM');
        year = moment(x, 'HH:mm DD-MM-YYYY').format('YYYY');
    } else {
        hour = moment(x, 'YYYY-MM-DD HH:mm').format('HH:mm');
        date = moment(x, 'YYYY-MM-DD HH:mm').format('DD');
        month = moment(x, 'YYYY-MM-DD HH:mm').format('MM');
        year = moment(x, 'YYYY-MM-DD HH:mm').format('YYYY');
    }
    // return "Ngày " + date + " tháng " + month + " năm " + year + " , " + hour;
    return hour + '  ' + date + '-' + month + '-' + year;
}

export function getDurationExceptWeekend(start, end) {
    let d1 = moment(start);
    let d2 = moment(end);

    let res = 0;

    if (moment(d1).isAfter(d2)) return 0;
    while (moment(d2).isAfter(d1)) {
        d1 = d1.add(1, 'days');
        if (d1.day() == 0 || d1.day() == 6) continue;
        else res++;
    }
    return res;
}

export function definePhoneHead(phone) {
    let head = phone.substring(0, 3);
    if (PHONE_HEAD_3[head]) {
        return PHONE_HEAD_3[head];
    }
    head = phone.substring(0, 4);
    if (PHONE_HEAD_4[head]) {
        return PHONE_HEAD_4[head];
    }
    return '';
}

export function dotStringNumber(number) {

    if (isEmptyInput(number)) return '0';
    let StringNumber = number.toString();
    return StringNumber.replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    //return number;
}

export function convertDotStringNumberToStringNumber(number) {
    let StringNumber = number.toString();
    while (StringNumber.indexOf('.') > -1) {
        StringNumber = StringNumber.replace('.', '');
    }
    return StringNumber;
}

export function saveExpired() {
    let expired = moment().add(6, 'days').format('X');
    localStorage.setItem('expired_token', expired);
}

export function removeStorage(name) {
    try {
        localStorage.removeItem(name);
        localStorage.removeItem(name + '_expiresIn');
    } catch (e) {
        console.log('removeStorage: Error removing key [' + key + '] from localStorage: ' + JSON.stringify(e));
        return false;
    }
    return true;
}

/*  getStorage: retrieves a key from localStorage previously set with setStorage().
    params:
        key <string> : localStorage key
    returns:
        <string> : value of localStorage key
        null : in case of expired key or failure
 */
export function getStorage(key) {

    let now = Date.now();  //epoch time, lets deal only with integer
    // set expiration for storage
    let expiresIn = localStorage.getItem(key + '_expiresIn');
    if (expiresIn === undefined || expiresIn === null) {
        expiresIn = 0;
    }

    if (expiresIn < now) {// Expired
        removeStorage(key);
        return null;
    } else {
        try {
            let value = localStorage.getItem(key);
            return value;
        } catch (e) {
            console.log('getStorage: Error reading key [' + key + '] from localStorage: ' + JSON.stringify(e));
            return null;
        }
    }
}

/*  setStorage: writes a key into localStorage setting a expire time
    params:
        key <string>     : localStorage key
        value <string>   : localStorage value
        expires <number> : number of seconds from now to expire the key
    returns:
        <boolean> : telling if operation succeeded
 */
export function setStorage(key, value, expires) {

    if (expires === undefined || expires === null) {
        expires = (24 * 60 * 60);  // default: seconds for 1 day
    } else {
        expires = Math.abs(expires); //make sure it's positive
    }

    let now = Date.now();  //millisecs since epoch time, lets deal only with integer
    let schedule = now + expires * 1000;
    try {
        localStorage.setItem(key, value);
        localStorage.setItem(key + '_expiresIn', schedule);
    } catch (e) {
        console.log('setStorage: Error setting key [' + key + '] in localStorage: ' + JSON.stringify(e));
        return false;
    }
    return true;
}

export function stringToASCII(str) {
    try {
        return str.replace(/[àáảãạâầấẩẫậăằắẳẵặ]/g, 'a')
            .replace(/[èéẻẽẹêềếểễệ]/g, 'e')
            .replace(/[đ]/g, 'd')
            .replace(/[ìíỉĩị]/g, 'i')
            .replace(/[òóỏõọôồốổỗộơờớởỡợ]/g, 'o')
            .replace(/[ùúủũụưừứửữự]/g, 'u')
            .replace(/[ỳýỷỹỵ]/g, 'y');
    } catch (e) {
        console.log(e);
    }

    return '';
}

export function searchASCII(strOriginal, strSearch) {
    let strOriginalToASCII = stringToASCII(strOriginal.toLowerCase());
    let strSearchToASCII = stringToASCII(strSearch.toLowerCase());

    return strOriginalToASCII.includes(strSearchToASCII);
}


export function sortCoupon(coupons) {
    if (!coupons) return [];
    coupons = coupons.sort((a, b) => {
        if ((a.expired && !b.expired)
            || (a.discount_type != 'percentage' && b.discount_type == 'percentage' && a.expired == b.expired)
            || (a.discount_type == b.discount_type && a.expired == b.expired && a.discount_value < b.discount_value)
        ) {
            return 1;
        }
        return -1;
    });
    return coupons;
}


export function setClipboard(str, showNoti) {
    let textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';

    textArea.value = str;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    document.execCommand("copy");
    document.body.removeChild(textArea);

    if (showNoti) showNotification('Copy thành công');
}


export function getObjectArttribute(path = '', obj = {}) {
    path = path.split('.');
    let parent = {...obj};
    for (let k = 0, kLen = path.length; k < kLen; k++) {

        if (parent.hasOwnProperty(path[k])) {
            parent = parent[path[k]];

        } else {
            return;
        }
    }
    return parent;
}

export function checkColor(color, getRand) {
    let defColor = getRand ? CIRCLE_PICKER_COLORS[Math.floor(Math.random() * CIRCLE_PICKER_COLORS.length)] : '#eeeeee';

    let res = isEmptyInput(color) ? defColor : color;
    let needSharp = res[0] !== "#";
    if (needSharp) res = "#" + res;
    return res;
}

export function medianOfArray(values) {
    if (!values || values.length === 0) return 0;

    values.sort(function (a, b) {
        return a - b;
    });

    let half = Math.floor(values.length / 2);

    if (values.length % 2)
        return values[half];

    return (values[half - 1] + values[half]) / 2.0;
}

export function modeOfArray(values) {
    if (!values || values.length === 0) return {
        modes: ['Không có'],
        frequency: 0
    };
    let frequency = {}; // values of frequency.
    let maxFreq = 0; // holds the max frequency.
    let modes = [];

    for (let i in values) {
        frequency[values[i]] = (frequency[values[i]] || 0) + 1; // increment frequency.

        if (frequency[values[i]] > maxFreq) { // is this frequency > max so far ?
            maxFreq = frequency[values[i]]; // update max.
        }
    }

    for (let k in frequency) {
        if (frequency[k] == maxFreq) {
            modes.push(k);
        }
    }

    return {
        modes,
        frequency: maxFreq
    };
}

export function meanOfArray(values) {
    if (!values || values.length === 0) return 0;
    let sum = 0;
    values.forEach(val => sum += val);
    return Math.round(sum / values.length * 100) / 100;
}

export function generateMonthsArray(dates = [], date_format = DATE_FORMAT_SQL, target_format = 'MM/YYYY') {
    if (!dates.length) return [];
    let minDate = moment().add(10, 'years'), maxDate = moment().subtract(10, 'years');
    dates.forEach(d => {
        let _date = moment(d, date_format);
        if (_date.isAfter(maxDate)) maxDate = _date;
        if (_date.isBefore(minDate)) minDate = _date;
    });
    let res = [];
    console.log(minDate, maxDate, maxDate.diff(minDate, 'months'));
    for (; maxDate.diff(minDate, 'months');) {
        res.push(minDate.format(target_format));
        minDate = minDate.add(1, 'months');
    }


    return res;
}

export function upperCaseFirstLetter(string) {
    if (isEmpty(string)) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}


// const daysINeed = [1,4]; // Monday, Thursday
// we will assume the days are in order for this demo, but inputs should be sanitized and sorted

function isThisInFuture(currentDate, targetDayNum) {
    // param: positive integer for weekday
    // returns: matching moment or false
    const todayNum = currentDate.isoWeekday();
    if (todayNum <= targetDayNum) {
        return moment(currentDate).isoWeekday(targetDayNum);
    }
    return false;
}

export function findNextInstanceInDaysArray(currentDate, daysArray) {
    const tests = daysArray.map((item) => isThisInFuture(currentDate, item));
    // select the first matching day of this week, ignoring subsequent ones, by finding the first moment object
    const thisWeek = tests.find((sample) => {
        return sample instanceof moment
    });

    // // but if there are none, we'll return the first valid day of next week (again, assuming the days are sorted)
    return thisWeek || moment(currentDate).add(1, 'weeks').isoWeekday(daysArray[0]);
    // return currentDate;
}


export function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // add other defaults here if necessary
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        //eslint-disable-next-line
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}

export function objectEntries(obj) {
    if (false == (obj instanceof Object)) {
        return [];
    }
    return Object.entries(obj).map(entry => {
        return entry[0];
    });
}

export function checkStringIsUrl(text, target = '_blank') {
    if (isEmptyInput(text)) return false;
    //eslint-disable-next-line
    var urlRegex = /((?:(http|https|Http|Https|rtsp|Rtsp):\/\/(?:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,64}(?:\:(?:[a-zA-Z0-9\$\-\_\.\+\!\*\'\(\)\,\;\?\&\=]|(?:\%[a-fA-F0-9]{2})){1,25})?\@)?)?((?:(?:[a-zA-Z0-9][a-zA-Z0-9\-]{0,64}\.)+(?:(?:aero|arpa|asia|a[cdefgilmnoqrstuwxz])|(?:biz|b[abdefghijmnorstvwyz])|(?:cat|com|coop|c[acdfghiklmnoruvxyz])|d[ejkmoz]|(?:edu|e[cegrstu])|f[ijkmor]|(?:gov|g[abdefghilmnpqrstuwy])|h[kmnrtu]|(?:info|int|i[delmnoqrst])|(?:jobs|j[emop])|k[eghimnrwyz]|l[abcikrstuvy]|(?:mil|mobi|museum|m[acdghklmnopqrstuvwxyz])|(?:name|net|n[acefgilopruz])|(?:org|om)|(?:pro|p[aefghklmnrstwy])|qa|r[eouw]|s[abcdeghijklmnortuvyz]|(?:tel|travel|t[cdfghjklmnoprtvwz])|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw]))|(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9])\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[1-9]|0)\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[1-9][0-9]|[0-9])))(?:\:\d{1,5})?)(\/(?:(?:[a-zA-Z0-9\;\/\?\:\@\&\=\#\~\-\.\+\!\*\'\(\)\,\_])|(?:\%[a-fA-F0-9]{2}))*)?(?:\b|$)/gi;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '" target="' + target + '">' + url + '</a>';
    });
}

export function getNewDomain() {
    if (window.location.hostname.includes("eduto.net")) {
        return `https://${window.location.hostname}`
    } else {
        return `${window.location.protocol}//${window.location.hostname}:2222`
    }
}

export function isContainsDomain(domains = []){
    let res = false;
    domains.forEach(domain=>{
        if(window.location.origin.includes(domain)) res = true;
    });
    return res;
}