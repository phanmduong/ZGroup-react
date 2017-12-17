@extends('layouts.public_new')
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
    <div class="wrapper" style="background:#eeeeee!important;">
        <div class="page-header page-header-small"
             style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/images/1511171543ZQBRp0HaVGhGsF5.jpg')">

        </div>
        <div class="wrapper">
            <div class="container">
                <div class="row owner">
                    <div class="col-md-3 col-sm-5 col-xs-6">
                        <div class="avatar">
                            <img width="100%"
                                 src="{{$course->icon_url}}"
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

                <div class="section" style="background-color:{{$landing->background1}}">
                    <div class="container">
                        <div class="row" >
                            <div class="col-md-6">
                                <div class="card card-plain">
                                    <div class="card-block">
                                        <h6 class="card-category">{{$landing->title1}}</h6>
                                        <a href="#pablo">
                                            <h3 class="card-title"><b>{{$landing->subtitle1}}</b></h3>
                                        </a>
                                        <p class="card-description">{{$landing->content1}}</p>


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
                                    <div class="card-image">
                                        <a href="/blog/post/14676">
                                            <div style="width: 100%;
                                    border-radius: 2px;
                                    background: url({{$landing->image1}});
                                    background-size: cover;
                                    background-position: center;
                                    padding-bottom: 70%;"></div>
                                        </a>
                                    </div>
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
                                    <div class="card-image">
                                        <a href="/blog/post/14676">
                                            <div style="width: 100%;
                                    border-radius: 2px;
                                    background: url(http://d1j8r0kxyu9tj8.cloudfront.net/images/1509776388s3sVU27sNhTdVNA.jpg);
                                    background-size: cover;
                                    background-position: center;
                                    padding-bottom: 70%;"></div>
                                        </a>
                                    </div>
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
        <div class="container">
            <h4 style="margin-top: 50px;">Danh sách lớp học</h4>
            @foreach($bases as $base)
                <h5 style="padding-top:40px"><strong>{{$base->name}}</strong>: {{$base->address}}</h5>
                <div class="collection">
                    @foreach($base->classes()->where('course_id',$course_id)->where('gen_id',$current_gen_id)->orderBy('name','desc')->get() as $class)

                        <div class="col-md-9"
                             style="background:white; margin-bottom:20px; border-radius:20px; padding:3%">
                            <div>
                                <div style="display:flex;flex-direction:row">
                                    <div style="margin-right:20px; border-radius:25px">
                                        <img src="{{$course->icon_url}}"
                                             style="border-radius:50%; height:100px;width:100px">
                                    </div>
                                    <div>
                                        <h4 style="font-weight:600; margin-top:10px">LỚP {{$class->name}}</h4><br>
                                        <p>
                                            <i class="fa fa-clock-o"></i> <b>Khai giảng ngày:</b> {{$class->study_time}}

                                            <br>

                                            <i class="fa fa-calendar"></i> <b>Lịch học:</b> Tối thứ 3 &amp; Tối thứ 5
                                            (19h-21h)

                                            <br>

                                            <i class="fa fa-map-marker"></i> <b>Địa điểm:</b> {{$class->base->address}}
                                            <br><br>
                                        </p>
                                        <a class="btn btn-round btn-danger"
                                           style="background-color:#FF6D00;border-color:#FF6D00" href="order.html"><i
                                                    class="fa fa-plus"></i> Tìm hiểu thêm </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    @endforeach
                </div>
            @endforeach

        </div>
        <br><br>
    </div>

@endsection
