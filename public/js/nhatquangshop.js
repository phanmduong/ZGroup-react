var modalBuy = new Vue({
    el: "#modalBuy",
    data: {
        isLoading: false,
        goods: [],
        total_price: 0
    },
    methods: {
        getGoodsFromSesson: function () {
            axios.get(window.url + '/load-books-from-session/v2')
                .then(function (response) {
                    this.goods = response.data.goods;
                    this.total_price = response.data.total_price;
                    this.isLoading = false;
                }.bind(this))
                .catch(function (error) {

                });
        },
        addGoodToCart: function (goodId) {
            this.goods = [];
            this.isLoading = true;
            axios.get(window.url + '/add-book/' + goodId + '/v2')
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
                    this.total_price -= good.price * (1 - good.coupon_value);
                    if (good.number !== 0)
                        newGoods.push(good);
                }
                else
                    newGoods.push(good);
            }
            this.goods = newGoods;
            axios.get(window.url + '/remove-book/' + goodId + '/v2')
                .then(function (response) {

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
                    this.total_price += good.price * (1 - good.coupon_value);
                }
                newGoods.push(good);
            }
            this.goods = newGoods;
            axios.get(window.url + '/add-book/' + goodId + '/v2')
                .then(function (response) {

                }.bind(this))
                .catch(function (error) {

                });
        },
        openPurchaseModal: function () {
            $('#modalBuy').modal('hide');
            $('#modalPurchase').modal("show");
            $("body").css("overflow", "hidden");
        },
    }
});

var openModalBuy = new Vue({
    el: "#vuejs",
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
    data: {},
    methods: {
        openModalBuyWithoutAdd: function () {
            $('#modalBuy').modal('show');
        },
    }
});

var modalPurchase = new Vue({
    el: "#akakdia",
    data: {
        name: '',
        phone: '',
        email: '',
        address: '',
        payment: ''
    },
    methods: {
        submitOrder: function () {
            if (!this.name || !this.phone || !this.email || !this.address || !this.payment ) {
                alert("Bạn vui lòng nhập đủ thông tin và kiểm tra lại email");
                $("#purchase-error").css("display", "block");
                $("#purchase-loading-text").css("display", "none");
                $("#btn-purchase-group").css("display", "block");
                //return
            }
        }
    }
});