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
    <script>
        window.url = "{{url("/")}}";
        window.token = "{{csrf_token()}}";
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){console.log('test');n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
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
<style>.fb-livechat, .fb-widget{display: none}.ctrlq.fb-button, .ctrlq.fb-close{position: fixed; right: 24px; cursor: pointer}.ctrlq.fb-button{z-index: 999; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEyOCAxMjgiIGhlaWdodD0iMTI4cHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMjggMTI4IiB3aWR0aD0iMTI4cHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxyZWN0IGZpbGw9IiMwMDg0RkYiIGhlaWdodD0iMTI4IiB3aWR0aD0iMTI4Ii8+PC9nPjxwYXRoIGQ9Ik02NCwxNy41MzFjLTI1LjQwNSwwLTQ2LDE5LjI1OS00Niw0My4wMTVjMCwxMy41MTUsNi42NjUsMjUuNTc0LDE3LjA4OSwzMy40NnYxNi40NjIgIGwxNS42OTgtOC43MDdjNC4xODYsMS4xNzEsOC42MjEsMS44LDEzLjIxMywxLjhjMjUuNDA1LDAsNDYtMTkuMjU4LDQ2LTQzLjAxNUMxMTAsMzYuNzksODkuNDA1LDE3LjUzMSw2NCwxNy41MzF6IE02OC44NDUsNzUuMjE0ICBMNTYuOTQ3LDYyLjg1NUwzNC4wMzUsNzUuNTI0bDI1LjEyLTI2LjY1N2wxMS44OTgsMTIuMzU5bDIyLjkxLTEyLjY3TDY4Ljg0NSw3NS4yMTR6IiBmaWxsPSIjRkZGRkZGIiBpZD0iQnViYmxlX1NoYXBlIi8+PC9zdmc+) center no-repeat #0084ff; width: 60px; height: 60px; text-align: center; bottom: 50px; border: 0; outline: 0; border-radius: 60px; -webkit-border-radius: 60px; -moz-border-radius: 60px; -ms-border-radius: 60px; -o-border-radius: 60px; box-shadow: 0 1px 6px rgba(0, 0, 0, .06), 0 2px 32px rgba(0, 0, 0, .16); -webkit-transition: box-shadow .2s ease; background-size: 80%; transition: all .2s ease-in-out}.ctrlq.fb-button:focus, .ctrlq.fb-button:hover{transform: scale(1.1); box-shadow: 0 2px 8px rgba(0, 0, 0, .09), 0 4px 40px rgba(0, 0, 0, .24)}.fb-widget{background: #fff; z-index: 1000; position: fixed; width: 360px; height: 435px; overflow: hidden; opacity: 0; bottom: 0; right: 24px; border-radius: 6px; -o-border-radius: 6px; -webkit-border-radius: 6px; box-shadow: 0 5px 40px rgba(0, 0, 0, .16); -webkit-box-shadow: 0 5px 40px rgba(0, 0, 0, .16); -moz-box-shadow: 0 5px 40px rgba(0, 0, 0, .16); -o-box-shadow: 0 5px 40px rgba(0, 0, 0, .16)}.fb-credit{text-align: center; margin-top: 8px}.fb-credit a{transition: none; color: #bec2c9; font-family: Helvetica, Arial, sans-serif; font-size: 12px; text-decoration: none; border: 0; font-weight: 400}.ctrlq.fb-overlay{z-index: 0; position: fixed; height: 100vh; width: 100vw; -webkit-transition: opacity .4s, visibility .4s; transition: opacity .4s, visibility .4s; top: 0; left: 0; background: rgba(0, 0, 0, .05); display: none}.ctrlq.fb-close{z-index: 4; padding: 0 6px; background: #365899; font-weight: 700; font-size: 11px; color: #fff; margin: 8px; border-radius: 3px}.ctrlq.fb-close::after{content: "X"; font-family: sans-serif}.bubble{width: 20px; height: 20px; background: #c00; color: #fff; position: absolute; z-index: 999999999; text-align: center; vertical-align: middle; top: -2px; left: -5px; border-radius: 50%;}.bubble-msg{width: 120px; left: -140px; top: 5px; position: relative; background: rgba(59, 89, 152, .8); color: #fff; padding: 5px 8px; border-radius: 8px; text-align: center; font-size: 13px;}</style><div class="fb-livechat"> <div class="ctrlq fb-overlay"></div><div class="fb-widget"> <div class="ctrlq fb-close"></div><div class="fb-page" data-href="https://www.facebook.com/graphicsvn" data-tabs="messages" data-width="360" data-height="400" data-small-header="true" data-hide-cover="true" data-show-facepile="false"> </div><div class="fb-credit"> <a href="https://chanhtuoi.com" target="_blank">Powered by Chanhtuoi</a> </div><div id="fb-root"></div></div><a href="https://m.me/graphicsvn" title="Gửi tin nhắn cho chúng tôi qua Facebook" class="ctrlq fb-button"> <div class="bubble">1</div><div class="bubble-msg">Bạn cần hỗ trợ?</div></a></div><script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9"></script><script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script><script>$(document).ready(function(){function detectmob(){if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) ){return true;}else{return false;}}var t={delay: 125, overlay: $(".fb-overlay"), widget: $(".fb-widget"), button: $(".fb-button")}; setTimeout(function(){$("div.fb-livechat").fadeIn()}, 8 * t.delay); if(!detectmob()){$(".ctrlq").on("click", function(e){e.preventDefault(), t.overlay.is(":visible") ? (t.overlay.fadeOut(t.delay), t.widget.stop().animate({bottom: 0, opacity: 0}, 2 * t.delay, function(){$(this).hide("slow"), t.button.show()})) : t.button.fadeOut("medium", function(){t.widget.stop().show().animate({bottom: "30px", opacity: 1}, 2 * t.delay), t.overlay.fadeIn(t.delay)})})}});</script>
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
        <div class="collapse navbar-collapse">
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
                    <a class="nav-link" onclick="openModalBuyWithoutAdd()" data-scroll="true" href="javascript:void(0)">
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

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Thanh toán</h2>
            </div>
            <div class="modal-body">
                <form class="register-form ">
                    <h6>Họ và tên</h6>
                    <input id="graphics-name" type="text" class="form-control" placeholder="Họ và tên"><br>
                    <h6>Số điện thoại</h6>
                    <input id="graphics-phone" type="text" class="form-control" placeholder="Số điện thoại"><br>
                    <h6>Email</h6>
                    <input id="graphics-email" type="text" class="form-control" placeholder="Số điện thoại"><br>
                    <h6>Địa chỉ nhận sách</h6>
                    <input id="graphics-address" type="text" class="form-control"
                           placeholder="Địa chỉ nhận sách"><br>
                    <h6>Phương thức thanh toán</h6>
                    <select id="graphics-payment" class="form-control" id="sel1">
                        <option value="Chuyển khoản">Chuyển khoản</option>
                        <option value="Thanh toán trực tiếp khi nhận hàng(COD)">
                            Thanh toán trực tiếp khi nhận hàng(COD)
                        </option>
                    </select>
                </form>
                <div style="display:none;color: red; padding: 10px; text-align: center" id="purchase-error" }>Bạn vui
                    lòng nhập đầy đủ thông tin
                </div>
                <p style="font-weight: 600">
                    <br>
                    Trong trường hợp bạn lựa chọn hình thức thanh toán <b>chuyển khoản</b> dưới đây là thông tin chuyển
                    khoản:</p>
                <p>
                    Tên tài khoản: VU CHI CONG<br/>
                    Số tài khoản: 04 51 00 04 27 664 <br/>
                    Ngân hàng: Vietcombank Thành Công.
                </p>
            </div>
            <div class="modal-footer" style="display: block">
                <div id="purchase-loading-text" style="display:none;text-align: center;width: 100%;;padding: 15px;"><i
                            class='fa fa-spin fa-spinner'></i>Đang tải...
                </div>
                <!--<a href="http://colorme.000webhostapp.com/" class="btn btn-link btn-success">Xem thêm</a>-->

                <div id="btn-purchase-group" style="text-align: right">
                    <button data-dismiss="modal" class="btn btn-link btn-success" style="width:auto!important">Tiếp
                        tục mua <i class="fa fa-angle-right"></i></button>
                    <button
                            onclick="submitOrder()"
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

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h2 class="medium-title">Giỏ hàng</h2>
            </div>
            <div class="modal-body" id="modal-buy-body">
                <br>
                <div>
                    <div class="row" style="margin-bottom:20px;">
                        <div class="col-md-1 h-center">
                            <img class="shadow-image"
                                 src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035612VsAtwZU2JjcAcPV.jpg">
                        </div>
                        <div class="col-md-4">
                            <p><b style="font-weight:600;">GRAPHICS ISSUE #1</b></p>
                            <p>Connect the dots</p>
                        </div>
                        <div class="col-md-3 h-center">
                            <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-minus"></i>
                            </button>
                            &nbsp
                            <button class="btn btn-success btn-just-icon btn-sm"><i class="fa fa-plus"></i>
                            </button>
                            &nbsp
                            <b style="font-weight:600;"> 5 </b>
                        </div>
                        <div class="col-md-2 h-center">
                            <p>200.000đ</p>
                        </div>
                        <div class="col-md-2 h-center">
                            <p><b style="font-weight:600;">1.000.000đ</b></p>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-md-4">
                            <h4 class="text-left"><b>Tổng</b></h4>

                        </div>
                        <div class="col-md-8">
                            <h4 class="text-right"><b>2.000.000đ</b></h4>
                        </div>
                    </div>

                    <div class="row">
                        <p>Lưu ý: chi phí ship được tính như sau: </p>
                        <div>Ship Sài Gòn: 30k</div>
                        <div>Ship nội thành Hà Nội: 20k</div>
                        <div>Ship đến tỉnh thành khác: 30k</div>
                    </div>

                </div>
            </div>
            <div class="modal-footer">
                <!--<a href="http://colorme.000webhostapp.com/" class="btn btn-link btn-success">Xem thêm</a>-->
                <button data-toggle="modal" data-target="#modalBuy" class="btn btn-link btn-success"
                        style="width:auto!important">Tiếp tục mua <i class="fa fa-angle-right"></i></button>
                <button id="btn-purchase"
                        onclick="openPurchaseModal()"
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
<script src="/js/graphics.js?6868"></script>
<script>
    function myFunction(id, price) {
        openModalBuy(id, price);
        fbq('track', 'AddToCart');
    }
</script>
</html>