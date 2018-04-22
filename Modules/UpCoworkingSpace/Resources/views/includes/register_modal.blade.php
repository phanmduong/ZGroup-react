<div id="submitModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí </h3>
            </div>
            <div id="modal-body" class="modal-body">
                <div class="container">
                    <form class="register-form ">
                        <h6>Họ và tên</h6>
                        <input style="border: 1px solid #d0d0d0 !important" v-model="name" type="text" class="form-control" placeholder="Họ và tên">
                        <br>
                        <h6>Số điện thoại</h6>
                        <input style="border: 1px solid #d0d0d0 !important" v-model="phone" type="text" class="form-control" placeholder="Số điện thoại">
                        <br>
                        <h6>Email</h6>
                        <input style="border: 1px solid #d0d0d0 !important" v-model="email" type="text" class="form-control" placeholder="Địa chỉ email">
                        <br>
                        <h6>Địa chỉ</h6>
                        <input style="border: 1px solid #d0d0d0 !important" v-model="address" type="text" class="form-control" placeholder="Địa chỉ">
                        <br>
                        <h6>Cơ sở</h6>
                        <div v-if="provinceLoading" style="text-align: center;width: 100%;;padding: 15px;">
                            @include('upcoworkingspace::includes.loading')
                        </div>
                        <div v-else="provinceLoading" style="margin-bottom:5px">
                            <select v-on:change="changeProvince" v-model="provinceId" placeholder="Tỉnh/Thành phố" class="form-control" style="height:calc(2.5rem) !important;padding: 7px 12px; border: 1px solid #d0d0d0 !important">
                                <option value="" selected>Tỉnh, Thành phố</option>
                                <option v-for="province in provinces" v-bind:value="province.id">
                                    @{{province.name}}
                                </option>
                            </select>
                        </div>
                        <div v-if="provinceId" style="margin-top:5px">
                            <div v-if="baseLoading" style="text-align: center;width: 100%;">
                                @include('upcoworkingspace::includes.loading')
                            </div>
                            <select v-else="baseLoading" v-model="baseId" placeholder="Cơ sở" class="form-control" style="height:calc(2.5rem) !important;padding: 7px 12px; border: 1px solid #d0d0d0 !important">
                                <option value="" selected>Cơ sở</option>
                                <option v-for="base in bases" v-bind:value="base.id">
                                    @{{base.name}}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="alert alert-danger" v-if="message" style="margin-top: 10px" id="purchase-error">
                    @{{ message }}
                </div>
                <div v-if="isLoading" class="container">
                    <div style="text-align: center;width: 100%">
                        @include('upcoworkingspace::includes.loading')
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn-purchase" class="btn btn-sm btn-main" style="margin: 10px 10px 10px 0px !important; background-color: #96d21f; border-color: #96d21f"
                    v-bind:disabled="disableSubmitButton" v-on:click="submit">
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
                {{--
                <img class="vc_single_image-img " src="http://up-co.vn/wp-content/uploads/2016/08/384x176logo_03-120x120.png"
                    width="120" height="120" alt="384x176logo_03-120x120" title="384x176logo_03-120x120">--}}
                <div style='text-align: center'>
                    Up đã nhận được đăng ký của bạn, bạn vui lòng kiểm tra email.
                    <br> Up sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
<script>
    var submitModal = new Vue({
        el: '#submitModal',
        data: {
            name: '',
            email: '',
            phone: '',
            address: '',
            message: '',
            baseId: 0,
            bases: [],
            provinceId: '',
            provinces: [],
            baseLoading: false,
            provinceLoading: false,
            isLoading: false,
            disableSubmitButton: false,
        },
        methods: {
            validateEmail: function validateEmail(email) {
                var re =
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email.toLowerCase());
            },
            getProvinces: function () {
                this.provinceLoading = true;
                axios.get(window.url + '/api/province')
                    .then(function (response) {
                        this.provinces = response.data.provinces;
                        this.provinceLoading = false;
                    }.bind(this))
                    .catch(function (reason) {});
            },
            changeProvince: function () {
                this.baseId = '';
                this.getBases();
            },
            getBases: function () {
                this.baseLoading = true;
                axios.get(window.url + '/api/province/' + this.provinceId + '/base')
                    .then(function (response) {
                        this.bases = response.data.bases;
                        this.baseLoading = false;
                    }.bind(this))
                    .catch(function (error) {

                    });
            },
            submit: function () {
                console.log(this.baseId);
                if (this.name === '' || this.email === '' || this.phone === '' || this.address === '') {
                    this.message = 'Bạn vui lòng nhập đủ thông tin';
                    return;
                }
                if (this.validateEmail(this.email) === false) {
                    this.message = 'Bạn vui lòng kiểm tra lại email';
                    return;
                }
                if (this.baseId == 0 || this.baseId == '') {
                    this.message = 'Bạn vui lòng chọn cơ sở';
                    return;
                }
                this.isLoading = true;
                this.disableSubmitButton = true;
                this.message = '';
                axios.post(window.url + '/api/register', {
                        name: this.name,
                        phone: this.phone,
                        email: this.email,
                        address: this.address,
                        base_id: this.baseId,
                        _token: window.token
                    })
                    .then(function (response) {
                        this.disableSubmitButton = false;
                        this.isLoading = false;
                        this.name = "";
                        this.phone = "";
                        this.email = "";
                        this.address = "";
                        this.baseId = 0;
                        $("#submitModal").modal("hide");
                        $("#modalSuccess").modal("show");
                    }.bind(this))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
        mounted: function () {
            this.getProvinces();
            // this.getBases();
        }
    });
</script>
@endpush
