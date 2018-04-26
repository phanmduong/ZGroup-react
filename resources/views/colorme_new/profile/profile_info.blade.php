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
    <div class="container">
        <div class="row" style="padding-bottom: 40px;">
            <div class="col-sm-12 col-md-8 col-md-offset-2">
                <div>
                    <div style="margin: 0px 0px 25px;">
                        <div><img src="{{$user_profile->avatar_url}}"
                                  class="img-circle" style="width: 70px; height: 70px;"></div>
                    </div>
                    <div>
                        <ul class="list-group">
                            <li class="list-group-item">Họ và tên: {{$user_profile->name}}</li>
                            <li class="list-group-item">Username: {{$user_profile->username}}</li>
                            <li class="list-group-item">Giới tính: <?php ($user_profile->gender == 0)?(print "Nam"):(print "Nữ") ?> </li>
                            <li class="list-group-item">Mô tả: {{$user_profile->description}}</li>
                            <li class="list-group-item">Nơi làm việc: {{$user_profile->work}}</li>
                            <li class="list-group-item">Trường học: {{$user_profile->university}}</li>
                        </ul>
                    </div>
                </div>
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