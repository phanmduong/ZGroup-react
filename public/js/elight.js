function formatPrice(price) {
    return (
        price
            .toString()
            .replace(/\./g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ"
    );
}

var modalBuy = new Vue({
    el: "#modalBuy",
    data: {
        isLoading: false,
        goods: [],
        total_price: 0,
    },
    methods: {
        getGoodsFromSesson: function () {
            axios.get(window.url + '/load-books-from-session')
                .then(function (response) {
                    this.goods = response.data.goods;
                    this.total_price = response.data.total_price;
                    this.isLoading = false;
                    openWithoutAdd.countBooksFromSession();
                }.bind(this))
                .catch(function (error) {

                });
        },
        addGoodToCart: function (goodId) {
            this.goods = [];
            this.isLoading = true;
            axios.get(window.url + '/add-book/' + goodId)
                .then(function (response) {
                    modalBuy.getGoodsFromSesson();
                }.bind(this))
                .catch(function (error) {

                });
        },
        minusGood: function (event, goodId) {
            newGoods = [];
            for (i = 0; i < this.goods.length; i++) {
                good = this.goods[i];
                if (good.id === goodId) {
                    good.number -= 1;
                    this.total_price -= good.price;
                    if (good.number !== 0)
                        newGoods.push(good);
                }
                else
                    newGoods.push(good);
            }
            this.goods = newGoods;
            axios.get(window.url + '/remove-book/' + goodId)
                .then(function (response) {
                    openWithoutAdd.countBooksFromSession();
                }.bind(this))
                .catch(function (error) {

                });
        },
        plusGood: function (event, goodId) {
            newGoods = [];
            for (i = 0; i < this.goods.length; i++) {
                good = this.goods[i];
                if (good.id === goodId) {
                    good.number += 1;
                    this.total_price += good.price;
                }
                newGoods.push(good);
            }
            this.goods = newGoods;
            axios.get(window.url + '/add-book/' + goodId)
                .then(function (response) {
                    openWithoutAdd.countBooksFromSession();
                }.bind(this))
                .catch(function (error) {

                });
        },
        openPurchaseModal: function () {
            $('#modalBuy').modal('hide');
            $('#modalPurchase').modal("show");
            setTimeout(function() {
                $("body").attr("class", "profile modal-open");
            }, 200);          
            modalPurchase.loadingProvince = true;
            modalPurchase.showProvince = false;
            modalPurchase.openModal();
        },
    }
});

var openModalBuy1 = new Vue({
    el: "#vuejs1",
    data: {},
    methods: {
        openModalBuy: function (goodId) {
            $('#modalBuy').modal('show');
            modalBuy.addGoodToCart(goodId);
        },
    }
});

var openModalBuy2 = new Vue({
    el: "#vuejs2",
    data: {},
    methods: {
        openModalBuy: function (goodId) {
            $('#modalBuy').modal('show');
            modalBuy.addGoodToCart(goodId);
        },
    }
});

var openModalBuy3 = new Vue({
    el: "#vuejs3",
    data: {},
    methods: {
        openModalBuy: function (goodId) {
            $('#modalBuy').modal('show');
            modalBuy.addGoodToCart(goodId);
        },
    }
});

var openWithoutAdd = new Vue({
    el: "#openWithoutAdd",
    data: {
        books_count: 0,
    },
    methods: {
        countBooksFromSession: function () {
            axios.get(window.url + '/count-books-from-session')
                .then(function (response) {
                    this.books_count = response.data;
                }.bind(this))
                .catch(function (error) {

                });
        },
        openModalBuyWithoutAdd: function () {
            $('#modalBuy').modal('show');
            modalBuy.goods = [];
            modalBuy.isLoading = true;
            modalBuy.getGoodsFromSesson();
        },
    },
    mounted: function () {
        $('#booksCount').css("display", "flex");
        this.countBooksFromSession()
    },
});

var modalPurchase = new Vue({
    el: "#modalPurchase",
    data: {
        name: '',
        phone: '',
        email: '',
        address: '',
        payment: 'Thanh toán trực tiếp khi nhận hàng(COD)',
    },
    methods: {
        submitOrder: function () {
            $("#purchase-error").css("display", "none");
            $("#btn-purchase-group").css("display", "none");
            $("#purchase-loading-text").css("display", "block");
            if (!this.name || !this.phone || !this.email || !this.address || !this.payment) {
                alert("Bạn vui lòng nhập đủ thông tin và kiểm tra lại email");
                $("#purchase-error").css("display", "block");
                $("#purchase-loading-text").css("display", "none");
                $("#btn-purchase-group").css("display", "block");
                return;
            }
            axios.post(window.url + '/save-order', {
                name: this.name,
                phone: this.phone,
                email: this.email,
                address: this.address,
                payment: this.payment,
                _token: window.token,
            })
                .then(function (response) {
                    $("#purchase-loading-text").css("display", "none");
                    $("#btn-purchase-group").css("display", "block");
                    $("#modalPurchase").modal("hide");
                    $("#modalSuccess").modal("show");
                    this.name = "";
                    this.phone = "";
                    this.email = "";
                    this.address = "";
                    this.payment = "";
                })

                .catch(function (error) {
                });
        },
    }
});
