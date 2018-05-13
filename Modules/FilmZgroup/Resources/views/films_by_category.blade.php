@extends('filmzgroup::layouts.master')
@section('content')
    @include('filmzgroup::common.films_show', ['Goods'=>$films, 'title'=>$title])
@endsection
