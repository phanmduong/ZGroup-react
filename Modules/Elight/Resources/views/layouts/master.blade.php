<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png"
          href="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513327197KZI2aaOhKCE4BWZ.png" cph-ssorder="0">
    <link rel="icon" type="image/png" href="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>Elight</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <!--     Fonts and icons     -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">
    <style type="text/css">
        .bs-example {
            font-family: sans-serif;
            position: relative;
        }

        .twitter-typeahead {
            width: 100%;
        }

        .typeahead, .tt-query, .tt-hint {
            border: 2px solid #CCCCCC;
            font-size: 22px; /* Set input font size */
            height: 30px;
            line-height: 30px;
            outline: medium none;
            padding: 8px 12px;
        }

        .typeahead {
            background-color: #FFFFFF;
        }

        .tt-query {
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;
        }

        .tt-hint {
            color: #999999;
        }

        .tt-menu {
            background-color: #FFFFFF;
            border: 1px solid rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            margin-top: 0px;
            padding: 8px 0;
            width: 100%;
        }

        .tt-suggestion {
            font-size: 15px; /* Set suggestion dropdown font size */
            padding: 3px 20px;
        }

        .tt-suggestion:hover {
            cursor: pointer;
            background-color: #0097CF;
            color: #FFFFFF;
        }

        .tt-suggestion p {
            margin: 0;
        }
    </style>
    <link href="/elight-assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/elight-assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="/elight-assets/css/demo.css" rel="stylesheet"/>

    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
</head>
<body class="profile" style="background: #f2f2f2;">
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-3.2.1.min.js"
        type="text/javascript"></script>
<nav class="navbar navbar-light navbar-toggleable-md fixed-top" style="background: #138edc!important">
    <div class="container">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
        </button>
        <a class="navbar-brand" href="/" style="padding: 5px!important;">
            <img src="http://elightbook.com/assets/img/Elight%20Logo%20Black%20copy.png" height="40px">
        </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="http://elightbook.com/" data-scroll="true">Sách tiếng
                        anh cơ bản</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="/about-us" data-scroll="true">Giới thiệu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="/all-books" data-scroll="true">Thư viện</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="/blog" data-scroll="true">BLOGS</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

@yield('content')

<footer class="footer footer-light footer-big">
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-sm-3 col-xs-12">
                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513327197KZI2aaOhKCE4BWZ.png" width="150px">
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
                                    <a href="/library">
                                        Thư viện
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
                        2017
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

<div id="modalBuy" class="modal fade">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Giỏ hàng</h2>
            </div>

            <div class="modal-body" id="modal-buy-body">
                <div>
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
                                <p>@{{ good.price * (1 - good.coupon_value)}}</p>
                            </div>
                            <div class="col-md-2 h-center">
                                <p><b style="font-weight:600;">@{{good.price * (1 - good.coupon_value) *
                                        good.number}}</b>
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
                            <h4 class="text-right"><b>@{{ price_vnd }}</b></h4>
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
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-ui-1.12.1.custom.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/tether.min.js" type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/bootstrap.min.js"
        type="text/javascript"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/paper-kit.js?v=2.0.0"></script>

<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/demo.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
<!--  Plugins for presentation page -->
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/presentation-page/main.js"></script>
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/presentation-page/jquery.sharrre.js"></script>
<script src="/mediaelementplayer/mediaelement-and-player.js"></script>
<script src="/mediaelementplayer/script.js"></script>
{{--<script src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1514975610Gr6yAv8DnDP0uaA.js"></script>--}}
<script src="https://www.tutorialrepublic.com/examples/js/typeahead/0.11.1/typeahead.bundle.js"></script>
<script async defer src="https://buttons.github.io/buttons.js"></script>

<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/elight.js?6868"></script>
<script type="text/javascript">
    (function () {
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        new IsoGrid(document.querySelector('.isolayer--deco1'), {
            transform: 'translateX(33vw) translateY(-340px) rotateX(45deg) rotateZ(45deg)',
            stackItemsAnimation: {
                properties: function (pos) {
                    return {
                        translateZ: (pos + 1) * 30,
                        rotateZ: getRandomInt(-4, 4)
                    };
                },
                options: function (pos, itemstotal) {
                    return {
                        type: dynamics.bezier,
                        duration: 500,
                        points: [{"x": 0, "y": 0, "cp": [{"x": 0.2, "y": 1}]}, {
                            "x": 1,
                            "y": 1,
                            "cp": [{"x": 0.3, "y": 1}]
                        }],
                        delay: (itemstotal - pos - 1) * 40
                    };
                }
            }
        });
    })();
</script>

@stack("scripts")

</body>

</html>