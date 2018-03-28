@extends('upcoworkingspace::layouts.master')

@section('content')
    <div style="background-image: url({{$event->cover_url}}); height: 350px; margin-top:70px; margin-bottom:30px;
            background-position: center center;
            background-repeat: no-repeat;">
    </div>
    <div class="container">
        <p style="font-size:32px; font-weight:600">{{$event->name}}</p>
        <div>
            Content here
            <p class="card-description">
                {{ Carbon\Carbon::parse($event->start_date)->format('d/m/Y') }}
                @if($event->end_date != $event->start_date)
                <span> -  {{ Carbon\Carbon::parse($event->end_date)->format('d/m/Y') }}</span>
                @endif
            </p>
            <p class="card-description">
                {{ Carbon\Carbon::parse($event->start_time)->format('H:i') }}
                @if($event->end_date != $event->start_date)
                    <span> -  {{ Carbon\Carbon::parse($event->end_time)->format('H:i') }}</span>
                @endif
            </p>
        </div>
        <div class="container text-center" style="padding:10px">
            <a href="{{'/event-form/' . $event->slug . '/sign-up-form'}}">
                <div class="btn" style="background-color:#96d21f;border-color:#96d21f; color:white!important; font-size: 16px; border-radius:30px">
                    Đăng kí
                </div>
            </a>
        </div>

    </div>



@endsection