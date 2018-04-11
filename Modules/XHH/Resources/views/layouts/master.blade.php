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
    <link href="/assets/css/xhh.css" rel="stylesheet">


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
                    <a class="nav-link" href="/landing-page/aboutus/" data-scroll="true">Giới thiệu</a>
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
                            <div style="display: flex;">
                                <i class="fa fa-envelope-o" aria-hidden="true"
                                   style="margin-right: 5px"></i>
                                <div style="color: #66615b!important; line-height: 1">sociologyhue@gmail.com</div>
                            </div>
                            <div style="display: flex; margin-top: 10px; margin-bottom: 10px"
                                 href="http://sociologyhue.facebook.com">
                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                <a href="http://facebook.com/sociologyhue"
                                   style="color: #66615b!important;margin-left: 5px; line-height: 1">facebook.com/sociologyhue</a>
                            </div>
                            <div style="display: flex;">
                                <i class="fa fa-instagram" aria-hidden="true"></i>
                                <a
                                        href="http://sociologyhue.pik"
                                        style="color: #66615b!important; margin-left: 5px; line-height: 1">http://sociologyhue.pik</a>
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
                                    <h4>{{$total_books}}<br>
                                        <small>Cuốn sách</small>
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
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
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

@stack("scripts")

</html>