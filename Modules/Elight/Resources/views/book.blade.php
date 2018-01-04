@extends('elight::layouts.master')

@section('content')
    <div class="container">
        <br><br><br><br><br><br>
        <br><br><br>

        <div class="row">
<<<<<<< HEAD
            <div class="col-md-4">
                <img src="{{$book->avatar_url}}" style="width:100%">
            </div>
            <div class="col-md-8">
                <h2 class="title">{{$book->name}}</h2>
                <h5 class="description">{{$book->description}}</h5>
                <div class="info-horizontal">
                    <br>
                    <div class="description">
                        <p><b><b>Author:</b></b> Alexandra Dicapria</p>
                        <p><b><b>Year:</b></b> 2048</p>
                        <p><b><b>Publisher:</b></b> Keetool</p>
                    </div>
                </div>

                <br>
                <a href="{{$book->download}}" class="btn btn-round btn-google">
                    <i class="fa fa-download" aria-hidden="true"></i> Download · 753
                </a>
                <a href="" class="btn btn-round btn-facebook">
                    <i class="fa fa-facebook" aria-hidden="true"></i> Share · 753
                </a>
            </div>
        </div>
        <br><br>
        <div class="col-md-12">
            <h3>
                <b>Sách liên quan </b>
            </h3>
            <a href="/all-books" style="color:#c50000!important"><b>Xem thêm</b></a>


        </div>

        <div id="vuejs1" class="row">
            @foreach($newestBooks as $book)
                <div class="col-md-3">
                    <div class="card card-profile" style="border-radius: 0px;">
                        <div style="padding: 3%;">
                            <div style="background-image: url('{{$book->avatar_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>
                        </div>
                        <div>
                            <div class="container text-left" style="min-height: 130px;"><br>
                                <p style="font-weight: 600;">{{$book->name}}</p> <br>
                                <p>{{$book->description}}</p></div>

                        </div>
                        <div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">
                            <div style="text-align: right;">
                                <a class="btn btn-google" href="/book/{{$book->id}}"
                                   style="padding: 3px; margin: 3px; font-size: 10px;">
                                    Tải sách <i class="fa fa-download"></i></a>
=======
            @if ($lesson_selected)
                <div class="col-md-8">
                    <h1 style="font-size: 30px;font-weight:600; color:#424242;">{{$lesson_selected->name}}</h1>
                    <p>{{$lesson_selected->description}}</p>
                    <br>
                </div>
                <div class="col-md-4">
                    <input placeholder="Tìm kiếm" class="typeahead" data-provide="typeahead" id="search_lesson"
                           style="width:100%; padding:20px; margin:15px 0 15px 0; border:none; font-size:15px"
                           type="text">
                </div>
                <div class="col-md-8">
                    <div id="lesson_image" style="width: 100%;
                            background: url({{$lesson_selected->image_url}});
                            background-size: cover;
                            background-position: center;
                            padding-bottom: 70%;">
                    </div>
                    <div class="media-wrapper">
                        <audio id="player2" preload="none" controls style="max-width:100%;">
                            <source src="{{$lesson_selected->audio_url . '?client_id='.config("app.sound_cloud_client_id")}}"
                                    type="audio/mp3">
                        </audio>
                    </div>
                    <br>
                    <div>
                        {!! $lesson_selected->detail !!}
                    </div>
                </div>
            @endif
            <div class="col-md-4">
                @foreach($book->terms()->orderBy('order')->get() as $term)
                    <div>
                        <a data-toggle="collapse" href="#collapse{{$term->id}}"
                           class="{{$term->id == $lesson_selected->term->id ? '' : 'collapsed'}} "
                           aria-expanded="{{$term->id == $lesson_selected->term->id ? 'true' : 'false'}}">
                            <div style="background:#138edc; color:white; padding:10px">
                                <div style="display: flex; flex-direction: row; justify-content: space-between">
                                    <div>
                                        <p style="font-weight: 600; font-size:18px">{{$term->name}}</p>
                                        <p style="font-weight: 200;">{{$term->short_description}}</p>
                                    </div>
                                    <div>
                                        <i style="font-size:25px" class="fa fa-angle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
>>>>>>> 222ae9064cbc988899500c2bfb235b2a2a41580b
                            </div>
                        </a>
                        <br>
                        <div id="collapse{{$term->id}}"
                             aria-expanded="{{$term->id == $lesson_selected->term->id ? 'true' : 'false'}}"
                             class="collapse {{$term->id == $lesson_selected->term->id ? 'show' : ''}}">
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
<<<<<<< HEAD
                </div>
            @endforeach
=======
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
>>>>>>> 222ae9064cbc988899500c2bfb235b2a2a41580b
        </div>
    </div>


    <br><br><br>
@endsection