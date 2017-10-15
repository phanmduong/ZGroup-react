$(document).ready(function () {
    countBooksFromSession();
    $("#cart-num-items").css("display", "none");
});

function countBooksFromSession() {
    var url = window.url + "/count-books-from-session";
    $.get(url, function (data) {
        if (Number(data) > 0) {
            $("#cart-num-items").css("display", "inline");
        }
        $("#cart-num-items").html(data);
    });
}

function addNumBook() {
    var number = Number($("#cart-num-items").html());
    $("#cart-num-items").html(number + 1);
}

function minusNumBook() {
    var number = Number($("#cart-num-items").html());
    if (number <= 1) {
        $("#cart-num-items").css("display", "none");
    }
    $("#cart-num-items").html(number - 1);
}

function openModalBuyWithoutAdd() {
    $("#modal-buy-body").html("<i class='fa fa-spin fa-spinner'></i>Đang tải...");
    $('#modalBuy').modal('show');
    var urlLoadBook = window.url + "/load-books-from-session";
    $.get(urlLoadBook, function (data) {
        $("#modal-buy-body").html(data);
        countBooksFromSession();
    });
}

function openModalBuy(goodId, price) {
    $("#modal-buy-body").html("<i class='fa fa-spin fa-spinner'></i>Đang tải...");
    $('#modalBuy').modal('show');
    var url = window.url + "/add-book/" + goodId;
    var urlLoadBook = window.url + "/load-books-from-session";
    $("#cart-num-items").css("display", "inline");
    $.get(url, function (data) {
        addNumBook();
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
    $("#cart-num-items").css("display", "inline");
    addNumBook();
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
    minusNumBook();

    var url = window.url + "/remove-book/" + goodId;
    $.get(url, function (data) {
    })
}