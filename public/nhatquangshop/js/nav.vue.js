/* jshint ignore:start */
var navVue = new Vue({
    el: '#vue-nav',
    data: {
        hasError: false,
        isLoading: false,
        showLoggedNav: false,
        user: window.INIT_USER,
        isSubmitUserInfo: false,
        errorMessage: "",
        captcha: ""
    },
    methods: {
        onSubmitUpdateUserInfo: function () {
            this.errorMessage = "";
            this.isSubmitUserInfo = true;
            var url = "/api/user";
            axios.put(url, {
                email: this.user.email,
                password: this.user.newPassword,
                phone: this.user.phone,
                captcha: this.captcha
            })
                .then(function (res) {
                    this.isSubmitUserInfo = false;
                    if (res.data.status === 0) {
                        this.errorMessage = res.data.message;
                    } else {
                        window.location.href = "/";
                    }
                }.bind(this));
        },

        validEmail: function () {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(this.user.email.toLowerCase());
        },
        validPhone: function () {
            var phoneno = /^\d{9}\d*$/;
            return this.user.phone !== "" && phoneno.test(this.user.phone);
        },
        validPassword: function () {
            return this.user.newPassword && this.user.newPassword.length >= 8;
        },
        validConfirmPassword: function () {
            return this.user.confirmPassword !== '' && this.user.newPassword !== ''
                && this.user.newPassword === this.user.confirmPassword;
        },
        submitDisable: function () {
            var user = this.user;
            return user.newPassword === '' || this.captcha === '' || user.phone === '' ||
                user.confirmPassword === '' || !this.validPhone() || !this.validPassword() ||
                !this.validConfirmPassword() || this.isSubmitUserInfo;
        },
        onFacebookLoginButtonClick: function () {
            $("#global-loading").css("display", "block");
            FB.login(function (response) {
                if (response.status === 'connected') {
                    axios.get("/api/facebook/tokensignin?input_token=" + response.authResponse.accessToken + "&facebook_id=" + response.authResponse.userID)
                        .then(function (res) {

                            if (res.data.status === 1) {
                                var user = res.data.user;
                                navVue.changeLoginCondition(user);
                                // console.log(user.first_login);
                                if (!user.first_login) {
                                    $("#updateUserInfoModal").modal({
                                        backdrop: 'static',
                                        keyboard: false
                                    });
                                }

                            } else {
                                $("#loginFailNoticeModal").modal("toggle");
                            }
                            $("#global-loading").css("display", "none");
                        });

                } else {
                    $("#loginFailNoticeModal").modal("toggle");
                    $("#global-loading").css("display", "none");
                }
            });
        },
        changeLoginCondition: function (user) {
            this.showLoggedNav = true;
            this.user = user;
            localStorage.setItem("k-user", JSON.stringify(this.user));
            $("#logged-nav").css("display", "block");
        },
        onClickLoginButton: function () {
            var url = "/api/login";
            this.isLoading = true;
            this.hasError = false;
            axios.post(url, this.user)
                .then(function (res) {
                    this.isLoading = false;
                    if (res.data.status === 0) {
                        this.hasError = true;
                    } else {
                        this.changeLoginCondition(res.data.user);
                        $('#loginModal').modal('toggle');
                    }
                }.bind(this));
        }
    }
});
/* jshint ignore:end */