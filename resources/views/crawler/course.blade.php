@extends('layouts.crawl_layout')

@section('head')
    <meta property="fb:app_id" content="1787695151450379"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="{{url('/course/'.convert_vi_to_en($course['name']))}}"/>
    <meta property="og:description"
          content="{{$course['description']}}"/>
    <meta property="og:title" content="Khoá học {{$course['name']}}"/>
    <meta property="og:image" content="{{$course['image_url']}}"/>
    <title>Khoá học {{$course['name']}}</title>
@endsection

<body>
@section('body')
    <div class="page-wrap">
        <div>
            <div>
                <div style="padding-top: 60px; background: rgb(22, 22, 22); padding-bottom: 100px;">
                    <div class="container larger-container">
                        <div class="col-md-8 title-wrapper">
                            <div class="pre-head" style="display: block; font-size: 14px; color: rgb(217, 217, 217);">
                                <h1 style="font-size: 40px; margin-top: 0px; color: rgb(255, 255, 255);">
                                    Học {{$course['name']}}</h1>
                                <span><img class="img-circle"
                                           src="{{$course['image_url']}}"
                                           style="width: 20px; height: 20px; margin-right: 5px;">
                                    <!-- react-text: 124 -->Đăng ký khoá học<!-- /react-text --><span
                                            style="color: rgb(11, 181, 255);"><!-- react-text: 126 -->
                                        <!-- /react-text -->
                                        <!-- react-text: 127 -->{{$course['name']}}<!-- /react-text --></span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container larger-container" style="margin-top: -50px;">
                    <div class="col-md-8 product-detail-content-wrapper">
                        <div class="product-detail-content"
                             style="width: 100%; word-wrap: break-word; margin: 0px 0px 30px; padding: 50px 50px 60px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.0784314) 1px 1px 2px; min-height: 300px;">
                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1492159065etb7BYg975inlHr.jpg" alt="{{seo_keywords()}}">
                            <div class="product-detail-header" style="margin-top: 30px;">Giới thiệu</div>
                            <div>
                                {!! $course['description'] !!}
                            </div>
                            <div class="product-detail-header" style="margin-top: 30px;">Chi tiết</div>
                            <div>
                                {!! $course['detail'] !!}
                            </div>
                        </div>
                        <div class="product-detail-header" id="classlist">Danh sách lớp học</div>

                        <div>
                            @foreach($course['classes'] as $c)
                                <div class="media detail-comment">
                                    <div class="media-left"><a href="#">
                                            <img width="60" height="60"
                                                 class="media-object img-circle"
                                                 src="{{$course['icon_url']}}"
                                                 alt="{{seo_keywords()}}  avatar url"></a></div>
                                    <div class="media-body"><h4 class="media-heading"><!-- react-text: 172 -->Lớp
                                            <!-- /react-text --><!-- react-text: 173 -->{{$c['name']}}
                                        <!-- /react-text --></h4>
                                        <ul class="class-item-info">
                                            <li><span class="glyphicon glyphicon-time"></span><!-- react-text: 177 -->
                                                <!-- /react-text --><!-- react-text: 178 -->{{$c['study_time']}}
                                            <!-- /react-text --></li>
                                            <li><span class="glyphicon glyphicon-map-marker"></span>
                                                {{$c['address']}}</li>
                                            <li>
                                                <span class="glyphicon glyphicon-calendar"></span>
                                                {{$c['description']}}
                                            </li>
                                        </ul>
                                        <button class="btn-upload"><i class="fa fa-plus-square" aria-hidden="true"></i>
                                            <!-- react-text: 189 --> Đăng ký<!-- /react-text --></button>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                    <div class="col-md-4" style="padding-top: 70px;"><img
                                alt="{{seo_keywords()}} "
                                src="https://s3-ap-southeast-1.amazonaws.com/cmstorage/images/1458318028a885YhKaEd3tkJ1.jpg"
                                style="width: 100%; border-radius: 5px;">
                        <div style="width: 100%; margin-top: 20px;"><a class="btn btn-lg btn-danger btn-register-now"
                                                                       href="#classlist">Đăng kí ngay</a></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@endsection

</body>