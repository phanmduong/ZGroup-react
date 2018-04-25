@section('meta')
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}"/>
    <meta property="og:title" content="{!!htmlspecialchars($blog['title'])!!}"/>
    <meta property="og:description"
        content="{!! htmlspecialchars($blog['description']) !!}"/>
    <meta property="og:image" content="{{$blog['url']}}"/>


    <meta name="title" content="{!! htmlspecialchars($blog['meta_title']) !!}">
    <meta id="metaDes" name="description" content="{!! htmlspecialchars($blog['meta_description']) !!}" />
    <meta id="metakeywords" name="keywords" content="{!! htmlspecialchars($blog['keyword']) !!}" />
    <meta id="newskeywords" name="news_keywords" content="{!! htmlspecialchars($blog['keyword']) !!}" />
    <link rel="canonical" href="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}" />


@endsection

@extends('colorme_new.layouts.master') @section('content')
<div style="margin-top: 50px;">
    <div id="app">
        <div data-reactroot="" style="height: 100%;">
            <div class="page-wrap">
                <div>
                    <div class="container product-detail-container">
                        <a href="/profile/{{$blog['author']['username']}}">
                            <div style="background: url({{$blog['author']['avatar_url']}}) center center / cover; width: 80px; height: 80px; border-radius: 40px; margin: auto;"></div>
                            <div style="text-align: center; padding: 15px 0px; color: rgb(68, 68, 68); font-size: 16px;">{{$blog['author']['name']}}</div>
                        </a>
                        <div class="product-category" style="text-align: center;">
                            @if($blog['category_name'])
                            <span style="padding: 5px 10px; background-color: rgb(197, 0, 0); color: white; text-transform: uppercase; font-size: 10px; border-radius: 3px;">{{$blog['category_name']}}</span>
                            @endif
                        </div>
                        <div class="blog-title">{{$blog['title']}}</div>
                        <div style="text-align: center; padding-bottom: 25px; color: rgb(137, 137, 137);">{{$blog['description']}}</div>
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div class="product-tool">
                                <span class="glyphicon glyphicon-eye-open"></span>
                                <span>{{$blog['views']}}</span>
                                <span class="glyphicon glyphicon-comment"></span>
                                <span>{{$blog['comments_count']}}</span>
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div data-placement="bottom" data-toggle="tooltip" title="" style="cursor: pointer; width: 15px; height: 15px; border-radius: 10px; margin-right: 10px; display: inline-block;"
                                data-original-title="#"></div>
                        </div>
                        <div class="image-wrapper">
                            <img id="colorme-image" src="{{$blog['url']}}" style="width: 100%;">
                        </div>
                        <div class="product-content">
                            {!!$blog['content']!!}
                        </div>

                        <div class="product-content">
                            <div class="row" style="margin-bottom: 5px">
                                <div class="col-md-10">

                                </div>
                                <div class="col-md-2">
                                    <div class="sharing">
                                        <div class="fb-share-button fb_iframe_widget" data-href="{{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}}"
                                            data-layout="button" data-size="large" data-mobile-iframe="true" fb-xfbml-state="rendered"
                                            fb-iframe-plugin-query="app_id=1700581200251148&amp;container_width=49&amp;layout=button&amp;locale=vi_VN&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large">
                                            <span style="vertical-align: bottom; width: 83px; height: 28px;">
                                                <iframe name="f2b7ac78cc2a6a" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true"
                                                    scrolling="no" title="fb:share_button Facebook Social Plugin" src="https://www.facebook.com/v2.10/plugins/share_button.php?app_id=1700581200251148&amp;container_width=49&amp;href={{config('app.protocol').config('app.domain').'/blog/'.$blog['slug']}} &amp;layout=button&amp;locale=vi_VN&amp;mobile_iframe=true&amp;sdk=joey&amp;size=large"
                                                    style="border: none; visibility: visible; width: 83px; height: 28px;" class=""></iframe>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row form-register">
                                <div class="col-md-12">
                                    <br>
                                    <hr>
                                    <h3 class="card-title text-center">Đăng kí nhận thông tin</h3>
                                    <div>
                                        <div role="form" id="contact-form" method="post" action="#">
                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <div class="card-block">
                                                <div class="form-group label-floating">
                                                    <input id="name" type="text" name="name" class="form-control" placeholder="Họ và tên">
                                                </div>
                                                <div class="form-group label-floating">
                                                    <input id="phone" type="text" name="phone" class="form-control" placeholder="Số điện thoại">
                                                </div>
                                                <div class="form-group label-floating">
                                                    <input id="email" type="text" name="email" class="form-control" placeholder="Email">
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div id="alert"> </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a id="submit" class="btn btn-success btn-round" style="color:white; display: flex;align-items: center;justify-content: center;">Đăng kí</a>
                                                    </div>
                                                </div>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="comments media-area">
                                <div class="fb-comments" data-href="{{config('app.protocol').config('app.domain').'/blog/' . $blog['slug']}}" data-width="100%"
                                    data-numposts="5">
                                </div>
                            </div>
                        </div>
                        <div style="width: 130%; margin-left: -15%; margin-top: 40px;">
                            <div style="margin-top: 20px;">
                                <a href="/profile/{{$blog['author']['email']}}" class="more-products">
                                    <h5>
                                        Bài viết khác từ
                                        {{$blog['author']['name']}}
                                    </h5>
                                </a>
                                <div class="more-products-container">
                                    @foreach($related_blogs as $related_blog)
                                    <a class="more-products-item" style="background-image: url({{$related_blog->url}})" href="/blog/{{$related_blog->slug}}"></a>
                                    @endforeach
                                </div>
                            </div>
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
                    <p>Cảm ơn bạn đã đăng kí nhận thông tin từ colorME, chúng tôi sẽ thường xuyên gửi cho bạn các tài liệu và bài viết bổ ích, nhớ check email của colorME thường xuyên bạn nhé.</p>
                    <p>Nếu bạn đang quan tâm đến các khoá học về thiết kế và lập trình, bạn có thể tìm hiểu thêm tại đây.</p>
                    <a href="/" class="btn btn-success" style="color:white;width: 100%; margin: 10px; padding: 15px;"
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
@endsection

@push('scripts')
<script>
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
            console.log(name + phone + email);
            var ok = 0;
            if (name.trim() == "" || email.trim() == "" || phone.trim() == "") ok = 1;

            if (!name || !email || !phone || ok == 1) {
                $("#alert").html(
                    "<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin</div>"
                );
                return;
            } 
            if(!validateEmail(email)){
                $("#alert").html(
                    "<div class='alert alert-danger'>Bạn vui lòng kiểm tra lại email</div>"
                );
                return;
            }
            var message = "ColorMe đã nhận được thông tin của bạn. Bạn vui lòng kiểm tra email";
            $("#alert").html("<div class='alert alert-success'>" + message + "</div>");
            var url = "";
            $("#modalSuccess").modal("show");
            var data = {                    
                name: name,
                email: email,
                phone: phone,
                _token: "{{csrf_token()}}"
            };
            axios.post("/api/v3/sign-up", data)
                .then(function () {
                    }.bind(this))
                    .catch(function () {
                    }.bind(this));
        });
    });
</script>
@endpush