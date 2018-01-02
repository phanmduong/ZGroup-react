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
                        this.showLoggedNav = true;
                        this.user = res.data.user;

                        localStorage.setItem("k-user", JSON.stringify(this.user));
                        $('#loginModal').modal('toggle');

                        $("#logged-nav").css("display", "block");
                    }
                }.bind(this));
        }
    }
});

/* jshint ignore:end */