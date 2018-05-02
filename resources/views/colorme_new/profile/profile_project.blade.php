@extends('colorme_new.layouts.profile')

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
    <link rel="stylesheet" href="{{url('colorme-react/styles.css')}}?853288888">
@endsection

@section('content_profile')
    <div style="margin-top: 50px">
        <div id="app">
            <div data-reactroot="" style="height: 100%;">
                <div class="survey-wrapper">
                    <div class="survey-title">
                        <div></div>
                        <a href="#" style="color: white;"><strong><span
                                        class="glyphicon glyphicon-minus"></span></strong></a></div>
                    <div class="survey-body"><p>Chào bạn ! Với mong muốn mang đến những trải nghiệm thiết kế tuyệt vời
                            nhất cho học viên, colorME hi vọng qua khảo sát này, chúng mình có thể nhận được những ý
                            kiến đóng góp của các bạn để ngày một hoàn thiện hơn ^^</p>
                        <p>Cảm ơn các bạn đã tham gia khảo sát ! Những ý kiến của các bạn luôn là những điều vô cùng quý
                            giá giúp colorME ngày càng phát triển hơn ^^</p>
                        <button class="btn btn-success" style="width: 100%;">Gửi Khảo sát</button>
                    </div>
                </div>
                <div class="page-wrap">
                    <div>
                        <div>
                            <div>
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="home-page-wrapper">
                                            <div class="profile-product-list-wrapper">
                                                @foreach($blogs as $blog)
                                                    <div class="product-wrapper">
                                                        <div class="product-item">
                                                            <div class="colorme-img">
                                                                <div class="colorme-link"
                                                                     style="background-image: url({{$blog['url']}}); background-size: cover; background-position: center center;"></div>
                                                            </div>
                                                            <div class="product-info">
                                                                <div style="font-size: 16px; border-bottom: 1px solid rgb(217, 217, 217); padding: 10px; display: flex; justify-content: space-between;">
                                                                    <a href="/blog/{{$blog['slug']}}"
                                                                       style="color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;">
                                                                        {{$blog['title']}}
                                                                    </a>
                                                                    <div>
                                                                        <a data-toggle="tooltip" data-html="true"
                                                                           title=""
                                                                           data-original-title="Đánh dấu nổi bật">
                                                                            <span class="glyphicon glyphicon-circle-arrow-up"
                                                                                  style="color: rgb(137, 137, 137); margin-right: 2px;">

                                                                            </span>
                                                                        </a>
                                                                        <a data-toggle="tooltip" title=""
                                                                           href="/group/colorme"
                                                                           data-original-title="Lớp COLORME">
                                                                            <span class="glyphicon glyphicon-circle-arrow-right"
                                                                                  style="color: green;">

                                                                            </span>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="media"
                                                                     style="font-size: 12px; margin-top: 10px; padding: 5px 10px;">
                                                                    <div class="media-left" style="padding-right: 3px;">
                                                                        <a href="/profile/{{$blog['author']['username']}}">
                                                                            <div style="background: url({{$blog['author']['avatar_url']}}) center center / cover; width: 40px; height: 40px; margin-right: 5px; margin-top: -3px; border-radius: 3px;"></div>
                                                                        </a>
                                                                    </div>
                                                                    <div class="media-body">
                                                                        <a href="/blog/{{$blog['slug']}}">
                                                                            <div style="font-weight: 600;">{{$blog['author']['name']}}
                                                                            </div>
                                                                            <div class="timestamp"
                                                                                 style="font-size: 12px;">
                                                                                {{$blog['time']}}
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div style="border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 40px; width: 100%;"></div>
                                                                <div style="position: absolute; bottom: 5px;">
                                                                    <div class="product-tool">
                                                                        <span class="glyphicon glyphicon-eye-open"></span><span>{{$blog['views']}}</span>
                                                                        <span class="glyphicon glyphicon-comment"></span><span>{{$blog['comments_count']}}</span>
                                                                        <a
                                                                                data-toggle="tooltip" title=""</a>
                                                                        {{--class="glyphicon glyphicon-heart"--}}
                                                                        {{--data-original-title="Thích"></a><span>{{$blog['likes_count']}}</span><span></span>--}}
                                                                    </div>
                                                                </div>
                                                                <div style="position: absolute; bottom: 10px; right: 5px;">
                                                                    <div data-toggle="tooltip" title=""
                                                                         style="cursor: pointer; width: 11px; height: 11px; border-radius: 10px; margin-right: 3px; display: inline-block;"
                                                                         data-original-title="#"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <noscript></noscript>
                    </div>
                </div>
                <noscript></noscript>
                <noscript></noscript>
            </div>
        </div>
    </div>

@endsection

@push('scripts')
    <!-- Froala editor JS file. -->
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.3.4/js/froala_editor.min.js"></script>

    <!-- Include Code Mirror. -->
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/codemirror.min.js"></script>
    <script type="text/javascript"
            src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.3.0/mode/xml/xml.min.js"></script>

    <!-- Include Plugins. -->
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/align.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/char_counter.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/code_beautifier.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/code_view.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/colors.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/emoticons.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/entities.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/file.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/font_family.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/font_size.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/fullscreen.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/image.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/image_manager.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/inline_style.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/line_breaker.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/link.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/lists.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/paragraph_format.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/paragraph_style.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/quick_insert.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/quote.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/table.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/save.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/url.min.js"></script>
    <script type="text/javascript"
            src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/froala/js/plugins/video.min.js"></script>

    <script src="{{url('colorme-react/bundle.js')}}?85438888"></script>
@endpush