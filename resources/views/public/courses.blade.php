@extends('layouts.public')

@section('title','Danh sách khoá học')

@section('header','Khoá học')

@section('content')
    <div class="container">
        {{--<div class="row" style="margin-bottom: 0px;margin-top: 5px">--}}
            {{--<div class="col s12">--}}
                {{--<img class="z-depth-1" src="{{($gen->cover_url != null)?$gen->cover_url:"http://placehold.it/900x350"}}"--}}
                     {{--width="100%">--}}
            {{--</div>--}}
        {{--</div>--}}
        <div class="row">
            @foreach($courses as $course)
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" src="{{$course->image_url}}">
                        </div>
                        <div class="card-content">
                                    <span class="card-title activator grey-text text-darken-4">{{$course->name}}<i
                                                class="material-icons right">more_vert</i></span>

                            <p><a href="{{url("/classes/".$course->id."/".$user_id."/".$campaign_id)}}">Chi tiết</a></p>
                        </div>
                        <div class="card-reveal">
                                    <span class="card-title grey-text text-darken-4">{{$course->name}}<i
                                                class="material-icons right">close</i></span>
                            <p><i class="tiny material-icons">description</i> {{$course->description}}</p>
                            <p><i class="tiny material-icons">query_builder</i> {{$course->duration}} Buổi</p>
                            <p><i class="tiny material-icons">receipt</i> {{number_format($course->price)}} VND</p>
                            <p><a href="{{url("/classes/".$course->id."/".$user_id."/".$campaign_id)}}">Chi tiết</a></p>
                        </div>
                    </div>
                </div>


            @endforeach
        </div>

    </div>
@endsection