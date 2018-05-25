@extends('layouts.app')

@section('title','Tất cả lịch sử gọi')

@section('content')
    <div id="app"></div>
    <script>
        window.csrfToken = "{{csrf_token()}}";
        @if($user_id)
            window.user_id = {{$user_id}};
        @endif
    </script>
    <script src="{{url('/telehistory/dist/app.js?5')}}"></script>
@endsection
