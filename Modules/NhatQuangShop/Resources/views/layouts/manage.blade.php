@extends('nhatquangshop::layouts.master')
@section('content')
    <div class="container" style="padding-top:150px">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="list-group">
                            <a href="/manage/orders" class="list-group-item">Đơn hàng có sẵn</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                @yield('data')
            </div>
        </div>
    </div>

@endsection
