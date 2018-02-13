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
                    <option  selected="" value = "sent_price"> Đã báo giá </option>
                    <option  selected="" value = "confirm_order"> Xác nhận   </option>
                    <option selected="" value = "ordered"> Đã đăt hàng </option>
                    <option  selected="" value = "arrived"> Đã về Việt Nam </option>
                    <option  selected="" value = "ship"> giao hàng </option>
                    <option  selected="" value = "completed"> Hoàn thành </option>
                    <option  selected="" value = "cancel"> Huỷ đơn </option>

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
                <th>Mã đơn hàng</th>
                <th class="text-left">Số lượng</th>
                <th class="text-left">Ngày tạo</th>
                <th class="text-left">Tổng tiền(đ)</th>
                <th class="text-center">Tình trạng</th>
            </tr>
            <tbody>
            @if (count($orders) > 0)
                @for($i = 0; $i<count($orders); $i++)
                    <tr>
                        <td class="text-center">{{$i + 1}}</td>
                        <td>
                            @if($orders[$i]->code != null )
                                <a href="orders/{{$orders[$i]->id}}" class="btn btn-round btn-twitter">
                                    {{$orders[$i]->code}}
                                </a>
                            @else  <a href="orders/{{$orders[$i]->id}}" class="btn btn-round btn-twitter">
                                Chưa có code
                            </a>
                            @endif
                        </td>
                        <td class="text-center">{{$orders[$i]->quantity}}</td>
                        <td class="text-left">{{format_date($orders[$i]->created_at)}}</td>
                        @if($orders[$i]->price!=null)
                            <td class="text-left">{{formatPrice($orders[$i]->price)}} đ</td>
                        @else
                            <td class="text-left">Chưa tính</td>
                        @endif
                        @if($orders[$i]->status == 'place_order')
                            <td class="text-center">Đơn mới</td>
                            @elseif($orders[$i]->status == 'sent_price')
                            <td class="text-center">Đã báo giá</td>
                        @elseif($orders[$i]->status == 'confirm_order')
                            <td class="text-center">Xác nhận</td>
                        @elseif($orders[$i]->status == 'orders')
                            <td class="text-center">Đặt hàng</td>
                        @elseif($orders[$i]->status == 'arrived')
                            <td class="text-center">Đã về VN</td>
                        @elseif($orders[$i]->status == 'ship')
                            <td class="text-center">Giao hàng</td>
                        @elseif($orders[$i]->status == 'completed')
                            <td class="text-center">Hoàn thành</td>
                            @else
                            <td class ="text-center">Huỷ</td>
                            @endif
                    </tr>
                @endfor
                @else
                <div>Hiện bạn không có đơn hàng nào trong này</div>
            @endif
            </tbody>
        </table>
    </div>
    @include('pagination.custom', ['paginator' => $orders])
@endsection

