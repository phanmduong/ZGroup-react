<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>

    <title>@yield('title')</title>

    @yield('fb-info')
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <meta name="viewport" content="width=device-width"/>

    <link href="../../assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="../../assets/css/paper-kit.css" rel="stylesheet"/>
    <link href="../../assets/css/demo.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href='http://fonts.googleapis.com/css?family=Montserrat:400,300,700' rel='stylesheet' type='text/css'>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
    <link href="../../assets/css/nucleo-icons.css" rel="stylesheet">

</head>
<body class="add-product">
<nav class="navbar navbar-toggleable-md fixed-top bg-dark navbar-light" style="height:50px!important">
    <div class="container">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                data-target="#navbarToggler" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                aria-label="Toggle navigation">
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
            <span class="navbar-toggler-bar"></span>
        </button>
        <a class="navbar-brand" href="http://colorme.vn/" style="padding:0; margin:0">
            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg"/>
        </a>
        <div class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown" style="color :white">Đăng kí học</a>
                    <ul class="dropdown-menu dropdown-menu-right dropdown-danger">
                        <li class="dropdown-item"><a href="/course/photoshop"><img class="img-circle"
                                                                                   src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                                                                                   style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 179 -->Photoshop<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/illustrator"><img class="img-circle"
                                                                                     src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                                                                                     style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 183 -->Illustrator<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/after-effects"><img class="img-circle"
                                                                                       src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                                                                                       style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 187 -->After Effects<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/photography"><img class="img-circle"
                                                                                     src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                                                                                     style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 191 -->Photography<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/premiere"><img class="img-circle"
                                                                                  src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                                                                                  style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 195 -->Premiere<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/indesign"><img class="img-circle"
                                                                                  src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1481440169SyPRLsY5aXZOL6d.jpg"
                                                                                  style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 199 -->InDesign<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/thiet-ke-chuyen-sau"><img class="img-circle"
                                                                                             src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1494575688odFkdXzweOeXMpO.jpg"
                                                                                             style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 203 -->Thiết Kế Chuyên Sâu<!-- /react-text --></a></li>
                        <li class="dropdown-item"><a href="/course/ui-ux"><img class="img-circle"
                                                                               src="http://d1j8r0kxyu9tj8.cloudfront.net/images/150643679690MuQbClSmXQ7ug.jpg"
                                                                               style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 207 -->UI UX<!-- /react-text --></a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="http://graphics.vn/" data-scroll="true" href="javascript:void(0)" style="color :white">Đặt mua
                        sách</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/about-us" data-scroll="true" href="javascript:void(0)" style="color :white">Về chúng tôi</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" style="color :white" href="/search"><i class="fa fa-search"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" style="color :white">Đăng nhập</a>
                </li>
            </ul>
        </div>
    </div>
</nav>


@yield('content')

<div class="container-fluid " id="footer">
    <div class="row">
        <div class="col-xs-12 col-sm-2"><img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" width="40"><h4>
                colorME</h4>
            <div>Trường học thiết kế</div>
        </div>
        <div class="col-xs-12 col-sm-4"><p><!-- react-text: 209 -->Cơ sở 1<!-- /react-text --><br>
                <!-- react-text: 211 --> Số 175 phố Chùa Láng - Đống Đa - Hà Nội<!-- /react-text --></p>
            <p><!-- react-text: 213 -->Cơ sở 2<!-- /react-text --><br><!-- react-text: 215 -->Số 162 phố Phương Liệt (
                số 83 Trường Chinh rẽ vào) - Thanh Xuân - Hà Nội<!-- /react-text --></p>
            <p><!-- react-text: 217 -->Cơ sở 3<!-- /react-text --><br><!-- react-text: 219 -->Số 835/14 Trần Hưng Đạo,
                Phường 1, Quận 5, TP HCM<!-- /react-text --></p>
            <p><!-- react-text: 221 -->Cơ sở 4<!-- /react-text --><br><!-- react-text: 223 -->Số 15 ngõ 2 Thọ Tháp (Trần
                Thái Tông rẽ vào) - Cầu Giấy - Hà Nội<!-- /react-text --></p></div>
        <div>
            <ul class="col-xs-12 col-sm-6">
                <li><a href="/course/photoshop">Photoshop</a></li>
                <li><a href="/course/illustrator">Illustrator</a></li>
                <li><a href="/course/after-effects">After Effects</a></li>
                <li><a href="/course/photography">Photography</a></li>
                <li><a href="/course/premiere">Premiere</a></li>
                <li><a href="/course/indesign">InDesign</a></li>
                <li><a href="/course/thiet-ke-chuyen-sau">Thiết Kế Chuyên Sâu</a></li>
                <li><a href="/course/ui-ux">UI UX</a></li>
            </ul>
        </div>
    </div>
    <div class="row" style="padding-top: 20px;">
        <div class="col-xs-12">Copyright © 2005–2016 KEE Education. All screenshots and videos © their respective
            owners.
        </div>


    </div>
</div>
</body>

<!-- Core JS Files -->
<script src="../../assets/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="../../assets/js/jquery-ui-1.12.1.custom.min.js" type="text/javascript"></script>
<script src="../../assets/js/tether.min.js" type="text/javascript"></script>
<script src="../../assets/js/bootstrap.min.js" type="text/javascript"></script>
<script src="../../assets/js/paper-kit.js?v=2.0.0"></script>

<!--  for fileupload -->
<script src="../../assets/js/jasny-bootstrap.min.js"></script>

<!--  Plugins for Tags -->
<script src="../../assets/js/bootstrap-tagsinput.js"></script>

</html>
