@extends('colorme_new.layouts.master')

@section('styles')
    <!-- Froala Editor -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/css/froala_editor.min.css" rel="stylesheet"
          type="text/css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/css/froala_style.min.css" rel="stylesheet"
          type="text/css">

    <!-- Include Code Mirror style -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.css">

    <!-- Include Editor Plugins style. -->
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/char_counter.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/code_view.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/colors.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/emoticons.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/file.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/fullscreen.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/image.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/image_manager.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/line_breaker.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/quick_insert.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/table.css">
    <link rel="stylesheet" href="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/css/plugins/video.css">
    <link rel="stylesheet" href="{{url('colorme-react/styles.css')}}?8128888">
@endsection

@section('content')
<style>
    #nav-bar {
        width: 100%;
        text-align: center;
        background-color: white;
        height: 50px;
        /* display: flex; */
        justify-content: center;
        position: fixed;
        z-index: 99;
        box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;
    }

    .transform-text {
        color: #000 !important;
        height: 100%;
        line-height: 50px;
        display: inline-block;
        margin: 0px 8px;
        font-weight: 600;
        opacity: 0.6;
        font-size: 12px;
    }
    #loader {
        margin: 0 auto;
        border: 5px solid #f3f3f3; /* Light grey */
        border-top: 5px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
        display: none;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
<div class="navbar navbar-default" id="nav-bar">
    <div class="container-fluid">
        <div style="position:absolute; left: 20px;">
                <a class="routing-bar-item transform-text active" href="/posts/7">Nổi bật</a>
                <a class="routing-bar-item transform-text" href="/posts/new">Mới nhất</a>
        </div>
    </div>
    <div class="days">
        <a href="/posts/1" class="routing-bar-item transform-text">Hôm nay</a>
        <a href="/posts/7" class="routing-bar-item transform-text">7 ngày qua</a>
        <a href="/posts/30" class="routing-bar-item transform-text active">30 ngày qua</a>
    </div>
</div>
<div class="home-page-wrapper" style="padding-top: 70px;">
        <div>
            <div class="left-panel-wrapper" id="left-panel-wrapper">
                @if (Auth::check())
                <div class="left-panel" id="left-panel-user">
                    <div class="hi-wrapper">
                        <img src="{{ Auth::user()->avatar_url }}" class="media-object img-circle"
                            style="width: 70px; height: 70px; margin: auto;">
                    </div>
                    <a href="/profile/{{ Auth::user()->email }}">
                        <strong style="color: rgb(68, 68, 68); font-size: 18px;">{{ Auth::user()->name }}</strong>
                        <div style="color: rgb(153, 153, 153); font-size: 12px;">Chỉnh sửa thông tin</div>
                    </a>
                    <div>
                        <button class="btn btn-success">Tạo CV</button>
                    </div>
                    <div style="padding: 5px; font-size: 12px; color: rgb(105, 105, 105);">
                        <div style="display: inline-block; text-align: left;">
                            <div>
                                <span class="glyphicon glyphicon glyphicon-book" aria-hidden="true" style="color: rgb(53, 131, 195); margin-right: 10px;"></span>
                                <strong>{{ $user_posts }} </strong>Bài đăng
                            </div>
                            <div>
                                <span class="glyphicon glyphicon glyphicon-heart" aria-hidden="true" style="color: red; margin-right: 10px;"></span>
                                <strong>{{ $user_likes }} </strong>lượt thích
                            </div>
                            <div>
                                <span class="glyphicon glyphicon glyphicon-eye-open" aria-hidden="true" style="color: green; margin-right: 10px;"></span>
                                <strong>{{ $user_views }} </strong>lượt xem
                            </div>
                        </div>
                    </div>
                </div>
                {{-- <div class="left-panel-lower" id="left-panel-progress">
                    <h5 style="font-weight: 600;">TIẾN ĐỘ HỌC TẬP</h5>
                    <div>
                        @foreach ($user_registers as $item)
                        <div class="media" style="font-size: 12px; margin-top: 0px;">
                            <div class="media-left media-middle">
                                <img class="media-object img-circle" src="{{ $item['course']['icon_url'] }}"
                                    alt="{{ $item['name'] }}" style="width: 35px; height: 35px;">
                            </div>
                            <div class="media-body" style="padding-top: 12px;">
                                <strong>
                                    {{ $item['name'] }}
                                </strong>
                                <div style="clear: both;">
                                    <span class="label label-success" style="float: right; margin-left: 5px; margin-top: -2px; width: 30px;">0/16</span>
                                    <div class="progress" data-toggle="tooltip" data-placement="top" title="Điểm danh" style="height: 10px; margin-top: 10px; margin-bottom: 10px;"
                                        data-original-title="Điểm danh">
                                        <div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40"
                                            aria-valuemin="0" aria-valuemax="100" style="width: 50%;"></div>
                                    </div>
                                </div>
                                <div style="clear: both;">
                                    <span class="label label-warning" style="margin-left: 5px; float: right; margin-top: -2px; width: 30px;">0/0</span>
                                    <div class="progress" data-toggle="tooltip" data-placement="top" title="Bài đã nộp" style="height: 10px; margin-top: 10px; margin-bottom: 10px;"
                                        data-original-title="Bài đã nộp">
                                        <div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" role="progressbar" aria-valuenow="40"
                                        aria-valuemin="0" aria-valuemax="100" style="width: 20%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                        
                    </div>
                </div> --}}
                @else
                <div class="left-panel" id="left-panel-hi">
                    <div class="hi-wrapper">
                        <div class="hi">HI!</div>
                    </div>
                    <h5>Chào bạn!</h5>
                    <div style="font-size: 12px; color: rgb(155, 155, 155);">
                        <div>Bạn vẫn chưa đăng nhập</div>
                        <div>Để sử dụng tối đa các chức năng</div>
                        <div>Xin bạn vui lòng:</div>
                    </div>
                    <div>
                        <a v-on:click="openModalLogin" class="btn sign-in">Đăng nhập</a>
                        <a v-on:click="openModalRegister" class="btn sign-up">Tạo tài khoản</a>
                    </div>
                </div>
                @endif
                <div class="left-panel-lower" id="left-panel-courses">
                    <h5 style="font-weight: 600;">ĐĂNG KÍ HỌC</h5>
                    @foreach ($cources as $cource)
                        <div class="media">
                            <div class="media-left">
                                <a href="/course/{{ convert_vi_to_en($cource['name']) }}">
                                    <img src="{{ $cource['icon_url']}}" class="media-object img-circle" style="width: 40px;">
                                </a>
                            </div>
                            <div class="media-body">
                                <div>
                                    <a href="/course/{{ convert_vi_to_en($cource['name']) }}" style="color: rgb(12, 12, 12); font-weight: 400;">{{ $cource['name'] }}</a>
                                </div>
                                <div style="color: rgb(128, 128, 128);">
                                    {{ $cource['duration'] }} buổi
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
                <div id="modalRegister" role="dialog" class="modal fade" style="display: none;">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-body" style="padding-bottom: 0px;">
                                <!---->
                                <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 10px 20px;"
                                    id="form-register">
                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/logo1.jpg" style="width: 50px; height: 50px;">
                                    <h2 style="font-weight: 600;">Tạo tài khoản</h2>
                                    <p>Chào mừng bạn đến với colorME.</p>
                                    <br>
                                    <form style="width: 100%;">
                                        <div class="form-group" style="width: 100%;">
                                            <input width="100%" type="text" name="name" placeholder="Họ và tên" required="required" class="form-control"
                                                style="height: 50px;">
                                        </div>
                                        <div class="form-group" style="width: 100%;">
                                            <input width="100%" name="email" type="email" placeholder="Email" required="required" class="form-control"
                                                style="height: 50px;">
                                        </div>
                                        <div class="form-group" style="width: 100%;">
                                            <input width="100%" type="password" name="password" id="password" placeholder="Mật khẩu" required="required"
                                                class="form-control" style="height: 50px;">
                                        </div>
                                        <div class="form-group" style="width: 100%;">
                                            <input width="100%" type="password" name="confirm_password" placeholder="Nhập lại mật khẩu" required="required"
                                                class="form-control" style="height: 50px;">
                                        </div>
                                        <div class="form-group" style="width: 100%;">
                                            <input width="100%" type="text" name="phone" placeholder="Số điện thoại" required="required" class="form-control"
                                                style="height: 50px;">
                                        </div>
                                    </form>
                                    <!---->
                                    <button class="btn btn-success" style="width: 100%; margin: 10px; padding: 15px;">
                                        Tạo tài khoản
                                    </button>
                                    <!---->
                                    <button class="btn btn-default" style="width: 100%; margin: 10px; padding: 15px;">Đăng nhập
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-list-wrapper" id="products">
            @foreach($products as $product)
            <div class="product-wrapper">
                <div class="product-item">
                    <div class="colorme-img">
                        <a data-toggle="modal" data-target="#{{ $product['id'] }}">
                            <div class="colorme-link" style="background-image: url({{ $product['url'] }});
                                        background-size: cover;
                                        background-position: center center;">
                            </div>
                        </a>
                    </div>
                    <div class="product-info">
                        <div style="font-size: 16px;
                                            border-bottom: 1px solid rgb(217, 217, 217);
                                            padding: 10px;
                                            display: flex;
                                            justify-content: space-between;">
                            <a href="/post/{{ $product['slug'] }}" style="color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;">{{ shortString($product['title'],3) }}</a>
                            <div>
                                <span data-html="true" data-toggle="tooltip" title="" data-original-title="Được đánh dấu nổi bật bởi<br/>Nguyen Mine Linh">
                                    <span class="glyphicon glyphicon-circle-arrow-up" style="color: rgb(240, 173, 78); margin-right: 2px;"></span>
                                </span>
                                <a data-toggle="tooltip" title="" href="/group/thietkechuyensau13" data-original-title="Lớp Thiết kế chuyên sâu 1.3">
                                    <span class="glyphicon glyphicon-circle-arrow-right" style="color: green;"></span>
                                </a>
                            </div>
                        </div>
                        <div class="media" style="font-size: 12px; margin-top: 10px; padding: 5px 10px;">
                            <div class="media-left" style="padding-right: 3px;">
                                <a href="/profile/{{ $product['author']['email'] }}">
                                    <div style="background: url({{ $product['author']['avatar_url'] }}) center center / cover; width: 40px; height: 40px; margin-right: 5px; margin-top: -3px; border-radius: 3px;">
                                    </div>
                                </a>
                            </div>
                            <div class="media-body">
                                <a href="/profile/{{ $product['author']['email'] }}">
                                    <div style="font-weight: 600;">
                                        {{ $product['author']['name']}}
                                    </div>
                                    <div class="timestamp" style="font-size: 12px;">
                                        {{ $product['time'] }}
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div style="border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 40px; width: 100%;"></div>
                        <div style="position: absolute; bottom: 5px;">
                            <div class="product-tool">
                                <span class="glyphicon glyphicon-eye-open">{{ $product['views'] }}</span>
                                <span class="glyphicon glyphicon-comment">{{ $product['comment'] }}</span>
                                <span class="glyphicon glyphicon-heart"></span>
                                <span data-html="true" data-toggle="tooltip" title="" style="cursor: pointer;" data-original-title="Nguyen Mine Linh<br/>Ngọc Diệp<br/>Trần Đức Dũng">{{ $product['like'] }}</span>
                                <span></span>
                            </div>
                        </div>
                        <div style="position: absolute; bottom: 10px; right: 5px;">
                            <div data-toggle="tooltip" title="" style="cursor: pointer; width: 11px; height: 11px; border-radius: 10px; margin-right: 3px; display: inline-block;"
                                data-original-title="#">
    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="{{ $product['id'] }}" data-reactroot="" class="modal fade ReactModal__Overlay ReactModal__Overlay--after-open ProductOverlayClass">
                <div class="ReactModal__Content ReactModal__Content--after-open ProductModalClass" tabindex="-1">
                    <a data-dismiss="modal" id="btn-close-modal">x</a>
                    <div class="container" style="width: 100%; padding: 20px 120px;">
                        <a href="/profile/{{ $product['author']['email'] }}">
                            <div style="background: url({{ $product['author']['avatar_url'] }}) center center / cover; width: 80px; height: 80px; border-radius: 40px; margin: auto;"></div>
                            <div style="text-align: center; padding: 15px 0px; color: rgb(68, 68, 68); font-size: 16px;">{{ $product['author']['name'] }}</div>
                        </a>
                        <a href="/post/{{ $product['slug'] }}">
                            <div style="text-align: center; font-size: 36px; padding: 25px; font-weight: 600; color: rgb(68, 68, 68);">{{ $product['title'] }}</div>
                        </a>
                        <div style="text-align: center; margin-bottom: 30px;">
                            <div class="product-tool">
                                <span class="glyphicon glyphicon-eye-open">{{ $product['views'] }}</span>
                                <span class="glyphicon glyphicon-comment">{{ $product['comment'] }}</span>
                                <span class="glyphicon glyphicon-heart">{{ $product['like'] }}</span>
                            </div>
                        </div>
                        <div>
                            <div style="text-align: center;">
                                <div data-placement="bottom" data-toggle="tooltip" title="" style="cursor: pointer; width: 15px; height: 15px; border-radius: 10px; margin-right: 10px; display: inline-block;"
                                    data-original-title="#"></div>
                            </div>
                            <div class="image-wrapper">
                                <img id="colorme-image" src="{{ $product['url'] }}" style="width: 100%;">
                            </div>
                        </div>
                        <div class="product-content">
                            <p>
                                {!! $product['content'] !!}
                            </p>
                        </div>
                        <div style="padding: 25px 0px;"></div>
                        <div style="height: 40px; border-bottom: 1px solid rgb(217, 217, 217);">
                            <div style="float: left;">
                                <div class="product-tool">
                                    <span class="glyphicon glyphicon-eye-open">{{ $product['views'] }}</span>
                                    <span class="glyphicon glyphicon-comment">{{ $product['comment'] }}</span>
                                    <span class="glyphicon glyphicon-heart">{{ $product['like'] }}</span>
                                </div>
                            </div>
                            <div style="float: right;">
                                <a href="javascript: void(0)" target="_blank" class="btn-share-fb">
                                    <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                    <span> Share </span>
                                </a>
                            </div>
                        </div>
                        <div style="padding: 20px 0px;">
                            <div></div>
                        </div>
                        <div style="width: 130%; margin-left: -15%; margin-top: 40px;">
                            <div style="margin-top: 20px;">
                                <a href="/profile/{{ $product['author']['email'] }}" class="more-products">
                                    <h5>
                                        <!-- react-text: 246 -->Bài viết khác từ
                                        <!-- /react-text -->
                                        <!-- react-text: 247 -->{{ $product['author']['name'] }}
                                        <!-- /react-text -->
                                    </h5>
                                </a>
                                <div class="more-products-container">
                                    <a class="more-products-item" style="background-image: url(&quot;http://d1j8r0kxyu9tj8.cloudfront.net/images/1524712876guL2OYuj4QOviqS.jpg&quot;);"></a>
                                    <a class="more-products-item" style="background-image: url(&quot;http://d1j8r0kxyu9tj8.cloudfront.net/images/1522738012DrjkzawDRHKBlBq.jpg&quot;);"></a>
                                    <a class="more-products-item" style="background-image: url(&quot;http://d1j8r0kxyu9tj8.cloudfront.net/images/15252117232nuHy7z96FtAVQo.jpg&quot;);"></a>
                                    <a class="more-products-item" style="background-image: url(&quot;http://d1j8r0kxyu9tj8.cloudfront.net/images/1523558453rDAFFcjK4ll1Rqm.jpg&quot;);"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            @endforeach
            <div id="clear" style="clear: both"></div>
        </div>
    </div>
<div id="load-more" style="width: 100%; text-align: center; padding-bottom: 30px;">
    <div id="loader"></div>
    <button v-on:click="loadmore" id="load-button" type="button" class="btn btn-upload">Tải thêm</button>
</div>
@endsection

@push('scripts')

    <!-- Froala editor JS file. -->
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/js/froala_editor.min.js"></script>

    <!-- Include Code Mirror. -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.js"></script>
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.min.js"></script>

    <!-- Include Plugins. -->
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/align.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/char_counter.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/code_beautifier.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/code_view.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/colors.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/emoticons.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/entities.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/file.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/font_family.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/font_size.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/fullscreen.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/image.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/image_manager.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/inline_style.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/line_breaker.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/link.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/lists.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/paragraph_format.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/paragraph_style.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/quick_insert.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/quote.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/table.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/save.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/url.min.js"></script>
    <script type="text/javascript" src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/video.min.js"></script>

    <script src="{{url('colorme-react/bundle.js')}}?8218888"></script>

    <script>
        function count(arr){
            var count = 0;
            for(var i = 0; i < arr.length; ++i){
                if(arr[i] == 2)
                    count++;
            }
            return count;
        }

        function shortString(string, max)
        {
            var arr = string.split(" ");
            arr = arr.slice(0, Math.min(count(arr), max));
            var data = arr.join(" ");
            if (count(string.split(" ")) > max) return data + ' ...';
            return data;
        }
        var app = new Vue({
            el: "#load-more",
            data: {
                page: {{ $current_page }},
                products: {},
                scroll: false
            },
            methods: {
                loadmore: function(){
                    console.log(window.location.href + '?page=' + this.page);
                    this.page++;
                    var that = this;
                    axios.get(window.location.href + '?page=' + this.page)
                    .then(function(response){
                        console.log(response.data);
                        var html = "";
                        $.each(response.data, function(index, value) {
                            html += "        <div class=\"product-wrapper\">\n" +
                                "            <div class=\"product-item\">\n" +
                                "                <div class=\"colorme-img\">\n" +
                                "                    <div class=\"colorme-link\" style=\"background-image: url("+ value.url +");\n" +
                                "                                    background-size: cover;\n" +
                                "                                    background-position: center center;\">\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "                <div class=\"product-info\">\n" +
                                "                    <div style=\"font-size: 16px;\n" +
                                "                                        border-bottom: 1px solid rgb(217, 217, 217);\n" +
                                "                                        padding: 10px;\n" +
                                "                                        display: flex;\n" +
                                "                                        justify-content: space-between;\">\n" +
                                "                        <a href=\"/post/"+ value.slug +"\" style=\"color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;\">"+ shortString(value.title,3) +"</a>\n" +
                                "                        <div>\n" +
                                "                            <span data-html=\"true\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Được đánh dấu nổi bật bởi<br/>Nguyen Mine Linh\">\n" +
                                "                                <span class=\"glyphicon glyphicon-circle-arrow-up\" style=\"color: rgb(240, 173, 78); margin-right: 2px;\"></span>\n" +
                                "                            </span>\n" +
                                "                            <a data-toggle=\"tooltip\" title=\"\" href=\"/group/thietkechuyensau13\" data-original-title=\"Lớp Thiết kế chuyên sâu 1.3\">\n" +
                                "                                <span class=\"glyphicon glyphicon-circle-arrow-right\" style=\"color: green;\"></span>\n" +
                                "                            </a>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                    <div class=\"media\" style=\"font-size: 12px; margin-top: 10px; padding: 5px 10px;\">\n" +
                                "                        <div class=\"media-left\" style=\"padding-right: 3px;\">\n" +
                                "                            <a href=\"/profile/"+ value.author.email +"\">\n" +
                                "                                <div style=\"background: url("+ value.author.avatar_url +") center center / cover; width: 40px; height: 40px; margin-right: 5px; margin-top: -3px; border-radius: 3px;\">\n" +
                                "                                </div>\n" +
                                "                            </a>\n" +
                                "                        </div>\n" +
                                "                        <div class=\"media-body\">\n" +
                                "                            <a href=\"/profile/"+ value.author.email +"\">\n" +
                                "                                <div style=\"font-weight: 600;\">\n" +
                                                                     value.author.name +"\n" +
                                "                                </div>\n" +
                                "                                <div class=\"timestamp\" style=\"font-size: 12px;\">\n" +
                                                                     value.time +"\n" +
                                "                                </div>\n" +
                                "                            </a>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                    <div style=\"border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 40px; width: 100%;\"></div>\n" +
                                "                    <div style=\"position: absolute; bottom: 5px;\">\n" +
                                "                        <div class=\"product-tool\">\n" +
                                "                            <span class=\"glyphicon glyphicon-eye-open\">"+ value.views +"</span>\n" +
                                "                            <span class=\"glyphicon glyphicon-comment\">"+ value.comment +"</span>\n" +
                                "                            <span class=\"glyphicon glyphicon-heart\"></span>\n" +
                                "                            <span data-html=\"true\" data-toggle=\"tooltip\" title=\"\" style=\"cursor: pointer;\" data-original-title=\"Nguyen Mine Linh<br/>Ngọc Diệp<br/>Trần Đức Dũng\">"+ value.like +"</span>\n" +
                                "                            <span></span>\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                    <div style=\"position: absolute; bottom: 10px; right: 5px;\">\n" +
                                "                        <div data-toggle=\"tooltip\" title=\"\" style=\"cursor: pointer; width: 11px; height: 11px; border-radius: 10px; margin-right: 3px; display: inline-block;\"\n" +
                                "                            data-original-title=\"#\">\n" +
                                "\n" +
                                "                        </div>\n" +
                                "                    </div>\n" +
                                "                </div>\n" +
                                "            </div>\n" +
                                "        </div>";
                        });
                        html+= "<div id=\"clear\" style=\"clear: both\"></div>";
                        $("#clear").remove();
                        // console.log($(html));
                        $("#products").append($(html));
                        $("#load-button").hide();
                        that.scroll = true;
                        // console.log(value.author.email);
                        // that.products = JSON.parse(response.data);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                },
                handleScroll: function(){
                    // console.log(window.scrollY);
                    if(this.scroll && $(window).scrollTop() + $(window).height() >= $(document).height()){
                        this.page++;
                        axios.get(window.location.href + '?page=' + this.page)
                            .then(function(response){
                                console.log(response.data);
                                var html = "";
                                $.each(response.data, function(index, value) {
                                    html += "        <div class=\"product-wrapper\">\n" +
                                        "            <div class=\"product-item\">\n" +
                                        "                <div class=\"colorme-img\">\n" +
                                        "                    <div class=\"colorme-link\" style=\"background-image: url("+ value.url +");\n" +
                                        "                                    background-size: cover;\n" +
                                        "                                    background-position: center center;\">\n" +
                                        "                    </div>\n" +
                                        "                </div>\n" +
                                        "                <div class=\"product-info\">\n" +
                                        "                    <div style=\"font-size: 16px;\n" +
                                        "                                        border-bottom: 1px solid rgb(217, 217, 217);\n" +
                                        "                                        padding: 10px;\n" +
                                        "                                        display: flex;\n" +
                                        "                                        justify-content: space-between;\">\n" +
                                        "                        <a href=\"/post/"+ value.slug +"\" style=\"color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;\">"+ shortString(value.title,3) +"</a>\n" +
                                        "                        <div>\n" +
                                        "                            <span data-html=\"true\" data-toggle=\"tooltip\" title=\"\" data-original-title=\"Được đánh dấu nổi bật bởi<br/>Nguyen Mine Linh\">\n" +
                                        "                                <span class=\"glyphicon glyphicon-circle-arrow-up\" style=\"color: rgb(240, 173, 78); margin-right: 2px;\"></span>\n" +
                                        "                            </span>\n" +
                                        "                            <a data-toggle=\"tooltip\" title=\"\" href=\"/group/thietkechuyensau13\" data-original-title=\"Lớp Thiết kế chuyên sâu 1.3\">\n" +
                                        "                                <span class=\"glyphicon glyphicon-circle-arrow-right\" style=\"color: green;\"></span>\n" +
                                        "                            </a>\n" +
                                        "                        </div>\n" +
                                        "                    </div>\n" +
                                        "                    <div class=\"media\" style=\"font-size: 12px; margin-top: 10px; padding: 5px 10px;\">\n" +
                                        "                        <div class=\"media-left\" style=\"padding-right: 3px;\">\n" +
                                        "                            <a href=\"/profile/"+ value.author.email +"\">\n" +
                                        "                                <div style=\"background: url("+ value.author.avatar_url +") center center / cover; width: 40px; height: 40px; margin-right: 5px; margin-top: -3px; border-radius: 3px;\">\n" +
                                        "                                </div>\n" +
                                        "                            </a>\n" +
                                        "                        </div>\n" +
                                        "                        <div class=\"media-body\">\n" +
                                        "                            <a href=\"/profile/"+ value.author.email +"\">\n" +
                                        "                                <div style=\"font-weight: 600;\">\n" +
                                                                            value.author.name +"\n" +
                                        "                                </div>\n" +
                                        "                                <div class=\"timestamp\" style=\"font-size: 12px;\">\n" +
                                                                            value.time +"\n" +
                                        "                                </div>\n" +
                                        "                            </a>\n" +
                                        "                        </div>\n" +
                                        "                    </div>\n" +
                                        "                    <div style=\"border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 40px; width: 100%;\"></div>\n" +
                                        "                    <div style=\"position: absolute; bottom: 5px;\">\n" +
                                        "                        <div class=\"product-tool\">\n" +
                                        "                            <span class=\"glyphicon glyphicon-eye-open\">"+ value.views +"</span>\n" +
                                        "                            <span class=\"glyphicon glyphicon-comment\">"+ value.comment +"</span>\n" +
                                        "                            <span class=\"glyphicon glyphicon-heart\"></span>\n" +
                                        "                            <span data-html=\"true\" data-toggle=\"tooltip\" title=\"\" style=\"cursor: pointer;\" data-original-title=\"Nguyen Mine Linh<br/>Ngọc Diệp<br/>Trần Đức Dũng\">"+ value.like +"</span>\n" +
                                        "                            <span></span>\n" +
                                        "                        </div>\n" +
                                        "                    </div>\n" +
                                        "                    <div style=\"position: absolute; bottom: 10px; right: 5px;\">\n" +
                                        "                        <div data-toggle=\"tooltip\" title=\"\" style=\"cursor: pointer; width: 11px; height: 11px; border-radius: 10px; margin-right: 3px; display: inline-block;\"\n" +
                                        "                            data-original-title=\"#\">\n" +
                                        "\n" +
                                        "                        </div>\n" +
                                        "                    </div>\n" +
                                        "                </div>\n" +
                                        "            </div>\n" +
                                        "        </div>";
                                });
                                html+= "<div id=\"clear\" style=\"clear: both\"></div>";
                                $("#clear").remove();
                                // console.log($(html));
                                $("#products").append($(html));
                                // console.log(value.author.email);
                                // that.products = JSON.parse(response.data);
                            })
                            .catch(function(error){
                                console.log(error);
                        });
                    }
                }
            },
            beforeMount: function () {
                window.addEventListener('scroll', this.handleScroll);
            },
            beforeDestroy: function () {
                window.removeEventListener('scroll', this.handleScroll);
            }
        });
    </script>

@endpush