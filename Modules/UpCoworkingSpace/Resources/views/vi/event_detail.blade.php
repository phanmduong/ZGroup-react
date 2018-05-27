@extends('upcoworkingspace::layouts.master')

@section('vi-content')
    <div style="background-image: url({{$event->cover_url}});
            width: 100%;
            height: 350px; margin-top:70px; margin-bottom:30px;
            background-position: center center;
            background-repeat: repeat-x;
            background-size: contain";>
    </div>
    <div class="container">
        <div class="row">
            <p style="font-size:32px; font-weight:600">{{$event->name}}</p>
        </div>
        <div class="row">
            <br>
            <div>
                <p class="card-description" style="font-weight: bold">
                    <i class="fa fa-calendar text-main-color" aria-hidden="true"></i>
                    {{ Carbon\Carbon::parse($event->start_date)->format('d/m/Y') }}
                    @if($event->end_date != $event->start_date)
                        <span> -  {{ Carbon\Carbon::parse($event->end_date)->format('d/m/Y') }}</span>
                    @endif
                </p>
                <p class="card-description" style="font-weight: bold">
                    <i class="fa fa-calendar text-main-color" aria-hidden="true"></i>
                    {{ Carbon\Carbon::parse($event->start_time)->format('H:i') }}
                    @if($event->end_time != $event->start_time)
                        <span> -  {{ Carbon\Carbon::parse($event->end_time)->format('H:i') }}</span>
                    @endif
                    <br><br>
                </p>
            </div>
            
            <div class="article-content" style="color:black">
                <div class="col-md-8">
                    {!!$event->detail!!}
                </div>
            </div>

            <div class="container text-center" style="padding:10px">
                <a href="{{'/event-form/' . $event->slug . '/sign-up-form'}}">
                    <div class="btn" style="background-color:#96d21f;border-color:#96d21f; color:white!important; font-size: 16px; border-radius:30px">
                        Đăng kí
                    </div>
                </a>
            </div>
        </div>
    </div>
@endsection