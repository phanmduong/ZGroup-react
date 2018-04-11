<!DOCTYPE html>
<html lang="en">
<head>
    <title>@yield('title')</title>
    <meta name="google-site-verification" content="xtTa2p_KrROT2c7_IyShaw1KDt3iIvZ9c_bufAvYhvs"/>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" name="viewport">
    {{--Facebook share info--}}
    @yield('fb-info')
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="{{ URL::asset('css/materialize.min.css') }}"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="{{ URL::asset('css/public_common.css') }}"/>
    <link rel="stylesheet" href="{{ URL::asset('css/animate.css') }}"/>
    <link rel="stylesheet" href="{{ URL::asset('css/hover-min.css') }}"/>
    <link rel="stylesheet" href="{{ URL::asset('css/zmd.hierarchical-display.min.css') }}"/>
    <script src="{{URL::asset('js/jquery-1.12.0.min.js')}}">
    </script>
    <script src="//fast.eager.io/II2OmwIcNV.js"></script>
    <style>
        .top-space{
            margin-top: 20px;
        }
    </style>
</head>
<body>
<!--Landing Welcome Area -->
<div id="landing" style="margin-bottom: 20px">
    <div class="container" id="head">
        <!--<div class="nav-wrapper">-->
        <!--<a href="#" class="brand-logo white-text">colorMe</a>-->
        <!--</div>-->
        <!--<div class="navbar-fixed">-->
        <nav style="background-color: transparent; box-shadow: none;">
            <div class="nav-wrapper">
                <a href="{{url("/")}}" class="brand-logo"><img src="{{URL::asset('img/logo.jpg')}}" width="70"/> </a>
                <a href="#" data-activates="mobile-demo" class="button-collapse"><i class="material-icons">menu</i></a>
                <ul class="right hide-on-med-and-down" id="nav-menu">
                    <li><a href="{{url("student/uploadimage")}}">Đăng ảnh</a></li>
                    <li><a href="{{url("student/classes")}}">Đổi buổi học</a></li>
                    {{--<li><a href="{{url("/")}}#feedback">Cảm nhận học viên</a></li>--}}
                    {{--<li><a href="{{url("/")}}#gallery">Hình ảnh</a></li>--}}
                    @if(!empty($user))


                        <li><a class='dropdown-button' href='#' data-activates='dropdown1'> {{$user->name}} <i
                                        style="font-size: 1rem" class="fa fa-caret-down"></i></a></li>

                        <!-- Dropdown Structure -->
                        <ul id='dropdown1' class='dropdown-content'>

                            @if ($user->role==1)
                                <li><a href="{{url("manage/dashboard")}}">Quản lý</a></li>
                            @endif
                            <li><a href="{{url("student")}}">Hệ thông học viên</a></li>
                            <li><a href="{{url('logout')}}">Đăng xuất</a></li>

                        </ul>
                    @else
                        <li><a href="{{url("/login")}}">Đăng nhập</a></li>
                    @endif
                </ul>
                <ul class="side-nav" id="mobile-demo">
                    <li><a href="{{url("student/uploadimage")}}">Đăng ảnh</a></li>
                    <li><a href="{{url("student/classes")}}">Đổi buổi học</a></li>
                    @if(!empty($user))
                            <!-- Dropdown Trigger -->
                    <li><a class='dropdown-button' href='#' data-activates='dropdown-user-mobile'> {{$user->name}} <i
                                    style="font-size: 1rem" class="fa fa-caret-down"></i></a></li>

                    <!-- Dropdown Structure -->
                    <ul id='dropdown-user-mobile' class='dropdown-content'>
                        @if ($user->role==1)
                            <li><a href="{{url("manage/dashboard")}}">Quản lý</a></li>
                        @endif
                        <li><a href="{{url("student")}}">Hệ thông học viên</a></li>
                        <li><a href="{{url('logout')}}">Đăng xuất</a></li>

                    </ul>

                    @else
                        <li><a href="{{url("/login")}}">Log in</a></li>
                    @endif
                </ul>
            </div>
        </nav>
        <!--</div>-->
    </div>
    <div>
        <div class="row center white-text" style="padding-top:70px">
            <h1>@yield('header')</h1>
        </div>
    </div>
</div>

<main>
    @yield('content')
</main>

<!--FOOTER-->
{{--<footer style="padding-top:30px;margin-top:30px;border: solid lightgray 1px">--}}
    {{--<div class="container">--}}
        {{--<div class="row">--}}
            {{--<!--Basic Info-->--}}
            {{--<div class="col m5 l5 s12">--}}
                {{--<div style="font-size:2.1rem">Địa chỉ </div>--}}

                {{--175 Chùa Láng<br>Hà Nội</p>--}}

                {{--<div class="row">--}}
                    {{--<div class="col m4 s6">--}}
                        {{--<ul>--}}
                            {{--<li><a href="{{url("/")}}" class="red-text text-darken-4">Trang chủ</a></li>--}}
                            {{--<li><a href="{{url("courses")}}" class="red-text text-darken-4">Khóa học</a></li>--}}
                            {{--<li><a href="#" class="red-text text-darken-4">Đội ngũ</a></li>--}}
                        {{--</ul>--}}
                    {{--</div>--}}
                    {{--<div class="col m4 s6">--}}
                        {{--<ul>--}}
                            {{--<li><a target="_blank" href="https://www.facebook.com/ColorME.Hanoi"--}}
                                   {{--class="red-text text-darken-4">Facebook</a></li>--}}
                            {{--<li><a target="_blank" href="https://www.instagram.com/colorme.hanoi/" class="red-text text-darken-4">Instagram</a></li>--}}
                            {{--<li><a target="_blank" href="https://www.youtube.com/channel/UCfdIZQjVEgvN6l18Vtda22A" class="red-text text-darken-4">YouTube</a></li>--}}
                        {{--</ul>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
            {{--<!--End of Basic Info-->--}}
            {{--<!--Contact Form-->--}}
            {{--<div class="col m7 l7 s12">--}}
                {{--<div style="font-size:2.1rem">Liên hệ </div>--}}

                {{--<form id="contact-form" action="#" method="post">--}}
                    {{--<div class="row">--}}
                        {{--<div class="input-field col m12 s12">--}}
                            {{--<input id="guess-email" type="email" required="Nhập Email của Bạn"><label for="guess-email">Nhập--}}
                                {{--Email của bạn</label>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<div class="row">--}}
                        {{--<div class="input-field col m12 s12">--}}
                            {{--<textarea id="guess-message" rows="3" class="materialize-textarea"--}}
                                      {{--required="Nhớ điền tin nhắn nhé"></textarea><label--}}
                                    {{--for="guess-message">Tin nhắn của bạn</label>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                    {{--<button id="submit-btn" class="btn waves-effect waves-light red darken-4" type="submit">Gửi</button>--}}
                {{--</form>--}}
                {{--<!--After submit form messages-->--}}
                {{--<!--Thank you after submit-->--}}
                {{--<div id="success-message" class="hide">--}}
                    {{--<p><b>Cám ơn bạn đã gửi tin nhắn đến cho chúng tôi</b></p>--}}

                    {{--<p>Chúng tôi sẽ cố gắng liên lạc nhanh nhất khi nhận được tin</p>--}}

                {{--</div>--}}
                {{--<!--End of Thank you after submit-->--}}
                {{--<!--Error after submit-->--}}
                {{--<div id="error-message" class="hide">--}}
                    {{--<p><b>Tin nhắn của bạn không được gửi thành công</b></p>--}}

                    {{--<p>Liên hệ với chúng tôi qua số 123456789 hoặc gửi email qua địa chỉ--}}
                        {{--<a href="mailto:#">mail@colorme.vn</a>.<br>Chúng tôi sẽ liên lạc lại--}}
                        {{--nhanh nhất khi có thể</p>--}}
                {{--</div>--}}
                {{--<!--End of Error after submit-->--}}
                {{--<!--After submit form messages-->--}}
            {{--</div>--}}
            {{--<!--End of Contact Form-->--}}
        {{--</div>--}}
    {{--</div>--}}
{{--</footer>--}}


<script src="{{URL::asset('js/materialize.min.js')}}">
</script>
<script src="{{URL::asset('js/jquery.zmd.hierarchical-display.min.js')}}">
</script>
<script src="{{URL::asset('js/init.js')}}">
</script>
<script>
    $(document).ready(function () {
        //    Validate Form
        $(document).ready(function () {
            $("#submit-btn").click(function (e) {
                if ($("#guess-email").val() != "" && $("#guess-email").val().indexOf("@") > -1 && $("#guess-message").val() != "") {
                    e.preventDefault();
                    var form_data = {
                        guessEmail: $("#guess-email").val(),
                        guessMessage: $("#guess-message").val()
                    };
                    $("#contact-form").hide();
                    $("#success-message").removeClass("hide");
                }
            })
            ;
        });
        //   End of Validate Form
        $(document).ready(function () {
                $('a').click(function () {
                    $('html, body').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top
                    }, 800);
                    return false;
                });
            });
    });
</script>
</body>
</html>