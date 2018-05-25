@extends('layouts.app')

@section('title','Danh sách đặt hàng')

@section('content')
    <h3 class="header">
        Đơn đặt hàng
    </h3>
    <div class="row">
        <form method="get">
            <div class="input-field col s12">
                <input id="search" type="text" name="search" value="{{isset($search)?$search:''}}" class="validate"
                       required>
                <label for="search">Tên, Số điện thoại hoặc Email</label>
            </div>

            <div class="col s12">
                <input class="btn" type="submit" value="search"/>
            </div>
        </form>
    </div>
    <div class="row">
        @if (session('message'))
            <div class="green-text text-darken-2">{!! session('message') !!}</div>
        @endif

        @if (session('error'))
            <div class="red-text text-darken-2">{!! session('error') !!}</div>
        @endif
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Email</th>
                <th style="width:100px">Địa chỉ giao hàng</th>
                <th style="width:100px">Số điện thoại</th>
                <th>Số lượng</th>
                <th>Thời gian</th>
                <th style="width:150px">Trạng thái</th>
                <th style="width:140px">Số tiền thu</th>
            </tr>
            </thead>

            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td>{{$order->name}}</td>
                    <td style="word-break: break-all">{{$order->email}}</td>
                    <td>{{$order->address}}</td>
                    <td style="word-break: break-all">{{$order->phone}}</td>
                    <td>{{$order->quantity}}</td>
                    <td>{{$order->created_at}}</td>
                    <td>
                        <select onchange="changeStatus({{$order->id}})" id="{{'status'.$order->id}}"
                                value="{{$order->status}}"
                                class="browser-default">
                            <option {{$order->status == "ship_uncall"?"selected": ""}} value="ship_uncall">
                                Chưa gọi ship
                            </option>
                            <option {{$order->status == "ship_called"?"selected": ""}} value="ship_called">
                                Đã gọi ship
                            </option>
                            <option {{$order->status == "shipping"?"selected": ""}} value="shipping">
                                Đang vận chuyển
                            </option>
                            <option {{$order->status == "paid"?"selected": ""}} value="paid">
                                Đã thu tiền
                            </option>
                        </select>
                    </td>
                    <td>
                        @if($order->money == 0)
                            <a href="{{url('manage/close-order/'.$order->id)}}" class="btn">Thu tiền</a>
                        @else
                            {{currency_vnd_format($order->money - $order->ship_money)}}<br/>{{$order->staff_note}}
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                @if($search)
                    <li>
                        <a class="waves-effect"
                           href="{{url('manage/order-list?search='.$search.'&page='.($current_page-1))}}">
                            <i class="material-icons">chevron_left</i></a>
                    </li>
                @else
                    <li>
                        <a class="waves-effect" href="{{url('manage/order-list?page='.($current_page-1))}}">
                            <i class="material-icons">chevron_left</i></a>
                    </li>
                @endif
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$last_page;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    @if($search)
                        <li>
                            <a class="waves-effect"
                               href="{{url('manage/order-list?search='.$search.'&page='.$i)}}">{{$i}}</a>
                        </li>
                    @else
                        <li><a class="waves-effect" href="{{url('manage/order-list?page='.$i)}}">{{$i}}</a></li>
                    @endif
                @endif
            @endfor
            @if($current_page != $last_page)
                @if($search)
                    <li><a class="waves-effect"
                           href="{{url('manage/order-list?search='.$search.'&page='.($current_page+1))}}"><i
                                    class="material-icons">chevron_right</i></a>
                    </li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/order-list?page='.($current_page+1))}}"><i
                                    class="material-icons">chevron_right</i></a>
                    </li>
                @endif
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
    <script>
        function changeStatus(id) {
            var value = $('#status' + id).val();
            $.post("http://api.colorme.vn/change-order-status", {status: value, order_id: id}, function (result) {
                Materialize.toast(result.message, 4000);
            });
        }
    </script>

@endsection
