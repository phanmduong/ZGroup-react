@extends('elight::layouts.master')

@section('content')
    <style>

        html, body {
            overflow-x: hidden;
        }

        .error {
            color: red;
        }

        a {
            word-wrap: break-word;
        }

        code {
            font-size: 0.8em;
        }

        #player2-container .mejs__time-buffering, #player2-container .mejs__time-current, #player2-container .mejs__time-handle,
        #player2-container .mejs__time-loaded, #player2-container .mejs__time-hovered, #player2-container .mejs__time-marker, #player2-container .mejs__time-total {
            height: 2px;
        }

        #player2-container .mejs__time-total {
            margin-top: 9px;
        }

        #player2-container .mejs__time-handle {
            left: -5px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #ffffff;
            top: -5px;
            cursor: pointer;
            display: block;
            position: absolute;
            z-index: 2;
            border: none;
        }

        #player2-container .mejs__time-handle-content {
            top: 0;
            left: 0;
            width: 12px;
            height: 12px;
        }
    </style>
    <link rel="stylesheet" href="/mediaelementplayer/mediaelementplayer.css">
    <div class="container">
        <br><br><br><br>

        <div class="row">
            @if ($lesson)
                <div class="col-md-12">
                    <h1 style="font-size: 30px;font-weight:600; color:#424242;">{{$lesson->name}}</h1>
                    <p>{{$lesson->short_description}}</p>
                    <br>
                </div>
                <div class="col-md-8">
                    <div id="lesson_image" style="width: 100%;
                            background: url({{$lesson->image_url}});
                            background-size: cover;
                            background-position: center;
                            padding-bottom: 70%;">
                    </div>
                    <div class="media-wrapper">
                        <audio id="player2" preload="none" controls style="max-width:100%;">
                            <source src="{{$lesson->audio_url . '?client_id='.config("app.sound_cloud_client_id")}}"
                                    type="audio/mp3">
                        </audio>
                    </div>
                    <br>
                    <div>
                        {!! $lesson->detail !!}
                    </div>
                </div>
            @endif
            <div class="col-md-4">
                @foreach($book->terms()->orderBy('order')->get() as $term)
                    <div>
                        <a data-toggle="collapse" href="#collapse{{$term->id}}" class="collapsed" aria-expanded="false">
                            <div style="background:#138edc; color:white; padding:10px">
                                <div style="display: flex; flex-direction: row; justify-content: space-between">
                                    <div>
                                        <p style="font-weight: 600; font-size:18px">{{$term->name}}</p>
                                        <p style="font-weight: 200;">{{$term->description}}</p>
                                    </div>
                                    <div>
                                        <i style="font-size:25px" class="fa fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </a>
                        <br>
                        <div id="collapse{{$term->id}}" aria-expanded="false" class="collapse" style="height: 0px;">
                            @foreach($term->lessons()->orderBy('order')->get() as $lesson)

                                <a href="/sach/{{$book->id}}/{{$lesson->id}}"
                                   style="color:black; display: flex; flex-direction: row; cursor: pointer">
                                    <div style="font-size:20px;color:#138edc;">
                                        <i class="fa fa-check-circle" aria-hidden="true"></i>
                                    </div>
                                    <div style="padding-left: 10px">
                                        <p style="font-weight: 600">{{$lesson->name}}</p>
                                        <p>{{$lesson->description}}</p>
                                    </div>
                                </a>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
            <br><br>
            {{--<div id="vuejs1" class="row">--}}
            {{--@foreach($newestBooks as $book)--}}
            {{--<div class="col-md-3">--}}
            {{--<div class="card card-profile" style="border-radius: 0px;">--}}
            {{--<div style="padding: 3%;">--}}
            {{--<div style="background-image: url('{{$book->avatar_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>--}}
            {{--</div>--}}
            {{--<div>--}}
            {{--<div class="container text-left" style="min-height: 130px;"><br>--}}
            {{--<p style="font-weight: 600;">{{$book->name}}</p> <br>--}}
            {{--<p>{{$book->description}}</p></div>--}}

            {{--</div>--}}
            {{--<div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">--}}
            {{--<div style="text-align: right;">--}}
            {{--<a class="btn btn-google" href="/sach/{{$book->id}}"--}}
            {{--style="padding: 3px; margin: 3px; font-size: 10px;">--}}
            {{--Tải sách <i class="fa fa-download"></i></a>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--@endforeach--}}
            {{--</div>--}}
        </div>
        <br><br><br>
    </div>
@endsection