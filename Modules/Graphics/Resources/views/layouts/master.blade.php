<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/png" href="/assets/img/favicon.ico">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Tạp chí Graphics</title>
    @yield('meta')
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <link href="/fontawesome/css/font-awesome.min.css" rel="stylesheet"/>

    <link href="/graphics-assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/graphics-assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="/graphics-assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="/graphics-assets/css/nucleo-icons.css" rel="stylesheet">
    <link href="/assets/css/graphics.css" rel="stylesheet">
    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ?
                    n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1794155800656414');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=1794155800656414&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->
</head>
<body class="profile" style="background:#fafafa">
<script>
    window.fbMessengerPlugins = window.fbMessengerPlugins || {
        init: function () {
            FB.init({
                appId: '1678638095724206',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.10'
            });
        }, callable: []
    };
    window.fbAsyncInit = window.fbAsyncInit || function () {
        window.fbMessengerPlugins.callable.forEach(function (item) {
            item();
        });
        window.fbMessengerPlugins.init();
    };
    setTimeout(function () {
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, 0);
</script>

<div class="fb-customerchat"
     page_id="1809252865962104"
     ref="">
</div>
<nav class="navbar navbar-toggleable-md fixed-top bg-white navbar-light">
    <div class="container">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
        </button>
        <a class="navbar-brand" href="/">Graphics</a>
        <div id="openWithoutAdd" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/" data-scroll="true" href="javascript:void(0)">Mua sách</a>
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

@yield('content')

<div id="modalPurchase" class="modal" style="overflow-y: scroll">
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
                    <input v-model="email" type="text" class="form-control" placeholder="Địa chỉ email"><br>
                    <h6>Địa chỉ nhận sách</h6>
                    <div v-if="loadingProvince" style="text-align: center;width: 100%;;padding: 15px;">
                        @include("graphics::loading")
                    </div>
                    <div v-if="showProvince">
                        <select v-model="provinceid"
                                v-on:change="changeProvince"
                                class="form-control" placeholder="Tỉnh/Thành phố">
                            <option value="">Tỉnh, Thành phố</option>
                            <option v-for="province in provinces" v-bind:value="province.provinceid">
                                @{{province.name}}
                            </option>
                        </select>

                        <div v-if="loadingDistrict" style="text-align: center;width: 100%;;padding: 15px;">
                            @include("graphics::loading")
                        </div>

                        <div v-if="showDistrict">
                            <select v-model="districtid"
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
                        </div>


                    </div>

                    <h6 style="margin-top: 15px;">Phương thức thanh toán</h6>
                    <select v-model="payment" class="form-control" id="sel1">
                        {{--<option value="Thanh toán online">Thanh toán online</option>--}}
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                            Thanh toán trực tiếp khi nhận hàng(COD)
                        </option>
                    </select>
                </form>

                @include("graphics::checkout.online")
                @include("graphics::checkout.transfer")


                <div v-if="shipPrice" class="alert alert-info" style="margin-top: 10px">
                    Phí ship: <strong>@{{ formatPrice(shipPrice) }}</strong> <br/>
                    Tổng giá trị đơn hàng (Đã bao gồm phí Ship): <strong>@{{ formatPrice(goodsPrice +
                        shipPrice)}}</strong>
                </div>

                <div class="alert alert-danger" v-if="message"
                     style="margin-top: 10px"
                     id="purchase-error">
                    @{{ message }}
                </div>


            </div>
            <div v-if="isSaving" id="purchase-loading-text">
                @include("graphics::loading")
            </div>
            <div class="modal-footer" v-if="!isSaving">
                <div id="btn-purchase-group" style="text-align: right">
                    <button data-dismiss="modal" class="btn btn-link btn-success" style="width:auto!important">Tiếp
                        tục mua <i class="fa fa-angle-right"></i></button>
                    <button
                            v-on:click="submitOrder()"
                            onclick="fbq('track', 'InitiateCheckout')"
                            class="btn btn-sm btn-success"
                            style="margin:10px 10px 10px 0px!important">Thanh toán <i class="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>

<div id="modalBuy" class="modal">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Giỏ hàng</h2>
            </div>

            <div class="modal-body" id="modal-buy-body">
                <div>
                    <br>
                    <div v-if="isLoading">
                        @include("graphics::loading")
                    </div>
                    <div v-for="good in goods">
                        <div class="row" style="margin-bottom:20px;">
                            <div class="col-md-1 h-center">
                                <img class="shadow-image"
                                     v-bind:src="good.avatar_url">
                            </div>
                            <div class="col-md-4">
                                <p><b style="font-weight:600;">@{{good.name}}</b></p>
                            </div>
                            <div class="col-md-3 h-center">
                                <button v-on:click="minusGood(event, good.id)"
                                        class="btn btn-success btn-just-icon btn-sm">
                                    <i class="fa fa-minus"></i>
                                </button>
                                &nbsp
                                <button v-on:click="plusGood(event, good.id)"
                                        class="btn btn-success btn-just-icon btn-sm">
                                    <i class="fa fa-plus"></i>
                                </button>
                                &nbsp
                                <b style="font-weight:600;"> @{{ good.number }} </b>
                            </div>
                            <div class="col-md-2 h-center">
                                <p>@{{formatPrice(good.price * (1 - good.coupon_value))}}</p>
                            </div>
                            <div class="col-md-2 h-center">
                                <p><b style="font-weight:600;">@{{formatPrice(good.price * (1 - good.coupon_value) * good.number)}}</b>
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
                    <div class="row" style="padding-top:20px;">
                        <div class="col-md-12">
                            <div style="font-weight: 600">Lưu ý: chi phí ship được tính như sau:</div>
                            <div>Ship nội thành Hà Nội và Sài Gòn: 20k</div>
                            <div>Ship vào Sài Gòn: 30k</div>
                            <div>Ship đến tỉnh thành khác: 30k</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link"
                            style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                    <button id="btn-purchase"
                            {{--disabled="true"--}}
                            v-bind:disabled="disablePurchaseButton"
                            v-on:click="openPurchaseModal()"
                            class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Thanh toán <i
                                class="fa fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="modalSuccess" class="modal fade">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Đặt hàng thành công</h2>
            </div>
            <div class="modal-body">
                <div style='text-align: center'>
                    Chúng tôi đã nhận được đơn hàng của bạn, bạn vui lòng kiểm tra email. Chúng tôi sẽ liên hệ lại
                    với
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
                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1508044393LMpECneJ7n8qQTg.png" width="150px"/>
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

<!-- Core JS Files -->
<script src="/graphics-assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="/graphics-assets/js/jquery-ui-1.12.1.custom.min.js" type="text/javascript"></script>
<script src="/graphics-assets/js/tether.min.js" type="text/javascript"></script>
<script src="/graphics-assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/graphics-assets/js/paper-kit.js?v=2.0.0"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/graphics.js?8888"></script>
</html>