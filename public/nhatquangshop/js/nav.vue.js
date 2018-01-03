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