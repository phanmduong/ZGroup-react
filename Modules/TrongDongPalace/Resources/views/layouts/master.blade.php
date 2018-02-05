<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png" href="http://trongdongpalace.com/favicon.ico"
          cph-ssorder="0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>Trống đồng palace</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">
    <link href="assets/css/trongdong.css" rel="stylesheet">
    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
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
                        t.widget.stop().show().animate({
                            bottom: "30px",
                            opacity: 1
                        }, 2 * t.delay), t.overlay.fadeIn(t.delay)
                    })
                })
            }
        });
    </script>
</head>
<body style="background-color: #f9f9f9">
<nav class="navbar navbar-toggleable-md fixed-top" style="background: #07090D!important">
    <div class="container">
        <div class="navbar-translate">
            <button class="navbar-toggler navbar-toggler-right navbar-burger" type="button" data-toggle="collapse"
                    data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
                <span class="navbar-toggler-bar"></span>
            </button>
            {{--<div class="navbar-header">--}}
                {{--<a class="navbar-brand" href="/" style="padding:0!important">--}}
                    {{--<img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1517116042kHCSmDQWbcFqvbI.png" height="40px"--}}
                         {{--style="margin:10px 0"/>--}}
                {{--</a>--}}
            {{--</div>--}}
            <div class="navbar-header">
                <a class="navbar-brand" href="/" style="padding:0!important">
                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15178194240r275OBuC88NDYV.png" height="40px"
                         style="margin:10px 0"/>
                </a>
            </div>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link hover-change" href="/blog" data-scroll="true">TIỆC CƯỚI
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link hover-change" href="/blog" data-scroll="true">TỔ CHỨC SỰ
                        KIỆN</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link hover-change" href="/blog" data-scroll="true">WEDDING PLANNER</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link hover-change" href="/blog" data-scroll="true">TIN TỨC</a>
                </li>
                <li class="nav-item">
                    <a class="btn btn-round btn-danger"
                       style="background-color:#BA8A45; border-color:#BA8A45; color:white!important;"
                       href="/contact-us">LIÊN HỆ</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

{{--@include('upcoworkingspace::includes.register_modal')--}}

@yield('content')

<footer class="footer footer-big" style="background-color: #07090D;">
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-sm-3 col-xs-6">
                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15178194240r275OBuC88NDYV.png" height="40px"/>
            </div>
            <div class="col-md-9 offset-md-1 col-sm-9 col-xs-12">
                <div class="row">
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="/blog">
                                        Trang chủ
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Báo giá
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Bảo hành
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="/blog">
                                        Liên hệ
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Tuyển dụng
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Về chúng tôi
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="uppercase-links stacked-links">
                                <li>
                                    <a href="/blog">
                                        Tin tức
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Dùng thử
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog">
                                        Phản hồi
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-3 col-xs-6">
                        <div class="social-area">
                            <a class="btn btn-just-icon btn-round btn-default"
                               href="https://www.facebook.com/up.coworkingspace/">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-just-icon btn-round btn-default"
                               href="https://www.linkedin.com/company/up-co-working-space">
                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                            <a class="btn btn-just-icon btn-round btn-default"
                               href="https://www.instagram.com/up.coworkingspace/">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="copyright">
                    <div class="pull-left">
                        ©
                        <script>document.write(new Date().getFullYear())</script>
                        KEETOOL
                    </div>
                    <div class="links pull-right">
                        <ul>
                            <li>
                                <a href="/blog">
                                    Company Policy
                                </a>
                            </li>
                            |
                            <li>
                                <a href="/blog">
                                    Terms
                                </a>
                            </li>
                            |
                            <li>
                                <a href="/blog">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

<div id="submitModal" class="modal fade show">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h3 class="medium-title">Đăng kí </h3></div>
            <div id="modal-body" class="modal-body">
                <div class="container">
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
                    Xác nhận</i>
                </button>
            </div>
        </div>
    </div>
</div>
</body>

<!--  Plugins -->
<!-- Core JS Files -->
<script src="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/js/jquery-3.2.1.min.js"
        type="text/javascript"></script>
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
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script async defer src="https://buttons.github.io/buttons.js"></script>
<script src="https://rawgit.com/Wlada/vue-carousel-3d/master/dist/vue-carousel-3d.min.js"></script>
<script type="text/javascript">
    var el = new Vue({
        el: '#carousel',
        data: {
            slides: 6
        },
        components: {
            'carousel-3d': Carousel3d.Carousel3d,
            'slide': Carousel3d.Slide
        }
    })
</script>
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
