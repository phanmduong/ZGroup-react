@extends('filmzgroup::layouts.master')

@section('content')
    <h1>Komatsu</h1>
    @foreach($sessions as $session)
        <div>
            {{$session->film->running_time}}
        </div>
    @endforeach

@endsection
