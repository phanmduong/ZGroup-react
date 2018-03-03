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
        total_order_price: 0,
        disablePurchaseButton: true,
    },
    methods: {
        getGoodsFromSesson: function() {
            axios
                .get(window.url + "/load-books-from-session")
                .then(
                    function(response) {
                        this.goods = response.data.goods;
                        this.total_order_price =
                            response.data.total_order_price;
                        this.isLoading = false;
                        this.disablePurchaseButton = false;
                        openWithoutAdd.countBooksFromSession();
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        addGoodToCart: function(goodId) {
            this.goods = [];
            this.isLoading = true;
            this.disablePurchaseButton = true;
            axios
                .get(window.url + "/add-book/" + goodId)
                .then(
                    function(response) {
                        modalBuy.getGoodsFromSesson();
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        minusGood: function(event, goodId) {
            newGoods = [];
            for (i = 0; i < this.goods.length; i++) {
                good = this.goods[i];
                if (good.id === goodId) {
                    good.number -= 1;
                    this.total_order_price -=
                        good.price * (1 - good.coupon_value);
                    if (good.number !== 0) newGoods.push(good);
                } else newGoods.push(good);
            }
            this.goods = newGoods;
            axios
                .get(window.url + "/remove-book/" + goodId)
                .then(
                    function(response) {
                        openWithoutAdd.countBooksFromSession();
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        plusGood: function(event, goodId) {
            newGoods = [];
            for (i = 0; i < this.goods.length; i++) {
                good = this.goods[i];
                if (good.id === goodId) {
                    good.number += 1;
                    this.total_order_price +=
                        good.price * (1 - good.coupon_value);
                }
                newGoods.push(good);
            }
            this.goods = newGoods;
            axios
                .get(window.url + "/add-book/" + goodId)
                .then(
                    function(response) {
                        openWithoutAdd.countBooksFromSession();
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        openPurchaseModal: function() {
            $("#modalBuy").modal("hide");
            $("#modalPurchase").modal("show");
            setTimeout(function() {
                $("body").attr("class", "profile modal-open");
            }, 200);

            modalPurchase.loadingProvince = true;
            modalPurchase.showProvince = false;
            modalPurchase.openModal();
        },
    },
});

var openModalBuy1 = new Vue({
    el: "#vuejs1",
    data: {},
    methods: {
        openModalBuy: function(goodId) {
            $("#modalBuy").modal("show");
            modalBuy.addGoodToCart(goodId);
        },
    },
});

var openModalBuy2 = new Vue({
    el: "#vuejs2",
    data: {},
    methods: {
        openModalBuy: function(goodId) {
            $("#modalBuy").modal("show");
            modalBuy.addGoodToCart(goodId);
        },
    },
});

var openModalBuy3 = new Vue({
    el: "#vuejs3",
    data: {},
    methods: {
        openModalBuy: function(goodId) {
            $("#modalBuy").modal("show");
            modalBuy.addGoodToCart(goodId);
        },
    },
});

var openWithoutAdd = new Vue({
    el: "#openWithoutAdd",
    data: {
        books_count: 0,
    },
    methods: {
        countBooksFromSession: function() {
            axios
                .get(window.url + "/count-books-from-session")
                .then(
                    function(response) {
                        this.books_count = response.data;
                        if (this.books_count === 0)
                            modalBuy.disablePurchaseButton = true;
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        openModalBuyWithoutAdd: function() {
            $("#modalBuy").modal("show");
            modalBuy.goods = [];
            modalBuy.isLoading = true;
            modalBuy.disablePurchaseButton = true;
            modalBuy.getGoodsFromSesson();
        },
    },
    mounted: function() {
        $("#booksCount").css("display", "flex");
        this.countBooksFromSession();
    },
});

var modalPurchase = new Vue({
    el: "#modalPurchase",
    data: {
        name: "",
        phone: "",
        email: "",
        address: "",
        // payment: 'Thanh toán online',
        payment: "Thanh toán trực tiếp khi nhận hàng(COD)",
        provinceid: "",
        districtid: "",
        wardid: "",
        loadingProvince: false,
        showProvince: false,
        loadingDistrict: false,
        showDistrict: false,
        provinces: [],
        districts: [],
        message: "",
        // onlinePurchase: "ATM_ONLINE",
        onlinePurchase: "",
        bank_code: "",
        isSaving: false,
        goodsPrice: 0,
        shipPrice: 0,
    },
    methods: {
        getProvinces: function() {
            axios
                .get(window.url + "/province")
                .then(
                    function(response) {
                        this.provinces = response.data.provinces;
                        this.loadingProvince = false;
                        this.showProvince = true;
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        getDistricts: function() {
            axios
                .get(window.url + "/district/" + this.provinceid)
                .then(
                    function(response) {
                        this.districts = response.data.districts;
                        this.loadingDistrict = false;
                        this.showDistrict = true;
                    }.bind(this),
                )
                .catch(function(error) {});
        },
        openModal: function() {
            this.getProvinces();
        },
        changeProvince: function() {
            this.loadingDistrict = true;
            this.goodsPrice = modalBuy.total_order_price;
            this.getDistricts();
            if (this.provinceid === "01" || this.provinceid === "79") {
                this.shipPrice = 20000;
            } else {
                this.shipPrice = 30000;
            }
            // modalBuy
        },
        changeOnlinePurchase: function() {
            this.bank_code = "";
        },
        showError: function(message) {
            this.message = message;
            this.isSaving = false;
        },
        validateEmail: function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        },
        submitOrder: function() {
            this.message = "";

            if (
                !this.name ||
                !this.phone ||
                !this.email ||
                !this.address ||
                !this.payment
            ) {
                this.showError("Bạn vui lòng nhập đủ thông tin");
                return;
            }

            if (this.validateEmail(this.email) === false) {
                this.showError("Bạn vui lòng kiểm tra lại email");
                return;
            }

            if (this.payment === "Thanh toán online") {
                if (this.bank_code === "") {
                    this.showError(
                        "Bạn vui lòng hoàn thành phương thức thanh toán",
                    );
                    return;
                }
            }

            this.isSaving = true;

            axios
                .post(window.url + "/save-order", {
                    name: this.name,
                    phone: this.phone,
                    email: this.email,
                    ship_price: this.shipPrice,
                    provinceid: this.provinceid ? this.provinceid : "01",
                    districtid: this.districtid ? this.districtid : "001",
                    address: this.address,
                    bank_code: this.bank_code,
                    online_purchase: this.onlinePurchase,
                    payment: this.payment,
                    _token: window.token,
                })
                .then(
                    function(response) {
                        this.isSaving = false;
                        if (this.payment === "Thanh toán online") {
                            if (response.data.checkout_url) {
                                window.location.href =
                                    response.data.checkout_url;
                            } else {
                                this.message = response.data.message;
                            }
                        } else {
                            $("#purchase-loading-text").css("display", "none");
                            $("#modalPurchase").modal("hide");
                            $("#modalSuccess").modal("show");
                            name = "";
                            phone = "";
                            email = "";
                            address = "";
                            payment = "";
                        }
                    }.bind(this),
                )

                .catch(function(error) {
                    console.log(error);
                });
        },
    },
});
