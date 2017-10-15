$(document).ready(function () {

});

function openModalBuy(goodId) {
    $("#modal-buy-body").html("<i class='fa fa-spin fa-spinner'></i>Đang tải...");
    $('#modalBuy').modal('show');
    var url = window.url + "/add-book/" + goodId;
    var urlLoadBook = window.url + "/load-books-from-session";
    $.get(url, function (data) {
        $.get(urlLoadBook, function (data) {
            $("#modal-buy-body").html(data);
        })
    })
}

function addItem(goodId) {
    console.log("#good-" + goodId + "-number");
    var el = $("#good-" + goodId + "-number");
    var number = Number(el.html());
    el.html(number + 1);
    var url = window.url + "/add-book/" + goodId;
    $.get(url, function (data) {
    })
}

function removeItem(goodId) {
    console.log("#good-" + goodId + "-number");
    var el = $("#good-" + goodId + "-number");
    console.log(el);
    var number = Number(el.html());
    if (number == 1) {
        $("#book-" + goodId).html("");
    } else {
        el.html(number - 1);
    }

    var url = window.url + "/remove-book/" + goodId;
    $.get(url, function (data) {
    })
}