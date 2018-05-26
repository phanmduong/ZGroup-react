function formatPrice(price) {
    return price.toString().replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'
}

function addGood(goodId){
    $('#modalBuy').modal('show');
    modalBuy.addGoodToCart(goodId);
}


var modalBuy = new Vue({
    el: "#modalBuy",
    data: {
        isLoading: false,
        isLoadingCoupons: false,
        goods: [],
        total_order_price: 0,
        coupon_code: '',
        coupon_programs: [],
        coupon_programs_count: 0,
        coupon_codes: [],
        coupon_codes_count: 0
    },
    methods: {
        getCouponPrograms: function () {
            axios.get(window.url + '/coupon-programs')
                .then(function (response) {
                    this.coupon_programs = response.data.coupon_programs;
                    this.coupon_programs_count = response.data.coupon_programs_count;
                }.bind(this))
                .catch(function (error) {

                });
        },
        getCouponCodes: function () {
            this.coupon_codes = [];
            this.isLoadingCoupons = true;
            axios.get(window.url + '/coupon-codes')
                .then(function (response) {
                    this.coupon_codes = response.data.coupon_codes;
                    this.coupon_codes_count = response.data.coupon_codes_count;
                    this.isLoadingCoupons = false;
                }.bind(this))
                .catch(function (error) {

                });
        },
        getGoodsFromSesson: function () {
            this.isLoading = true;
            this.goods = [];
            axios.get(window.url + '/load-books-from-session/v2')
                .then(function (response) {
                    this.goods = response.data.goods;
                    this.total_order_price = response.data.total_order_price;
                    this.isLoading = false;
                    openWithoutAdd.countBooksFromSession();

                }.bind(this))
                .catch(function (error) {

                });
        },
        addGoodToCart: function (goodId) {
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
                    this.total_order_price -= (good.price - good.discount_value);
                    if (good.number !== 0)
                        newGoods.push(good);
                }
                else
                    newGoods.push(good);
            }
            this.goods = newGoods;
            axios.get(window.url + '/remove-book/' + goodId + '/v2')
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
                    this.total_order_price += (good.price - good.discount_value);
                }
                newGoods.push(good);
            }
            this.goods = newGoods;
            axios.get(window.url + '/add-book/' + goodId + '/v2')
                .then(function (response) {
                    openWithoutAdd.countBooksFromSession();

                }.bind(this))
                .catch(function (error) {

                });
        },
        openPurchaseModal: function () {
            $('#modalBuy').modal('hide');
            $('#modalPurchase').modal("show");
            $("body").css("overflow", "hidden");
            modalPurchase.loadingProvince = true;
            modalPurchase.showProvince = false;
            modalPurchase.openModal();
        },
        addCoupon: function () {
            axios.get(window.url + '/add-coupon/' + this.coupon_code + '/v2')
                .then(function (response) {
                    this.coupon_code = '';
                    this.getGoodsFromSesson();
                    this.getCouponCodes();
                }.bind(this))
                .catch(function (error) {
                });
        }
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

var openWithoutAdd = new Vue({
    el: "#openWithoutAdd",
    data: {
        books_count: 0
    },
    methods: {
        countBooksFromSession: function () {
            axios.get(window.url + '/count-books-from-session/v2')
                .then(function (response) {
                    this.books_count = response.data;
                }.bind(this))
                .catch(function (error) {
                });
        },
        openModalBuyWithoutAdd: function () {
            $('#modalBuy').modal('show');
            modalBuy.getGoodsFromSesson();
        },
    },
    mounted: function () {
        $('#booksCount').css('display', 'flex');
        this.countBooksFromSession();
        modalBuy.getCouponPrograms();
        modalBuy.getCouponCodes();
    },
});

var modalPurchase = new Vue({
    el: "#modalPurchase",
    data: {
        name: '',
        phone: '',
        email: '',
        address: '',
        payment: '',
        provinceid: '',
        districtid: '',
        loadingProvince: false,
        showProvince: false,
        loadingDistrict: false,
        showDistrict: false,
        provinces: [],
        districts: [],
        message: '',
    },
    methods: {
        getProvinces: function () {
            axios.get(window.url + '/province')
                .then(function (response) {
                    this.provinces = response.data.provinces;
                    this.loadingProvince = false;
                    this.showProvince = true;
                }.bind(this))
                .catch(function (error) {

                });
        },
        getDistricts: function () {
            axios.get(window.url + '/district/' + this.provinceid)
                .then(function (response) {
                    this.districts = response.data.districts;
                    this.loadingDistrict = false;
                    this.showDistrict = true;
                }.bind(this))
                .catch(function (error) {

                });
        },
        validateEmail: function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email.toLowerCase());
        },
        openModal: function () {
            this.getProvinces();
        },
        changeProvince: function () {
            this.loadingDistrict = true;
            this.getDistricts();
        },
        submitOrder: function () {
            $("#purchase-error").css("display", "none");
            $("#btn-purchase-group").css("display", "none");
            $("#purchase-loading-text").css("display", "block");
            if (!this.name || !this.phone || !this.email || !this.address || !this.payment) {
                this.message = "Bạn vui lòng nhập đủ thông tin";
                $("#purchase-error").css("display", "block");
                $("#purchase-loading-text").css("display", "none");
                $("#btn-purchase-group").css("display", "block");
                return;
            }
            if (this.validateEmail(this.email) === false) {
                this.message = "Bạn vui lòng kiểm tra lại email";
                $("#purchase-error").css("display", "block");
                $("#purchase-loading-text").css("display", "none");
                $("#btn-purchase-group").css("display", "block");
            }
            axios.post(window.url + '/save-order/v2', {
                name: this.name,
                phone: this.phone,
                email: this.email,
                provinceid: this.provinceid ? this.provinceid : '01',
                districtid: this.districtid ? this.districtid : '001',
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
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        },
    }
});


var fastOrder = new Vue({
    el: '#modal-fast-order',
    data: {
        fastOrders: [
            {
                id: 1,
                seen: false,
                link: "",
                price: "",
                size: "",
                color: "",
                number: 1,
                tax:false,
                description: "",
                currencyId: 0
            },
        ],
        ratio: "",
        isLoading: false,
        showFailMessage: false,
        showSuccessMessage: false,
        failMessage: "",
        message: "",
        currencies: [
        ],
        isLoadingCurrency: false,
        isOrdering: true,
    },
    methods: {
        getCurrencies: function () {
            this.isLoadingCurrency = true;
            axios.get(window.url + '/currency')
                .then(function (response) {
                    this.currencies = response.data.currencies;
                    this.isLoadingCurrency = false;
                }.bind(this))
                .catch(function (error) {

                });
        },
        plusOrder: function () {
            this.fastOrders.push({
                id: this.fastOrders.length + 1,
                seen: true,
                link: "",
                price: "",
                size: "",
                color: "",
                number: 1,
                tax: false,
                description: "",
                currencyId: 0,
            });
        },
        remove: function (index) {
            this.fastOrders.splice(index, 1)
        },
        submitFastOrder: function () {
            this.isLoading = true;
            this.showSuccessMessage = false;
            this.showFailMessage = false;
            axios.post(window.url + '/manage/save-delivery-order', {
                fastOrders: JSON.stringify(this.fastOrders)
            }).then(function (response) {
                this.isLoading = false;
                if (response.data.status === 1) {
                    this.showSuccessMessage = true;
                    this.message = response.data.message;
                    this.isOrdering = false;
                }
                else {
                    this.showFailMessage = true;
                    this.failMessage = response.data.message;
                }
            }.bind(this))
                .catch(function (error) {
                    this.failMessage = "Xin bạn vui lòng kiểm tra kết nối mạng";
                    this.fail = true;
                }.bind(this))
        },
        continueOrdering: function () {
            this.isOrdering = true;
            this.showSuccessMessage = false;
            this.showFailMessage = false;
            this.fastOrders = [];
            this.fastOrders.push({
                id: this.fastOrders.length + 1,
                seen: false,
                link: "",
                price: "",
                size: "",
                color: "",
                number: 1,
                tax: false,
                description: "",
                currencyId: 0,
            });
        }
    },
    mounted: function () {
        this.getCurrencies();
    }
});

var productInfo = new Vue({
    el : "#product_info",
    data : {
        good : 1
    },
    methods : {
        openBuyModal: function (goodId) {
            $('#modalBuy').modal('show');
            modalBuy.addGoodToCart(goodId);
        },
       },
});
