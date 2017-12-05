@extends('layouts.public')

@section('title','Khoá học '.$course->name)

@section('header','Chi tiết môn học')

@section('fb-info')
    {{--<meta property="og:title" content="Học {{$course->name}} cùng colorME"/>--}}
    {{--<meta property="og:image" content="{{$course->image_url}}"/>--}}
    {{--<meta property="og:site_name" content="colorME"/>--}}
    {{--<meta property="og:description" content="{{$course->description}}"/>--}}
    <link rel="canonical" href="{{url('classes').'/'.$course->id}}"/>
    <meta property="og:url" content="{{url('classes').'/'.$course->id}}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="Học {{$course->name}} cùng colorME"/>
    <meta property="og:description" content="{{$course->description}}"/>
    <meta property="og:image" content="{{$course->image_url}}"/>
    <meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1787695151450379"/>
@endsection

@section('content')

    <div class="container">
        <div class="row">
            <div class="col s12" style="padding: 0;">
                <img class="z-depth-1"
                     src="{{($course->cover_url != null)?$course->cover_url:"http://placehold.it/900x350"}}"
                     width="100%">
            </div>
        </div>
        <div class="row">
            <div class="col s12 m3" id="left-container">
                <img src="{{$course->image_url}}" style="width: 100%;">

                {{--<div class="center" style="border: 1px crimson solid; margin-bottom: 5px;">--}}
                {{--<h5 style="font-weight: bold">Khóa học tiếp theo</h5>--}}
                {{--<p><b>{{date("d-F-Y", strtotime($date_start))}}</b></p>--}}
                {{--                    <p><b>{{date("d-F-Y", strtotime($date_start))}}</b></p>--}}
                {{--</div>--}}

                <div>
                    <a href="#class-list" id="register-now-btn" class="btn-large red darken-3 hvr-buzz-out"
                       style="width: 100%; height: 80px;line-height: 80px;font-weight: bold">ĐĂNG KÝ NGAY</a>
                </div>
                <div class="center" style="width: 100%; margin: 10px 0 0 0 ;">
                    <a class="btn" style=" background-color: #3b5998; width: 100%"
                       onClick="window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url('classes').'/'.$course->id}}','sharer','toolbar=0,status=0,width=580,height=325');"
                       href="javascript: void(0)" style="color: white; width: 30px; margin: 0 auto;">Chia sẻ</a>
                </div>
                <br>
                {{--<div class="btn blue darken-3" style="width: 100%; height: 80px;">--}}
                {{--<a href="#class-list" style="line-height: 80px; font-size: 24px; color: white;">CHIA SẺ NGAY</a>--}}
                {{--</div>--}}
                <h5>Các khoá học</h5>
                <div class="collection course-category">
                    @foreach($courses as $item)
                        @if ($item->id == $course->id)
                            <a href="{{url('/classes/'.$item->id)}}" class="collection-item active">{{$item->name}}</a>
                        @else
                            <a href="{{url('/classes/'.$item->id)}}" class="collection-item">{{$item->name}}</a>
                        @endif
                    @endforeach
                </div>
            </div>
            <div class="col s12 m9" id="right-container">
                <h3>{{$course->name}}</h3>

                <h5>Giới thiệu</h5>
                <p>{!!  $course->detail!!}</p>
                <h4 id="class-list" style="margin-top: 50px;">Danh sách lớp học</h4>
                @foreach($bases as $base)
                    <h5 style="padding-top:40px"><strong>{{$base->name}}</strong>: {{$base->address}}</h5>
                    <ul class="collection">
                        @foreach($base->classes()->where('course_id',$course_id)->where('status',1)->orderBy('name','desc')->get() as $class)
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
        </div>
    </div>
    @include('components/footer')
    <script>
        $(document).ready(function () {

            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                $('a.register-btn').removeClass('secondary-content');
            } else {
                $('a.register-btn').addClass('secondary-content');
            }
        });
        $(document).ready(function () {
            $('#register-now-btn').addClass('infinite');
            setInterval(function () {
                if ($('#register-now-btn').hasClass('infinite')) {
                    $('#register-now-btn').removeClass('infinite');
                } else {
                    $('#register-now-btn').addClass('infinite');
                }

            }, 3000);
        });
        $("#register-now-btn").click(function () {
            $('html, body').animate({
                scrollTop: $("#class-list").offset().top - 80
            }, 500);
            return false;
        });
        var footer_position = $("footer").position().top - $('footer').height();
        //        $(window).bind('scroll', function () {
        //            console.log($(window).scrollTop() + 'ne');
        //            if ($(window).scrollTop() > 350 && $(window).scrollTop() < footer_position && $(window).innerWidth() > 600) {
        //                $('#left-container').css('margin-top', $(window).scrollTop() - 360);
        //            }
        //        });
    </script>
@endsection
