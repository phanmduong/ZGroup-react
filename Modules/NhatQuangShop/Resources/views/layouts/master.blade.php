<!doctype html>
<html lang="en">

<head>
    <script src="/assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/png" href="/assets/img/favicon.ico">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Nhật Quang Shop</title>

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
    <script>
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
</head>
<body class="profile" style="background:#fafafa">
<script>
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
                    <h3 class="modal-title text-center">Nhật Quang Shop</h3>
                    <p>Bạn vui lòng hoàn thành thông tin trước khi tiếp tục</p>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Số điện thoại</label>
                        <input v-model="user.phone" type="text" value="" placeholder="Email"
                               class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label>Mật khẩu</label>
                        <input v-model="user.newPassword" type="password" value="" placeholder="Mật khẩu"
                               class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label>Xác nhận Mật khẩu</label>
                        <input v-model="user.confirmPassword" type="password" value="" placeholder="Xác nhận mật khẩu"
                               class="form-control"/>
                    </div>
                    <div v-if="hasError" class="alert alert-danger" style="text-align: center">
                        Sai email hoặc mật khẩu
                    </div>

                    <button :disabled="user.phone ==='' || user.password === '' || isLoading"
                            v-on:click="onClickLoginButton"
                            class="btn btn-block btn-round">
                        <div v-if="isLoading" class="uil-reload-css reload-small" style="">
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
                <a href="/profile"
                   style="padding:3px 5px;margin:3px;font-size:10px;color: white;font-size: 12px;font-weight: normal">
                    <img src="{{generate_protocol_url($user->avatar_url)}}" style="width:17px;height: 17px"
                         alt=""> {{$user->name}}
                </a>
                <a href="/logout" style="padding:3px 5px;margin:3px;font-size:10px;" class="btn btn-danger">
                    <i class="fa fa-sign-out" aria-hidden="true"></i> Đăng xuất
                </a>
            </div>
        </div>
    @else
        <div class="container" id="logged-nav" style="display: none">
            <div style="text-align:right; width:100%">
                <div style="text-align:right; width:100%">
                    <a href="/profile"
                       style="padding:3px 5px;margin:3px;font-size:10px;color: white;font-size: 12px;font-weight: normal">
                        <img v-bind:src="user.avatar_url" style="width:17px;height: 17px"
                             alt=""> @{{ user.name }}
                    </a>
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
                                    <input v-model="user.phone" type="text" value="" placeholder="Email"
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
                                    <div v-if="isLoading" class="uil-reload-css reload-small" style="">
                                        <div></div>
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
                    <a class="nav-link" href="/blog" data-scroll="true" href="javascript:void(0)">Blogs</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about-us" data-scroll="true" href="javascript:void(0)">Về chúng tôi</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/contact-us" data-scroll="true" href="javascript:void(0)">Liên hệ</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" v-on:click="openModalBuyWithoutAdd" data-scroll="true"
                       href="javascript:void(0)">
                        <i class="fa fa-shopping-cart"></i>
                        Giỏ hàng
                        <p id="cart-num-items"
                           style="display:none;background:#c50000!important; padding:5px 10px!important; border-radius:100px; color:white!important; margin-left:5px;">
                            0
                        </p>
                    </a>
                </li>
            </ul>

        </div>
    </div>
</nav>

@yield('content')

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
                    <input v-model="phone" type="text" class="form-control" placeholder="Số điện thoại"><br>
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
                    <select v-model="payment" class="form-control" id="sel1">
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                            Thanh toán trực tiếp khi nhận hàng(COD)
                        </option>
                    </select>
                </form>
                <div style="display:none;color: red; padding: 10px; text-align: center" id="purchase-error">
                    Bạn vui lòng nhập đầy đủ thông tin
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
                <div v-if="isLoading" style="text-align: center;width: 100%;;padding: 15px;"><i
                            class='fa fa-spin fa-spinner'></i>Đang tải...
                </div>
                <div v-for="good in goods">
                    <div class="row" style="margin-bottom:20px;">
                        <div class="col-md-1 h-center">
                            <img class="shadow-image"
                                 v-bind:src="good.avatar_url">
                        </div>
                        <div class="col-md-4">
                            <p><b style="font-weight:600;">@{{good.name}}</b></p>
                            <p>Connect the dots</p>
                        </div>
                        <div class="col-md-3 h-center">
                            <button v-on:click="minusGood(event, good.id)" class="btn btn-success btn-just-icon btn-sm">
                                <i class="fa fa-minus"></i>
                            </button>
                            &nbsp
                            <button v-on:click="plusGood(event, good.id)" class="btn btn-success btn-just-icon btn-sm">
                                <i class="fa fa-plus"></i>
                            </button>
                            &nbsp
                            <b style="font-weight:600;"> @{{ good.number }} </b>
                        </div>
                        <div class="col-md-2 h-center">
                            <p>@{{ good.price}}</p>
                        </div>
                        <div class="col-md-2 h-center">
                            <p><b style="font-weight:600;">@{{good.price* good.number}}</b>
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
                        <h4 class="text-right"><b>@{{ total_price }}</b></h4>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-success"
                        style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                <button id="btn-purchase"
                        v-on:click="openPurchaseModal"
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
                        ©
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
</body>
<script>startApp();</script>
<!-- Core JS Files -->
<script src="/assets/js/jquery-ui-1.12.1.custom.min.js" type="text/javascript"></script>
<script src="/assets/js/tether.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/nhatquangshop.js?6868"></script>
<script src="/nhatquangshop/js/nav.vue.js"></script>
</html>