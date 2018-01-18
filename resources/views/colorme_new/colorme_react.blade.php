@extends('colorme_new.layouts.master')

@section('styles')
    <link rel="stylesheet" href="{{url('colorme-react/styles.css')}}?882188888">
@endsection

@section('content')
    <div id="app"></div>
@endsection

@push('scripts')
    <script src="{{url('colorme-react/bundle.js')}}?883218888"></script>
@endpush