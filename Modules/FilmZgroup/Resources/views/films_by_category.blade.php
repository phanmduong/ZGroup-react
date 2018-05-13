@extends('filmzgroup::layouts.master')
@section('content')
    @include('filmzgroup::common.films_listing', ['Goods'=>$films, 'title'=>$title])
@endsection
