@extends('layouts.app')

@section('title','Danh mục')

@section('content')
    <div>
        @foreach($info as $infor)
            <div>
                {{$infor->email}}
            </div>
            <div>
                {{$infor->name}}
            </div>
        @endforeach
    </div>
@endsection