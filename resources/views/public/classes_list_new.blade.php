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
        <div class="container" >
            <h4 style="margin-top: 50px;">Danh sách lớp học</h4>
            @foreach($bases as $base)
                <h5 style="padding-top:40px"><strong>{{$base->name}}</strong>: {{$base->address}}</h5>
                <ul class="collection">
                    @foreach($base->classes()->where('course_id',$course_id)->where('gen_id',$current_gen_id)->orderBy('name','desc')->get() as $class)
                        <li class="collection-item avatar">
                            <img src="{{$course->icon_url}}" alt="" class="circle">

                            <h6 class="title">Lớp {{$class->name}}</h6>
                            <div>
                                <i class="tiny material-icons">schedule</i> {{$class->study_time}}
                            </div>
                            <div>
                                <i class="tiny material-icons">description</i> {{$class->description}}
                            </div>
                            <div class="red-text text-darken-4">
                                <i class="tiny material-icons">place</i> {{$class->base->name}}
                                : {{$class->base->address}}
                            </div>
                            @if($class->status == 1)
                                <a class="register-btn waves-effect waves-light btn secondary-content  red darken-4"
                                   href="{{url('/classes/register/'.$class->id."/".$saler_id."/".$campaign_id)}}"><i
                                            class="material-icons right">play_arrow</i>Đăng
                                    kí</a>
                            @else
                                <p class="secondary-content red-text">Ngừng tuyển sinh</p>
                            @endif
                        </li>
                    @endforeach
                </ul>
            @endforeach

        </div>

@endsection
