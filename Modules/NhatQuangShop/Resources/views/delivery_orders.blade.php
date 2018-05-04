@extends('nhatquangshop::layouts.manage')
@section('data')
    <h4><span style="font-weight:bold">Các đơn đặt hàng nhanh </span></h4>
    <form action="/manage/delivery_orders" method="post" style="margin-top: 20px">
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
                        <option selected="" value = "ordered "> Đã đăt hàng </option>
                        <option  selected="" value = "arrived"> Đã về Việt Nam </option>
                        <option  selected="" value = "ship"> giao hàng </option>
                        <option  selected="" value = "completed"> Hoàn thành </option>
                        <option  selected="" value = "cancel "> Huỷ đơn </option>
                        <option  selected="" value = "">Trạng thái</option>
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
                <th class="text-center">Mã đơn</th>
                <th class="text-center">Màu</th>
                <th class="text-center">Size</th>
                <th class="text-center">Số lượng</th>
                <th class="text-center">Giá trị</th>
                <th class ="text-center">Trạng thái</th>
                <th class="text-center">Chỉnh sửa</th>
            </tr>
            <tbody>
            @if (count($deliveryOrders) > 0)
                @foreach($deliveryOrders as $order)
                    <tr>
                        <td class="text-center" style = "width:15%">
                            @if($order->code != null )
                                <a href="javascript:void(0)" class="btn btn-round btn-twitter">
                                    {{$order->code}}
                                </a>
                            @endif
                        </td>

                        <td class="text-center">{{json_decode($order->attach_info)->color}}</td>
                        <td class="text-center">{{json_decode($order->attach_info)->size}}</td>
                        <td class="text-center">{{$order->quantity}}</td>
                        <td class="text-center">{{$order->vnd_price}}</td>
                        <td class="text-center">{{$order->status}}</td>
                        <td class="td-actions text-center" style = "width:13s%">
                            <!-- <button type="button" data-toggle="tooltip" data-placement="top" title=""
                                    data-original-title="Xoá" class="btn btn-danger btn-link btn-sm">
                                <i class="fa fa-times"></i>
                            </button> -->
                            @if($order->en_status == "place_order" || $order->end_status == "sent_price")
                            <button   data-toggle="tooltip" data-placement="top" title=""
                                    data-original-title="Điều chỉnh" class ="btn btn-success btn-link btn-sm" onclick="edit({{$order->id}})" >
                                <i class="fa fa-edit"></i>
                            </button>
                            @endif
                        </td>
                    </tr>
                @endforeach
            @else
                <div>Hiện bạn không có đơn hàng nào trong này</div>
            @endif
            </tbody>
        </table>
    </div>
    <div class="modal fade" id = "infoOrder" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h2 class="medium-title">Thông tin đơn hàng</h2>
                </div>

                <div class="modal-body" style="height: 50%">
                    @if(count($deliveryOrders) > 0)
                    @foreach($deliveryOrders as $order)
                                <table cellpadding="10px" id ="order{{$order->id}}" style="display: none" >
                                    <tbody><tr class="border-0 ">
                                        <td class="text-left small-title">Mã đơn hàng :</td>
                                        <th>
                                            @if($order->code != null )
                                                <a href="orders/{{$order->id}}" class="btn btn-round btn-twitter">
                                                    {{$order->code}}
                                                </a>
                                            @endif
                                        </th>
                                    </tr>
                                    <tr>
                                        <td class="text-left"><b>Màu :</b></td>
                                        <th>
                                                <input id="editColor{{$order->id}}" type="text" value="{{json_decode($order->attach_info)->color}}" name="color" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <td class="text-left"><b>Size :</b></td>
                                        <th>
                                                <input type="text" id="editSize{{$order->id}}" value="{{json_decode($order->attach_info)->size}}" name="size" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <td class="text-left"><b>Link sản phẩm :</b></td>
                                        <th>
                                                <input type="text" id="editLink{{$order->id}}" value="{{json_decode($order->attach_info)->link}}" name="link" class="form-control">
                                        </th>
                                    </tr>
                                    <tr>
                                        <td class="text-left"><b>Số lượng :</b></td>
                                        <th>
                                                <input type="text" id = "editQuantity{{$order->id}}" value="{{$order->quantity}}" name="số lượng" class="form-control">
                                        </th>
                                    </tr>

                                    </tbody></table>
                                <br>
                            @endforeach
                        @endif
                </div>
                <div class="modal-footer">
                    <button type="submit" onclick="updateOrder()"
                            class="btn btn-sm btn-success" style="margin:10px 10px 10px 0px!important">Cập nhật đơn hàng <i
                                class="fa fa-angle-right"></i></button>
                </div>
                </div>

            </div>

        </div>

    @include('pagination.custom', ['paginator' => $deliveryOrders])
    <script>
        var old = 0;
        function edit(orderId){
           $("#infoOrder").modal("show");
           $("#order" + old).css("display", "none")
           $("#order" + orderId).css("display", "block");
           old = orderId;
        }
        function updateOrder() {
            $.ajax({
                url : window.url + "/manage/delivery_orders/" + old,
                type : "put",
                data : {
                    link : $("#editLink" + old).val(),
                    quantity : $("#editQuantity" + old).val(),
                    color    : $("#editColor" + old).val(),
                    size     : $("#editSize" + old).val(),
                },
                success : function (){
                   alert("Cập nhật đơn hàng thành công");
                    window.location.reload();
                }
            });
        }
    </script>

@endsection