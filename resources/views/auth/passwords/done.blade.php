@extends('layouts.reset_password')

<!-- Main Content -->
@section('content')
    <div class="container">
        <div class="row">
            <div class="alert alert-success">
                Bạn đã đổi mật khẩu thành công.
                <a href="{{url('/')}}">Bấm vào đây quay về trang chủ</a>
            </div>
        </div>
@endsection
