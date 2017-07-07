@extends('layouts.app')

@section('title','Quản lý SMS')

@section('content')
    <div id="app"></div>
    <script>
        window.csrfToken = "{{csrf_token()}}";
        @if($user_id)
            window.user_id = {{$user_id}};
        @endif
    </script>
    <script src="{{url('/sms/dist/app.js?1')}}"></script>
@endsection
