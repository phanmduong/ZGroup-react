var submitForm = new Vue({
    el: "#submitForm",
    data: {
        name: '',
        phone: '',
        email: '',
        register: true,
        class_id: classId,
        saler_id: salerId,
        campaign_id: campaignId,
        isLoading: false,
        message: 'Nhớ kiểm tra kĩ thông tin bạn nhé'
    },
    methods: {
        submitOnclick: function (event) {
            event.preventDefault();
            this.isLoading = true;
            this.register = false;
            this.message = 'Hệ thống đang xử lý, bạn vui lòng chờ một chút';
            axios.post(window.url + '/classes/new_register_store', {
                name: this.name,
                phone: this.phone,
                email: this.email,
                class_id: this.class_id,
                saler_id: this.saler_id,
                campaign_id: this.campaign_id,
                _token: window.token
            })
                .then(function (response) {
                    $("#message-box").css('background-color', 'green');
                    $("#message-box").css('color', 'white');
                    this.isLoading = false;
                    this.message = 'Đăng ký thành công, bạn vui lòng check email để kiểm tra thông tin';
                    this.name = "";
                    this.email = "";
                    this.phone = "";
                }.bind(this))
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
});