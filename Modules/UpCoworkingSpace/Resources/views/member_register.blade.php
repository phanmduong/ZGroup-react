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
    <div class="container text-center">
        <div>
            <p style="font-size: 32px; font-weight: 700; padding: 40px 20px 20px 20px">
                NÂNG CAO HIỆU QUẢ LÀM VIỆC CỦA BẠN NGAY HÔM NAY
            </p>
            <p style="font-size: 16px">
                Một không gian làm việc chung ( Coworking Space ) hiện đại  như tại Silicon Valley dành cho các Start Up Việt Nam.
            </p>
            <div style="display: flex; padding: 20px 20px 10px 20px">
                <hr style="width: 50%">
                <i class="fa fa-star-o" aria-hidden="true"></i>
                <hr style="width: 50%">
            </div>
            <p style="font-size:32px; font-weight:600; padding-bottom:20px">CÁC GÓI THÀNH VIÊN UP</p>
        </div>
    </div>
    <div class="blog-4" style="margin-top:20px">
        <div class="container">
            <div class="row">
                @foreach($userPacks as $userPack)
                <div class="col-md-3">
                    <div class="card card-blog">
                        <div class="card-image">
                            <a href="{{'/conference-room/'.$userPack->id}}">
                                <img class="img img-raised" src="{{generate_protocol_url($userPack->avatar_url)}}">
                            </a>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title" style="font-size: 24px; ">
                                <a href="{{'/conference-room/'.$userPack->id}}" style="font-weight: bolder">{{$userPack->name}}</a>
                            </h5>
                            <p class="card-price">
                                @foreach($userPack->roomServiceBenefits->slice(0,1) as $roomServiceBenefit)
                                    {{$roomServiceBenefit->pivot->value}}/tháng
                                @endforeach
                            </p>
                            <p class="card-description">
                                {{$userPack->detail}}
                            </p>
                            <br/>
                        </div>
                        <a data-target="#submitModal"
                           data-toggle="modal"
                           class="btn btn-primary btn-pick"
                           >
                            <b>Đặt chỗ</b>
                        </a>
                    </div>

                </div>
                    @endforeach
            </div>

        </div>
        <div style="padding-top: 50px">
            <div >
                <div class="background-img-table">
                    <table id="mytable" class="container">
                        <tr class="border-1">
                            @foreach($userBenefits->slice(17,18) as $userBenefit)
                                <td class="benefit-name">
                                    {{$userBenefit->name}}
                                </td>
                                @foreach($userBenefit->roomServiceUserPacks as $roomServiceUserPack)
                                    <td class="pack-name">
                                        {{$roomServiceUserPack->pivot->value}}
                                    </td>
                                @endforeach
                            @endforeach
                        </tr>

                        @foreach($userBenefits->slice(0,17) as $userBenefit)
                            <tr class="border-1">
                                <td class="benefit-name">
                                    {{$userBenefit->name}}
                                </td>
                                @foreach($userBenefit->roomServiceUserPacks as $roomServiceUserPack)
                                    <td>
                                        {{$roomServiceUserPack->pivot->value}}
                                    </td>
                                @endforeach
                            </tr>
                        @endforeach
                    </table>
                    <div style="background-color: #ffffff; padding: 20px 0px 5px 0px" class="container text-center">

                            <a href="#"
                               class="btn btn-primary"
                               style="font-weight700; background-color:#96d21f;border-color:#96d21f; color:white!important; font-size: 16px" >
                                TRỞ THÀNH THÀNH VIÊN CỦA UP NGAY HÔM NAY
                            </a>


                    </div>
                </div>


            </div>
        </div>
        <hr>
    </div>
    <div class="container" style="padding-top:30px">
        <p class="text-center" style="font-size:24px; font-weight: 600; padding-bottom: 50px">
            LỢI ÍCH THÀNH VIÊN
        </p>
        <div class="row">
            <div class="col-md-3">
                <div class="card card-profile">
                    <div class="card-avatar border-white" style= "max-width:200px; max-height:200px">
                            <img src="http://up-co.vn/wp-content/uploads/2014/09/13707727_1250301361669834_8027444782146291074_n-230x230.jpg" alt="...">
                    </div>
                    <div class="card-body">
                        <p class="card-title" style="font-size: 17px; font-weight: 600;margin-bottom: 0">KHÔNG GIAN SÁNG TẠO</p>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="nc-icon nc-time-alarm"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">MỞ CỬA 24/7</h4>
                                <p class="info-detail">Làm việc bất cứ khi nào bạn cảm thấy tinh thần thăng hoa.</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-desktop" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">PHÒNG HỌP HIỆN ĐẠI </h4>
                                <p class="info-detail">Đa dạng kích cỡ, máy chiếu 3D, màn hình Led TV 84 inch, Apple TV</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-phone" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">KHU GỌI ĐIỆN CÁCH ÂM
                                </h4>
                                <p class="info-detail">Thoải mái nói chuyện điện thoại và họp qua Skype mà không bị làm phiền</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-user" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">KHU TIẾP KHÁCH CHUYÊN NGHIỆP</h4>
                                <p class="info-detail">Không gian chuyên nghiệp cho bạn để gặp gỡ đối tác và khách hàng</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-profile">
                    <div class="card-avatar border-white" style= "max-width:200px; max-height:200px">
                            <img src="http://up-co.vn/wp-content/uploads/2016/07/ket-noi-230x230.jpg" alt="...">
                    </div>
                    <div class="card-body">
                        <p class="card-title" style="font-size: 17px; font-weight: 600;margin-bottom: 0">CỘNG ĐỒNG GẮN KẾT</p>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-users" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">CỘNG ĐỒNG STARTUP</h4>
                                <p class="info-detail">Gia nhập cộng đồng StartUP từ nhiều lĩnh vực. Cơ hội cho bạn kết nối, chia sẻ và học hỏi.</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-map-marker" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">SỰ KIỆN</h4>
                                <p class="info-detail">Tham dự miễn phí sự kiện, hội thảo với các chuyên gia hàng đầu. Cơ hội tiếp cận các quỹ đầu tư và các nhà đầu tư lớn.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-profile">
                    <div class="card-avatar border-white" style= "max-width:200px; max-height:200px">
                            <img src="http://up-co.vn/wp-content/uploads/2014/09/13767347_1250313558335281_8793786632540873415_o-230x230.jpg" alt="...">
                    </div>
                    <div class="card-body">
                        <p class="card-title" style="font-size: 17px; font-weight: 600;margin-bottom: 0">
                            THIẾT BỊ HIỆN ĐẠI
                        </p>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-signal" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">
                                    MẠNG INTERNET TỐC ĐỘ CAO</h4>
                                <p class="info-detail">Nhanh, mạnh, ổn định và bảo mật</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-cutlery" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">KHU BẾP TIỆN NGHI</h4>
                                <p class="info-detail">
                                    Khu bếp trang bị đầy đủ tủ lạnh, lò vi sóng, lò nướng và đồ ăn luôn sẵn sàng phục vụ thành viên UP
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card card-profile">
                    <div class="card-avatar border-white" style= "max-width:200px; max-height:200px">
                            <img src="http://up-co.vn/wp-content/uploads/2016/08/10-230x230.png" alt="...">
                    </div>
                    <div class="card-body">
                        <p class="card-title" style="font-size: 17px; font-weight: 600;margin-bottom: 0">
                            DỊCH VỤ TẬN TÂM
                        </p>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-cutlery" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">
                                    MIỄN PHÍ TRÀ, CAFE
                                </h4>
                                <p class="info-detail">Trà, cafe nóng phục vụ miễn phí 24/7</p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-leaf" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">
                                    ĐỆM NGỦ THƯ GIÃN</h4>
                                <p class="info-detail">
                                    Giải tỏa căng thẳng sau khi làm việc
                                </p>
                            </div>
                        </div>
                        <div class="info info-horizontal">
                            <div class="icon">
                                <i class="fa fa-smile-o" aria-hidden="true"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">
                                    NHÂN VIÊN CHĂM SÓC TẬN TÌNH
                                </h4>
                                <p class="info-detail">
                                    Bất cứ lúc nào bạn cần hỗ trợ, UP luôn ở bên bạn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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

<style>
    .border-1 {
        border: 1px solid #dddddd;
    }

    td {
        border: 1px solid #dddddd;
        padding: 10px 25px;
    }

    .benefit-name {
        font-weight: 600;
        width: 200px;
    }

    .pack-name {
        font-weight: 600;
        width: 200px;
    }

    tr:nth-child(2n+1) {
        background-color: #ffffff;
    }

    tr:nth-child(2n) {
        background-color: #F9F9F9;
    }

    tr:first-child {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }

    #mytable tr:last-child {
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .card-price {
        font-weight: 550;
        color: #96d21f;
        padding-top:10px
    }

    #mytable {
        margin-top: 20px;
    }

    .background-img-table {
        position: relative;
        background-image: url(http://up-co.vn/wp-content/uploads/2014/09/13738341_1250318455001458_4740640008692062520_o.jpg);
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: scroll;
        background-size: cover;
        padding-top: 40px;
        padding-bottom: 40px;
        padding-left: 0px;
        padding-right: 0px;
        width:100%;
    }
    .card-profile {
        margin-bottom: 40px !important;
    }
    .info-title {
        font-size: 18px !important;
        font-weight: 500;
    }
    .info-detail {
        color:#333333;
    }
    .info-horizontal .icon {
     margin-right:10px !important;
    }
    @media screen and (max-width: 767px){
        .card.card-blog {
            margin-top:20px!important;
        }
        .btn-pick {
            margin:0 !important;
            background-color:#96d21f !important;
            border-color:#96d21f !important;
            color:white!important;
        }
    }

    @media screen and (min-width: 767px) {
        .card.card-blog {
            min-height: 620px !important;
        }
        .btn-pick {

            position:absolute !important;
            bottom: 10px !important;
            left: 15px !important;
            background-color:#96d21f !important;
            border-color:#96d21f !important;
            color:white!important;
        }
    }
    .icon {
        color:#bfbfbf;
    }
</style>

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

