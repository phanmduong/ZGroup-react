@section('meta')
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}"/>
    <meta property="og:title" content="{!!htmlspecialchars($blog['title'])!!}"/>
    <meta property="og:description"
          content="{!! htmlspecialchars($blog['description']) !!}"/>
    <meta property="og:image" content="{{generate_protocol_url($blog['url'])}}"/>


    <meta name="title" content="{!! htmlspecialchars($blog['meta_title']) !!}">
    <meta id="metaDes" name="description" content="{!! htmlspecialchars($blog['meta_description']) !!}"/>
    <meta id="metakeywords" name="keywords" content="{!! htmlspecialchars($blog['keyword']) !!}"/>
    <meta id="newskeywords" name="news_keywords" content="{!! htmlspecialchars($blog['keyword']) !!}"/>
    <link rel="canonical" href="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}"/>
@endsection

@extends('colorme_new.layouts.master') @section('content')
    <div style="margin-top: 50px;">
        {{--<div id="app">--}}
        {{--<div data-reactroot="" style="height: 100%;">--}}
        {{--<div class="page-wrap">--}}
        {{--<div>--}}
        {{--<div class="container product-detail-container">--}}
        {{--<a href="/profile/{{$blog['author']['username']}}">--}}
        {{--<div style="background: url({{$blog['author']['avatar_url']}}) center center / cover; width: 80px; height: 80px; border-radius: 40px; margin: auto;"></div>--}}
        {{--<div style="text-align: center; padding: 15px 0px; color: rgb(68, 68, 68); font-size: 16px;">{{$blog['author']['name']}}</div>--}}
        {{--</a>--}}
        {{--<div class="product-category" style="text-align: center;">--}}
        {{--@if($blog['category_name'])--}}
        {{--<span style="padding: 5px 10px; background-color: rgb(197, 0, 0); color: white; text-transform: uppercase; font-size: 10px; border-radius: 3px;">{{$blog['category_name']}}</span>--}}
        {{--@endif--}}
        {{--</div>--}}
        {{--<div class="blog-title">{{$blog['title']}}</div>--}}
        {{--<div style="text-align: center; padding-bottom: 25px; color: rgb(137, 137, 137);">{{$blog['description']}}</div>--}}
        {{--<div style="text-align: center; margin-bottom: 30px;">--}}
        {{--<div class="product-tool">--}}
        {{--<span class="glyphicon glyphicon-eye-open"></span>--}}
        {{--<span>{{$blog['views']}}</span>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div style="text-align: center;">--}}
        {{--<div data-placement="bottom" data-toggle="tooltip" title="" style="cursor: pointer; width: 15px; height: 15px; border-radius: 10px; margin-right: 10px; display: inline-block;"--}}
        {{--data-original-title="#"></div>--}}
        {{--</div>--}}
        {{--<div class="image-wrapper">--}}
        {{--<img id="colorme-image" src="{{$blog['url']}}" style="width: 100%;">--}}
        {{--</div>--}}
        {{--<div class="product-content">--}}
        {{--{!!$blog['content']!!}--}}
        {{--<hr>--}}
        {{--</div>--}}
        {{--<div style="padding: 25px 0px;">--}}
        {{--<div style="margin-top: 0px;">--}}
        {{--<span>Tags:</span>--}}
        {{--<span>--}}
        {{--@foreach(explode(',', $blog['tags']) as $tag)--}}
        {{--@if(trim($tag) != '')--}}
        {{--<a class="modal-tag" href="/blogs?tag={{trim($tag)}}">--}}
        {{--<strong style="color:black">{{trim($tag)}}</strong>--}}
        {{--</a>--}}
        {{--@endif--}}
        {{--@endforeach--}}
        {{--</span>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div style="height: 40px;">--}}
        {{--<div style="float: left;">--}}
        {{--<div class="product-tool">--}}
        {{--<span class="glyphicon glyphicon-eye-open"></span>--}}
        {{--<span>{{$blog['views']}}</span>--}}
        {{--<!-- <span class="glyphicon glyphicon-comment"></span>--}}
        {{--<span></span>--}}
        {{--<a data-toggle="tooltip" title="" class="glyphicon glyphicon-heart" data-original-title="Thích"></a>--}}
        {{--<span data-html="true" data-toggle="tooltip" title="" style="cursor: pointer;" data-original-title="Le Tuan Dat<br/>Nguyễn Thu Hằng<br/>Phạm Thị Ngọc Tú<br/>Hà Đăng Dương<br/>Nguyễn Bá Nam<br/>Trang Le	">6</span>--}}
        {{--<span></span> -->--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div style="float: right;">--}}
        {{--<div class="sharing">--}}
        {{--<div class="fb-share-button fb_iframe_widget" data-href="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}"--}}
        {{--data-layout="button" data-size="large" data-mobile-iframe="true" fb-xfbml-state="rendered"--}}
        {{--fb-iframe-plugin-query="app_id=1700581200251148&amp;container_width=49&amp;layout=button&amp;locale=vi_VN&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large">--}}
        {{--<span style="vertical-align: bottom; width: 83px; height: 28px;">--}}
        {{--<iframe name="f2b7ac78cc2a6a" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true"--}}
        {{--scrolling="no" title="fb:share_button Facebook Social Plugin" src="https://www.facebook.com/v2.10/plugins/share_button.php?app_id=1700581200251148&amp;container_width=49&amp;href={{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}} &amp;layout=button&amp;locale=vi_VN&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large"--}}
        {{--style="border: none; visibility: visible; width: 83px; height: 28px;" class=""></iframe>--}}
        {{--</span>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div class="product-content">--}}
        {{--<hr>--}}
        {{--<div class="row form-register">--}}
        {{--<div class="col-md-12">--}}
        {{--<h3 class="card-title text-center">Đăng kí nhận thông tin</h3>--}}
        {{--<div>--}}
        {{--<div role="form" id="contact-form" method="post" action="#">--}}
        {{--<input type="hidden" name="_token" value="{{ csrf_token() }}">--}}
        {{--<div class="card-block">--}}
        {{--<div class="form-group label-floating">--}}
        {{--<input id="name" type="text" name="name" class="form-control" placeholder="Họ và tên">--}}
        {{--</div>--}}
        {{--<div class="form-group label-floating">--}}
        {{--<input id="phone" type="text" name="phone" class="form-control" placeholder="Số điện thoại">--}}
        {{--</div>--}}
        {{--<div class="form-group label-floating">--}}
        {{--<input id="email" type="text" name="email" class="form-control" placeholder="Email">--}}
        {{--</div>--}}
        {{--<div class="row">--}}
        {{--<div class="col-sm-12">--}}
        {{--<div id="alert" style="font-size: 14px"> </div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div class="row">--}}
        {{--<div class="col-md-4">--}}
        {{--</div>--}}
        {{--<div class="col-md-4">--}}
        {{--<a id="submit" class="btn btn-success btn-round" style="color:white; display: flex;align-items: center;justify-content: center;">Đăng kí</a>--}}
        {{--</div>--}}
        {{--</div>--}}

        {{--<div class="clearfix"></div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}

        {{--<div class="comments media-area">--}}
        {{--<div class="fb-comments" data-href="{{config('app.protocol').config('app.domain').'/blog/' . $blog['slug']}}" data-width="100%"--}}
        {{--data-numposts="5">--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div style="width: 130%; margin-left: -15%; margin-top: 40px;">--}}
        {{--<div style="margin-top: 20px;">--}}
        {{--<a href="/profile/{{$blog['author']['email']}}" class="more-products">--}}
        {{--<h5>--}}
        {{--Bài viết khác từ--}}
        {{--{{$blog['author']['name']}}--}}
        {{--</h5>--}}
        {{--</a>--}}
        {{--<div class="more-products-container">--}}
        {{--@foreach($related_blogs as $related_blog)--}}
        {{--<a class="more-products-item" style="background-image: url({{$related_blog->url}})" href="/blog/{{$related_blog->slug}}"></a>--}}
        {{--@endforeach--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--</div>--}}


        <div id="app">
            <div data-reactroot="" style="height: 100%;">
                <div class="page-wrap">
                    <div>
                        <div style="padding-top: 60px; background: rgb(22, 22, 22); padding-bottom: 100px;">
                            <div class="container larger-container">
                                <div class="col-md-8 title-wrapper">
                                    @if($blog['category_name'])
                                        <span style=" text-transform: uppercase; font-size: 14px; padding-bottom:20px">
                                            <a class="a-hover-underline" style="color: white;" href="/blogs"><span>/BLOGS</span></a><a
                                                    class="a-hover-underline" style="color: white;"
                                                    href="/blog/category/{{$blog['category_name']}}"><span>/{{$blog['category_name']}}</span></a>
                                        </span>
                                    @endif

                                    <div class="pre-head"
                                         style=" font-size: 14px; color: rgb(217, 217, 217);"><p
                                                style="font-size: 40px; margin-top: 0px; color: rgb(255, 255, 255);">
                                            {{$blog['title']}}</p></div>
                                    <div>
                                    </div>
                                    <div style="color:white">
                                        <div style="">{{$blog['time']}}
                                            · {{$blog['views']}} Lượt xem
                                        </div>
                                    </div>
                                    <a href="/profile/{{$blog['author']['username']}}" style="display:flex; "
                                       class="flex flex-row flex-row-center">
                                        <div style="background: url({{$blog['author']['avatar_url']}}) center center / cover; width: 20px; height: 20px; border-radius: 40px; "></div>
                                        <div style="color: white;padding: 10px;font-size: 14px;">
                                            {{$blog['author']['name']}}
                                        </div>
                                    </a>


                                </div>
                            </div>
                        </div>
                        <div class="container larger-container" style="margin-top: -50px;">
                            <div class="col-md-8 product-detail-content-wrapper">
                                <div class="product-detail-content"
                                     style="width: 100%; word-wrap: break-word; margin: 0px 0px 30px; padding: 50px 50px 60px; background: rgb(255, 255, 255); box-shadow: rgba(0, 0, 0, 0.08) 1px 1px 2px; min-height: 300px;">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="relative">
                                                <img src="{{generate_protocol_url($blog['url'])}}"
                                                     style="width: 100%;height:auto;">
                                                <div class="product-content"><p>{{$blog['description']}}</p></div>
                                            </div>
                                            <div class="product-content">
                                                {!!convertContentBlog($blog['content'])!!}
                                                <hr>
                                            </div>
                                            <div style="height: 40px;">
                                                <div style="float: left;">
                                                    <div class="product-tool">
                                                        <span class="glyphicon glyphicon-eye-open"></span>
                                                        <span>{{$blog['views']}}</span>
                                                        <!-- <span class="glyphicon glyphicon-comment"></span>
                                                        <span></span>
                                                        <a data-toggle="tooltip" title="" class="glyphicon glyphicon-heart" data-original-title="Thích"></a>
                                                        <span data-html="true" data-toggle="tooltip" title="" style="cursor: pointer;" data-original-title="Le Tuan Dat<br/>Nguyễn Thu Hằng<br/>Phạm Thị Ngọc Tú<br/>Hà Đăng Dương<br/>Nguyễn Bá Nam<br/>Trang Le	">6</span>
                                                        <span></span> -->
                                                    </div>
                                                </div>
                                                <div style="float: right;">
                                                    <div class="sharing">
                                                        <div class="fb-share-button fb_iframe_widget"
                                                             data-href="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}"
                                                             data-layout="button" data-size="large"
                                                             data-mobile-iframe="true" fb-xfbml-state="rendered"
                                                             fb-iframe-plugin-query="app_id=1700581200251148&amp;container_width=49&amp;layout=button&amp;locale=vi_VN&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large">
                                            <span style="vertical-align: bottom; width: 83px; height: 28px;">
                                                <iframe name="f2b7ac78cc2a6a" width="1000px" height="1000px"
                                                        frameborder="0" allowtransparency="true" allowfullscreen="true"
                                                        scrolling="no" title="fb:share_button Facebook Social Plugin"
                                                        src="https://www.facebook.com/v2.10/plugins/share_button.php?app_id=1700581200251148&amp;container_width=49&amp;href={{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}} &amp;layout=button&amp;locale=vi_VN&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large"
                                                        style="border: none; visibility: visible; width: 83px; height: 28px;"
                                                        class=""></iframe>
                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="product-content">
                                                <div class="comments media-area">
                                                    <div class="fb-comments"
                                                         data-href="{{config('app.protocol').config('app.domain').'/blog/' . $blog['slug']}}"
                                                         data-width="100%"
                                                         data-numposts="5">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 style="color:#333; margin-top: 0px; margin-bottom: 30px">BÀI VIẾT TƯƠNG TỰ</h3>
                                    @foreach($related_blogs as $related_blog)
                                        <div class="row">
                                            <div class="col-md-4">
                                                <a href="/blog/{{$related_blog['slug']}}">
                                                    <div class="relative">
                                                        <img class="zoom"
                                                             src="{{generate_protocol_url($related_blog['url'])}}"
                                                             style="width: 100%;height:auto;"/>
                                                        @if($related_blog['category_name'])
                                                            <div class="product-category absolute"
                                                                 style="text-align: center; bottom: 10px; right: 10px"><span
                                                                        style=" padding: 5px 10px; background-color: rgb(197, 0, 0); color: white; text-transform: uppercase; font-size: 10px; border-radius: 3px;">{{$blog['category_name']}}</span>
                                                            </div>
                                                        @endif
                                                    </div>

                                                </a>
                                            </div>
                                            <div class="col-md-8">
                                                <div class="blog-title">
                                                    <a href="/blog/{{$related_blog['slug']}}"
                                                       style="color:#333">{{$related_blog['title']}}</a>
                                                </div>
                                                <a href="/blog/{{$related_blog['slug']}}" style="color:black">
                                                    <div style="color: rgb(137, 137, 137);">{{$related_blog['time']}}
                                                        · {{$related_blog['views']}} lượt xem
                                                    </div>
                                                </a>
                                                <a href="/profile/{{$related_blog['author']['username']}}"
                                                   class="flex flex-row flex-row-center">
                                                    <div style="background: url({{$related_blog['author']['avatar_url']}}) center center / cover; width: 20px; height: 20px; border-radius: 40px; "></div>

                                                    <div style="padding: 10px; color: rgb(68, 68, 68); font-size: 16px;">
                                                        {{$related_blog['author']['name']}}
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <hr class="margin-hr">
                                    @endforeach
                                </div>
                            </div>
                            <div class="col-md-4">
                                <input placeholder="Tìm kiếm" type="text" style="
                                    font-size: 16px;
                                    height: 30px;
                                    border-radius: 20px;
                                    padding: 15px;
                                    /* margin-bottom: 20px; */
                                    width: 100%;
                                    border: solid 1px #ded8d8;
                                "><br><br>
                                @if(isset($course))
                                <a href="/course/{{convert_vi_to_en($course->name)}}">
                                    <div style="background-image: url({{$course->image_url}}); background-size: cover; background-position: center center; padding-bottom: 70%">
                                    </div>
                                    <br>
                                    <div style="background-color: #4dca00;height:50px;padding:15px;text-align: center;border-radius: 3px;">
                                        <p style="
                                        font-size: 16px;
                                        color: white;
                                    ">ĐĂNG KÍ NGAY</p>
                                    </div>
                                </a>
                                <br>
                                @endif

                                <div>
                                    <b>BÀI VIẾT TƯƠNG TỰ</b>

                                    <hr style="
                                        border-color: #b3b3b3;
                                    ">

                                    @foreach($related_blogs as $related_blog)
                                        <a
                                                href="/blog/{{$related_blog->slug}}"
                                                style="
                                                    color: #6d6d6d;
                                                    margin-bottom: 10px;
                                                ">
                                            <p>{{$related_blog->title}}</p>
                                        </a>
                                    @endforeach
                                    <br>
                                </div>
                                <div>
                                    <b>BÀI VIẾT CÙNG TÁC GIẢ</b>
                                    <hr style="
                                        border-color: #b3b3b3;
                                    ">

                                    @foreach($auth_related_blogs as $related_blog)
                                        <a
                                                href="/blog/{{$related_blog->slug}}"
                                                style="
                                                    color: #6d6d6d;
                                                    margin-bottom: 10px;
                                                ">
                                            <p>{{$related_blog->title}}</p>
                                        </a>
                                    @endforeach
                                    <br>
                                </div>
                                <b>TAGS</b>
                                <hr style="
                                    border-color: #b3b3b3;

                                ">

                                <div>
                                    @foreach(explode(",", $blog['tags']) as $tag)
                                        @if(!empty($tag))
                                            <a href="/blogs?page=1&amp;search=&amp;tag={{$tag}}" title="{{$tag}} "
                                               class="tag-header-blogs"
                                               style="color: black!important" ;
                                            >
                                                {{$tag}}
                                            </a>
                                        @endif
                                    @endforeach
                                </div>
                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="modalSuccess" class="modal fade" role="dialog">
        <div class="modal-dialog" style="max-width:400px!important">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body" style="padding-bottom: 0px">
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px 20px"
                         v-if="modalLogin">
                        <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" style="width: 50px;height: 50px">
                        <h2 style="font-weight: 600">Hoàn tất</h2>
                        <p>Chào mừng bạn đến với colorME.</p>
                        <br>
                        <p>Cảm ơn bạn đã đăng kí nhận thông tin từ colorME, chúng tôi sẽ thường xuyên gửi cho bạn các
                            tài liệu và bài viết bổ ích, nhớ check email của colorME thường xuyên bạn nhé.</p>
                        <p>Nếu bạn đang quan tâm đến các khoá học về thiết kế và lập trình, bạn có thể tìm hiểu thêm tại
                            đây.</p>
                        <a href="/" class="btn btn-success"
                           style="color:white;width: 100%; margin: 10px; padding: 15px;"
                        >Thông tin khoá học
                        </a>
                        <a style="width: 100%; margin: 10px; padding: 15px; color: #484848; text-align: center"
                           data-toggle="modal" data-target="#modalSuccess">Không, cảm ơn</a>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- a -->
    <div id="modalRegister" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-body" style="padding-bottom: 0px">
                    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px 20px">
                        <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" style="width: 50px;height: 50px">
                        <h2 style="font-weight: 600">Nhận quà hàng tuần</h2>
                        <p>Đăng kí để nhận một template mỗi tuần từ colorME</p>
                        <br>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   id="nameModal"
                                   type="text"
                                   placeholder="Họ và tên"/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   type="text"
                                   id="phoneModal"
                                   placeholder="Số điện thoại"/>
                        </div>
                        <div class="form-group" style="width: 100%;">
                            <input class="form-control" style="height: 50px" width="100%"
                                   type="text"
                                   id="emailModal"
                                   placeholder="Email"/>
                        </div>
                        <div id="alertModal"
                             style="font-size: 14px"></div>
                        <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;"
                                id="submitModal">Đăng kí
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('scripts')
    <script>
        window.onload = function (e) {
            setTimeout(function () {
                $("#modalRegister").modal("toggle");
            }, 15000);
        }

        // function openModal() {
        //     $("#modalRegister").modal("toggle");
        // }

        function validateEmail(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        $(document).ready(function () {
            $("#submit").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                var name = $('#name').val();
                var email = $('#email').val();
                var phone = $('#phone').val();
                var ok = 0;
                if (name.trim() == "" || email.trim() == "" || phone.trim() == "") ok = 1;

                if (!name || !email || !phone || ok == 1) {
                    $("#alert").html(
                        "<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin</div>"
                    );
                    return;
                }
                if (!validateEmail(email)) {
                    $("#alert").html(
                        "<div class='alert alert-danger'>Bạn vui lòng kiểm tra lại email</div>"
                    );
                    return;
                }
                var message = "ColorMe đã nhận được thông tin của bạn. Bạn vui lòng kiểm tra email";
                $("#alert").html("<div class='alert alert-success'>" + message + "</div>");
                $("#submit").css("display", "none");

                var url = "";
                $("#modalSuccess").modal("show");
                var data = {
                    name: name,
                    email: email,
                    phone: phone,
                    blog_id: {{$blog['id']}},
                    _token: "{{csrf_token()}}"
                };
                axios.post("/api/v3/sign-up", data)
                    .then(function () {
                    }.bind(this))
                    .catch(function () {
                    }.bind(this));
            });

            $("#submitModal").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                var name = $('#nameModal').val();
                var email = $('#emailModal').val();
                var phone = $('#phoneModal').val();
                var ok = 0;
                if (name.trim() == "" || email.trim() == "" || phone.trim() == "") ok = 1;

                if (!name || !email || !phone || ok == 1) {
                    $("#alertModal").html(
                        "<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin</div>"
                    );
                    return;
                }
                if (!validateEmail(email)) {
                    $("#alertModal").html(
                        "<div class='alert alert-danger'>Bạn vui lòng kiểm tra lại email</div>"
                    );
                    return;
                }
                var message = "ColorMe đã nhận được thông tin của bạn.";
                $("#alertModal").html("<div class='alert alert-success'>" + message + "</div>");
                $("#submitModal").css("display", "none");

                var url = "";
                $("#modalRegister").modal("hide");
                $("#modalSuccess").modal("show");
                var data = {
                    name: name,
                    email: email,
                    phone: phone,
                    blog_id: {{$blog['id']}},
                    _token: "{{csrf_token()}}"
                };
                axios.post("/api/v3/sign-up", data)
                    .then(function () {
                    }.bind(this))
                    .catch(function () {
                    }.bind(this));
            });
        });

        var vueShareToDown = new Vue({
            el: "#vue-share-to-download",
            data: {
                shared: false,
                share_count: 0
            }
        });

        function analyticsDownLoad() {
            axios.get("https://graph.facebook.com/?id={{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}")
                .then(function (res) {
                    vueShareToDown.share_count = res.data.share.share_count
                })
        }

        analyticsDownLoad();

        function shareOnFB() {
            FB.ui({
                method: "feed",
                link: "{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}",
                name: "{!! htmlspecialchars($blog['meta_title']) !!}",
                caption: 'colorme.vn',
                description: "{!! htmlspecialchars($blog['description']) !!}"
            }, function (t) {
                console.log(t);
                var str = JSON.stringify(t);
                var obj = JSON.parse(str);
                if (obj.post_id != '') {

                    vueShareToDown.shared = true;
                }
            });
        }


    </script>
@endpush