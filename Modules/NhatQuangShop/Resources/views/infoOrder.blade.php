@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="row">
        <div class="col-md-12">
            <h6 class="card-category text-danger">
                <i class="fa fa-free-code-camp" aria-hidden="true"></i> Thông tin chi tiết  sản phẩm
            </h6>
            <label>Mã đơn hàng</label>
            <h6>{{$order->code}}</h6>
            <label>Ngày tạo</label>
            <h6>{{$order->created_at}}</h6>


            @if(count($paidOrderMoneys)>0)
            <h6 class="card-category text-danger" style ="margin-top: 25px">
                <i class="fa fa-free-code-camp" aria-hidden="true"></i> Thông tin lịch sử sản phẩm
            </h6>
            <div class="table" style ="margin-top: 20px">
                <tbody>
                    <table class = "table">
                        <tr>
                            <th>STT</th>
                            <th>Tên thu ngân</th>
                            <th>Ngày nhận tiền</th>
                            <th>Phương thức trả tiền</th>
                            <th>Money</th>
                        </tr>
                        @for ($i = 0; $i < count($paidOrderMoneys); $i++)
                            <tr>
                                <td> lần {{$i+1}}</td>
                                <td>{{$paidOrderMoneys[$i]->staff->name}}</td>
                             <td>@if($paidOrderMoneys[$i]->created_at !=null){{$paidOrderMoneys[$i]->created_at}}@else Chưa có @endif</td>
                                <td>{{$paidOrderMoneys[$i]->payment}}</td>
                                <td>{{$paidOrderMoneys[$i]->money}}</td>
                            </tr>
                        @endfor
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{$totalPaidMoney}}đ</td>
                        </tr>
                    </table>

                </tbody>
                @endif

            </div>
        </div>

        {{--<div class="col-md-4">--}}
            {{--<div class="card card-blog">--}}
                {{--<div class="card-image">--}}
                    {{--<a href="#pablo">--}}
                    {{--</a>--}}
                {{--</div>--}}

                {{--<div class="card-block">--}}
                    {{--<h6 class="card-category text-danger">--}}
                        {{--<i class="fa fa-free-code-camp" aria-hidden="true"></i> Thông tin sản phẩm--}}
                    {{--</h6>--}}

                    {{--<tbody>--}}
                    {{--@if(count($paidOrderMoneys)>0)--}}
                        {{--<table class = "table">--}}
                            {{--<tr>--}}
                                {{--<td>STT</td>--}}
                                {{--<td>Money</td>--}}
                                {{--<td>Staff</td>--}}
                            {{--</tr>--}}
                        {{--</table>--}}
                        {{--<table class = "table">--}}
                            {{--@for ($i = 0; $i < count($paidOrderMoneys); $i++)--}}
                                {{--<tr>--}}
                                    {{--<td> lần {{$i+1}}</td>--}}
                                    {{--<td>--}}
                                      {{--{{$paidOrderMoneys[$i]->money}}--}}
                                    {{--</td>--}}
                                    {{--<td>--}}
                                        {{--{{$paidOrderMoneys[$i]->staff_id}}--}}
                                    {{--</td>--}}
                                {{--</tr>--}}
                            {{--@endfor--}}
                            {{--<tr>--}}
                                {{--<td>Total</td>--}}
                                {{--<td>{{$totalPaidMoney}}đ</td>--}}
                                {{--<td></td>--}}
                            {{--</tr>--}}
                        {{--</table>--}}
                       {{--@endif--}}
                    {{--</tbody>--}}
                    {{--<hr>--}}
                    {{--<div class="card-footer">--}}
                        {{--<div class="author">--}}
                            {{--<a href="#pablo">--}}
                                {{--<span>Mike John</span>--}}
                            {{--</a>--}}
                        {{--</div>--}}
                        {{--<div class="stats">--}}
                            {{--<i class="fa fa-clock-o" aria-hidden="true"></i> 5 min read--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--</div>--}}
            {{--</div>--}}
        {{--</div>--}}


@endsection