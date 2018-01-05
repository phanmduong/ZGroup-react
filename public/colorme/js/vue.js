var modalLogin = new Vue({
    el: '#modalLogin',
    data: {
        user: {
            email: '',
            password: ''
        },
        isLoading: false,
        hasError: false,
    },
    methods: {
        login: function () {
            var url = 'http://api.' + window.origin.location + "/api/login";
            this.isLoading = true;
            this.hasError = false;
            axios.post(url, this.user)
                .then(function (res) {
                    this.isLoading = false;
                    if (res.data.status === 0) {
                        this.hasError = true;
                    } else {
                        $('#modalLogin').modal('toggle');
                    }
                }.bind(this));
        }
    }

});

var vueNav = new Vue({
    el: '#vue-nav',
    methods: {
        openModalLogin: function () {
            console.log("onopen");
            console.log(modalLogin.user.email);
            modalLogin.user.email = '';
            modalLogin.user.password = '';
        }
    }
});