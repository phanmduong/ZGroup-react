@extends('layouts.public')

@section('title','Upload')

@section('content')
    <style>
        .background {
            background: white;
        }

        label {
            font-size: 16px !important;
        }

        .tab-container {
            padding-top: 20px !important;
        }
    </style>
    <div class="container">

        <div class="row background" style="margin-bottom: 2px">
            <div class="col s6 colorme-tab active" onclick="changeTab('uploadDesign',this)">bài tập</div>
            <div class="col s6 colorme-tab" onclick="changeTab('uploadBlogPost',this)">bài viết</div>
        </div>
        <div class="row ">

            @if ( Session::has('message'))
                <div class="col s12 background">
                    <div class="card-panel">
                        <span>{!! Session::get('message') !!}</span>
                    </div>
                </div>
            @endif
            <div id="uploadBlogPost" class="col s12 tab-container background">
                @include('student.upload.upload_blog_post',['owner_id'=>$owner_id])
            </div>
            <div id="uploadDesign" class="col s12 tab-container background">
                @include('student.upload.upload_bai')
            </div>
        </div>

    </div>
    {{--<script src="//cdn.ckeditor.com/4.5.8/standard/ckeditor.js"></script>--}}

    <script>
        var tabIds = [];
        $(document).ready(function () {
            $('.tab-container').each(function () {
                tabIds.push($(this).attr('id'));
            });
            $('.colorme-tab.active').trigger('click');
        });

        function changeTab(id, elem) {

            $('.colorme-tab').each(function () {
                $(this).removeClass('active');
            });
            $(elem).addClass('active');
            for (var i = 0; i < tabIds.length; i++) {
                var tabId = '#' + tabIds[i];

                $(tabId).hide();
            }
            $('#' + id).show();
        }


    </script>
@endsection