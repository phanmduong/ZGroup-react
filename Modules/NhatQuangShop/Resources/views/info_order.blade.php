@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="row">
        <div class="col-md-12">
            <h6 class="card-category text-danger">
                <i class="fa fa-free-code-camp" aria-hidden="true"></i> Thông tin chi tiết  sản phẩm
            </h6>
            <label>Mã đơn hàng</label>
            <h6> @if($order->code!=null){{$order->code}} @else Chưa tạo @endif</h6>
            <label>Ngày tạo</label>
            <h6>{{format_date($order->created_at)}}</h6>
            <label>Phương thức thanh toán</label>
            <h6>{{$order->payment}}</h6>
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
                            <th>Số tiền</th>
                        </tr>
                        @for ($i = 0; $i < count($paidOrderMoneys); $i++)
                            <tr>
                                <td> lần {{$i+1}}</td>
                                <td>{{$paidOrderMoneys[$i]->staff->name}}</td>
                             <td>@if($paidOrderMoneys[$i]->created_at !=null){{$paidOrderMoneys[$i]->created_at}}@else Chưa có @endif</td>
                                <td>{{$paidOrderMoneys[$i]->payment}}</td>
                                <td>{{formatPrice($paidOrderMoneys[$i]->money)}} </td>đ
                            </tr>
                        @endfor
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{formatPrice($totalPaidMoney)}}đ</td>
                        </tr>
                    </table>

                </tbody>
                @else
                    <h6 class="card-category text-danger" style ="margin-top: 25px">
                        <i class="fa fa-free-code-camp" aria-hidden="true"></i> Thông tin lịch sử sản phẩm
                    </h6>
                    <div>Bạn chưa thanh toán lần nào</div>
                @endif

            </div>
        </div>



@endsection