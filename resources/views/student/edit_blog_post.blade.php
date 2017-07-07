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
        <div class="row ">
            @if (Session::has('message'))
                <div class="col s12 background">
                    <div class="card-panel">
                        <span>{!! Session::get('message') !!}</span>
                    </div>
                </div>
            @endif
            <div id="uploadBlogPost" class="col s12 tab-container background">
                @include('student.upload.upload_blog_post')
            </div>
        </div>

    </div>
    {{--<script src="//cdn.ckeditor.com/4.5.8/standard/ckeditor.js"></script>--}}
@endsection