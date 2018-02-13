@extends('nhatquangshop::layouts.manage')
@section('data')
    <h4><span style="font-weight:bold">Các đơn đặt hàng trước</span></h4>
    <form action="/manage/orders" method="post" style="margin-top: 20px">
    <div class = "row">
        <div class = "col-md-4">
        <div class="form-group">
            <input  type="text"
                   class="form-control border-input"
                   placeholder="Mã đơn hàng"
                   name="code">
        </div>
        </div>
        <div class = "col-md-4">
            <div class="form-group">
                <select class="form-control"
                         name="status"
                        style="display: block !important;">
                   <option  selected="" value = "place_order"> Đơn mới </option>
                    <option  selected="" value = "confirm_order"> Xác nhận   </option>
                    <option selected="" value = "ordered "> Đã đăt hàng </option>
                    <option  selected="" value = "arrived"> Đã về Việt Nam </option>
                    <option  selected="" value = "ship"> giao hàng </option>
                    <option  selected="" value = "completed"> Hoàn thành </option>
                    <option  selected="" value = "cancel "> Huỷ đơn </option>
                    <option  selected="">Trạng thái</option>
                </select>
        </div>
    </div>
    </div>
    <div class = "row">
        <div class = "col-md-4">
            <div class="form-group">
                <input  type="date"
                        class="form-control border-input"
                        name="start_day">
            </div>
        </div>
        <div class = "col-md-4">
            <div class="form-group">
                <input  type="date"
                        class="form-control border-input"
                        name="end_day">
            </div>
        </div>
        <div class = "col-md-4">
            <button type="submit" style="margin-left: 20px" class="btn">Lọc đơn hàng </button>
        </div>

    </div>
    </form>
    <div class="table-responsive" style="margin-top: 20px">
        <table class="table">
            <tr>
                <th class="text-center">#</th>
                <th>OrderCode</th>
                <th class="text-right">Status Order</th>
                <th class="text-right">Actions</th>
            </tr>
            <tbody>
            @if (count($orders) > 0)
                @foreach($orders as$order)
                    <tr>
                        <td class="text-center">{{$order->id}}</td>
                        <td>
                            @if($order->code != null )
                                <a href="orders/{{$order->id}}" class="btn btn-round btn-twitter">
                                    {{$order->code}}
                                </a>
                            @else  <a href="orders/{{$order->id}}" class="btn btn-round btn-twitter">
                                Chưa có code
                            </a>
                            @endif
                        </td>
                        <td class="text-right">{{$order->status}}</td>
                        <td class="td-actions text-right">

                            <button type="button" data-toggle="tooltip" data-placement="top" title=""
                                    data-original-title="View Profile" class="btn btn-info btn-link btn-sm">
                                <i class="fa fa-user"></i>
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="top" title=""
                                    data-original-title="Edit Profile" class="btn btn-success btn-link btn-sm">
                                <i class="fa fa-edit"></i>
                            </button>
                            <button type="button" data-toggle="tooltip" data-placement="top" title=""
                                    data-original-title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>
                @endforeach
                @else
                <div>Hiện bạn không có đơn hàng nào trong này</div>
            @endif
            </tbody>
        </table>
    </div>
    @include('pagination.custom', ['paginator' => $orders])
@endsection

