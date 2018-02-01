<div id="userPackModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí </h3></div>
            <div id="modal-body" class="modal-body">
                <div v-if="modalLoading" class="container">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        @include('upcoworkingspace::includes.loading')
                    </div>
                </div>
                <div v-else="modalLoading" class="container">
                    <div class="row" style="padding: 10px">
                        <select v-on:change="changeProvince"
                                v-model="provinceId"
                                placeholder="Tỉnh/Thành phố"
                                class="form-control">
                            <option value="" selected>Tỉnh, Thành phố</option>
                            <option v-for="province in provinces" v-bind:value="province.id">
                                @{{province.name}}
                            </option>
                        </select>
                    </div>
                    <div v-if="provinceId" class="row" style="padding: 10px">
                        <div v-if="baseLoading" style="text-align: center;width: 100%;;padding: 15px;">
                            @include('upcoworkingspace::includes.loading')
                        </div>
                        <select v-else="baseLoading"
                                v-model="baseId"
                                placeholder="Cơ sở"
                                class="form-control">
                            <option value="" selected>Cơ sở</option>
                            <option v-for="base in bases" v-bind:value="base.id">
                                @{{base.name}}
                            </option>
                        </select>
                    </div>
                    <h3>Chọn gói thành viên</h3>
                    <div class="row">
                        <div v-for="userPack in userPacks" class="col-md-4">
                            <a>
                                <div v-on:click="pickSubscription(event, userPack.id)"
                                     class="card card-profile"
                                     v-bind:style="{'background-image': 'url('+userPack.avatar_url+')', 'padding-bottom': '70%', 'background-size': 'cover', 'background-position': 'center'}">
                                </div>
                                <h6>
                                    @{{ userPack.name }}
                                </h6>
                                <p>
                                    @{{ userPack.detail }}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="alert alert-danger" v-if="message"
                     style="margin-top: 10px"
                     id="purchase-error">
                    @{{ message }}
                </div>
            </div>
        </div>
    </div>
</div>

<div id="subscriptionModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí </h3></div>
            <div id="modal-body" class="modal-body">

                <div class="container">
                    {{--<h6 style="text-align: center">Chào bạn,</h6>--}}
                    {{--<p style="text-align: center">Bạn đang tiến hành đặt chỗ tại @{{base.name}}.</p>--}}
                    {{--<p style="text-align: center">Vui lòng chọn gói dịch vụ mà bạn muốn.</p>--}}
                        <ul class="nav nav-pills nav-pills-up center-pills">
                            <li v-for="subscription in userPack.subscriptions"
                                class="nav-item"
                                v-bind:class="{active: subscription.isActive }">
                                <a class="nav-link"
                                   data-toggle="pill" v-on:click="subscriptionOnclick(event, subscription.id)" role="tab" aria-expanded="false">
                                    @{{ subscription.subscription_kind_name }}
                                </a>
                            </li>
                        </ul>
                        {{--<div class="col-md-6">--}}
                            {{--<h6>Gói thành viên: </h6>--}}
                            {{--<p>@{{ userPack.name }}</p>--}}
                            {{--<br>--}}
                            {{--<h6>Mô tả: </h6>--}}
                            {{--<p>@{{ subscription.description }}</p>--}}
                            {{--<br>--}}
                            {{--<h6>Chi phí: </h6>--}}
                            {{--<p>@{{ subscription.vnd_price }}</p>--}}
                        {{--</div>--}}
                </div>
            </div>
            <div class="modal-footer">
                <button id="btn-purchase" class="btn btn-sm btn-main"
                        style="margin: 10px 10px 10px 0px !important; background-color: #96d21f; border-color: #96d21f"
                        v-on:click="submit">
                    Đăng kí</i>
                </button>
            </div>
        </div>
    </div>
</div>

{{--<div id="submitModal" class="modal fade show">--}}
    {{--<div class="modal-dialog modal-lg">--}}
        {{--<div class="modal-content">--}}
            {{--<div class="modal-header">--}}
                {{--<button type="button" data-dismiss="modal" class="close">×</button>--}}
                {{--<h3 class="medium-title">Đăng kí </h3></div>--}}
            {{--<div id="modal-body" class="modal-body">--}}
                {{--<div class="container">--}}
                    {{--<h6 style="text-align: center">Chào bạn,</h6>--}}
                    {{--<p style="text-align: center">Bạn đang tiến hành đặt chỗ tại @{{base.name}}.</p>--}}
                    {{--<p style="text-align: center">Vui lòng chọn gói dịch vụ mà bạn muốn.</p>--}}
                    {{--<form class="register-form ">--}}
                        {{--<h6>Họ và tên</h6>--}}
                        {{--<input v-model="name" type="text" class="form-control" placeholder="Họ và tên"><br>--}}
                        {{--<h6>Số điện thoại</h6>--}}
                        {{--<input v-model="phone" type="text" class="form-control" placeholder="Số điện thoại"><br>--}}
                        {{--<h6>Email</h6>--}}
                        {{--<input v-model="email" type="text" class="form-control" placeholder="Số điện thoại"><br>--}}
                        {{--<h6>Địa chỉ</h6>--}}
                        {{--<input v-model="address" type="text" class="form-control" placeholder="Số điện thoại"><br>--}}
                    {{--</form>--}}
                {{--</div>--}}
                {{--<div class="alert alert-danger" v-if="message"--}}
                     {{--style="margin-top: 10px"--}}
                     {{--id="purchase-error">--}}
                    {{--@{{ message }}--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<div class="modal-footer">--}}
                {{--<button id="btn-purchase" class="btn btn-sm btn-main"--}}
                        {{--style="margin: 10px 10px 10px 0px !important; background-color: #96d21f; border-color: #96d21f"--}}
                        {{--v-on:click="submit">--}}
                    {{--Xác nhận</i>--}}
                {{--</button>--}}
            {{--</div>--}}
        {{--</div>--}}
    {{--</div>--}}
{{--</div>--}}

<div id="modalSuccess" class="modal fade">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Đăng ký thành công</h2>
            </div>
            <div class="modal-body">
                <div style='text-align: center'>
                    Up đã nhận được đăng ký của bạn, bạn vui lòng kiểm tra email.<br>
                    Up sẽ liên hệ lại với bạn trong thời gian sớm nhất.
                </div>
            </div>
        </div>
    </div>
</div>

@push('scripts')
    <script>
        var userPackModal = new Vue(
            {
                el: "#userPackModal",
                data: {
                    provinces: [],
                    bases: [],
                    userPacks: [],
                    provinceId: '',
                    baseId: '',
                    baseLoading: false,
                    provinceLoading: false,
                    userPackLoading: false,
                    modalLoading: false,
                    message: ''
                },
                methods: {
                    changeProvince: function () {
                        this.baseId = '';
                        this.getBases();
                    },
                    getProvinces: function () {
                        this.provinceLoading = true;
                        this.modalLoading = true;
                        axios.get(window.url + '/api/province')
                            .then(function (response) {
                                this.provinces = response.data.provinces;
                                this.provinceLoading = false;
                                if (this.userPackLoading === false)
                                    this.modalLoading = false;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    getUserPacks: function () {
                        this.userPackLoading = true;
                        this.modalLoading = true;
                        axios.get(window.url + '/api/user-packs')
                            .then(function (response) {
                                this.userPacks = response.data.data.user_packs;
                                for (i = 0; i < this.userPacks.length; i++)
                                    for (j = 0; j < this.userPacks[i].subscriptions.length; j++) {
                                        this.userPacks[i].subscriptions[j].vnd_price = this.userPacks[i].subscriptions[j].price.toString().replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + 'đ';
                                        this.userPacks[i].subscriptions[j].isActive = (j === 0);
                                    }
                                this.userPackLoading = false;
                                if (this.provinceLoading === false)
                                    this.modalLoading = false;
                                console.log(this.userPacks);
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    getBases: function () {
                        this.baseLoading = true;
                        axios.get(window.url + '/api/province/' + this.provinceId + '/base')
                            .then(function (response) {
                                this.bases = response.data.bases;
                                this.baseLoading = false;
                            }.bind(this))
                            .catch(function (reason) {
                            });
                    },
                    pickSubscription: function (event, userPackId) {
                        if (this.baseId === '') {
                            this.message = 'Xin bạn vui lòng chọn cơ sở';
                            return;
                        }
                        subscriptionModal.userPack = [];
                        userPack = this.userPacks.filter(function (userPack) {
                            return userPack.id === userPackId;
                        })[0];
                        for (j = 0; j < userPack.subscriptions.length; j++)
                            userPack.subscriptions[j].isActive = (j === 0);
                        subscriptionModal.userPack = userPack;
                        subscriptionModal.base = this.bases.filter(function (base) {
                            return base.id === this.baseId;
                        }.bind(this))[0];
                        subscriptionModal.subscription = subscriptionModal.userPack.subscriptions[0];
                        subscriptionModal.subscriptionId = subscriptionModal.userPack.subscriptions[0].id;
                        subscriptionModal.description = subscriptionModal.subscription.description;
                        subscriptionModal.vnd_price = subscriptionModal.subscription.vnd_price;
                        console.log('asdasd');

                        $("#userPackModal").modal("hide");
                        $("#subscriptionModal").modal("show");
                    }
                },
                mounted: function () {
                    this.getProvinces();
                    this.getUserPacks();
                }
            });

        var subscriptionModal = new Vue({
            el: '#subscriptionModal',
            data: {
                userPack: [],
                base: [],
                subscriptionId: 0,
                subscriptionIndex: 0,
                subscription: [],
                description: '',
                vnd_price: ''
            },
            methods: {
                subscriptionOnclick: function (event, subscriptionId) {
                    // if (this.subscriptionId !== 0)
                    //     $('#subscription' + this.subscriptionId + this.userPack.id).css({
                    //         'background-color': '#c1c1c1',
                    //         'border-color': '#c1c1c1'
                    //     });
                    // $('#subscription' + subscriptionId + this.userPack.id).css({
                    //     'background-color': '#96d21f',
                    //     'border-color': '#96d21f'
                    // });
                    this.subscriptionId = subscriptionId;
                    this.subscription = this.userPack.subscriptions.filter(function (subscription) {
                        return subscription.id === subscriptionId;
                    })[0];
                },
                submit: function () {
                    // submitModal.subscriptionId = this.subscriptionId;
                    // $("#subscriptionModal").modal("hide");
                    // $("#submitModal").modal("show");
                }
            }
        });

        // var submitModal = new Vue({
        //     el: '#submitModal',
        //     data: {
        //         name: '',
        //         email: '',
        //         phone: '',
        //         address: '',
        //         message: '',
        //         subscriptionId: 0,
        //     },
        //     methods: {
        //         submit: function () {
        //             if (this.name === '' || this.email === '' || this.phone === '' || this.address === '') {
        //                 this.message = 'Bạn vui lòng nhập đủ thông tin';
        //                 return;
        //             }
        //             axios.post(window.url + '/api/register', {
        //                 name: this.name,
        //                 phone: this.phone,
        //                 email: this.email,
        //                 address: this.address,
        //                 subscription_id: this.subscriptionId,
        //                 _token: window.token
        //             })
        //                 .then(function (response) {
        //                     name = "";
        //                     phone = "";
        //                     email = "";
        //                     address = "";
        //                     $("#submitModal").modal("hide");
        //                     $("#modalSuccess").modal("show");
        //                 }.bind(this))
        //                 .catch(function (error) {
        //                     console.log(error);
        //                 });
        //         }
        //     }
        // });
    </script>
@endpush
