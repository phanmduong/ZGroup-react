@extends('good::layouts.master')

@section('content')
    <h1>Hello World</h1>

    <p>
        This view is loaded from module: {!! config('good.name') !!}
    </p>
@stop
