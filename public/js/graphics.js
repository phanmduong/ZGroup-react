$(document).ready(function () {
    countBooksFromSession();
    $("#cart-num-items").css("display", "none");
});

function hidePurchaseButton() {
    $('#btn-purchase').css("display", "none");
}

function showPurchaseButton() {
    $('#btn-purchase').css("display", "block");
}

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
    hidePurchaseButton();
    $.get(urlLoadBook, function (data) {
        $("#modal-buy-body").html(data);
        countBooksFromSession();
        showPurchaseButton();
    });
}

function openModalBuy(goodId, price) {
    $("#modal-buy-body").html("<i class='fa fa-spin fa-spinner'></i>Đang tải...");
    $('#modalBuy').modal('show');
    var url = window.url + "/add-book/" + goodId;
    var urlLoadBook = window.url + "/load-books-from-session";
    $("#cart-num-items").css("display", "inline");
    hidePurchaseButton();
    $.get(url, function (data) {
        addNumBook();
        $.get(urlLoadBook, function (data) {
            $("#modal-buy-body").html(data);
            showPurchaseButton();
        })
    })
}

var addTimeout = null;
var removeTimeout = null;


function addItem(goodId, price) {
    var el = $("#good-" + goodId + "-number");
    var number = Number(el.html());
    number = number + 1;
    el.html(number);

    var priceElement = $("#book-" + goodId + "-price");
    var oldPrice = Number(priceElement.data("price"));
    var newPrice = oldPrice + price;
    priceElement.html(numberWithCommas(newPrice) + "đ");
    priceElement.data("price", newPrice);

    var totalPriceEl = $("#total-price");
    var oldTotalPrice = totalPriceEl.data("price");
    var newTotalPrice = oldTotalPrice + price;
    $("#total-price b").html(numberWithCommas(newTotalPrice) + "đ");
    totalPriceEl.data("price", newTotalPrice);
    addNumBook();

    if (addTimeout != null) {
        clearTimeout(addTimeout);
    }

    addTimeout = setTimeout(function () {
        var url = window.url + "/add-book/" + goodId + "?number=" + number;
        $("#cart-num-items").css("display", "inline");

        $.get(url, function (data) {
        })
    }, 500);

}

function removeItem(goodId, price) {
    var el = $("#good-" + goodId + "-number");
    var number = Number(el.html());
    if (number == 1) {
        $("#book-" + goodId).html("");
    } else {
        el.html(number - 1);
    }
    number = number - 1;

    var priceElement = $("#book-" + goodId + "-price");
    var oldPrice = Number(priceElement.data("price"));
    var newPrice = oldPrice - price;
    priceElement.html(numberWithCommas(newPrice) + "đ");
    priceElement.data("price", newPrice);

    var totalPriceEl = $("#total-price");
    var oldTotalPrice = totalPriceEl.data("price");
    var newTotalPrice = oldTotalPrice - price;
    $("#total-price b").html(numberWithCommas(newTotalPrice) + "đ");
    totalPriceEl.data("price", newTotalPrice);

    minusNumBook();

    if (removeTimeout != null) {
        clearTimeout(removeTimeout);
    }

    removeTimeout = setTimeout(function () {
        var url = window.url + "/remove-book/" + goodId + "?number=" + number;
        $("#cart-num-items").css("display", "inline");

        $.get(url, function (data) {
        })
    }, 500);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}