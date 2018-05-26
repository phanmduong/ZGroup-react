var vueData = {
    isLogin: false,
    user: {},
};

var vueNav = new Vue({
    el: "#vue-nav",
    data: vueData,
    methods: {
        openModalLogin: function () {
            $("#modalLogin").modal("toggle");
            modalLogin.user.email = "";
            modalLogin.user.password = "";
            modalLogin.isClose = false;
        },
        logout: function () {
            localStorage.removeItem("auth");
        },
    },
});

var modalLogin = new Vue({
    el: "#modalLogin",
    data: {
        user: {
            email: "",
            password: "",
        },
        isLoading: false,
        hasError: false,
        isClose: false,
        modalLogin: true,
        showRegisterForm: true,
        message: ""
    },
    methods: {
        login: function () {
            var url = "/login-social";
            this.isLoading = true;
            this.hasError = false;
            this.isClose = true;
            axios
                .post(url, this.user)
                .then(
                    function (res) {
                        this.isLoading = false;
                        this.isClose = false;
                        if (res.data.user) {
                            $("#modalLogin").modal("toggle");
                            vueData.isLogin = true;
                            vueData.user = res.data.user;
                            localStorage.setItem(
                                "auth",
                                JSON.stringify(res.data)
                            );
                            location.reload();
                        } else {
                            this.hasError = true;
                            toastr.error(res.data.error);
                        }
                    }.bind(this)
                )
                .catch(
                    function (error) {
                        this.isLoading = false;
                        this.hasError = true;
                        toastr.error(error.response.data.error);
                    }.bind(this)
                );
        },
        changeModal: function () {
            this.showRegisterForm = true;
            this.message = "";
            this.modalLogin = !this.modalLogin;
        },
        register: function () {
            $("#form-register form").validate({
                rules: {
                    email: "required",
                    name: "required",
                    phone: "required",
                    password: "required",
                    confirm_password: {
                        required: true,
                        equalTo: "#password",
                    },
                },
                messages: {
                    email: {
                        required: "Vui lòng nhập email",
                        email: "Vui lòng nhập đúng email",
                    },
                    password: {
                        required: "Vui lòng nhập mật khẩu",
                    },
                    confirm_password: {
                        required: "Vui lòng xác nhận mật khẩu",
                        equalTo: "Mật khẩu không trùng",
                    },
                    name: "Vui lòng nhập họ và tên",
                    phone: "Vui lòng nhập số điện thoại",
                },
            });
            if ($("#form-register form").valid()) {
                var url = "/register-confirm-email";
                this.isLoading = true;
                this.hasError = false;
                this.isClose = true;
                axios
                    .post(url, this.user)
                    .then(
                        function (res) {
                            this.isLoading = false;
                            this.isClose = false;
                            this.message = "";

                            if (Number(res.data.status) === 1) {
                                this.message = res.data.message;
                                this.showRegisterForm = false;
                                this.user = {
                                    email: "",
                                    password: "",
                                };
                            } else {
                                this.hasError = true;
                                toastr.error(res.data.error);
                            }
                            // if (res.data.user) {
                            //     $("#modalLogin").modal("toggle");
                            //     vueData.isLogin = true;
                            //     vueData.user = res.data.user;
                            //     localStorage.setItem(
                            //         "auth",
                            //         JSON.stringify(res.data),
                            //     );
                            //     location.reload();
                            // } else {
                            //     this.hasError = true;
                            //     toastr.error(res.data.error);
                            // }
                        }.bind(this)
                    )
                    .catch(
                        function (error) {
                            this.isLoading = false;
                            this.hasError = true;
                            toastr.error(error.response.data.error);
                        }.bind(this)
                    );
            }
        },
    },
});