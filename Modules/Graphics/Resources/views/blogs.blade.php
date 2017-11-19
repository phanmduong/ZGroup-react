@extends('graphics::layouts.master')


@section('content')
    <div class="page-header page-header-xs" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035903jSFNtNO4CXL5lfZ.png');">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h1 class="title"><b>Blogs</b></h1>
                        <h5 class=description">Các bài viết chia sẻ kiến thức và thông tin</h5>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:150px">
        <div class="container">
            <div class="description">
                <h1 class="medium-title">
                    Bài viết mới nhất<br>
                </h1>
                <a href="#pablo" class="btn btn-link btn-success" style="padding:0!important; margin:0!important">Xem tất cả <i class="fa fa-angle-right"></i></a><br><br><br>
            </div>
            <div class="row">
                @foreach($blogs as $blog)
                <div class="col-md-4">
                    <div class="card card-plain card-blog">
                        <div class="card-image">
                            <a href="{{'/blog/post/'.$blog->id}}">
                                <div
                                        style="width: 100%;
                                                border-radius: 15px;
                                                background: url({{generate_protocol_url($blog->url)}});
                                                background-size: cover;
                                                background-position: center;
                                                padding-bottom: 70%;"

                                ></div>
                            </a>
                        </div>
                        <div class="card-block">
                            <h3 class="card-title">
                                <a href="{{'/blog/post/'.$blog->id}}">{{$blog->title}}</a>
                            </h3>
                            <p class="card-description">
                                {{$blog->description}}
                            </p>
                            <br>
                            <a href="{{'/blog/post/'.$blog->id}}" style="color:#c50000!important"><b>Xem thêm</b></a>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>

            <hr>
            <div class="row">
                <div class="col-md-2 offset-md-10">
                    <div class="pull-right">
                        {{--<button class="btn btn-link btn-default btn-move-right">Bài viết cũ hơn<i class="fa fa-angle-right"></i></button>--}}
                        <a class="btn btn-link btn-default btn-move-right" href="{{'/blog?page='.$page_id}}" style="{{$display}}">  Bài viết cũ hơn  </a>
                    </div>
                </div>
            </div>
            <br>
            <br>
        </div>
    </div>
@endsection