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
        <a href="/posts/7" class="routing-bar-item transform-text active">7 ngày qua</a>
        <a href="/posts/30" class="routing-bar-item transform-text">30 ngày qua</a>
    </div>
</div>
<div class="home-page-wrapper" style="padding-top: 70px;">
    <div>
        <div class="left-panel-wrapper" id="left-panel-wrapper">
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
                    <a class="btn sign-in">Đăng nhập</a>
                    <a class="btn sign-up">Tạo tài khoản</a>
                </div>
            </div>
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
        </div>
    </div>
    <div class="product-list-wrapper" id="products">
        @foreach($products as $product)
        <div class="product-wrapper">
            <div class="product-item">
                <div class="colorme-img">
                    <div class="colorme-link" style="background-image: url({{ $product['url'] }});
                                    background-size: cover;
                                    background-position: center center;">
                    </div>
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
                                "                        <a href=\"/post/"+value.slug+"\" style=\"color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;\">"+ shortString(value.title,3) +"</a>\n" +
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
                                        "                        <a href=\"/post/"+value.slug+"\" style=\"color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;\">"+ shortString(value.title,3) +"</a>\n" +
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