@extends('filmzgroup::layouts.master')

@section('content')
    <h1>Hello World</h1>
        {{$film->running_time}}
    <p>
        This view is loaded from module: {!! config('filmzgroup.name') !!}
    </p>
    {{--@foreach($films as $film)--}}
        {{--{{$film->name}}--}}
        {{--<div>--}}

        {{--</div>--}}

    {{--@endforeach--}}
    <?php
        echo date('H:i');
    ?>
@endsection
