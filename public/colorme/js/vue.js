var modalLogin = new Vue({
    el: '#modalLogin',
    data: {
        user: {
            email: '',
            password: ''
        },
    },
    methods: {
        login: function () {
            console.log(this.user);
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