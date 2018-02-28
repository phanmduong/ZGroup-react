@extends('elight::layouts.master')

@section('content')
    <div class="page-header page-header-small"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1519703091jEfJKTTFO9V0Syt.png');">
        <div class="filter filter-dark"></div>
        <div class="content-center">
            <div class="container">
                <h2 style="font-weight: 400">Nhà sách Elight
                </h2>

                <h4 style="color:white">
                    Trải nghiệm học ngoại ngữ dễ dàng, hiệu quả và tối ưu cho người Việt
                </h4>
                <br>
                <a href="#buyBooks" class="btn btn-success btn-round" style="color:white">Tìm hiểu ngay</a>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <br><br>
        <div class="row" id="buyBooks">
            <div class="col-md-12">
                <div class="description">
                    <h1 class="medium-title">
                        Sản phẩm nổi bật
                    </h1>
                    {{--<a href="/all-books" class="btn btn-link btn-success"--}}
                    {{--style="padding:0!important; margin:0!important">Xem tất cả <i--}}
                    {{--class="fa fa-angle-right"></i></a>--}}

                </div>
                <br>
            </div>
        </div>
        {{--<div class="row" id="vuejs1">--}}
        {{--@foreach($goods as $good)--}}
        {{--<div class="col-md-6 book-item">--}}
        {{--<div class="card card-profile" style="border-radius:0; height: 90%">--}}
        {{--<div class="flex flex-col flex-justify-content-space-between" style="height: 100%">--}}
        {{--<div class="container">--}}
        {{--<div class="row">--}}
        {{--<div class="col-md-4">--}}
        {{--<div class="card card-profile card-plain">--}}
        {{--<img class="card-book-image" src="{{$good->avatar_url}}">--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div class="col-md-8 text-left">--}}
        {{--<br>--}}
        {{--<h5 style="font-weight:600">{{$good->name}}</h5>--}}
        {{--<p>{{shortString($good->description,18)}}</p>--}}
        {{--<h5>--}}
        {{--<b style="text-decoration: line-through;">{{currency_vnd_format($good['price'])}}</b>--}}
        {{--<i class="fa fa-angle-right"></i>{{currency_vnd_format($good['price']*(1-$good['coupon_value']))}}--}}
        {{--</h5><br>--}}
        {{--</div>--}}

        {{--</div>--}}
        {{--</div>--}}

        {{--</div>--}}
        {{--<div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">--}}
        {{--<div style="display:flex;flex-direction:row-reverse;justify-content:space-between;">--}}
        {{--<div>--}}
        {{--<a href="/sach/{{$good['id']}}" class="btn btn-link btn-success">--}}
        {{--Xem thêm--}}
        {{--</a>--}}
        {{--<button v-on:click="openModalBuy({{$good['id']}})"--}}
        {{--onclick="fbq('track', 'AddToCart')"--}}
        {{--class="btn btn-success" style="padding:3px;margin:3px;font-size:10px;">--}}
        {{--Đặt mua ngay <i class="fa fa-angle-right"></i>--}}
        {{--</button>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--@endforeach--}}
        {{--</div>--}}
        {{--</div>--}}

        <div class="row" id="vuejs1">

            <div class="col-md-6 book-item">
                <div class="card card-profile" style="border-radius:0; height: 100%">
                    <div class="flex flex-col flex-justify-content-space-between" style="height: 100%">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-profile card-plain">
                                        <img style="height: 45% ;width: 70%; margin-left: 20%"
                                             src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15195556021TjlZlGGV0YTIsA.png">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                        <div style="display:flex;flex-direction:row-reverse;justify-content:space-between;">
                            <div class="col-md-12">

                                <a href="/sach/{{$goods[0]->id}}" class="btn btn-link btn-success">
                                    Xem thêm
                                </a>


                                <button v-on:click="openModalBuy({{$goods[0]->id}})"
                                        onclick="fbq('track', 'AddToCart')"
                                        class="btn btn-success" style="padding:5px;margin:5px;font-size:10px;">
                                    Đặt mua ngay <i class="fa fa-angle-right"></i>
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6 book-item">
                <div class="card" style="border-radius:0; height: 100%;margin-top: 30px;">
                    <div style="height: 100%">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <h1 style="text-align: center ;font-size:30px"> BỘ SÁCH TIẾNG ANH CƠ BẢN </h1>
                                    <br> <br>

                                    <div class="media"
                                         style="border-bottom: 0px;     margin-top:10px; padding-bottom:0px ">
                                        <div class="media-left">
                                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1519797922vKCTruOpCr00h61.png"
                                                 class="media-object" style="width:50px">
                                        </div>
                                        <div class="media-body" style="margin-left: 8px">
                                            <strong>Tài liệu tự học tiếng Anh tin dùng của hơn
                                                50.000 học viên và giảng viên cả.</strong>
                                        </div>
                                    </div>

                                    <div class="media"
                                         style="border-bottom: 0px;     margin-top:10px; padding-bottom:0px ">
                                        <div class="media-left">
                                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1519797927JcihqIpU4VE6NZi.png"
                                                 class="media-object" style="width:50px">
                                        </div>
                                        <div class="media-body" style="margin-left: 8px">
                                            <strong>Cung cấp trọn vẹn lộ trình, kiến thức, phương pháp học tiếng Anh từ
                                                số 0.</strong>
                                        </div>
                                    </div>
                                    <div class="media"
                                         style="border-bottom: 0px;     margin-top:10px; padding-bottom:0px ">
                                        <div class="media-left">
                                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/15197979187Bj4Qkg2F9Sk8jP.png"
                                                 class="media-object" style="width:50px">
                                        </div>
                                        <div class="media-body" style="margin-left: 8px">
                                            <strong>Cuốn sách tự học Tiếng Anh tốt nhất 2017 do người dùng bình
                                                chọn.</strong>
                                        </div>
                                    </div>
                                    <div class="media"
                                         style="border-bottom: 0px;     margin-top:10px; padding-bottom:0px ">
                                        <div class="media-left">
                                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1519797931UfRV2IRLWvrrj9f.png"
                                                 class="media-object" style="width:50px">
                                        </div>
                                        <div class="media-body" style="margin-left: 8px">
                                            <strong>Miễn phí sử dụng trọn đời Thư Viện Tự Học của Elight với hàng ngàn
                                                bài học
                                                hữu ích.</strong>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div style="margin-left: 73px;margin-top:15px">
                            <strong> Giá trọn bộ: <b style="color: #2C8DFF;margin-left:3px;font-size:16px">
                                    399.000đ </b> </strong> <br>
                            <strong>  Miễn phí vận chuyển Thanh toán khi nhận</strong>
                        </div>
                    </div>


                </div>
            </div>

        </div>


        <br><br>

    </div>
    <div class="container" id="bookinfo">
        <div class="row">
            <div class="col-md-12">
                <div class="description">
                    <h1 class="medium-title">
                        Sổ tay tự học <br>
                    </h1>
                </div>
                {{--<a href="/blog" style="color:#138edc!important"><b>Xem thêm</b></a>--}}
                <br><br>
            </div>
            <div class="col-md-6">
                <div class="card card-plain card-blog">
                    <div class="card-image">
                        <a href="/blog/post/{{$newestBlog->id}}">
                            <div style="width: 100%;
                                    border-radius: 10px;
                                    background: url({{generate_protocol_url($newestBlog->url)}});
                                    background-size: cover;
                                    background-position: center;
                                    padding-bottom: 70%;"></div>
                        </a>
                    </div>
                    <div class="card-block">
                        <p style="margin-top:15px"><b>{{$newestBlog->title}}</b></p>
                        <p class="card-description">
                            {{shortString($newestBlog->description,7)}}
                        </p>
                        <a href="/blog/post/{{$newestBlog->id}}" style="color:#138edc!important"><b>Xem thêm</b></a>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                @foreach($newestTop3 as $blog)
                    <div class="card card-plain card-blog" style="margin-bottom: 0px">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="card-image">
                                    <a href="/blog/post/{{$blog->id}}">
                                        <div style="width: 100%;
                                                border-radius: 10px;
                                                background: url({{generate_protocol_url($blog->url)}});
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"></div>
                                    </a>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <p style="margin-top:15px"><b>{{$blog->title}}</b></p>
                                    <p class="card-description">
                                        {{$blog->description}}
                                        <a href="/blog/post/{{$blog->id}}" style="color:#138edc!important"><br><b>Xem
                                                thêm</b></a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <div class="page-header page-header-small"
                 style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1519572859mnSTADMESIABzdK.JPG');background-size: cover;background-color: black;min-height: 350px">
                <div class="content-center">
                    <div class="container">
                        <h2 style="font-weight: 400">Sách Tiếng Anh Cơ Bản
                        </h2>

                        <h4 style="color:white">
                            Cuốn sách học Tiếng Anh số 1 dành cho người mới bắt đầu
                        </h4>
                        <br>
                        <a href="#buyBooks" class="btn btn-success btn-round" style="color:white">Tìm hiểu
                            ngay</a>
                    </div>
                </div>
            </div>

            <br>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="description">
                            <h1 class="medium-title">
                                Tiếng Anh cho người mới bắt đầu<br>
                            </h1>
                        </div>
                        {{--<a href="/blog/post/14676" style="color:#138edc!important"><b>Xem thêm</b></a>--}}

                        <br><br>
                    </div>
                    @foreach($blogSection1 as $blog)
                        <div class="col-md-4">
                            <div class="card card-plain card-blog text-center">
                                <div class="card-image">
                                    <a href="/blog/post/14676">
                                        <div style="width: 100%;
                                                border-radius: 10px;
                                                background: url('{{generate_protocol_url($blog->url)}}');
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"></div>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-category text-facebook">{{$blog->author->name}}</h6>
                                    <h3 class="card-title">
                                        <a href="#pablo">{{shortString($blog->title,4)}}</a>
                                    </h3>
                                    <p class="card-description">
                                        {{$blog->description}}
                                    </p>
                                    <br>
                                    <a href="/blog/post/{{$blog->id}}" class="btn btn-success btn-round"> Đọc
                                        thêm</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <br>
            <div style="height:1px; margin-bottom:9px; background:#c2c2c2">

            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="description">
                            <h1 class="medium-title">
                                Học từ vựng tiếng Anh<br>
                            </h1>
                        </div>
                        {{--<a href="/blog/post/14676" style="color:#138edc!important"><b>Xem thêm</b></a>--}}

                        <br><br>
                    </div>
                    @foreach($blogSection2 as $blog)
                        <div class="col-md-4">
                            <div class="card card-plain card-blog text-center">
                                <div class="card-image">
                                    <a href="/blog/post/14676">
                                        <div style="width: 100%;
                                                border-radius: 10px;
                                                background: url('{{generate_protocol_url($blog->url)}}');
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"></div>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h6 class="card-category text-facebook">{{$blog->author->name}}</h6>
                                    <h3 class="card-title">
                                        <a href="#pablo">{{shortString($blog->title,4)}}</a>
                                    </h3>
                                    <p class="card-description">
                                        {{$blog->description}}
                                    </p>
                                    <br>
                                    <a href="/blog/post/{{$blog->id}}" class="btn btn-success btn-round"> Đọc
                                        thêm</a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <br>


            <div class="page-header page-header-small"
                 style="background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1519817144ZS7Ub5VFjAwHNEC.png');background-size: cover;background-color: black;min-height: 300px!important;margin-bottom: 30px">
                <div class="content-center">
                    <div class="container">
                        <h2 style="font-weight: 400">Thư viện tự học
                        </h2>

                        <h4 style="color:white">
                            Dành cho độc giả đã mua sách
                        </h4>
                        <br>
                        <a href="#buyBooks" class="btn btn-success btn-round" style="color:white">Mua
                            sách</a>
                        <a href="/all-books" class="btn btn-success btn-round" style="color:white"> Đã có
                            sách </a>
                    </div>
                </div>
            </div>

            <br>


            {{--<div class="container">--}}
            {{--<div id="vuejs1" class="row">--}}
            {{--@foreach($books as $book)--}}
            {{--<div class="col-md-3">--}}
            {{--<div class="card card-profile" style="border-radius: 0px;">--}}
            {{--<div style="padding: 3%;">--}}
            {{--<div style="background-image: url('{{$book->icon_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>--}}
            {{--</div>--}}
            {{--<div>--}}
            {{--<div class="container text-left" style="min-height: 130px;"><br>--}}
            {{--<p style="font-weight: 600;">{{$book->name}}</p>--}}
            {{--<p>{{shortString($book->description,15)}}</p>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--<div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">--}}
            {{--<div style="text-align: right;">--}}
            {{--<a class="btn btn-success" href="/sach/{{$book->id}}"--}}
            {{--style="padding: 3px; margin: 3px; font-size: 10px;">--}}
            {{--Nghe online <i class="fa fa-headphones" aria-hidden="true"></i></a>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--@endforeach--}}
            {{--</div>--}}
            {{--</div>--}}
            <br><br>
        </div>
    </div>
@endsection
