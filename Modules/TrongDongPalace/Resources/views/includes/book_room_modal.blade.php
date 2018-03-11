
@push('scripts')
    <script>
        function openSubmitModal(room_id) {
            console.log(room_id);
            submitModal.room_id = room_id;
            $('#submitModal').modal('show');
        }

        var submitModal = new Vue({
            el: '#submitModal',
            data: {
                name: '',
                email: '',
                phone: '',
                message: '',
                alert: '',
                saler_id: {{$saler_id}},
                campaign_id: {{$campaign_id}},
                room_id: 0,
                isLoading: false
            },
            methods: {
                submit: function () {
                    console.log(this.room_id);
                    if (this.name === '' || this.email === '' || this.phone === '' || this.message === '') {
                        this.alert = 'Bạn vui lòng nhập đủ thông tin';
                        return;
                    }
                    this.isLoading = true;
                    axios.post(window.url + '/api/booking', {
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        message: this.message,
                        saler_id: this.saler_id,
                        campaign_id: this.campaign_id,
                        room_id: this.room_id,
                        _token: window.token
                    })
                        .then(function (response) {
                            this.name = "";
                            this.phone = "";
                            this.email = "";
                            this.message = "";
                            this.isLoading = false;
                            $("#submitModal").modal("hide");
                            $("#modalSuccess").modal("show");
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        });
    </script>
@endpush

