@extends('layouts.public1')
@section('title','Khoá học '.$course->name)
@section('fb-info')
    <link rel="canonical" href="{{url('classes').'/'.$course->id}}"/>
    <meta property="og:url" content="{{url('classes').'/'.$course->id}}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="Học {{$course->name}} cùng colorME"/>
    <meta property="og:description" content="{{$course->description}}"/>
    <meta property="og:image" content="{{$course->image_url}}"/>
    <meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1787695151450379"/>
@endsection
@section('content')
    <div class="wrapper">
        <div class="page-header page-header-small"
             style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/images/1511171543ZQBRp0HaVGhGsF5.jpg')">

        </div>
        <div class="wrapper">
            <div class="container">
                <div class="row owner">
                    <div class="col-md-3 col-sm-5 col-xs-6">
                        <div class="avatar">
                            <img width="100%"
                                 src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15115161466W7v5SSCk4NgHqg.png"
                                 alt="Photoshop" class="img-responsive">
                        </div>
                    </div>
                    <div class="col-md-9 col-sm-7 col-xs-6">
                        <div>
                            <h6 class="card-category">Khoá học</h6>
                            <h3 class="card-title" style="margin-top:-10px">
                                <a href="#pablo"><b>{{$course->name}}</b></a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>


            <div class="main">

                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card card-plain">
                                    <div class="card-block">
                                        <h6 class="card-category">Design</h6>
                                        <a href="#pablo">
                                            <h3 class="card-title"><b>The aesthetic quality of a product</b></h3>
                                        </a>
                                        <p class="card-description">Eventually, the data collected from the grant
                                            program could allow the two to play a bit of machine learning moneyball —
                                            valuing machine learning engineers without traditional metrics (like having
                                            a PhD from Stanford)...</p>
                                        <p class="card-description">Eventually, the data collected from the grant
                                            program could allow the two to play a bit of machine learning moneyball —
                                            valuing machine learning engineers without traditional metrics (like having
                                            a PhD from Stanford)...</p>

                                        <div class="card-footer">
                                            <button type="button" onclick="openModalBuy(9,150000)"
                                                    class="btn btn-outline-default btn-round">
                                                <i class="fa fa-shopping-cart"></i>
                                                Đăng kí ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="card card-profile card-plain">
                                    <img class="card-img-top"
                                         src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15115161466W7v5SSCk4NgHqg.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section section-dark" style="background-color:#3c5dc5">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="card card-profile card-plain">
                                    <img class="card-img-top"
                                         src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1458318028a885YhKaEd3tkJ1.jpg">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="card card-plain">
                                    <div class="card-block">
                                        <h6 class="card-category">Design</h6>
                                        <a href="#pablo">
                                            <h3 class="card-title"><b>The aesthetic quality of a product</b></h3>
                                        </a>
                                        <p class="card-description">Eventually, the data collected from the grant
                                            program could allow the two to play a bit of machine learning moneyball —
                                            valuing machine learning engineers without traditional metrics (like having
                                            a PhD from Stanford)...</p>
                                        <p class="card-description">Eventually, the data collected from the grant
                                            program could allow the two to play a bit of machine learning moneyball —
                                            valuing machine learning engineers without traditional metrics (like having
                                            a PhD from Stanford)...</p>

                                        <div class="card-footer">
                                            <br>
                                            <button type="button" onclick="openModalBuy(9,150000)"
                                                    class="btn btn-outline-neutral btn-round">
                                                <i class="fa fa-shopping-cart"></i>
                                                Đăng kí ngay
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 offset-md-2  text-center">
                                <h2 class="title">Why our product is the best</h2>
                                <h5 class="description">This is the paragraph where you can write more details about
                                    your product. Keep you user engaged by providing meaningful information. Remember
                                    that by this time, the user is curious, otherwise he wouldn't scroll to get
                                    here.</h5>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-danger">
                                        <img src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1458318028a885YhKaEd3tkJ1.jpg"
                                             height="100px"/>
                                    </div>
                                    <div class="description">
                                        <h4 class="info-title">Beautiful Gallery</h4>
                                        <p class="description">Spend your time generating new ideas. You don't have to
                                            think of implementing.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-danger">
                                        <img src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1458318028a885YhKaEd3tkJ1.jpg"
                                             height="100px"/>
                                    </div>
                                    <div class="description">
                                        <h4 class="info-title">New Ideas</h4>
                                        <p>Larger, yet dramatically thinner. More powerful, but remarkably power
                                            efficient.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-danger">
                                        <img src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1458318028a885YhKaEd3tkJ1.jpg"
                                             height="100px"/>
                                    </div>
                                    <div class="description">
                                        <h4 class="info-title">Statistics</h4>
                                        <p>Choose from a veriety of many colors resembling sugar paper pastels.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        @endsection
        <nav class="navbar navbar-inverse navbar-fixed-top" style="font-size: 12px;">
            <div class="container-fluid" style="padding-left: 0px;">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span
                                class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                    </button>
                    <a href="http://colorme.vn/"><img alt="Color ME"
                                                      src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg"></a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"
                                                aria-haspopup="true" aria-expanded="false"><!-- react-text: 16 -->Đăng
                                kí học <!-- /react-text --><span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="/course/photoshop"><img class="img-circle"
                                                                     src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072407tOyRFhAeFPjsbfu.jpg"
                                                                     style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 179 -->Photoshop<!-- /react-text --></a></li>
                                <li><a href="/course/illustrator"><img class="img-circle"
                                                                       src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475072336A5Ks9NSnqnHsXOn.jpg"
                                                                       style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 183 -->Illustrator<!-- /react-text --></a></li>
                                <li><a href="/course/after-effects"><img class="img-circle"
                                                                         src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1455035399GURqJY2y45AZIAp.png"
                                                                         style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 187 -->After Effects<!-- /react-text --></a></li>
                                <li><a href="/course/photography"><img class="img-circle"
                                                                       src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1468283993EUvpBPDYpu8IkQ0.jpg"
                                                                       style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 191 -->Photography<!-- /react-text --></a></li>
                                <li><a href="/course/premiere"><img class="img-circle"
                                                                    src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1481009736PWVqDXlU8KoFwwJ.jpg"
                                                                    style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 195 -->Premiere<!-- /react-text --></a></li>
                                <li><a href="/course/indesign"><img class="img-circle"
                                                                    src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1481440169SyPRLsY5aXZOL6d.jpg"
                                                                    style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 199 -->InDesign<!-- /react-text --></a></li>
                                <li><a href="/course/thiet-ke-chuyen-sau"><img class="img-circle"
                                                                               src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1494575688odFkdXzweOeXMpO.jpg"
                                                                               style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 203 -->Thiết Kế Chuyên Sâu<!-- /react-text --></a></li>
                                <li><a href="/course/ui-ux"><img class="img-circle"
                                                                 src="http://d1j8r0kxyu9tj8.cloudfront.net/images/150643679690MuQbClSmXQ7ug.jpg"
                                                                 style="width: 20px; height: 20px; margin-right: 5px;">
                                        <!-- react-text: 207 -->UI UX<!-- /react-text --></a></li>
                            </ul>
                        </li>
                        <li class=""><a href="http://graphics.vn/">Đặt mua sách</a></li>
                        <li class=""><a href="/about-us">Về chúng tôi</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class=""><a href="/search"><i class="fa fa-search" aria-hidden="true"></i></a></li>
                        <li><a>Đăng nhập</a></li>
                    </ul>
                </div>
            </div>
        </nav>