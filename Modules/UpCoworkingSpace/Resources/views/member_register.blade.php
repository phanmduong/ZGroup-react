@extends('upcoworkingspace::layouts.master')

@section('content')
    <div id="memberRegisterInfo" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí </h3></div>
                <div id="modal-body" class="modal-body">
                    <div class="container">
                        <form class="register-form ">

                            <h6>Họ và tên</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Họ và tên"><br>
                            <h6>Số điện thoại</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Số điện thoại"><br>
                            <h6>Email</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Địa chỉ email"><br>
                            <h6>Địa chỉ</h6>
                            <input style="border: 1px solid #d0d0d0 !important" type="text" class="form-control"
                                   placeholder="Địa chỉ"><br>
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="btn-purchase" class="btn btn-sm btn-main"
                            v-on:click="submit"
                            style="margin: 10px 10px 10px 0px !important; background-color: #96d21f; border-color: #96d21f">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div id="memberRegister" class="modal fade show">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" data-dismiss="modal" class="close">×</button>
                    <h3 class="medium-title">Đăng kí </h3></div>
                <div id="modal-body" class="modal-body">
                    {{--<div v-if="provinceLoading" class="container">--}}
                        {{--<div style="text-align: center;width: 100%;;padding: 15px;">--}}
                            {{--@include('upcoworkingspace::includes.loading')--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    @{{ message}}
                    <div v-for="province in provinces">
                        @{{ province.name }}
                    </div>
                    {{--<div v-else="modalLoading" class="container">--}}
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
                        {{--<div v-if="provinceId" class="row" style="padding: 10px">--}}
                            {{--<div v-if="baseLoading" style="text-align: center;width: 100%;;padding: 15px;">--}}
                                {{--@include('upcoworkingspace::includes.loading')--}}
                            {{--</div>--}}
                            {{--<select v-else="baseLoading"--}}
                                    {{--v-model="baseId"--}}
                                    {{--placeholder="Cơ sở"--}}
                                    {{--class="form-control">--}}
                                {{--<option value="" selected>Cơ sở</option>--}}
                                {{--<option v-for="base in bases" v-bind:value="base.id">--}}
                                    {{--@{{base.name}}--}}
                                {{--</option>--}}
                            {{--</select>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                </div>
            </div>
        </div>
    </div>

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
            <div id="pickingUserPack" class="row">
                @foreach($userPacks as $userPack)
                    <div class="col-md-4">
                        <div class="card card-plain card-blog">
                            <div class="card-image">
                                <a href="{{'/conference-room/'.$userPack->id}}">
                                    <div
                                            style="width: 100%;
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
                                <a v-on:click="openModal({{$userPack->id}})"
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

@endsection

@push('scripts')
    <script>
        var memberRegister = new Vue({
            el: "#memberRegister",
            data: {
                provinces: [],
                bases: [],
                // userPacks: [],
                provinceId: '',
                // baseId: '',
                baseLoading: false,
                provinceLoading: false,
                message: ''
            },
            methods: {
                changeProvince: function () {
                    this.baseId = '';
                    this.getBases();
                },
                getProvinces: function () {
                    this.provinceLoading = true;
                    axios.get(window.url + '/api/province')
                        .then(function (response) {
                            this.provinces = response.data.provinces;
                            console.log(this.provinces);
                            this.provinceLoading = false;
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
                // pickSubscription: function (event, userPackId) {
                //     if (this.baseId === '') {
                //         this.message = 'Xin bạn vui lòng chọn cơ sở';
                //         return;
                //     }
                //     subscriptionModal.userPack = [];
                //     userPack = this.userPacks.filter(function (userPack) {
                //         return userPack.id === userPackId;
                //     })[0];
                //     for (j = 0; j < userPack.subscriptions.length; j++)
                //         userPack.subscriptions[j].isActive = (j === 0);
                //     subscriptionModal.userPack = userPack;
                //     subscriptionModal.base = this.bases.filter(function (base) {
                //         return base.id === this.baseId;
                //     }.bind(this))[0];
                //     subscriptionModal.subscription = subscriptionModal.userPack.subscriptions[0];
                //     subscriptionModal.subscriptionId = subscriptionModal.userPack.subscriptions[0].id;
                //     this.message = '';
                //     $("#userPackModal").modal("hide");
                //     $("#subscriptionModal").modal("show");
                // },
            },
        });

        var pickingUserPack = new Vue({
            el: '#pickingUserPack',
            data: {},
            methods: {
                openModal: function (userPackId) {
                    memberRegister.message = 'asdasld';
                    memberRegister.getProvinces();
                    $("#memberRegister").modal("show");
                }
            }
        });
        var memberRegisterInfo = new Vue({
            el: '#memberRegister',
            data: {
                campaignId: {{$campaignId}},
                userId: {{$userId}}
            },
            methods: {
                submit: function () {
                    $("#memberRegister").modal("hide");
                    $("#modalSuccess").modal("show");
                }
            }
        });


    </script>
@endpush

