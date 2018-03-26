@extends('upcoworkingspace::layouts.master')

@section('content')
    <div style="background-image: url({{$event->cover_url}}); height: 350px; margin-top:100px; margin-bottom:30px">
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
        <a href="{{route('event-form',['slug',$event->slug])}}">
            <div class="btn" style="background-color: green">
                Sign up
            </div>
        </a>
    </div>



@endsection