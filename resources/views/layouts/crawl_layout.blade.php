<!DOCTYPE html>
<html lang="en">
<head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# article: http://ogp.me/ns/article#">

    <style>
        .content img {
            width: 100% !important;
        }
    </style>
    @yield('head')

    <link rel="stylesheet" href="{{url('colorme-react/styles.css')}}">
    <meta name="description" content="{{seo_keywords()}}"/>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
</head>
<body>
<h1 style="position: fixed;top: -100px;">
    {{seo_keywords()}}
</h1>

<h2 style="position: fixed;top: -100px;">
    {{seo_keywords()}}
</h2>

<h3 style="position: fixed;top: -100px;">
    {{seo_keywords()}}
</h3>

<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span
                        class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
            <a href="/">
                <img alt="{{seo_keywords()}} Color ME"
                     src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg">
            </a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                        aria-haspopup="true" aria-expanded="false"><!-- react-text: 78 -->Giáo trình
                        <!-- /react-text --><span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/resource/photoshop/lesson/1"><img class="img-circle"
                                                                        alt="{{seo_keywords()}} color me"
                                                                        src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                                                                        style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 555 -->Photoshop<!-- /react-text --></a></li>
                        <li><a href="/resource/illustrator/lesson/9"><img class="img-circle"
                                                                          alt="{{seo_keywords()}} color me"
                                                                          src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                                                                          style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 559 -->Illustrator<!-- /react-text --></a></li>
                        <li><a href="/resource/after-effects/lesson/15"><img class="img-circle"
                                                                             alt="{{seo_keywords()}} color me"
                                                                             src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                                                                             style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 563 -->After Effects<!-- /react-text --></a></li>
                        <li><a href="/resource/photography/lesson/27"><img class="img-circle"
                                                                           alt="{{seo_keywords()}} color me"
                                                                           src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                                                                           style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 567 -->Photography<!-- /react-text --></a></li>
                    </ul>
                </li>
                <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                        aria-haspopup="true" aria-expanded="false"><!-- react-text: 16 -->Đăng kí học
                        <!-- /react-text --><span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/course/photography"><img class="img-circle"
                                                               alt="{{seo_keywords()}} color me"
                                                               src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                                                               style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 128 -->Khoá học Photography<!-- /react-text --></a></li>
                        <li><a href="/course/after-effects"><img class="img-circle"
                                                                 alt="{{seo_keywords()}} color me"
                                                                 src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                                                                 style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 132 -->Khoá học After Effects<!-- /react-text --></a></li>
                        <li><a href="/course/photoshop"><img class="img-circle"
                                                             alt="{{seo_keywords()}} color me"
                                                             src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                                                             style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 136 -->Khoá học Photoshop<!-- /react-text --></a></li>
                        <li><a href="/course/illustrator"><img class="img-circle"
                                                               alt="{{seo_keywords()}} color me"
                                                               src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                                                               style="width: 20px; height: 20px; margin-right: 5px;">
                                <!-- react-text: 140 -->Khoá học Illustrator<!-- /react-text --></a></li>
                    </ul>
                </li>
                <li class=""><a href="/mua-sach">Đặt mua sách</a></li>
                <li class=""><a href="/about-us">Về chúng tôi</a></li>
                <li class=""><a class="btn-upload" href="/upload-post">Đăng bài</a></li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown" id="noti-dropdown"><a href="#" id="btn-noti" class="dropdown-toggle"
                                                           data-toggle="dropdown" role="button" aria-haspopup="true"
                                                           aria-expanded="false"><i class="fa fa-bell"
                                                                                    aria-hidden="true"></i>
                        <!-- react-text: 87 --> <!-- /react-text --></a>
                    <ul class="dropdown-menu">
                        <div class="noti-wrapper">
                            <div class="noti-header"><span class="noti-title">Thông báo</span></div>
                            <div class="noti-body">
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style="width: 50px; height: 50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 575 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-5776">bài viết</a>
                                            <!-- react-text: 577 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">14 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475896606wfp6NCtk9qhLkLa.jpg"
                                                                                          alt="{{seo_keywords()}} color me Phạm Khánh Huyền"
                                                                                          style="width: 50px; height: 50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/phamkhanhhuyen.0412">Phạm Khánh
                                                Huyền</a><!-- react-text: 586 --> đã thích <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-6950">bài viết</a>
                                            <!-- react-text: 588 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">14 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style="width: 50px; height: 50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 597 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-6950">bài viết</a>
                                            <!-- react-text: 599 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height: 50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 608 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-6950">bài viết</a>
                                            <!-- react-text: 610 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 619 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-6950">bài viết</a>
                                            <!-- react-text: 621 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 630 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-5776">bài viết</a>
                                            <!-- react-text: 632 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 641 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-6950">bài viết</a>
                                            <!-- react-text: 643 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><a href="/profile/qw">qw</a>
                                            <!-- react-text: 652 --> đã bình luận về <!-- /react-text --><a
                                                    href="/post/bai-tap-colorme-6950">bài viết</a>
                                            <!-- react-text: 654 --> của bạn<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 662 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 663 -->qw<!-- /react-text -->
                                            <!-- react-text: 664 --> <!-- /react-text --><!-- react-text: 665 -->Thành
                                            công<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 673 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 674 -->qw<!-- /react-text -->
                                            <!-- react-text: 675 --> <!-- /react-text --><!-- react-text: 676 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 684 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 685 -->qw<!-- /react-text -->
                                            <!-- react-text: 686 --> <!-- /react-text --><!-- react-text: 687 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 695 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 696 -->qw<!-- /react-text -->
                                            <!-- react-text: 697 --> <!-- /react-text --><!-- react-text: 698 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 706 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 707 -->qw<!-- /react-text -->
                                            <!-- react-text: 708 --> <!-- /react-text --><!-- react-text: 709 -->Thành
                                            công<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 717 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 718 -->qw<!-- /react-text -->
                                            <!-- react-text: 719 --> <!-- /react-text --><!-- react-text: 720 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 728 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 729 -->qw<!-- /react-text -->
                                            <!-- react-text: 730 --> <!-- /react-text --><!-- react-text: 731 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 739 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 740 -->qw<!-- /react-text -->
                                            <!-- react-text: 741 --> <!-- /react-text --><!-- react-text: 742 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 750 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 751 -->qw<!-- /react-text -->
                                            <!-- react-text: 752 --> <!-- /react-text --><!-- react-text: 753 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 761 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 762 -->qw<!-- /react-text -->
                                            <!-- react-text: 763 --> <!-- /react-text --><!-- react-text: 764 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 772 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 773 -->qw<!-- /react-text -->
                                            <!-- react-text: 774 --> <!-- /react-text --><!-- react-text: 775 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                                <div class="media"
                                     style="padding: 6px 10px; margin: 0px; border-bottom: 1px solid rgb(217, 217, 217);">
                                    <div class="media-left media-middle"><a href="#"><img class="media-object"
                                                                                          src="http://api.colorme.vn/img/user.png"
                                                                                          alt="{{seo_keywords()}} color me"
                                                                                          style=" width: 50px; height:
                                                                                          50px;"></a>
                                    </div>
                                    <div class="media-body">
                                        <div class="noti-item-title"><!-- react-text: 783 -->Bạn chuyển tiền cho
                                            <!-- /react-text --><!-- react-text: 784 -->qw<!-- /react-text -->
                                            <!-- react-text: 785 --> <!-- /react-text --><!-- react-text: 786 -->Thất
                                            bại<!-- /react-text --></div>
                                        <div class="noti-item-time">13 Tháng Mười, 2016</div>
                                    </div>
                                </div>
                            </div>
                            <div class="noti-footer"><a>Xem tất cả</a></div>
                        </div>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div>
    @yield('body')
</div>

<div class="container-fluid " id="footer">
    <div class="row">
        <div class="col-xs-12 col-sm-2"><img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg"
                                             width="40"><h4>colorME</h4>
            <div>Trường học thiết kế</div>
        </div>
        <div class="col-xs-12 col-sm-3 col-md-2" style="overflow: hidden;">
            <ul style="padding: 0px;">
                <li><a href="http://colorme.vn/">Trang chủ</a></li>
                <li><a href="http://colorme.vn/courses">Khóa học</a></li>
                <li><a href="http://colorme.vn/mua-sach">Sách thiết kế cho người mới bắt đầu</a></li>
                <li><a href="http://colorme.vn/#">Liên hệ</a></li>
            </ul>
        </div>
        <div>
            <ul class="col-xs-12 col-sm-3 col-md-2">
                @foreach($courses as $course)
                    <li><a href="/course/{{convert_vi_to_en($course->name)}}">Khoá học {{$course->name}}</a></li>
                @endforeach
            </ul>
        </div>
        <div class="col-xs-12 col-sm-4"><p><!-- react-text: 56 -->Cơ sở 1<!-- /react-text --><br><!-- react-text: 58 -->
                175 Chùa Láng - Hà Nội<!-- /react-text --></p>
            <p><!-- react-text: 60 -->Cơ sở 2<!-- /react-text --><br><!-- react-text: 62 -->601 Giải Phóng - Hà Nội
                <!-- /react-text --></p></div>
    </div>
    <div class="row" style="padding-top: 20px;">
        <div class="col-xs-12">Copyright © 2005–2016 KEE Education. All screenshots and videos © their respective
            owners.
        </div>
        <div class="col-xs-12"><a class="social-button" href="https://www.facebook.com/ColorME.Hanoi/?fref=ts"
                                  target="_blank"><img
                        src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1473867660z8twlU93Fm0PF2R.jpg"></a><a
                    class="social-button" target="_blank" href="https://www.instagram.com/colorme.hanoi/"><img
                        src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1473867650jPSNvMfYhve7Xm0.jpg"></a><a
                    class="social-button" target="_blank"
                    href="https://www.youtube.com/channel/UC1TpSQdG5rLyADdnrAtzP2w"><img
                        src="https://maxcdn.icons8.com/windows8/PNG/26/Social_Networks/youtube_copyrighted-26.png"
                        title="YouTube"></a><a class="social-button" href="http://colorme.vn/" target="_blank"><img
                        src="https://maxcdn.icons8.com/Android/PNG/24/Network/domain-24.png" title="Domain"></a></div>
    </div>
</div>
<script src="http://code.jquery.com/jquery-3.1.1.min.js"
        integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
        crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
<!-- Facebook Pixel Code -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '296964117457250');
    fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
               src="https://www.facebook.com/tr?id=296964117457250&ev=PageView&noscript=1"
    /></noscript>
<!-- End Facebook Pixel Code -->

</body>
</html>
