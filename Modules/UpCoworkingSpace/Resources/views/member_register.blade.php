@extends('upcoworkingspace::layouts.master')

@section('content')
    <div class="page-header page-header-xs"
         style="background-image: url('http://up-co.vn/wp-content/uploads/revslider/homevi/126A6996.jpg'); height: 350px">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h4 class="description"><b>UP CO-WORKING SPACE</b></h4>
                        <h1 class="title">
                            Gói thành viên
                        </h1>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:20px">
        <div class="container">
            <div class="row">
                @foreach($userPacks as $userPack)
                    <div class="col-md-4">
                        <div class="card card-plain card-blog">
                            <div class="card-image">
                                <a href="{{'/conference-room/'.$userPack->id}}">
                                    <div style="width: 100%;
                                            border-radius: 15px;
                                            background: url({{generate_protocol_url($userPack->avatar_url)}});
                                            background-size: cover;
                                            background-position: center;
                                            padding-bottom: 70%;"
                                    ></div>
                                </a>
                            </div>
                            <div class="card-block">
                                <h3 class="card-title">
                                    <a href="{{'/conference-room/'.$userPack->id}}">{{$userPack->name}}</a>
                                </h3>
                                <br/>
                                <a data-target="#submitModal"
                                    data-toggle="modal"
                                   class="btn btn-primary"
                                   style="background-color:#96d21f;border-color:#96d21f; color:white!important;">
                                    <b>Đặt chỗ</b>
                                </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
        <hr>
    </div>

    <!-- <div id="memberRegister" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí </h3></div>
                <div id="modal-body" class="modal-body">
                    <div v-if="provinceLoading" class="container">
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
                        <br>
                        <div class="container">
                            <h3>Chọn thời lượng</h3>
                            <br>
                            <ul class="nav nav-pills nav-pills-up">
                                <li v-for="subscription in subscriptions"
                                    class="nav-item"
                                    v-bind:class="{active: subscription.is_active }">
                                    <a class="nav-link"
                                       data-toggle="pill"
                                       v-on:click="subscriptionOnclick(event, subscription.id)"
                                       role="tab"
                                       aria-expanded="false"> @{{ subscription.subscription_kind_name }}
                                    </a>
                                </li>
                            </ul>
                            <br>
                            <div class="col-md-12">
                                <h6>Gói thành viên: </h6>
                                <p>@{{ userPackName }}</p>
                                <br>
                                <h6>Mô tả: </h6>
                                <p>@{{ description }}</p>
                                <br>
                                <h6>Chi phí: </h6>
                                <p>@{{ vnd_price }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="alert alert-danger" v-if="message"
                         style="margin-top: 10px"
                         id="purchase-error">
                        @{{ message }}
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

    <div id="memberRegisterInfo" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí </h3></div>
                <div id="modal-body" class="modal-body">
                    <div class="container">
                        <form class="register-form ">
                            <form class="register-form ">
                                <h6>Họ và tên</h6>
                                <input style="border: 1px solid #d0d0d0 !important" v-model="name" type="text" class="form-control" placeholder="Họ và tên"><br>
                                <h6>Số điện thoại</h6>
                                <input style="border: 1px solid #d0d0d0 !important" v-model="phone" type="text" class="form-control" placeholder="Số điện thoại"><br>
                                <h6>Email</h6>
                                <input style="border: 1px solid #d0d0d0 !important" v-model="email" type="text" class="form-control" placeholder="Địa chỉ email"><br>
                                <h6>Địa chỉ</h6>
                                <input style="border: 1px solid #d0d0d0 !important" v-model="address" type="text" class="form-control" placeholder="Địa chỉ"><br>
                            </form>
                        </form>
                    </div>
                    <div class="alert alert-danger" v-if="message"
                         style="margin-top: 10px"
                         id="purchase-error">
                        @{{ message }}
                    </div>
                    <div v-if="isLoading" class="container">
                        <div style="text-align: center;width: 100%;;padding: 15px;">
                            @include('upcoworkingspace::includes.loading')
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-purchase" class="btn btn-sm btn-main"
                            v-on:click="submit"
                            v-bind:disabled="disableSubmitButton"
                            style="margin: 10px 10px 10px 0px !important; background-color: #96d21f; border-color: #96d21f">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div> -->

@endsection

@push('scripts')
    <script>
        // var memberRegister = new Vue({
        //     el: "#memberRegister",
        //     data: {
        //         provinces: [],
        //         bases: [],
        //         userPackId: 0,
        //         provinceId: '',
        //         baseId: '',
        //         baseLoading: false,
        //         provinceLoading: false,
        //         subscriptions: [],
        //         subscriptionId: 0,
        //         userPackName: '',
        //         description: '',
        //         vnd_price: '',
        //         message: ''
        //     },
        //     methods: {
        //         changeProvince: function () {
        //             this.baseId = '';
        //             this.getBases();
        //         },
        //         getProvinces: function () {
        //             this.provinceLoading = true;
        //             axios.get(window.url + '/api/province')
        //                 .then(function (response) {
        //                     this.provinces = response.data.provinces;
        //                     axios.get(window.url + '/api/user-pack/' + this.userPackId)
        //                         .then(function (response) {
        //                             this.subscriptions = response.data.user_pack.subscriptions;
        //                             this.userPackName = response.data.user_pack.name;
        //                             this.subscriptionId = this.subscriptions[0].id;
        //                             this.description = this.subscriptions[0].description;
        //                             this.vnd_price = this.subscriptions[0].vnd_price;
        //                             this.provinceLoading = false;
        //                         }.bind(this))
        //                         .catch(function (reason) {
        //                         });
        //                 }.bind(this))
        //                 .catch(function (reason) {
        //                 });
        //         },
        //         getBases: function () {
        //             this.baseLoading = true;
        //             axios.get(window.url + '/api/province/' + this.provinceId + '/base')
        //                 .then(function (response) {
        //                     this.bases = response.data.bases;
        //                     this.baseLoading = false;
        //                 }.bind(this))
        //                 .catch(function (reason) {
        //                 });
        //         },
        //         subscriptionOnclick: function (event, subscriptionId) {
        //             console.log(subscriptionId);
        //             this.subscriptionId = subscriptionId;
        //             var temp = this.subscriptions.filter(function (subscription) {
        //                 return subscription.id === subscriptionId;
        //             })[0];
        //             this.description = temp.description;
        //             this.vnd_price = temp.vnd_price;
        //         },
        //         submit: function () {
        //             if (this.baseId === '') {
        //                 this.message = 'Xin bạn vui lòng chọn cơ sở';
        //                 console.log('wtf');
        //                 return;
        //             }
        //             memberRegisterInfo.subscriptionId = this.subscriptionId;
        //             memberRegisterInfo.baseId = this.baseId;
        //             $("#memberRegister").modal("hide");
        //             $("#memberRegisterInfo").modal("show");
        //         }
        //     },
        // });

        var pickingUserPack = new Vue({
            el: '#pickingUserPack',
            data: {},
            methods: {
                openModal: function () {
                    // memberRegister.getProvinces();
                    console.log($('#submitModal'));
                    $("#submitModal").modal("show");
                    // memberRegister.userPackId = userPackId;
                }
            }
        });

        // var memberRegisterInfo = new Vue({
        //     el: '#memberRegisterInfo',
        //     data: {
        //         campaignId: {{$campaignId}},
        //         salerId: {{$userId}},
        //         subscriptionId: 0,
        //         baseId: 0,
        //         name: '',
        //         email: '',
        //         phone: '',
        //         address: '',
        //         message: '',
        //         isLoading: false,
        //         disableSubmitButton: false,
        //     },
        //     methods: {
        //         validateEmail: function validateEmail(email) {
        //             var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //             return re.test(email.toLowerCase());
        //         },
        //         submit: function () {
        //             console.log(this.campaignId + '   ' + this.salerId);
        //             if (this.name === '' || this.email === '' || this.phone === '' || this.address === '') {
        //                 this.message = 'Bạn vui lòng nhập đủ thông tin';
        //                 return;
        //             }
        //             if (this.validateEmail(this.email) === false) {
        //                 this.message = 'Bạn vui lòng kiểm tra lại email';
        //                 return;
        //             }
        //             this.isLoading = true;
        //             this.message = '';
        //             this.disableSubmitButton = true;
        //             axios.post(window.url + '/api/register', {
        //                 name: this.name,
        //                 phone: this.phone,
        //                 email: this.email,
        //                 address: this.address,
        //                 subscription_id: this.subscriptionId,
        //                 base_id: this.baseId,
        //                 campaign_id: this.campaignId,
        //                 saler_id: this.salerId,
        //                 _token: window.token
        //             })
        //                 .then(function (response) {
        //                     this.name = "";
        //                     this.phone = "";
        //                     this.email = "";
        //                     this.address = "";
        //                     this.isLoading = false;
        //                     this.disableSubmitButton = false;
        //                     $("#memberRegisterInfo").modal("hide");
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

