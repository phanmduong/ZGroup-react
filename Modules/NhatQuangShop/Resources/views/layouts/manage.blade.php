@extends('nhatquangshop::layouts.master')
@section('content')
    <div class="container" style="padding-top:150px">
        <div class="row">
            <div class="col-md-4">
                <a href="/manage/orders" class="list-group-item border-0" style="color: #000000">Đơn hàng có sẵn</a>
            </div>
            <div class="col-md-8">
                @yield('data')
            </div>
        </div>
    </div>

@endsection
