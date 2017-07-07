@extends('layouts.public')

@section('title','Trang chủ')


@section('fb-info')
    <link rel="canonical" href="{{url('')}}"/>
    <meta property="og:url" content="{{url('')}}"/>
    <meta property="og:type" content="article"/>
    <meta property="og:title" content="colorME"/>
    <meta property="og:description" content="Lớp học thiết kế dành cho tất cả mọi người"/>
    <meta property="og:image" content="{{url('img/logo.jpg')}}"/>
    <meta property="og:image:width" content="600"/>
    <meta property="og:image:height" content="315"/>
    <meta prefix="fb: http://ogp.me/ns/fb#" property="fb:app_id" content="1787695151450379"/>
@endsection
@section('content')
    <style>
        .ad-cover {
            background: url('{{$gen->cover_url}}') no-repeat;
            background-size: cover;
            background-position: center;
        }

        #newsfeed-filter {
            position: fixed;
            top: 42px;
        }

    </style>

    <div id="newsfeed-filter">
        <ul id="newsfeed-filter-list">
            <a style="color: #888;" href="{{url('newsfeed?type=1')}}">
                <li id="tab-1" class="tab-btn" style="border-right: 1px solid rgba(0,0,0,0.1)"><span
                            class="tab-text {{(!isset($type))?'tab-active':''}} {{(isset($type) && $type==1)?'tab-active':''}}">Mới Nhất</span>
                </li>
            </a>
            <a style="color: #888;" href="{{url('newsfeed?type=2')}}">
                <li id="tab-2" class="tab-btn" style="border-right: 1px solid rgba(0,0,0,0.1)"><span
                            class="tab-text {{(isset($type) && $type==2)?'tab-active':''}}">Nổi bật </span>
                </li>
            </a>
            <a style="color: #888;" href="{{url('newsfeed?type=3')}}">
                <li id="tab-3" class="tab-btn"><span class="tab-text {{(isset($type) && $type==3)?'tab-active':''}}">Chia sẻ</span>
                </li>
            </a>
        </ul>
    </div>
    <div style="margin-top: 50px;width: 80%;margin-left:10%">
        @include('components.products_grid',['products' => $products])
    </div>
    <div class="container">
        <div class="row" style="display: none" id="load_more_progress">
            <div class="col s12 m6  push-m3 center">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="gap-patch">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col s12 m6  push-m3 ">
                <a class="waves-effect waves-light btn-large red darken-4" id="btn-load-more" onclick="load_more()"
                   style="width: 100%">Tải
                    thêm</a>
            </div>
        </div>
    </div>
    <script>


        //Control Filter
        //        $(".tab-btn").click(function () {
        //            var targetTabContent = "#" + $(this).attr('id') + "-content";
        //
        //            if (!$(this.firstChild).hasClass("tab-active")) {
        //                $(".content").hide();
        //                $(".tab-text").removeClass("tab-active");
        //                $(this.firstChild).addClass("tab-active");
        //
        //                if ($(this).attr('id') === 'tab-1') {
        //
        //                }
        //                if ($(this).attr('id') === 'tab-2') {
        //
        //                }
        //                if ($(this).attr('id') === 'tab-3') {
        //
        //                }
        //            }
        //            return false;
        //        });


        $(document).ready(function () {
            $('.slider').slider({full_width: true}, {height: 200});
        });

        var isLoading = false;
        var page = 1;
        function load_more() {
            isLoading = true;


            $('#load_more_progress').fadeIn();
            $('#btn-load-more').fadeOut();
            $.post('{{url('newsfeedloadmore')}}', {
                @if(isset($type) && $type != null)
                type: '{{$type}}',
                @endif
                _token: '{{csrf_token()}}',
                @if(isset($class_name) && $class_name != null)
                class_name: '{{$class_name}}',
                @endif
                'page': page,

                @if(isset($category_id) && $category_id != null)
                category_id: '{{$category_id}}',
                @endif

            }, function (data, status) {
                $('#grid').append(data);
                page += 1;
                console.log(page);
                $('#load_more_progress').fadeOut();
                enter_to_comment();
                $('#btn-load-more').fadeIn();
                $(window).scroll(bindScroll);
                isLoading = false;
                initGallery();
            });
        }
        function fixed_scoll_filter() {
            if ($(window).scrollTop() > (newsfeed_filter_top - 42)) {
                $("#newsfeed-filter").addClass('fixed-top-42');
                $('#grid').addClass('margin-top-50');
            } else {
                $("#newsfeed-filter").removeClass('fixed-top-42');
                $('#grid').removeClass('margin-top-50');
            }

        }
        function bindScroll() {
            console.log("bind");
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 1000) {
                $(window).unbind('scroll');
                $(window).scroll(fixed_scoll_filter);
                if (!isLoading) {
                    load_more();
                }
            }
        }
        var newsfeed_filter_top = 42;
        $(document).ready(function () {
            newsfeed_filter_top = $("#newsfeed-filter").offset().top;
            $(window).scroll(fixed_scoll_filter);
        });

        $(window).scroll(bindScroll);


    </script>


@endsection
