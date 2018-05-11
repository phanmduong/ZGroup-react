@extends('nhatquangshop::layouts.master')
@section('content')
    <div class="container" style="padding-top:150px">
        <div class="row">
            <div class="col-md-3">
                <a href="/manage/account" class="list-group-item border-0 " style="color: #66615b">Thông tin tài khoản</a>
                <a href="/manage/delivery_orders" class="list-group-item border-0 " style="color: #66615b">Đơn hàng đặt</a>
                <a href="/manage/orders" class="list-group-item border-0 " style="color: #66615b">Đơn hàng sẵn</a>                
                <a href="/manage/transfermoney" class="list-group-item border-0 " style="color: #66615b">Báo chuyển khoản</a>
            </div>
            <div class="col-md-9">
                @yield('data')
            </div>
        </div>
    </div>
@endsection
