@extends('alibaba::layouts.master')

@section('content')
    <div class="page-header page-header-xs"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1511177729S6qy0r1iJPE2Dpg.jpg%20(2)'); box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.15);">
        <div class="container">
            <br><br>
            <div class="row">
                <div class="col-md-8" style="margin-top:10%">
                    <h2 style="font-weight:600; color:#1C484D!important"><b>ĐĂNG KÍ KHOÁ HỌC</b></h2><br>
                    <h5 class="description" style="font-weight:100; color:#1C484D!important">LỰA CHỌN KHOÁ HỌC PHÙ HỢP
                        VỚI BẠN</h5>
                </div>

            </div>
        </div>
    </div>
    <div class="blog-2 section section-gray">
        <div class="container">
            <div class="row">
                @foreach($courses as $course)
                    <div class="col-md-4">
                        <div class="card card-plain">
                            <div class="card-img-top">
                                <a href="/classes/{{$course['id']}}">
                                    <img class="img" src="{{$course['image_url']}}">
                                </a>
                            </div>
                            <div class="card-body">
                                <a href="/classes/{{$course['id']}}" target="_blank"><h4
                                            class="card-title">{{$course['name']}}</h4></a>
                                <h6 class="card-category text-muted">{{$course['duration']}} buổi</h6>
                                <p class="card-description">
                                    {{$course['description']}}
                                </p>
                                <br>
                                <a class="btn btn-round btn-danger"
                                   style="background-color:#FF6D00;border-color:#FF6D00"
                                   href="/classes/{{$course['id']}}"><i class="fa fa-plus"></i> Đăng ký ngay </a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

@endsection