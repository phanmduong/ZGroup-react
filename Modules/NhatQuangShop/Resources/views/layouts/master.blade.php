<!doctype html>
<html lang="en">

<head>
    <script src="/assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/png" href="/assets/img/favicon.ico">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Nhật Quang Shop</title>
    @yield('meta')
    <meta name="google-signin-client_id"
          content="852725173616-8jvub3lqquejv84gep11uuk0npsdtu3g.apps.googleusercontent.com">
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link href="/fontawesome/css/font-awesome.min.css" rel="stylesheet"/>

    <link href="/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="/assets/css/demo.css" rel="stylesheet"/>
    <!--     Fonts and icons     -->
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="/assets/css/nucleo-icons.css" rel="stylesheet">
    <link href="/assets/css/nucleo-icons.css" rel="stylesheet">
    <link href="/assets/css/nhatquangshop.css" rel="stylesheet">
    <script>
        var navVue = {};
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>

    <!-- Custom google sign in button -->
    <script src="https://apis.google.com/js/api:client.js"></script>
    <script>
        var googleUser = {};
        var startApp = function () {
            gapi.load('auth2', function () {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                auth2 = gapi.auth2.init({
                    client_id: '852725173616-8jvub3lqquejv84gep11uuk0npsdtu3g.apps.googleusercontent.com',
                    cookiepolicy: 'single_host_origin',
                    // Request scopes in addition to 'profile' and 'email'
                    //scope: 'additional_scope'
                });
                attachSignin(document.getElementById('googleSignInButton'));
            });
        };

        function attachSignin(element) {
            auth2.attachClickHandler(element, {},
                function (googleUser) {
                    var id_token = googleUser.getAuthResponse().id_token;
                    var profile = googleUser.getBasicProfile();
                    $("#global-loading").css("display", "block");
                    axios.get("/api/google/tokensignin?id_token=" + id_token)
                        .then(function (res) {
                            if (res.data.status === 1) {
                                navVue.changeLoginCondition(res.data.user);
                                // console.log(res.data.user);
                                if (!res.data.user.first_login) {
                                    $("#update-user-email").css("display", "none");
                                    $("#updateUserInfoModal").modal({
                                        backdrop: 'static',
                                        keyboard: false
                                    });
                                }
                            } else {
                                $("#loginFailNoticeModal").modal("toggle");
                            }
                            $("#global-loading").css("display", "none");
                        });
                    console.log('ID: ' + id_token);
                    console.log('Name: ' + profile.getName());
                    console.log('Image URL: ' + profile.getImageUrl());
                    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
                    // document.getElementById('name').innerText = "Signed in: " +
                    //     googleUser.getBasicProfile().getName();
                }, function (error) {
                    console.log(JSON.stringify(error, undefined, 2));
                });
        }
    </script>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
    <script src='https://www.google.com/recaptcha/api.js'></script>

</head>
<body class="profile" style="background:#efefef">
<script>
        var recaptchaCallBack = function (response) {
            navVue.captcha = response;
        };
        window.fbAsyncInit = function () {
            FB.init({
                appId: '{{config("app.facebook_app_id")}}',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>


<div class="modal fade" id="loginFailNoticeModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
     aria-hidden="true">
    <div class="modal-dialog modal-sm modal-notice">
        <div class="modal-content">
            <div class="modal-header no-border-header">
                <div></div>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body text-center">
                Đăng nhập thất bại
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-link" data-dismiss="modal" aria-hidden="true">Đóng</button>
            </div>
        </div>
    </div>
</div>

@include('nhatquangshop::includes.loading')

<nav class="navbar navbar-toggleable-md fixed-top bg-dark"
     id="vue-nav"
     style="height:35px; background:#272727!important">

    <div class="modal fade " id="updateUserInfoModal" tabindex="-1" role="dialog" aria-hidden="false">
        <div class="modal-dialog modal-register">
            <div class="modal-content">
                <div class="modal-header no-border-header text-center">
                    <p>Bạn vui lòng hoàn thành thông tin trước khi tiếp tục</p>
                </div>
                <div class="modal-body">
                    <div class="form-group" id="update-user-email">
                        <label>Email</label>
                        <input v-model="user.email" type="email" value="" placeholder="Email"
                               class="form-control"/>
                        <div v-if="user.email && !validEmail()"
                             class="alert alert-danger"
                             style="text-align: center">
                            Email không đúng định dạng
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Số điện thoại</label>
                        <input v-model="user.phone" type="number" value="" placeholder="Số điện thoại"
                               class="form-control"/>
                        <div v-if="user.phone && !validPhone()"
                             class="alert alert-danger"
                             style="text-align: center">
                            Số điện thoại cần ít nhất 9 số và chỉ chứa số.
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu</label>
                        <input v-model="user.newPassword" type="password" value="" placeholder="Mật khẩu"
                               class="form-control"/>
                        <div v-if="user.newPassword && !validPassword()"
                             class="alert alert-danger"
                             style="text-align: center">
                            Mật khẩu cần có độ dài ít nhất 8 kí tự
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Xác nhận Mật khẩu</label>
                        <input v-model="user.confirmPassword" type="password" value="" placeholder="Xác nhận mật khẩu"
                               class="form-control"/>
                        <div v-if="user.confirmPassword !== '' && !validConfirmPassword()"
                             class="alert alert-danger"
                             style="text-align: center">
                            Mật khẩu và Xác Nhận Mật khẩu chưa trùng khớp
                        </div>
                    </div>

                    <div v-if="errorMessage"
                         class="alert alert-danger"
                         style="text-align: center">
                        @{{ errorMessage }}
                    </div>

                    <div class="g-recaptcha"
                         data-callback="recaptchaCallBack"
                         data-sitekey="6LdS5j8UAAAAAD-7OJ2O68ECZdGiWo_27cbo6TUu"></div>

                    <button style="margin-top: 20px;"
                            :disabled="submitDisable()"
                            v-on:click="onSubmitUpdateUserInfo"
                            class="btn btn-block btn-round">

                        <div v-if="isSubmitUserInfo" class="uil-reload-css reload-small" style="">
                            <div></div>
                        </div>
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    </div>


    @if(isset($user))

        @if(!$user->first_login)
            <script>
                $(document).ready(function () {
                    console.log("abc");
                    $("#updateUserInfoModal").modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                });
            </script>
        @endif


        <div class="container">
            <div style="text-align:right; width:100%">
                <a href="/manage/account"
                   style="padding:3px 5px;margin:3px;font-size:10px;color: white;font-size: 12px;font-weight: normal">
                    <img src="{{generate_protocol_url($user->avatar_url)}}" style="width:17px;height: 17px"
                         alt=""> {{$user->name}}
                </a>
                <button style="padding:3px 5px;margin:3px;font-size:10px;" data-toggle="modal"
                        data-target="#modal-fast-order" class="btn btn-primary">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i> Đặt hàng theo yêu cầu
                </button>
                <a href="/logout" style="padding:3px 5px;margin:3px;font-size:10px;" class="btn btn-danger">
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất
                </a>
            </div>
        </div>
    @else
        <div class="container" id="logged-nav" style="display: none">
            <div style="text-align:right; width:100%">
                <div style="text-align:right; width:100%">
                    <a href="/manage/account"
                       style="padding:3px 5px;margin:3px;font-size:10px;color: white;font-size: 12px;font-weight: normal">
                        <img v-bind:src="user.avatar_url" style="width:17px;height: 17px"
                             alt=""> @{{ user.name }}
                    </a>
                    <button style="padding:3px 5px;margin:3px;font-size:10px;" data-toggle="modal"
                            data-target="#modal-fast-order" class="btn btn-primary">
                        <i class="fa fa-shopping-cart" aria-hidden="true"></i> Đặt hàng theo yêu cầu
                    </button>
                    <a href="/logout" style="padding:3px 5px;margin:3px;font-size:10px;" class="btn btn-danger">
                        <i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất
                    </a>
                </div>
            </div>
        </div>
        <div v-if="!showLoggedNav" class="container">
            <div style="text-align:right; width:100%">
                <!-- login modal -->
                <button type="button" style="padding:3px 5px;margin:3px;font-size:10px;" class="btn btn-primary"
                        data-toggle="modal" data-target="#loginModal">
                    <i class="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập
                </button>
                <div class="modal fade " id="loginModal" tabindex="-1" role="dialog" aria-hidden="false">
                    <div class="modal-dialog modal-register">
                        <div class="modal-content">
                            <div class="modal-header no-border-header text-center">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h3 class="modal-title text-center">Nhật Quang Shop</h3>
                                <p>Đăng nhập vào tài khoản của bạn</p>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label>Số điện thoại</label>
                                    <input v-model="user.phone" type="text" value="" placeholder="Số điện thoại"
                                           class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>Mật khẩu</label>
                                    <input v-model="user.password" type="password" value="" placeholder="Password"
                                           class="form-control"/>
                                </div>
                                <div v-if="hasError" class="alert alert-danger" style="text-align: center">
                                    Sai email hoặc mật khẩu
                                </div>

                                <button :disabled="user.phone ==='' || user.password === '' || isLoading"
                                        v-on:click="onClickLoginButton"
                                        class="btn btn-block btn-round">
                                    <div v-if="isLoading">
                                        <div style="text-align: center;width: 100%;;padding: 15px;">
                                            <div class='uil-reload-css reload-background reload-small' style=''>
                                                <div></div>
                                            </div>
                                        </div>
                                    </div>
                                    Đăng nhập
                                </button>
                            </div>
                            <div class="modal-footer no-border-footer">
                            <span class="text-muted  text-center"> Bạn chưa có tải khoản?
                                <a href="#paper-kit"> Tạo tài khoản mới</a>
                            </span>
                            </div>
                        </div>
                    </div>
                </div>
                {{--<div class="g-signin2 btn " data-onsuccess="onSignIn">--}}
                {{--</div>--}}
                {{--<div class="g-signin2" data-onsuccess="onSignIn" style="padding:3px 5px;margin:3px;">--}}
                {{--</div>--}}
                <div id="googleSignInButton"
                     class="btn btn-danger"
                     style="padding:3px 5px;margin:3px;font-size:10px;">
                    <i class="fa fa-google"></i> Google Login
                </div>
                <button v-on:click="onFacebookLoginButtonClick"
                        class="btn btn-success" style="padding:3px 5px;margin:3px;font-size:10px;">
                    <i class="fa fa-facebook"></i> Facebook Login
                </button>

            </div>
        </div>
    @endif
</nav>
<nav class="navbar navbar-toggleable-md fixed-top bg-white navbar-light" style="margin-top:35px">
    <div class="container">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
            <img src="http://www.nhatquangshop.vn/themes/giaodienweb/images/lo-go.png" height="40px">
        </a>
        <div id="openWithoutAdd" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/" data-scroll="true" href="javascript:void(0)">Đặt hàng</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/product/new" data-scroll="true" href="javascript:void(0)">Sản phẩm
                        mới</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/product/feature" data-scroll="true" href="javascript:void(0)">Sản phẩm
                        nổi bật</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/blog" data-scroll="true" href="javascript:void(0)">Tin tức</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contact-us" data-scroll="true" href="javascript:void(0)">Liên hệ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:void(0)" data-scroll="true"
                       v-on:click="openModalBuyWithoutAdd()"
                       style="display: flex; align-content: center;">
                        <i class="fa fa-shopping-cart"></i>
                        &nbsp

                        Giỏ hàng
                        <div id="booksCount" style="margin-left: 10px;height: 20px; width: 20px; border-radius: 50%;
                        background-color: #c50000; color: white; display: flex; align-items: center;justify-content: center;display: none!important;">
                            @{{ books_count }}
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>



<div id="modalBuy" class="modal fade">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Giỏ hàng</h2>
            </div>
            <div class="modal-body" id="modal-buy-body">
                <br>
                <div v-if="isLoading">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div v-for="good in goods">
                    <div class="row" style="margin-bottom:20px;">
                        <div class="col-md-1 h-center">
                            <img class="shadow-image"
                                 v-bind:src="good.avatar_url">
                        </div>
                        <div class="col-md-2">
                            <p><b style="font-weight:600;">@{{good.name}}</b></p>
                            <p>@{{ good.description }}</p>
                        </div>
                        <div class="col-md-2 h-center">
                            <button v-on:click="minusGood(event, good.id)" class="btn btn-success btn-just-icon btn-sm">
                                <i class="fa fa-minus"></i>
                            </button>
                            &nbsp
                            <button v-on:click="plusGood(event, good.id)" class="btn btn-success btn-just-icon btn-sm">
                                <i class="fa fa-plus"></i>
                            </button>
                            &nbsp
                            <b style="font-weight:600;"> @{{ good.number }}</b>
                        </div>
                        <div class="col-md-3 h-center">
                            <p>@{{ formatPrice(good.price)}}</p>
                            <p v-if="good.discount_value"> - @{{ formatPrice(good.discount_value)}}</p>
                        </div>
                        <div class="col-md-2 h-center">
                            <p><b style="font-weight:600;">@{{formatPrice((good.price -
                                    good.discount_value)*good.number)}}</b>
                            </p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4">
                        <h4 class="text-left"><b>Tổng</b></h4>
                    </div>
                    <div class="col-md-8">
                        <h4 class="text-right"><b>@{{ formatPrice(total_order_price) }}</b></h4>
                    </div>
                </div>
                <div v-if="coupon_programs_count" class="row" style="padding-top:20px;">
                    <div class="col-md-12">
                        <div style="font-weight: 600">Chương trình khuyến mãi:</div>
                        <div v-for="coupon_program in coupon_programs">
                            @{{ coupon_program.content }}
                        </div>
                    </div>
                </div>
                <div v-if="isLoadingCoupons">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div v-if="coupon_codes_count" class="row" style="padding-top:20px;">
                    <div class="col-md-12">
                        <div style="font-weight: 600">Mã khuyến mãi:</div>
                        <div v-for="coupon_code in coupon_codes">
                            @{{ coupon_code.content }}
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <input v-model="coupon_code" type="text" value="" placeholder="Mã giảm giá"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" v-on:click="addCoupon" class="btn btn-danger btn-round">
                                Thêm mã giảm giá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-success"
                        style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                <button id="btn-purchase"
                        v-on:click="openPurchaseModal()"
                        class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Thanh toán <i
                            class="fa fa-angle-right"></i></button>
            </div>
        </div>
    </div>
</div>
<div id="modalPurchase" class="modal fade" style="overflow-y: scroll">
    <div class="modal-dialog modal-large">

        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Thanh toán</h2>
            </div>
            <div class="modal-body">
                <form class="register-form ">
                    <h6>Họ và tên</h6>
                    <input v-model="name" type="text" class="form-control" placeholder="Họ và tên"><br>
                    <h6>Số điện thoại</h6>
                    <input v-model="phone" type="text" class="form-control" placeholder="Email"><br>
                    <h6>Email</h6>
                    <input v-model="email" type="text" class="form-control" placeholder="Số điện thoại"><br>
                    <h6>Địa chỉ nhận sách</h6>
                    <div v-if="loadingProvince" style="text-align: center;width: 100%;;padding: 15px;"><i
                                class='fa fa-spin fa-spinner'></i>
                    </div>
                    <select v-if="showProvince"
                            v-model="provinceid"
                            v-on:change="changeProvince"
                            class="form-control" placeholder="Tỉnh/Thành phố">
                        <option value="">Tỉnh, Thành phố</option>
                        <option v-for="province in provinces" v-bind:value="province.provinceid">
                            @{{province.name}}
                        </option>
                    </select>
                    <div v-if="loadingDistrict" style="text-align: center;width: 100%;;padding: 15px;"><i
                                class='fa fa-spin fa-spinner'></i>
                    </div>
                    <select v-if="showDistrict"
                            v-model="districtid"
                            class="form-control"
                            style="margin-top: 5px"
                            id="">
                        <option value="">Quận, Huyện</option>
                        <option v-for="district in districts" v-bind:value="district.districtid">
                            @{{district.name}}
                        </option>
                    </select>


                    <input v-model="address" type="text" class="form-control"
                           placeholder="Đường, số nhà"
                           style="margin-top: 5px"><br>
                    <h6>Phương thức thanh toán</h6>
                    <select v-model="payment" class="form-control">
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                            Thanh toán trực tiếp khi nhận hàng(COD)
                        </option>
                    </select>
                </form>
                <div style="display:none;color: red; padding: 10px; text-align: center" id="purchase-error">
                    @{{message}}
                </div>
            </div>
            <div class="modal-footer" style="display: block">
                <div id="purchase-loading-text" style="display:none;text-align: center;width: 100%;;padding: 15px;"><i
                            class='fa fa-spin fa-spinner'></i>Đang tải...
                </div>
                <div id="btn-purchase-group" style="text-align: right">
                    <button data-dismiss="modal" class="btn btn-link btn-success" style="width:auto!important">Tiếp
                        tục mua <i class="fa fa-angle-right"></i></button>
                    <button
                            v-on:click="submitOrder"
                            {{--v-bind:disabled="disablePurchaseButton"--}}
                            class="btn btn-sm btn-success"
                            style="margin:10px 10px 10px 0px!important">Thanh toán <i class="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>

<div id="modalBuy" class="modal fade">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Giỏ hàng</h2>
            </div>
            <div class="modal-body" id="modal-buy-body">
                <br>
                <div v-if="isLoading">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div v-for="good in goods">
                    <div class="row" style="margin-bottom:20px;">
                        <div class="col-md-1 h-center">
                            <img class="shadow-image"
                                 v-bind:src="good.avatar_url">
                        </div>
                        <div class="col-md-2">
                            <p><b style="font-weight:600;">@{{good.name}}</b></p>
                            <p>@{{ good.description }}</p>
                        </div>
                        <div class="col-md-2 h-center">
                            <button v-on:click="minusGood(event, good.id)" class="btn btn-success btn-just-icon btn-sm">
                                <i class="fa fa-minus"></i>
                            </button>
                            &nbsp
                            <button v-on:click="plusGood(event, good.id)" class="btn btn-success btn-just-icon btn-sm">
                                <i class="fa fa-plus"></i>
                            </button>
                            &nbsp
                            <b style="font-weight:600;"> @{{ good.number }}</b>
                        </div>
                        <div class="col-md-3 h-center">
                            <p>@{{ formatPrice(good.price)}}</p>
                            <p v-if="good.discount_value"> - @{{ formatPrice(good.discount_value)}}</p>
                        </div>
                        <div class="col-md-2 h-center">
                            <p><b style="font-weight:600;">@{{formatPrice((good.price -
                                    good.discount_value)*good.number)}}</b>
                            </p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-4">
                        <h4 class="text-left"><b>Tổng</b></h4>
                    </div>
                    <div class="col-md-8">
                        <h4 class="text-right"><b>@{{ formatPrice(total_order_price) }}</b></h4>
                    </div>
                </div>
                <div v-if="coupon_programs_count" class="row" style="padding-top:20px;">
                    <div class="col-md-12">
                        <div style="font-weight: 600">Chương trình khuyến mãi:</div>
                        <div v-for="coupon_program in coupon_programs">
                            @{{ coupon_program.content }}
                        </div>
                    </div>
                </div>
                <div v-if="isLoadingCoupons">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div v-if="coupon_codes_count" class="row" style="padding-top:20px;">
                    <div class="col-md-12">
                        <div style="font-weight: 600">Mã khuyến mãi:</div>
                        <div v-for="coupon_code in coupon_codes">
                            @{{ coupon_code.content }}
                        </div>
                    </div>
                </div>
                <br>
                <div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <input v-model="coupon_code" type="text" value="" placeholder="Mã giảm giá"
                                       class="form-control">
                            </div>
                        </div>
                        <div class="col-md-2">
                            <button type="button" v-on:click="addCoupon" class="btn btn-danger btn-round">
                                Thêm mã giảm giá
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-success"
                        style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                <button id="btn-purchase"
                        v-on:click="openPurchaseModal()"
                        class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Thanh toán <i
                            class="fa fa-angle-right"></i></button>
            </div>
        </div>
    </div>
</div>


<div id="modalSuccess" class="modal fade">
    <div class="modal-dialog modal-large">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Đặt hàng thành công</h2>
            </div>
            <div class="modal-body">
                <div style='text-align: center'>
                    Chúng tôi đã nhận được đơn hàng của bạn, bạn vui lòng kiểm tra email. Chúng tôi sẽ liên hệ lại với
                    bạn trong thời gian sớm nhất
                </div>
            </div>
        </div>

    </div>
</div>

<div class="modal fade" id="modal-fast-order" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
     aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Đặt hàng siêu tốc</h2>
            </div>

            <div class="modal-body">
                <div v-if="isLoadingCurrency">
                    <div style="text-align: center;width: 100%;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div v-else="isLoadingCurrency">
                    <div v-if="isOrdering">
                        <div v-for="(order, index) in fastOrders">
                            <div style="margin-bottom: 10px;">
                                <span class="label label-success">Sản phẩm @{{order.id}}</span>
                                <button v-if="order.seen" v-on:click="remove(index)" type="button" data-toggle="tooltip"
                                        data-placement="top" title="" data-original-title="Remove"
                                        class="btn btn-danger btn-link btn-sm">
                                    <i class="fa fa-times"></i>
                                </button>
                            </div>
                            <div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="text" v-model="order.link" placeholder="Link sản phẩm"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="form-group">
                                            <input type="text" v-model="order.price" placeholder="Giá bán"
                                                   class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <select v-model="order.currencyId"
                                                class="form-control" placeholder="Đơn vị tiền">
                                            <option value="0" selected>Đơn vị tiền</option>
                                            <option v-for="currency in currencies" v-bind:value="currency.id">
                                                @{{currency.name}}: 1 @{{ currency.notation }} = @{{ formatPrice(currency.ratio) }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <input type="text" v-model="order.size" placeholder="Size" class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="form-group">
                                        <input type="text" v-model="order.color" placeholder="Mã màu bạn chọn"
                                               class="form-control">
                                    </div>
                                </div>

                                <div class="col-md-3">
                                    <div class="form-group">
                                        <input type="text" v-model="order.number" placeholder="Số lượng"
                                               class="form-control">
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <select class="form-control"
                                            id="bank-account"
                                            data-style="btn btn-default"
                                            v-model="order.tax"
                                            style="display: block !important;">
                                        <option value="false" selected>Giá chưa thuế</option>
                                        <option value="true">Giá có thuế</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <input type="text" v-model="order.description" placeholder="Mô tả"
                                               class="form-control">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="button" v-on:click="plusOrder" class="btn btn-danger btn-round">
                            Đặt thêm sản phẩm
                        </button>
                    </div>
                </div>
                <div v-if="isLoading">
                    <div style="text-align: center;width: 100%;;padding: 15px;">
                        <div class='uil-reload-css reload-background reload-small' style=''>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="showFailMessage" style="margin-top: 10px; text-align: center">
                    <div class="col-sm-12">
                        <div class='alert alert-danger'>@{{ failMessage }}</div>
                    </div>
                </div>
                <div class="row" v-if="showSuccessMessage"
                     style="margin-top: 20px; text-align: center; border-radius: 15px">
                    <div class="col-sm-12">
                        <div class='alert alert-success'>@{{ message }}</div>
                    </div>
                </div>
            </div>
            <div v-if="isOrdering" class="modal-footer">
                <div class="left-side">
                    <button type="button" class="btn btn-default btn-link" v-on:click="submitFastOrder">Đặt hàng
                    </button>
                </div>
                <div class="divider"></div>
                <div class="right-side">
                    <button type="button" class="btn btn-danger btn-link" data-dismiss="modal">Thoát</button>
                </div>
            </div>
            <div v-else="isOrdering" class="modal-footer">
                <button type="button" class="btn btn-default btn-link" v-on:click="continueOrdering">Tiếp tục đặt hàng
                </button>
            </div>
        </div>

    </div>

</div>

@yield('content')
<footer class="footer footer-light footer-big">
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-sm-3 col-xs-12">
                <img src="http://www.nhatquangshop.vn/themes/giaodienweb/images/lo-go.png" width="150px"/>
                <div class="social-area">
                    <a class="btn btn-just-icon btn-round btn-facebook">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a class="btn btn-just-icon btn-round btn-twitter">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a class="btn btn-just-icon btn-round btn-google">
                        <i class="fa fa-google-plus" aria-hidden="true"></i>
                    </a>
                </div>
            </div>
            <div class="col-md-9 offset-md-1 col-sm-9 col-xs-12">
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="/">
                                        Trang chủ
                                    </a>
                                </li>
                                <li>
                                    <a href="/about-us">
                                        Về chúng tôi
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        Mua sách
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Blogs
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="/contact-us">
                                        Liên hệ
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Nhà phân phối
                                    </a>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="#">
                                        Tuyển dụng
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="stacked-links">
                                <li>
                                    <h4>13.000<br>
                                        <small>Lượt xuất bản</small>
                                    </h4>
                                </li>
                                <li>
                                    <h4>256<br>
                                        <small>Nhà phân phối</small>
                                    </h4>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="copyright">
                    <div class="pull-left">

                        <script>document.write(new Date().getFullYear())</script>
                        KEE Agency
                    </div>
                    <div class="links pull-right">
                        <ul>
                            <li>
                                <a href="#">
                                    Điều khoản
                                </a>
                            </li>
                            |
                            <li>
                                <a href="#">
                                    Thanh toán
                                </a>
                            </li>
                            |
                            <li>
                                <a href="#">
                                    Vận chuyển
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</footer>

@if (isset($user))
    <script>
        window.INIT_USER = JSON.parse('{!! json_encode($user->transformAuth())!!}');
        window.INIT_USER.confirmPassword = "";
        window.INIT_USER.newPassword = "";
    </script>
@else
    <script>
        window.INIT_USER = {
            phone: "",
            email: "",
            password: "",
            facebook_id: "",
            confirmPassword: "",
            newPassword: ""
        };
    </script>
@endif

</body>
<script>startApp();</script>
<!-- Core JS Files -->
<script src={!!url('/assets/js/jquery-ui-1.12.1.custom.min.js')  !!} type="text/javascript"></script>
<script src="/assets/js/tether.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
{{--<script src="https://cdn.jsdelivr.net/npm/vue"></script>--}}
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/nhatquangshop.js?68689"></script>
<script src="/nhatquangshop/js/nav.vue.js"></script>
<script src="/assets/js/jquery.elevateZoom-3.0.8.min.js"></script>
<script type="text/javascript">
    function paginator(currentPageData, totalPagesData) {
        var page = [];
        var currentPage = currentPageData;
        var totalPages = totalPagesData;

        var startPage = (currentPage - 2 > 0 ? currentPage - 2 : 1);
        for (var i = startPage; i <= currentPage; i++) {
            page.push(i);
        }

        var endPage = (5 - page.length + currentPage >= totalPages ? totalPages : 5 - page.length + currentPage);

        for (var i = currentPage + 1; i <= endPage; i++) {
            page.push(i);
        }

        if (page && page.length < 5) {
            var pageData = Object.assign(page);
            for (var i = page[0] - 1; i >= (page[0] - (5 - page.length) > 0 ? page[0] - (5 - page.length) : 1); i--) {
                pageData.unshift(i);
            }
            page = pageData;
        }

        return page;
    }
</script>
@stack('scripts')
</html>