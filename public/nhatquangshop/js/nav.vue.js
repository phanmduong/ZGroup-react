var navVue = new Vue({
    el: '#vue-nav',
    data: {
        hasError: false,
        isLoading: false,
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
            axios.post(url)
                .then(function (res) {
                    this.isLoading = false;
                    if (res.data.status === 0) {
                        this.hasError = true;
                    } else {
                    }
                }.bind(this));
        }
    }
});