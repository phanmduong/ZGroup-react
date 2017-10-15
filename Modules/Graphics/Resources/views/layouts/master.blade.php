<!doctype html>
<html lang="en">

    <head>
        <script src="/assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="/assets/img/favicon.ico">
        <link rel="apple-touch-icon" sizes="76x76" href="/assets/img/apple-icon.png">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title>Tạp chí Graphics</title>

        <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
        <meta name="viewport" content="width=device-width" />

        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/assets/css/paper-kit.css" rel="stylesheet"/>
        <link href="/assets/css/demo.css" rel="stylesheet" />

        <!--     Fonts and icons     -->
        <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
        <link href="/assets/css/nucleo-icons.css" rel="stylesheet">

    </head>
    <body class="profile" style="background:#fafafa">
    <nav class="navbar navbar-toggleable-md fixed-top bg-white navbar-light">
        <div class="container">
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
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
                        <a class="nav-link" href="blog.html" data-scroll="true" href="javascript:void(0)">Blogs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/about-us" data-scroll="true" href="javascript:void(0)">Về chúng tôi</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/contact-us" data-scroll="true" href="javascript:void(0)">Liên hệ</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../index.html" data-scroll="true" href="javascript:void(0)">
                            <i class="fa fa-shopping-cart"></i>
                            Giỏ hàng
                            <p style="background:#c50000!important; padding:5px 10px!important; border-radius:100px; color:white!important; margin-left:5px;">2</p>
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
                <div class="col-md-2 col-sm-3 col-xs-12">
                    <img src="/assets/img/darklogo.png" width="150px"/>
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
                                        <a href="index.html">
                                            Trang chủ
                                        </a>
                                    </li>
                                    <li>
                                        <a href="about-us.html">
                                            Về chúng tôi
                                        </a>
                                    </li>
                                    <li>
                                        <a href="index.html">
                                            Mua sách
                                        </a>
                                    </li>
                                    <li>
                                        <a href="blog.html">
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
                                        <a href="contact.html">
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
                                        <h4>13.000<br> <small>Lượt xuất bản</small></h4>
                                    </li>
                                    <li>
                                        <h4>256<br> <small>Nhà phân phối</small></h4>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="copyright">
                        <div class="pull-left">
                            © <script>document.write(new Date().getFullYear())</script> KEE Agency
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
</html>