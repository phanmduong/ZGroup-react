@extends('colorme_new.layouts.profile')

@section('styles')
    <link rel="stylesheet" href="{{url('colorme-react/styles.css')}}?853288888">
@endsection

@section('content_profile')

    <div id="app"></div>
@endsection

@push('scripts')
    <script src="{{url('colorme-react/bundle.js')}}?85438888"></script>
@endpush