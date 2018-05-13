<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png"
          href="http://d1j8r0kxyu9tj8.cloudfront.net/files/1515853471glZIdDdlEwbXivK.png" cph-ssorder="0">
    <link rel="icon" type="image/png" href="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="_token" content="{{ csrf_token() }}">

    <title>Nhà sách Elight</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>
    @stack('meta')    
    <!--     Fonts and icons     -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">
    <link href="/elight-assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="/elight-assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="/elight-assets/css/demo.css?12321" rel="stylesheet"/>
    <link href="/assets/css/elight.css" rel="stylesheet">

    <style>
        .nav-pills-primary > li > a, .pagination-primary > li > a, .pagination-primary > li > span, .pagination-primary > li:first-child > a, .pagination-primary > li:first-child > span, .pagination-primary > li:last-child > a, .pagination-primary > li:last-child > span {
            border: 2px solid #138edc;
            color: #138edc;
        }
        .nav-pills-primary > li.active > a, .nav-pills-primary > li.active > a:hover, .nav-pills-primary > li.active > a:focus, .pagination-primary > li > a:hover, .pagination-primary > li > a:focus, .pagination-primary > li > a:active, .pagination-primary > li.active > a, .pagination-primary > li.active > span, .pagination-primary > li.active > a:hover, .pagination-primary > li.active > span:hover, .pagination-primary > li.active > a:focus, .pagination-primary > li.active > span:focus {
            background-color: #138edc !important;
            border-color: #138edc !important;
            color: #FFFFFF;
        }
    </style>
    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-KP668PX');</script>
    <!-- End Google Tag Manager -->
    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
</head>
<body class="profile" style="background: #f2f2f2;">
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KP668PX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<div class="fb-livechat">
    <div class="ctrlq fb-overlay"></div>
    <div class="fb-widget">
        <div class="ctrlq fb-close"></div>
        <div class="fb-page" data-href="https://www.facebook.com/bookelight" data-tabs="messages" data-width="360"
             data-height="400" data-small-header="true" data-hide-cover="true" data-show-facepile="false"></div>
        <div class="fb-credit"></div>
        <div id="fb-root"></div>
    </div>
    <a href="https://m.me/bookelight" title="Gửi tin nhắn cho chúng tôi qua Facebook" class="ctrlq fb-button">
        <div class="bubble">1</div>
        <div class="bubble-msg">Bạn cần hỗ trợ?</div>
    </a></div>
<script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>$(document).ready(function () {
        function detectmob() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
        }

        var t = {delay: 125, overlay: $(".fb-overlay"), widget: $(".fb-widget"), button: $(".fb-button")};
        setTimeout(function () {
            $("div.fb-livechat").fadeIn()
        }, 8 * t.delay);
        if (!detectmob()) {
            $(".ctrlq").on("click", function (e) {
                e.preventDefault(), t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({
                    bottom: 0,
                    opacity: 0
                }, 2 * t.delay, function () {
                    $(this).hide("slow"), t.button.show()
                })) : t.button.fadeOut("medium", function () {
                    t.widget.stop().show().animate({bottom: "30px", opacity: 1}, 2 * t.delay), t.overlay.fadeIn(t.delay)
                })
            })
        }
    });</script>
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
            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1518152088Lojusj9HE0QXEha.png" height="40px">
        </a>
        <a id="openWithoutAdd" href="javascript:void(0)" data-scroll="true"
           v-on:click="openModalBuyWithoutAdd()"
                                                            class="navbar-brand"
                                                            style="display:inline-flex; align-content: center; color: white !important; font-weight: 570; font-size: 14px; text-transform: uppercase; padding: 5px; line-height: 1.7em;max-width:140px"><i
                        class="fa fa-shopping-cart" style="font-size: 16px; padding: 2px 0px 0px;"></i>
                &nbsp;
                Giỏ hàng
                <div id="booksCount" style="margin-left: 10px;height: 20px; width: 20px; border-radius: 50%;
                        background-color: #c50000; color: white; display: flex; align-items: center;justify-content: center;display: none!important;">
                            @{{ books_count }}
                </div>
            </a>

        <div id="openWithoutAdd" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="http://elightbook.com/" data-scroll="true">Sách tiếng
                        anh cơ bản</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="/all-books" data-scroll="true">Thư Viện Tự Học</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="/blog" data-scroll="true">Phương Pháp Học </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color:white" href="/about-us" data-scroll="true">Về chúng tôi</a>
                </li>
                <li class="nav-item">
                    <a class="btn btn-round  btn-xs" style="background-color: #F9A602; border-color:#F9A602"
                       href="tel:+84981937066">
                        0981 937 066
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

@yield('content')

<footer class="footer footer-light footer-big">
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-sm-3 col-xs-12"
                 style="display: flex;
                flex-direction: column;
                align-items: center;">
                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15195676838huzFKfrZGBzyEC.png" width="150px">
                <div><h5 style="text-align: center">Nhà Sách Elight</h5></div>
            </div>
            <div class="col-md-9 offset-md-1 col-sm-9 col-xs-12">
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="/">
                                        <h5><b> Trang chủ </b></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="/about-us">
                                        Về Elight
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Phương pháp học
                                    </a>
                                </li>
                                <li>
                                    <a href="/all-books">
                                        Thư viện tự học
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a>
                                        <h5><b>Sản phẩm</b></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="#buyBooks">
                                        Sách tiếng anh
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        Khoá học Online
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        Khoá học Trung Tâm
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a>
                                        <h5><b>Liên hệ</b></h5>
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:0981 937 066">
                                        Tư vấn sản phẩm<br> 0981 937 066
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:01628 766 444">
                                        Hợp tác<br> 01628 766 444
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a>
                                        <h5><b>Địa chỉ</b></h5>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <h6 style="font-weight: 200">
                                            146 Hoàng Quốc Việt, Cầu Giấy, Hà Nội
                                        </h6>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <hr>

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
            <div class="modal-header" id="modal-buy-body">
                <a style="text-align: center">Điền đầy đủ thông tin để hoàn tất đăng ký nhé!</a>
            </div>
            <div class="modal-body">
                <form class="register-form ">
                    <h6>Họ và tên</h6>
                    <input v-model="name" type="text" class="form-control" placeholder="Họ và tên"><br>
                    <h6>Số điện thoại</h6>
                    <input v-model="phone" type="text" class="form-control" placeholder="Số điện thoại"><br>
                    <h6>Email</h6>
                    <input v-model="email" type="text" class="form-control" placeholder="Email của bạn"><br>
                    <h6>Địa chỉ nhận sách</h6>
                    <input v-model="address" type="text" class="form-control"
                           placeholder="Địa chỉ của bạn"
                           style="margin-top: 5px"><br>
                    <h6>Phương thức thanh toán</h6>
                    <div class="radio">
                        <input type="radio" id="cod" v-model="payment" value="Thanh toán trực tiếp khi nhận hàng(COD)" checked>
                        <label for="cod">
                            Thanh toán trực tiếp khi nhận hàng
                        </label>
                    </div>
                    <div class="radio">
                        <input type="radio" id="transfer" v-model="payment" value="Chuyển khoản">
                        <label for="transfer">
                            Chuyển khoản cho Elight
                        </label> 
                    </div>
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
                    <button
                            v-on:click="submitOrder()"
                            onclick="fbq('track', 'InitiateCheckout')"
                            class="btn btn-sm btn-success"
                            style="margin:10px 10px 10px 0px!important">Gửi thông tin đặt hàng <i class="fa fa-angle-right"></i>
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
                <h2 class="medium-title">Đăng ký mua sách</h2>
            </div>

            <div class="modal-header" id="modal-buy-body">
                <a style="text-align: center">Cảm ơn bạn! dưới đây là sản phẩm bạn muốn đặt mua</a>
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
                                <p>@{{good.description}}</p>
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
                                <b style="font-weight:600;"> @{{good.number}} </b>
                            </div>
                            <div class="col-md-2 h-center">
                                <p>@{{ formatPrice(good.price)}}</p>
                            </div>
                            <div class="col-md-2 h-center">
                                <p><b style="font-weight:600;">@{{formatPrice(good.price * good.number)}}</b>
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
                            <h4 class="text-right">
                                <b v-if="isLoading">
                                    0
                                </b>
                                <b v-else="isLoading">
                                    @{{formatPrice(total_price)}}
                                </b>
                            </h4>
                        </div>
                    </div>
                    <div class="row" style="padding-top:20px;">
                        <div class="col-md-12">
                            <div style="font-weight: 600">Lưu ý: Elight miễn phí vận chuyển toàn quốc.</div>
                            <div>- Elight hỗ trợ thanh toán trực tiếp khi nhận.</div>
                            <div>- Bấm vào nút <b>Đồng ý </b>để xác nhận sản phẩm muốn đặt, đăng ký.</div>
                            <div>- Bấm vào nút <b>Thêm sản phẩm </b>để thêm các sản phẩm khác vào đơn hàng.</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-success"
                            style="width:auto!important">Thêm sản phẩm <i class="fa fa-angle-right"></i></button>
                    <button id="btn-purchase"
                            v-on:click="openPurchaseModal()"
                            class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Đồng ý <i
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
<script src="/js/elight.js?68689"></script>
<script type="text/javascript">
    function pureJsOpenModalBuy(goodId) {
        modalBuy.addGoodToCart(goodId);
        $('#modalBuy').modal('show');
    }

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
<script>
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

@stack("scripts")

</body>
</html>