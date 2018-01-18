@extends('colorme_new.layouts.master')

@section('styles')
    <link rel="stylesheet" href="{{url('colorme-react/styles.css')}}?8128888">
@endsection

@section('content')
    <div id="app"></div>
@endsection

@push('scripts')
    <script src="{{url('colorme-react/bundle.js')}}?8218888"></script>
@endpush