var vueNav = new Vue({
    el: '#vue-nav',
    data: {
        isLogin: false
    },
    methods: {
        openModalLogin: function () {
            modalLogin.user.email = '';
            modalLogin.user.password = '';
            modalLogin.isClose = false;
        },
        logout: function () {
            localStorage.removeItem('auth');
        }
    }
});

var vueComments = new Vue({
    el: '#vue-comments',
    data: {
        isLogin: false,
        user: {},
        comment: '',
        isStoring: false,
    },
    methods: {
        createComment: function (e, lessonId) {
            if (e.keyCode === 13 && !e.shiftKey) {
                e.preventDefault();
                this.isStoring = true;
                var url = "/elearning/" + lessonId + "/add-comment";
                axios.post(url, {
                    lesson_id: lessonId,
                    content_comment: this.comment
                }).then(function (res) {
                        console.log(res.data);
                        this.comment = '';
                        this.isStoring = false;
                    }.bind(this)
                );
            }

        }
    }
});

var modalLogin = new Vue({
    el: '#modalLogin',
    data: {
        user: {
            email: '',
            password: ''
        },
        isLoading: false,
        hasError: false,
        isClose: false
    },
    methods: {
        login: function () {
            var url = "/login-social";
            this.isLoading = true;
            this.hasError = false;
            this.isClose = true;
            axios.post(url, this.user)
                .then(function (res) {
                    this.isLoading = false;
                    this.isClose = false;
                    if (res.data.status === 0) {
                        this.hasError = true;
                        toastr.error("Kiểm tra thông tin tài khoản");
                    } else {
                        $('#modalLogin').modal('toggle');
                        vueNav.isLogin = true;
                        vueNav.user = res.data.user;
                        vueComments.isLogin = true;
                        vueComments.user = res.data.user;
                        localStorage.setItem('auth', JSON.stringify(res.data));
                    }
                }.bind(this));
        },
    }

});