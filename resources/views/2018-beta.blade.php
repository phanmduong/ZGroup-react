@extends('layouts.2018-public')
@section('content')
    <div class="container-fluid">
        <div class="row au-first right-image"
             style="height: 300px; background-image: url({{$gen_cover}});">
        </div>
        <div class="row" id="bl-routing-wrapper">
            <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                <a class="routing-bar-item" href="#first-after-nav"
                   style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Khoá
                    học</a><span
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span><a
                        class="routing-bar-item" href="/posts/7"
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Học
                    viên</a>
            </div>
        </div>
        <div id="first-after-nav"></div>
        <div class="row">
            <div class="home-page-wrapper">
                <div class="product-list-wrapper">
                    <div class="col-md-12">
                        <h3>KHÓA HỌC THIẾT KẾ</h3>
                    </div>
                    @foreach($courses as $course)
                        <div class="product-wrapper">
                            <a href="/course/{{convert_vi_to_en($course->name)}}">
                                <div class="product-item">
                                    <div style="background-image: url({{$course->image_url}}); background-size: cover; background-position: center center; padding-bottom: 70%">
                                    </div>
                                    <div class="product-info">
                                        <div class="media"
                                             style="font-size: 12px; margin-top: 10px; padding: 5px 10px;">
                                                <span
                                                        style="color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;">
                                                    <!-- react-text: 338 -->{{$course->name}}<!-- /react-text -->
                                                    <!-- react-text: 339 --><!-- /react-text --></span>
                                            <div class="media-body"><span>
                                                        <div class="timestamp"
                                                             style="font-size: 11px;">{{$course->duration}} buổi
                                                        </div>
                                                        <div class="timestamp"
                                                             style="line-height: 15px;font-size: 11px; color: #111111;">{{$course->description}}</div>
                                                    </span></div>
                                        </div>
                                        <div style="border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 40px; width: 100%;"></div>
                                        <div style="position: absolute; bottom: 5px;">
                                            <div class="product-tool">
                                            </div>
                                        </div>
                                        <div style="color: #76b031; font-size: 13px; position: absolute; bottom: 10px; right: 5px;">
                                            {{currency_vnd_format($course->price)}}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
@endsection