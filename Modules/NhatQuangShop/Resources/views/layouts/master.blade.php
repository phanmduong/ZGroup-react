<!doctype html>
<html lang="en">

<head>
    <script src="/assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
    <meta charset="utf-8"/>
    <link rel="icon" type="image/png" href="/assets/img/favicon.ico">
    <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <title>Nhật Quang Shop</title>

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
</head>
<body class="profile" style="background:#fafafa">
<nav class="navbar navbar-toggleable-md fixed-top bg-dark" style="height:35px; background:#272727!important">
    <div class="container">
        <div style="text-align:right; width:100%">
            <button
                    class="btn btn-danger" style="padding:3px 5px;margin:3px;font-size:10px;">
                <i class="fa fa-google"></i> Google Login
            </button>
            <button
                    class="btn btn-success" style="padding:3px 5px;margin:3px;font-size:10px;">
                <i class="fa fa-facebook"></i> Facebook Login
            </button>
            <!-- login modal -->
            <button type="button" class="btn btn-primary btn-round" data-toggle="modal" data-target="#loginModal">
                Login modal
            </button>
            <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-hidden="false">
                <div class="modal-dialog modal-register">
                    <div class="modal-content">
                        <div class="modal-header no-border-header text-center">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h6 class="text-muted">Welcome</h6>
                            <h3 class="modal-title text-center">Paper Kit</h3>
                            <p>Log in to your account</p>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" value="" placeholder="Email" class="form-control" />
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" value="" placeholder="Password" class="form-control" />
                            </div>
                            <button class="btn btn-block btn-round"> Log in</button>
                        </div>
                        <div class="modal-footer no-border-footer">
                            <span class="text-muted  text-center">Looking <a href="#paper-kit">create an account</a> ?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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

<!-- Core JS Files -->

<script src="/assets/js/jquery-ui-1.12.1.custom.min.js" type="text/javascript"></script>
<script src="/assets/js/tether.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/nhatquangshop.js?6868"></script>
</html>