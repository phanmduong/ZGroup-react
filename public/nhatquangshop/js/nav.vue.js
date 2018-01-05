/* jshint ignore:start */
var navVue = new Vue({
    el: '#vue-nav',
    data: {
        hasError: false,
        isLoading: false,
        showLoggedNav: false,
        user: {
            email: "",
            password: ""
        }
    },
    methods: {
        onFacebookLoginButtonClick: function () {
            $("#global-loading").css("display", "block");
            FB.login(function (response) {
                if (response.status === 'connected') {
                    axios.get("/api/facebook/tokensignin?input_token=" + response.authResponse.accessToken + "&facebook_id=" + response.authResponse.userID)
                        .then(function (res) {
                            if (res.data.status === 1) {
                                navVue.changeLoginCondition(res.data.user);
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
            // console.log(res);
            // $("#global-loading").css("display", "block");
            // FB.getLoginStatus(function (response) {
            //     console.log(response);
            //     if (response.status === 'connected') {
            //         console.log('Logged in.');
            //         axios.get("/api/facebook/tokensignin?input_token=" + response.authResponse.accessToken + "&facebook_id=" + response.authResponse.userID)
            //             .then(function (res) {
            //                 if (res.data.status === 1) {
            //                     navVue.changeLoginCondition(res.data.user);
            //                 } else {
            //                     $("#loginFailNoticeModal").modal("toggle");
            //                 }
            //                 $("#global-loading").css("display", "none");
            //             });
            //
            //     } else {
            //         FB.login();
            //     }

            // });
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