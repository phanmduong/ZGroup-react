@extends('layouts.crawl_layout')

@section('head')
    <meta property="fb:app_id" content="1787695151450379"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="{{url('/post/'.$product['linkId'])}}"/>
    @if (array_key_exists('description',$product))
        <meta property="og:description"
              content="{{$product['description']." - Đăng bởi ".$product['author']['name']}}"/>
    @else
        <meta property="og:description"
              content="{{"Đăng bởi ".$product['author']['name']}}"/>
    @endif

    <meta property="og:title" content="{{$product['title']}}"/>
    <meta property="og:image" content="{{$product['image_url']}}"/>
    <title>{{$product['title']}}</title>
@endsection

<body>
@section('body')
    <div class="page-wrap">
        <div class="container product-detail-container" style="padding: 80px 20%;">
            <a href="/profile/{{$product['author']['username']}}">
                <div style="background: url('{{$product['author']['avatar_url']}}') center center / cover; width: 80px; height: 80px; border-radius: 40px; margin: auto;"></div>
                <div style="text-align: center; padding: 15px 0px; color: rgb(68, 68, 68); font-size: 16px;">Nguyen Mine
                    Linh
                </div>
            </a>
            <div style="text-align: center; font-size: 36px; padding: 25px; font-weight: 200;">{{$product['title']}}</div>
            <div style="text-align: center; margin-bottom: 30px;">
                <div class="product-tool">
                    <span class="glyphicon glyphicon-eye-open"></span><span>240</span><span
                            class="glyphicon glyphicon-comment"></span><span>0</span><span
                            class="glyphicon glyphicon-heart"></span><span data-html="true" data-toggle="tooltip"
                                                                           title=""
                                                                           style="cursor: pointer;">9</span><span></span>
                </div>
            </div>
            <div class="image-wrapper">
                @if (array_key_exists('video_url',$product))
                    <div class="embed-responsive embed-responsive-16by9" style="background-color: rgb(217, 217, 217);">
                        <video preload="metadata" controls="" class="embed-responsive-item">
                            <source src="{{$product['video_url']}}"
                                    type="video/mp4">
                        </video>
                    </div>
                @else
                    <img id="colorme-image"
                         src="{{$product['image_url']}}"
                         alt="{{seo_keywords()}} color me "
                         style="width: 100%;"></div>
            @endif
            <div>
                {!! $content !!}
            </div>
            <div style="padding: 25px 0px;">
                <div style="margin-top: 0px;">
                    <span>Tags:</span>
                    @foreach($product['tags'] as $tag)
                        <span class="modal-tag"><strong>{{$tag}}</strong></span>
                    @endforeach
                </div>
            </div>
            <div>{{$product['created_at']}}</div>
            <div style="display: flex">
                @foreach($more_products as $p)
                    <div style="width: 25%">
                        @if (!array_key_exists('video_url',$p))
                            <a href="{{url('/post/'.$p['linkId'])}}">{{$p['title']}}</a>
                            <img style="width:100%" src="{{$p['image_url']}}" alt="{{seo_keywords()}} color me "/>
                        @else
                            <video style="width:100%" width="400" controls>
                                <source src="{{$p['video_url']}}" type="video/mp4">
                                Your browser does not support HTML5 video.
                            </video>
                        @endif
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    {{--<div>--}}
    {{--<div style="padding-top: 40px; background: rgb(26, 26, 26); padding-bottom: 80px;">--}}
    {{--<div class="container larger-container">--}}
    {{--<div class="col-md-8 title-wrapper">--}}
    {{--<div class="pre-head" style="display: block; font-size: 14px; color: rgb(221, 221, 221);">--}}
    {{--<h1 style="font-size: 40px; margin-top: 0px; color: rgb(255, 255, 255);">sticker</h1>--}}
    {{--<span><img class="img-circle"--}}
    {{--src="{{$product['author']['avatar_url']}}"--}}
    {{--style="width: 20px; height: 20px; margin-right: 5px;">--}}
    {{--<!-- react-text: 1151 -->Đăng bởi <!-- /react-text --><a--}}
    {{--href="{{$product['author']['avatar_url']}}"--}}
    {{--style="color: rgb(76, 196, 255);">{{$product['author']['name']}}</a>--}}
    {{--<!-- react-text: 1153 --> vào<!-- /react-text --><span--}}
    {{--style="color: rgb(76, 196, 255);"><!-- react-text: 1155 -->--}}
    {{--<!-- /react-text --><!-- react-text: 1156 -->{{$product['created_at']}}--}}
    {{--<!-- /react-text --></span></span></div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="container larger-container" style="margin-top: -50px;">--}}
    {{--<div class="col-md-8 product-detail-content-wrapper">--}}
    {{--<div class="product-detail-content"--}}
    {{--style="width: 100%; word-wrap: break-word; margin: 0px 0px 30px; padding: 50px 50px 40px; background: rgb(255, 255, 255); border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.0784314) 1px 1px 2px; min-height: 300px;">--}}
    {{--<div><img src="{{$product['image_url']}}">--}}
    {{--<div style="margin-top: 20px;"></div>--}}
    {{--</div>--}}
    {{--<div>--}}
    {{--{{$content}}--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--<div class="product-detail-header">Comments</div>--}}
    {{--<input class="form-control" placeholder="Viết comment của bạn..." id="comment-input"></div>--}}
    {{--<div class="col-md-4" style="padding-top: 70px;">--}}
    {{--<ul class="product-stat"--}}
    {{--style="margin: 0px; padding: 0px; font-size: 100%; vertical-align: baseline; border: 0px; background: transparent;">--}}
    {{--<li><a class="stat-action"><span class="glyphicon glyphicon-heart"--}}
    {{--aria-hidden="true"></span><span> Like? </span></a><a--}}
    {{--class="like-count"><!-- react-text: 1172 -->0<!-- /react-text -->--}}
    {{--<!-- react-text: 1173 --> <!-- /react-text --><!-- react-text: 1174 -->like--}}
    {{--<!-- /react-text --></a></li>--}}
    {{--<li><a class="stat-action"><span class="glyphicon glyphicon-share-alt"--}}
    {{--aria-hidden="true"></span><span> Share </span></a><span--}}
    {{--class="like-count"><!-- react-text: 1180 -->{{$product['likes_count']}}<!-- /react-text -->--}}
    {{--<!-- react-text: 1181 --> <!-- /react-text --><!-- react-text: 1182 -->views--}}
    {{--<!-- /react-text --></span></li>--}}
    {{--</ul>--}}
    {{--<div style="margin-top: 20px;"><a class="more-products" href="/profile/thanhhoai"><h5>--}}
    {{--<!-- react-text: 1186 -->Bài viết khác từ <!-- /react-text -->--}}
    {{--<!-- react-text: 1187 -->{{$product['author']['name']}}<!-- /react-text --></h5></a>--}}
    {{--<div class="more-products-container">--}}


    {{--</div>--}}
    {{--</div>--}}
    {{--<div style="margin-top: 20px;"><h5>Tags</h5>--}}
    {{--<div></div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}
    {{--</div>--}}



@endsection

</body>