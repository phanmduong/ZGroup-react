<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta charset="utf-8"/>
    <link rel="shortcut icon" type="image/png" href="{{config("app.favicon")}}" cph-ssorder="0">
    <link rel="icon" type="image/png" href="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>SOCIOLOGY HUE</title>

    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="https://d255zuevr6tr8p.cloudfront.net/landingpage/assets/css/nucleo-icons.css" rel="stylesheet">

</head>
<body class="profile" style="background: #f2f2f2;">
<nav class="navbar navbar-toggleable-md fixed-top">
    <div class="container">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
        </button>
        <a class="navbar-brand" href="/">
            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513241627VqTNu2QuUiqvs9X.png" height="25px">
        </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <a class="nav-link" href="/about-us" data-scroll="true">Giới thiệu</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/all-books" data-scroll="true">Thư viện</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/blog" data-scroll="true"
                       style="display: flex; align-content: center">
                        BLOGS
                        <div style="margin-left: 10px;height: 20px; width: 20px; border-radius: 50%;
                        background-color: #c50000; color: white; display: flex; align-items: center;justify-content: center;">
                            {{$count_new_blogs}}
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div id="fb-root"></div>
<script>(function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.11';
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));</script>

@yield('content')

<footer class="footer footer-light footer-big">
    <div class="container">
        <div class="row">
            <div class="col-md-2 col-sm-3 col-xs-12">
                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513241627VqTNu2QuUiqvs9X.png" width="150px">
            </div>
            <div class="col-md-9 offset-md-1 col-sm-9 col-xs-12">
                <div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-6">
                        <div class="links">
                            <p> 77 Nguyễn Huệ, Tp Huế<br>
                                Đại học Khoa Học Huế,<br>
                                Nhà A, Tầng 3, Phòng 310 - 311
                            </p>
                        </div>
                    </div>
                    <div class="col-md-5 col-sm-5 col-xs-6">
                        <div class="links">
                            <p>
                            <div style="display: flex; align-items: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     width="30" height="30"
                                     viewBox="0 0 50 50"
                                     style=";fill:#000000;"
                                     class="icon icons8-secured-letter">
                                    <g id="surface1">
                                        <path style=" "
                                              d="M 0 7 L 0 43 L 50 43 L 50 7 Z M 2 9 L 48 9 L 48 11.5 C 47.609375 11.839844 30.074219 27.136719 28.4375 28.5625 L 28.34375 28.65625 C 27.046875 29.785156 25.71875 30 25 30 C 24.285156 30 22.953125 29.785156 21.65625 28.65625 C 21.285156 28.332031 18.613281 26.023438 16.6875 24.34375 C 10.972656 19.359375 2.292969 11.757813 2 11.5 Z M 2 14.15625 C 3.734375 15.667969 9.886719 21.023438 15.125 25.59375 L 2 35.96875 Z M 48 14.15625 L 48 35.96875 L 34.875 25.59375 C 40.113281 21.023438 46.265625 15.667969 48 14.15625 Z M 16.65625 26.9375 C 17.871094 27.996094 20.066406 29.914063 20.34375 30.15625 L 20.375 30.1875 C 22.066406 31.640625 23.863281 32 25 32 C 26.144531 32 27.957031 31.636719 29.65625 30.15625 C 29.9375 29.914063 32.148438 28.007813 33.375 26.9375 L 48 38.5 L 48 41 L 2 41 L 2 38.5 Z "></path>
                                    </g>
                                </svg>
                                sociologyhue@gmail.com
                            </div>
                            <div style="display: flex; align-items: center;"
                                 href="http://sociologyhue.facebook.com">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     width="30" height="30"
                                     viewBox="0 0 50 50"
                                     style=";fill:#000000;"
                                     class="icon icons8-facebook">
                                    <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
                                          d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 25.832031 46 A 1.0001 1.0001 0 0 0 26.158203 46 L 31.832031 46 A 1.0001 1.0001 0 0 0 32.158203 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 33 44 L 33 30 L 36.820312 30 L 38.220703 23 L 33 23 L 33 21 C 33 20.442508 33.05305 20.398929 33.240234 20.277344 C 33.427419 20.155758 34.005822 20 35 20 L 38 20 L 38 14.369141 L 37.429688 14.097656 C 37.429688 14.097656 35.132647 13 32 13 C 29.75 13 27.901588 13.896453 26.71875 15.375 C 25.535912 16.853547 25 18.833333 25 21 L 25 23 L 22 23 L 22 30 L 25 30 L 25 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 32 15 C 34.079062 15 35.38736 15.458455 36 15.701172 L 36 18 L 35 18 C 33.849178 18 32.926956 18.0952 32.150391 18.599609 C 31.373826 19.104024 31 20.061492 31 21 L 31 25 L 35.779297 25 L 35.179688 28 L 31 28 L 31 44 L 27 44 L 27 28 L 24 28 L 24 25 L 27 25 L 27 21 C 27 19.166667 27.464088 17.646453 28.28125 16.625 C 29.098412 15.603547 30.25 15 32 15 z"
                                          font-weight="400" font-family="sans-serif" white-space="normal"
                                          overflow="visible"></path>
                                </svg>
                                <a href="http://facebook.com/sociologyhue">facebook.com/sociologyhue</a>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                     width="30" height="30"
                                     viewBox="0 0 50 50"
                                     style=";fill:#000000;"
                                     class="icon icons8-instagram">
                                    <path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000;text-transform:none;block-progression:tb;isolation:auto;mix-blend-mode:normal"
                                          d="M 16 3 C 8.8324839 3 3 8.8324839 3 16 L 3 34 C 3 41.167516 8.8324839 47 16 47 L 34 47 C 41.167516 47 47 41.167516 47 34 L 47 16 C 47 8.8324839 41.167516 3 34 3 L 16 3 z M 16 5 L 34 5 C 40.086484 5 45 9.9135161 45 16 L 45 34 C 45 40.086484 40.086484 45 34 45 L 16 45 C 9.9135161 45 5 40.086484 5 34 L 5 16 C 5 9.9135161 9.9135161 5 16 5 z M 37 11 A 2 2 0 0 0 35 13 A 2 2 0 0 0 37 15 A 2 2 0 0 0 39 13 A 2 2 0 0 0 37 11 z M 25 14 C 18.936712 14 14 18.936712 14 25 C 14 31.063288 18.936712 36 25 36 C 31.063288 36 36 31.063288 36 25 C 36 18.936712 31.063288 14 25 14 z M 25 16 C 29.982407 16 34 20.017593 34 25 C 34 29.982407 29.982407 34 25 34 C 20.017593 34 16 29.982407 16 25 C 16 20.017593 20.017593 16 25 16 z"
                                          font-weight="400" font-family="sans-serif" white-space="normal"
                                          overflow="visible"></path>
                                </svg>
                                <a
                                        href="http://sociologyhue.pik">http://sociologyhue.pik</a>
                            </div>
                            </p>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-6">
                        <div class="links">
                            <ul class="stacked-links">
                                <li>
                                    <h4>{{$total_blogs}}<br>
                                        <small>Bài viết</small>
                                    </h4>
                                </li>
                                <li>
                                    <h4>256<br>
                                        <small>Lượt truy cập</small>
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
                        KEETOOL
                    </div>
                </div>
            </div>
        </div>

    </div>
</footer>


<!-- Core JS Files -->

<script src="/assets/js/jquery-ui-1.12.1.custom.min.js" type="text/javascript"></script>
<script src="/assets/js/tether.min.js" type="text/javascript"></script>
<script src="/assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="/assets/js/paper-kit.js?v=2.0.0"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/js/nhatquangshop.js?6868"></script>
<div id="modalPurchase" class="modal fade" style="overflow-y: scroll;">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h2 class="medium-title">Thanh toán</h2></div>
            <div class="modal-body">
                <form class="register-form "><h6>Họ và tên</h6> <input type="text" placeholder="Họ và tên"
                                                                       class="form-control"><br> <h6>Số điện thoại</h6>
                    <input type="text" placeholder="Số điện thoại" class="form-control"><br> <h6>Email</h6> <input
                            type="text" placeholder="Số điện thoại" class="form-control"><br> <h6>Địa chỉ nhận sách</h6>
                    <input type="text" placeholder="Địa chỉ nhận sách" class="form-control"><br> <h6>Phương thức thanh
                        toán</h6> <select id="sel1" class="form-control">
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                            Thanh toán trực tiếp khi nhận hàng(COD)
                        </option>
                    </select></form>
                <div id="purchase-error" style="display: none; color: red; padding: 10px; text-align: center;">
                    Bạn vui lòng nhập đầy đủ thông tin
                </div>
            </div>
            <div class="modal-footer" style="display: block;">
                <div id="purchase-loading-text" style="display: none; text-align: center; width: 100%; padding: 15px;">
                    <i class="fa fa-spin fa-spinner"></i>Đang tải...
                </div>
                <div id="btn-purchase-group" style="text-align: right;">
                    <button data-dismiss="modal" class="btn btn-link btn-google" style="width: auto !important;">Tiếp
                        tục mua <i class="fa fa-angle-right"></i></button>
                    <button class="btn btn-sm btn-google" style="margin: 10px 10px 10px 0px !important;">Thanh toán <i
                                class="fa fa-angle-right"></i></button>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="modalBuy" class="modal fade">
    <div class="modal-dialog modal-large">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" data-dismiss="modal" class="close">×</button>
                <h2 class="medium-title">Giỏ hàng</h2></div>
            <div id="modal-buy-body" class="modal-body"><br> <!---->
                <hr>
                <div class="row">
                    <div class="col-md-4"><h4 class="text-left"><b>Tổng</b></h4></div>
                    <div class="col-md-8"><h4 class="text-right"><b>0</b></h4></div>
                </div>
            </div>
            <div class="modal-footer">
                <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-google"
                        style="width: auto !important;">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                <button id="btn-purchase" class="btn btn-sm btn-google" style="margin: 10px 10px 10px 0px !important;">
                    Thanh toán <i class="fa fa-angle-right"></i></button>
            </div>
        </div>
    </div>
</div>
<div id="modalgoogle" class="modal fade">
    <div class="modal-dialog modal-large">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h2 class="medium-title">Đặt hàng thành công</h2>
            </div>
            <div class="modal-body">
                <div style="text-align: center">
                    Chúng tôi đã nhận được đơn hàng của bạn, bạn vui lòng kiểm tra email. Chúng tôi sẽ liên hệ lại với
                    bạn trong thời gian sớm nhất
                </div>
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

<script async defer src="https://buttons.github.io/buttons.js"></script>

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
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-111696061-1"></script>
<script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
        dataLayer.push(arguments);
    }

    gtag('js', new Date());

    gtag('config', 'UA-111696061-1');
</script>

</html>