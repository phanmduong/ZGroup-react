@extends('filmzgroup::layouts.master')

@section('content')
    <h1>Komatsu</h1>
    @foreach($sessions as $session)
        {{$session->name}}
    @endforeach

@endsection
