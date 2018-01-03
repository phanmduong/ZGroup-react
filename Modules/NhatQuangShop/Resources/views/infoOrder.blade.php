@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="row">
        <div class="col-md-8">
            <h4 class="title"><small>ORDERS</small></h4>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th class="text-center">#</th>
                        <th>Order Code</th>
                        <th class="text-right">Status Order</th>
                        <th class="text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td class="text-center">{{$order->id}}</td>
                                <td>
                                    @if($order->code!==null)
                                        {{$order->code}}
                                        @else chưa có
                                        @endif
                                </td>
                                <td class="text-right">{{$order->status}}</td>
                                <td class="td-actions text-right">
                            </tr>
                    </tbody>
                </table>
            </div>

        </div>

        <div class="col-md-4">
            <div class="card card-blog">
                <div class="card-image">
                    <a href="#pablo">
                    </a>
                </div>

                <div class="card-block">
                    <h6 class="card-category text-danger">
                        <i class="fa fa-free-code-camp" aria-hidden="true"></i> Thông tin lịch  sản phẩm
                    </h6>

                    <tbody>
                    @if(count($paidOrderMoneys)>0)
                        <table class = "table">
                            <tr>
                                <td>STT</td>
                                <td>Money</td>
                                <td>Staff</td>
                            </tr>
                        </table>
                        <table class = "table">
                            @for ($i = 0; $i < count($paidOrderMoneys); $i++)
                                <tr>
                                    <td> lần {{$i+1}}</td>
                                    <td>
                                      {{$paidOrderMoneys[$i]->money}}
                                    </td>
                                    <td>
                                        {{$paidOrderMoneys[$i]->staff_id}}
                                    </td>
                                </tr>
                            @endfor
                            <tr>
                                <td>Total</td>
                                <td>{{$totalPaidMoney}} đ</td>
                            </tr>
                        </table>
                       @endif
                    </tbody>
                    <hr>
                    <div class="card-footer">
                        <div class="author">
                            <a href="#pablo">
                                <span>Mike John</span>
                            </a>
                        </div>
                        <div class="stats">
                            <i class="fa fa-clock-o" aria-hidden="true"></i> 5 min read
                        </div>
                    </div>
                </div>
            </div>
        </div>


@endsection