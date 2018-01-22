@extends('elight::layouts.master')

@section('content')
    <div class="page-header page-header-small"
         style="background-image: url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1350&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D');">
        <div class="filter filter-dark"></div>
        <div class="content-center">
            <div class="container">
                <h2 style="font-weight: 400">Chào mừng bạn<br>
                    đến với thế giới của Elight Book<br>
                </h2>

                <h4 style="color:white">
                    Cùng học tiếng anh với Elight nhé
                </h4>
                <br>
                <a href="#buyBooks" class="btn btn-success btn-round" style="color:white">Đặt mua sách</a>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <br><br>
        <div class="row" id="buyBooks">
            <div class="col-md-6">
                <div class="description">
                    <h1 class="medium-title">
                        Sản phẩm mới nhất<br>
                    </h1>
                    <br>
                    {{--<a href="/all-books" class="btn btn-link btn-success"--}}
                    {{--style="padding:0!important; margin:0!important">Xem tất cả <i--}}
                    {{--class="fa fa-angle-right"></i></a>--}}
                    <br><br>
                </div>
                <br>
            </div>
        </div>
        <div class="row" id="vuejs1">
            @foreach($goods as $good)
                <div class="col-md-6 book-item">
                    <div class="card card-profile" style="border-radius:0; height: 90%">
                        <div class="flex flex-col flex-justify-content-space-between" style="height: 100%">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card card-profile card-plain">
                                            <img class="card-book-image" src="{{$good->avatar_url}}">
                                        </div>
                                    </div>
                                    <div class="col-md-8 text-left">
                                        <br>
                                        <h5 style="font-weight:600">{{$good->name}}</h5>
                                        <p>{{shortString($good->description,18)}}</p>
                                        <h5>
                                            <b style="text-decoration: line-through;">{{currency_vnd_format($good['price'])}}</b>
                                            <i class="fa fa-angle-right"></i>{{currency_vnd_format($good['price']*(1-$good['coupon_value']))}}
                                        </h5><br>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                            <div style="display:flex;flex-direction:row-reverse;justify-content:space-between;">
                                <div>
                                    <a href="/sach/{{$good['id']}}" class="btn btn-link btn-success">
                                        Xem thêm
                                    </a>
                                    <button v-on:click="openModalBuy({{$good['id']}})"
                                            onclick="fbq('track', 'AddToCart')"
                                            class="btn btn-success" style="padding:3px;margin:3px;font-size:10px;">
                                        Đặt mua ngay <i class="fa fa-angle-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
    <br><br>
    </div>
    <div class="container" id="bookinfo">
        <div class="row">
            <div class="col-md-12">
                <div class="description">
                    <h1 class="medium-title">
                        Bài viết mới nhất<br>
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
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1513315148lid7m57PXMpi8ig.png');background-size: cover;">
                            <div style="padding-top:15%">
                                <div style="background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%); padding:2%; padding-top:30px">
                                    <h3 style="margin:0;padding:0;color:white; font-weight: 400">Chào mừng bạn<br>
                                        đến với thế giới của Elight Book<br>
                                    </h3>

                                    <p style="color:white">
                                        Cùng học tiếng anh với Elight nhé
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="description">
                            <h1 class="medium-title">
                                Học giao tiếp<br>
                            </h1>
                        </div>
                        {{--<a href="/blog/post/14676" style="color:#138edc!important"><b>Xem thêm</b></a>--}}

                        <br><br>
                    </div>
                    @foreach($blogSection1 as $blog)
                        <div class="col-md-12">
                            <div class="card card-plain card-blog">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card-image">
                                            <a href="/blog/post/{{$blog->id}}">
                                                <div style="width: 100%;
                                                        border-radius: 10px;
                                                        background: url('{{generate_protocol_url($blog->url)}}');
                                                        background-size: cover;
                                                        background-position: center;
                                                        padding-bottom: 70%;"></div>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h6 class="card-category">{{$blog->author->name}}</h6>
                                            <h3 class="card-title">
                                                <a href="#pablo">{{$blog->title}}</a>
                                            </h3>
                                            <p class="card-description">
                                                {{$blog->description}}
                                            </p>
                                            <a href="/blog/post/{{$blog->id}}"
                                               style="color:#138edc!important"><br><b>Xem
                                                    thêm</b></a>
                                        </div>

                                    </div>
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
                                Học từ vựng<br>
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
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1513315147hlROAAiDKpgLRmg.png');background-size: cover;">
                            <div style="padding-top:15%">
                                <div style="background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.7) 100%); padding:2%; padding-top:30px">
                                    <h3 style="margin:0;padding:0;color:white; font-weight: 400">Chào mừng bạn<br>
                                        đến với thế giới của Elight Book<br>
                                    </h3>

                                    <p style="color:white">
                                        Cùng học tiếng anh với Elight nhé
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div id="vuejs1" class="row">
                    @foreach($books as $book)
                        <div class="col-md-3">
                            <div class="card card-profile" style="border-radius: 0px;">
                                <div style="padding: 3%;">
                                    <div style="background-image: url('{{$book->icon_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>
                                </div>
                                <div>
                                    <div class="container text-left" style="min-height: 130px;"><br>
                                        <p style="font-weight: 600;">{{$book->name}}</p>
                                        <p>{{shortString($book->description,15)}}</p>
                                    </div>
                                </div>
                                <div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">
                                    <div style="text-align: right;">
                                        <a class="btn btn-success" href="/sach/{{$book->id}}"
                                           style="padding: 3px; margin: 3px; font-size: 10px;">
                                            Nghe online <i class="fa fa-headphones" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
            <br><br>
        </div>
    </div>
@endsection
