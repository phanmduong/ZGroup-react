@extends('filmzgroup::layouts.master')
@section('content')
@include('filmzgroup::common.blogs_listing',['sm_title'=>$time,'title'=>$title])
@endsection