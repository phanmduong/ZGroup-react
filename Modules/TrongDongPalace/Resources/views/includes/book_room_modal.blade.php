<div id="submitModal" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí đặt chỗ </h3></div>
                <div id="modal-body" class="modal-body">
                    <div class="container">
                        <form class="register-form ">
                            <h6>Họ và tên</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="name" type="text" class="form-control" placeholder="Họ và tên"><br>
                            <h6>Số điện thoại</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="phone" type="text" class="form-control" placeholder="Số điện thoại"><br>
                            <h6>Email</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="email" type="text" class="form-control" placeholder="Địa chỉ email"><br>
                            <h6>Lời nhắn</h6>
                            <input style="border: 1px solid #d0d0d0 !important" v-model="message" type="text" class="form-control" placeholder="Lời nhắn"><br>
                        </form>
                    </div>
                    <div class="alert alert-danger" v-if="alert"
                         style="margin-top: 10px"
                         id="purchase-error">
                        @{{ alert }}
                    </div>
                </div>
                <div v-if="isLoading" style="text-align: center;width: 100%;;padding: 15px;">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-purchase" class="btn btn-sm btn-main"
                            style="margin: 10px 10px 10px 0px !important; background-color: #BA8A45; border-color: #BA8A45"
                            v-on:click="submit">
                        Xác nhận</i>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="modalSuccess" class="modal fade">
        <div class="modal-dialog modal-large">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h2 class="medium-title">Chúc mừng bạn đã đăng ký thành công</h2>
                </div>
                <div class="modal-body">
                    {{--<img class="vc_single_image-img " src="http://up-co.vn/wp-content/uploads/2016/08/384x176logo_03-120x120.png" width="120" height="120" alt="384x176logo_03-120x120" title="384x176logo_03-120x120">--}}
                    <div style='text-align: center'>
                        Trống Đồng Palace đã nhận được đăng ký của bạn, bạn vui lòng kiểm tra email.<br>
                        Trống Đồng Palace sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                    </div>
                </div>
            </div>
        </div>
    </div>
    
@push('scripts')
    <script>
        function openSubmitModal(room_id) {
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

