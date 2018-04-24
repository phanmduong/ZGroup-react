<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="fragment" content="!">
    <meta name="google-site-verification" content="xtTa2p_KrROT2c7_IyShaw1KDt3iIvZ9c_bufAvYhvs">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta property="og:type" content="website"/>
    {{--  <meta property="og:image" content="http://d1j8r0kxyu9tj8.cloudfront.net/images/1520759546UIE1j3pqg3PzX5r.jpg"/>  --}}

    @yield("meta")

    <title>Color ME - Trường học thiết kế Color ME</title>

    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,600,800&amp;subset=vietnamese"
          rel="stylesheet">
    <link rel="shortcut icon" href="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg">

    <script src="https://connect.facebook.net/signals/config/296964117457250?v=2.8.6&amp;r=stable" async=""></script>
    <script src="https://connect.facebook.net/signals/plugins/iwl.js?v=2.8.6" async=""></script>
    <script async="" src="https://connect.facebook.net/en_US/fbevents.js"></script>
    <script id="facebook-jssdk"
            src="//connect.facebook.net/en_US/sdk.js#xfbml=1&amp;version=v2.8&amp;appId=1787695151450379"></script>
    <script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>

    <!-- Include Font Awesome. -->
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" rel="stylesheet"
          type="text/css">

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/loaders.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.3/toastr.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <script src="https://googleads.g.doubleclick.net/pagead/viewthroughconversion/923433004/?random=1514429909110&amp;cv=8&amp;fst=1514429909110&amp;num=1&amp;guid=ON&amp;eid=659238991&amp;u_h=768&amp;u_w=1366&amp;u_ah=768&amp;u_aw=1366&amp;u_cd=24&amp;u_his=3&amp;u_tz=420&amp;u_java=false&amp;u_nplug=4&amp;u_nmime=5&amp;frm=0&amp;url=http%3A%2F%2Fcolorme.vn%2Fposts%2F7&amp;tiba=Color%20ME%20-%20Tr%C6%B0%E1%BB%9Dng%20h%E1%BB%8Dc%20thi%E1%BA%BFt%20k%E1%BA%BF%20Color%20ME&amp;rfmt=3&amp;fmt=4"></script>
    <link rel="stylesheet" href="/assets/css/facebook.css">
    @yield('styles')
    <link rel="stylesheet" href="/css/2018-style.css?1232131432">
</head>
<body>
<script src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9"></script>

<div style="">
    <div data-reactroot="" style="height: 100%;">
        <nav class="navbar navbar-inverse navbar-fixed-top" style="font-size: 12px;">
            <div class="container-fluid" style="padding-left: 0px;">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1" aria-expanded="false"><span class="sr-only">Toggle navigation</span><span
                                class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
                    </button>
                    <a href="http://colorme.vn/"><img alt="Color ME"
                                                      src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg"></a>
                </div>
                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul class="nav navbar-nav">
                        <li class=""><a href="/posts/7">Học viên</a></li>
                        @if (isset($user) && count($paid_courses)>0)
                            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                                    role="button"
                                                    aria-haspopup="true" aria-expanded="false">
                                    Giáo trình <span class="caret"></span></a>
                                {{--{{dd($paid_courses)}}--}}
                                <ul class="dropdown-menu">
                                    @foreach($paid_courses as $paid_course)
                                        @if($paid_course['type_id'] == 2)
                                            <li>
                                                <a href="{{'/elearning/'.$paid_course['id']}}">
                                                    <img
                                                            class="img-circle"
                                                            src="{{$paid_course['icon_url']}}"
                                                            style="width: 20px; height: 20px; margin-right: 5px;">
                                                    {{$paid_course['name']}}</a>
                                            </li>
                                        @else
                                            <li>
                                                <a href="{{$paid_course['first_lesson'] ? '/resource/'.convert_vi_to_en($paid_course['name']).'/lesson/'.$paid_course['first_lesson']->id : ''}}">
                                                    <img
                                                            class="img-circle"
                                                            src="{{$paid_course['icon_url']}}"
                                                            style="width: 20px; height: 20px; margin-right: 5px;">
                                                    {{$paid_course['name']}}</a>
                                            </li>
                                        @endif
                                        {{--{{dd($paid_course)}}--}}

                                    @endforeach
                                </ul>
                            </li>
                        @endif
                        <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                                role="button"
                                                aria-haspopup="true" aria-expanded="false"><!-- react-text: 16 -->
                                Đăng
                                kí học <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                @foreach($courses as $course)
                                    <li><a href="/course/{{convert_vi_to_en($course->name)}}"><img class="img-circle"
                                                                                                   src="{{$course->icon_url}}"
                                                                                                   style="width: 20px; height: 20px; margin-right: 5px;">
                                            {{$course->name}}</a></li>
                                @endforeach
                            </ul>
                        </li>
                        <li class=""><a href="http://graphics.vn/">Đặt mua sách</a></li>
                        <!-- <li class=""><a href="/about-us">Về chúng tôi</a></li> -->
                        <li class=""><a href="/blogs">Blog 
                        <span style="padding: 0px 5px;background-color: rgb(197, 0, 0);color: white;text-transform: uppercase;font-size: 10px;display: inline-block;margin-left: 5px;border-radius: 3px;">Mới</span>
                        </a></li>
                        
                        @if (isset($user))
                            <li class="" style="margin-left: 10px;"><a class="btn-upload" href="/upload-post"><span
                                            class="glyphicon glyphicon-cloud-upload"></span>
                                    Đăng bài</a>
                            </li>
                        @endif
                    </ul>
                    <ul class="nav navbar-nav navbar-right" id="vue-nav">
                        @if (isset($user))
                            <li class=""><a href="/search"><i class="fa fa-search" aria-hidden="true"></i></a></li>
                            <li class="dropdown" id="noti-dropdown">
                                <a href="#" id="btn-noti" class="dropdown-toggle"
                                   data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false"><i
                                            class="fa fa-bell" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"
                                                    role="button" aria-haspopup="true" aria-expanded="true">
                                    <img src="{{$user->avatar_url}}"
                                         style="width:20px;height: 20px; border-radius: 50%; margin-right: 5px"
                                         alt="">{{$user->name}}<span class="caret"></span></a>
                                <ul class="dropdown-menu" style="width: 100%">
                                    <li><a href="/profile/{{$user->username}}">Trang cá nhân</a></li>
                                    <li><a href="http://manage.colorme.vn/" target="_blank">Quản lý</a></li>
                                    <li><a href="/posts/uncomment">Nhận xét</a></li>
                                    <li role="separator" class="divider"></li>
                                    <li><a href="/logout" v-on:click="logout">Đăng xuất</a></li>
                                </ul>
                            </li>
                        @else
                            <li v-if="!isLogin">
                                <a v-on:click="openModalLogin">Đăng
                                    nhập</a>
                            </li>
                            <li v-if="isLogin" class=""><a href="/search"><i class="fa fa-search"
                                                                             aria-hidden="true"></i></a></li>
                            <li v-if="isLogin" class="dropdown" id="noti-dropdown">
                                <a href="#" id="btn-noti" class="dropdown-toggle"
                                   data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false"><i
                                            class="fa fa-bell" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li v-if="isLogin" class="dropdown"><a href="#" class="dropdown-toggle"
                                                                   data-toggle="dropdown"
                                                                   role="button" aria-haspopup="true"
                                                                   aria-expanded="true">
                                    <img v-bind:src="user.avatar_url"
                                         style="width:20px;height: 20px; border-radius: 50%; margin-right: 5px"
                                         alt="">@{{ user.name}}<span class="caret"></span></a>
                                <ul class="dropdown-menu" style="width: 100%">
                                    <li><a v-bind:href="'/profile/' + user.username">Trang cá nhân</a></li>
                                    <li><a href="/logout" v-on:click="logout">Đăng xuất</a></li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>
        <div style="margin-top: 50px;">
            @yield('content')
        </div>
        <div class="container-fluid " id="footer">
            <div class="row">
                <div class="col-xs-12 col-sm-2"><img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg"
                                                     width="40"><h4>colorME</h4>
                    <div>Trường học thiết kế</div>
                </div>
                <div class="col-xs-12 col-sm-4">
                    @foreach($bases as $base)
                        <p>{{$base->name}}<br>
                            {{$base->address}}</p>
                    @endforeach
                </div>
                <div>
                    <ul class="col-xs-12 col-sm-6 col-md-4">
                        @foreach($courses as $course)
                            <li><a href="/course/{{convert_vi_to_en($course->name)}}">{{$course->name}}</a></li>
                        @endforeach
                    </ul>
                </div>
            </div>
            <div class="row" style="padding-top: 20px;">
                <div class="col-xs-12">Copyright © 2015 –
                    <script>document.write(new Date().getFullYear())</script>
                    KEE Education. All screenshots and videos © their
                    respective owners.
                </div>
                <div class="col-xs-12"><a class="social-button"
                                          href="https://www.facebook.com/ColorME.Hanoi/?fref=ts"
                                          target="_blank"><img
                                src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1473867660z8twlU93Fm0PF2R.jpg"></a><a
                            class="social-button" target="_blank"
                            href="https://www.instagram.com/colorme.hanoi/"><img
                                src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1473867650jPSNvMfYhve7Xm0.jpg"></a><a
                            class="social-button" target="_blank"
                            href="https://www.youtube.com/channel/UC1TpSQdG5rLyADdnrAtzP2w"><img
                                src="https://maxcdn.icons8.com/windows8/PNG/26/Social_Networks/youtube_copyrighted-26.png"
                                title="YouTube"></a><a class="social-button" href="http://colorme.vn/"
                                                       target="_blank"><img
                                src="https://maxcdn.icons8.com/Android/PNG/24/Network/domain-24.png" title="Domain"></a>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="modalLogin" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-body" style="padding-bottom: 0px">
                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px 20px"
                     v-if="modalLogin">
                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" style="width: 50px;height: 50px">
                    <h2 style="font-weight: 600">Đăng nhập</h2>
                    <p>Chào mừng bạn đến với colorME.</p>
                    <br>
                    <div class="form-group" style="width: 100%;">
                        <input class="form-control" style="height: 50px" width="100%" type="text" v-model="user.email"
                               placeholder="Tên đăng nhập/Email"/>
                    </div>
                    <div class="form-group" style="width: 100%;">
                        <input class="form-control" style="height: 50px" width="100%"
                               v-model="user.password"
                               type="password"
                               v-on:keyup.enter="login"
                               placeholder="Mật khẩu"/>
                    </div>
                    <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;"
                            :disabled="user.email ==='' || user.password === '' || isLoading"
                            v-if="!isLoading"
                            v-on:click="login">Đăng nhập
                    </button>
                    <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;"
                            :disabled="isLoading"
                            v-if="isLoading"
                    ><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Đang đăng nhập
                    </button>
                    <button class="btn btn-default" style="width: 100%; margin: 10px; padding: 15px;"
                            v-on:click="changeModal">Tạo tài khoản
                    </button>
                    <a style="width: 100%; margin: 10px; padding: 15px; color: #484848; text-align: center"
                       href="/password/reset">Quên mật
                        khẩu</a>
                </div>
                <div id="form-register"
                     style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px 20px"
                     v-if="!modalLogin">
                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" style="width: 50px;height: 50px">
                    <h2 style="font-weight: 600">Tạo tài khoản</h2>
                    <p>Chào mừng bạn đến với colorME.</p>
                    <br>
                    <form v-if="showRegisterForm" style="width: 100%">
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   v-model="user.name"
                                   type="text"
                                   name="name"
                                   placeholder="Họ và tên" required/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   v-model="user.email"
                                   name="email"
                                   type="email"
                                   placeholder="Email" required/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   v-model="user.password"
                                   type="password"
                                   name="password"
                                   id="password"
                                   placeholder="Mật khẩu" required/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   v-model="user.confirm_password"
                                   type="password"
                                   name="confirm_password"
                                   placeholder="Nhập lại mật khẩu" required/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   v-model="user.phone"
                                   type="text"
                                   name="phone"
                                   v-on:keyup.enter="register"
                                   placeholder="Số điện thoại" required/>
                        </div>
                    </form>

                    <div v-if="!!message" style="width:100%" class="alert alert-success">
                        @{{message}}
                    </div>

                    <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;"
                            :disabled="isLoading"
                            v-if="!isLoading"
                            v-on:click="register">
                        Tạo tài khoản
                    </button>
                    <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;"
                            :disabled="isLoading"
                            v-if="isLoading"
                    ><i class="fa fa-spinner fa-spin" aria-hidden="true"></i> Đang tạo tài khoản
                    </button>
                    <button class="btn btn-default" style="width: 100%; margin: 10px; padding: 15px;"
                            v-on:click="changeModal">Đăng nhập
                    </button>
                </div>
            </div>
        </div>

    </div>
</div>
<div class="fb-livechat">
    <div class="ctrlq fb-overlay"></div>
    <div class="fb-widget">
        <div class="ctrlq fb-close"></div>
        <div class="fb-page"
             data-href="{{isset($saler) && $saler->base_id == 6 ? 'https://www.facebook.com/colorme.saigon': 'https://www.facebook.com/colorme.hanoi'}}"
             data-tabs="messages"
             data-width="360"
             data-height="400" data-small-header="true" data-hide-cover="true" data-show-facepile="false"></div>
        <div id="fb-root"></div>
    </div>
    <a style="margin-bottom:80px; padding:0; background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1514883241TFUjyURgK8yhptQ.png'); background-color:white;background-size:100%"
       href="tel:{{isset($saler) && $saler->base_id == 6 ? '0932274877‬' : '01627175613'}}"
       title="Gửi tin nhắn cho chúng tôi qua Facebook"
       class="ctrlq fb-button">
        <div class="bubble-msg">Gọi colorME</div>
    </a>
    <a href="{{isset($saler) && $saler->base_id == 6 ? 'https://www.facebook.com/colorme.saigon':'https://m.me/colorme.hanoi'}}"
       title="Gửi tin nhắn cho chúng tôi qua Facebook" class="ctrlq fb-button">
        <div class="bubble">1</div>
        <div class="bubble-msg">Bạn cần hỗ trợ?</div>
    </a></div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/vue.min.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
        integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
        crossorigin="anonymous"></script>
<script src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/jquery.animateNumber.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"></script>

<script src="/colorme/js/vue.js?1234"></script>

<div id="fb-root"></div>
<script>
    var socket = io('http://colorme.vn:3000/');
</script>
<noscript>
    <img height="1" width="1" style="display:none"
         src="https://www.facebook.com/tr?id=296964117457250&ev=PageView&noscript=1"
    />
</noscript>
<!-- End Facebook Pixel Code -->
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
    <div style="display:inline;">
        <img height="1" width="1" style="border-style:none;" alt=""
             src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/923433004/?guid=ON&amp;script=0"/>
    </div>
</noscript>
<script type="text/javascript" src="/colorme/js/scripts.js">
</script>
<script>
    function paginator(currentPageData, totalPagesData) {
        var page = [];
        var currentPage = currentPageData;
        var totalPages = totalPagesData;

        var startPage = (currentPage - 2 > 0 ? currentPage - 2 : 1);
        for (var i = startPage; i <= currentPage; i++) {
            page.push(i);
        }

        var endPage = (5 - page.length + currentPage >= totalPages ? totalPages : 5 - page.length + currentPage);

        for (var i = currentPage + 1; i <= endPage; i++) {
            page.push(i);
        }

        if (page && page.length < 5) {
            var pageData = Object.assign(page);
            for (var i = page[0] - 1; i >= (page[0] - (5 - page.length) > 0 ? page[0] - (5 - page.length) : 1); i--) {
                pageData.unshift(i);
            }
            page = pageData;
        }

        return page;
    }
</script>
@stack("scripts")
</body>
</html>