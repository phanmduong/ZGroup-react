function formatPrice(price) {
    return price.toString().replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ'
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
        getCouponCodes: function() {
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
            axios.get(window.url + '/load-books-from-session/v2')
                .then(function (response) {
                    this.goods = response.data.goods;
                    this.total_order_price = response.data.total_order_price;
                    this.isLoading = false;
                    openWithoutAdd.countBooksFromSession();
                    this.getCouponCodes();
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
                    this.getCouponCodes();
                    this.getGoodsFromSesson();
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
            modalBuy.goods = [];
            modalBuy.getGoodsFromSesson();
        },
    },
    mounted: function () {
        $('#booksCount').css('display', 'flex');
        this.countBooksFromSession();
        modalBuy.getCouponPrograms();
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
                    name = "";
                    phone = "";
                    email = "";
                    address = "";
                    payment = "";
                })

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
                tax: "Giá chưa thuế",
                describe: ""
            },
        ],
        loading: false,
        check: false,
        success: false,
        fail: false,
        message: ""
    },
    methods: {

        plusOrder: function () {
            this.fastOrders.push({
                id: this.fastOrders.length + 1,
                seen: true,
                link: "",
                price: "",
                size: "",
                color: "",
                number: 1,
                tax: "Giá chưa thuế",
                describe: ""
            });
        },
        remove: function (index) {
            this.fastOrders.splice(index, 1)
        },
        submitFastOrder: function () {
            // this.check=false,
            //     this.success = false,
            //     this.fail = false,
            this.loading = true;
            this.success = false;
            // for (var i = 0; i< this.fastOrders.length; i++){
            //          if(this.fastOrders[i].link === ""|| this.fastOrders[i].price === ""|| this.fastOrders[i].size === ""|| this.fastOrders[i].color=== ""|| this.fastOrders[i].describe === "" ){
            //              this.check = true;
            //              this.loading = false;
            //              break;
            //          }
            // }
            axios.post(window.url + '/manage/save-fast-order', {
                fastOrders: JSON.stringify(this.fastOrders)
            }).then(function (response) {
                // $("#submitFastOrder").modal("hide");
                // $("#modal-fast-order").modal("hide");
                this.loading = false;
                // this.check=false;
                this.success = true;
                // this.fail = false;
                this.message = response.data.message.message;
            }.bind(this))
                .catch(function (error) {
                    console.log(error);
                    this.fail = true;
                }.bind(this))
        }
    },


});