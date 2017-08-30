/* eslint-disable no-undef */

import jwt from 'jsonwebtoken';
import * as env from '../constants/env';

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isEmptyInput(input) {
    return input === null || input === undefined || input.trim().length <= 0;
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

export function showNotification(message, from = "top", align = "right", type = "success") {
    // type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    $.notify({
        icon: "notifications",
        message

    }, {
        type,
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

    var n = name.split(" ");
    if (n.length > 1)
        return n[n.length - 2] + ' ' + n[n.length - 1];
    return name;
}

