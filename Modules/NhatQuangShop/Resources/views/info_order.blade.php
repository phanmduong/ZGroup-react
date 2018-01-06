@extends('nhatquangshop::layouts.manage')
@section('data')
    <div class="card-block" style="background-color:#FFF;">
        <div class="col-md-12">
            <h4 class="card-category text-danger title">
                <i class="fa fa-free-code-camp" aria-hidden="true"></i>
                &nbsp;&nbsp;Chi tiết đơn hàng
            </h4>
            <table class="table">
                <thead>
                <tr>
                    <th>Mã hàng</th>
                    <th>Số luợng</th>
                    <th>Giá bán</th>
                    <th>Chiết khấu</th>
                    <th>Thành tiền</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{$order->code}}</td>
                    <td>{{$order->created_at}}</td>
                    <td>Text</td>
                    <td>Text</td>
                    <td style="text-align: end">Text</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="2"><b>Tổng</b></th>
                    <th colspan="3" class="text-align-right" style="text-align: end"><b>Text</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Giảm</b></th>
                    <th colspan="3" class="text-align-right" style="text-align: end"><b>Text</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Thuế</b></th>
                    <th colspan="3" class="text-align-right" style="text-align: end"><b>Text</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Phải trả</b></th>
                    <th colspan="3" class="text-align-right" style="text-align: end"><b>Text</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Còn lai</b></th>
                    <th colspan="3" class="text-align-right" style="text-align: end"><b>Text</b></th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <div class="card-block" style="background-color:#FFF;">
        <div class="col-md-12">
            <h4 class="card-category text-danger title">
                <i class="fa fa-free-code-camp" aria-hidden="true"></i>
                &nbsp;&nbsp;Thông tin
            </h4>
            <table class="table">
                <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày tạo</th>
                    <th>Người bán</th>
                    <th>Trạng thái</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{{$order->code}}</td>
                    <td>{{$order->created_at}}</td>
                    <td>Text</td>
                    <td>Text</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="2"><b>Phương thức thanh toán</b></th>
                    <th colspan="2  " class="text-align-right" style="text-align: end"><b>{{$order->payment}}</b></th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>

    <div class="card-block" style="background-color:#FFF;">
        <div class="col-md-12">
            <h4 class="card-category text-danger title">
                <i class="fa fa-free-code-camp" aria-hidden="true"></i>
                &nbsp;&nbsp;Thông tin khách hàng
            </h4>
            <table class="table">
                <thead>
                </tbody>
                <tfoot>
                <tr>
                    <th colspan="2"><b>Tên khách hàng</b></th>
                    <th colspan="2  " class="text-align-right" style="text-align: end"><b>{{$order->name}}</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Email</b></th>
                    <th colspan="2  " class="text-align-right" style="text-align: end"><b>{{$order->email}}</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Số điện thoại</b></th>
                    <th colspan="2  " class="text-align-right" style="text-align: end"><b>{{$order->phone}}</b></th>
                </tr>
                <tr>
                    <th colspan="2"><b>Địa chỉ</b></th>
                    <th colspan="2  " class="text-align-right" style="text-align: end"><b>{{$order->address}}</b></th>
                </tr>
                </tfoot>
            </table>
        </div>
    </div>



@endsection