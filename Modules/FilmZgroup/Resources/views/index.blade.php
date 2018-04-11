@extends('filmzgroup::layouts.master')

@section('content')
    <h1>Komatsu</h1>
    @foreach($films as $film)
        {{$film->name}}
        <div>

        </div>

    @endforeach

@endsection
