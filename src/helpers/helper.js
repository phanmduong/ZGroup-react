/* eslint-disable no-undef */
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function isEmptyInput(input) {
    return input === null || input === undefined || input.trim().length <= 0;
}

export function confirm(type, title, html, success, cancel) {
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

export function showNotification(message, from = "top", align = "right", type = "rose") {
    type = ['', 'info', 'success', 'warning', 'danger', 'rose', 'primary'];

    color = Math.floor((Math.random() * 6) + 1);

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
