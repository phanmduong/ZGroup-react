@extends('layouts.app')

@section('title','Danh sách đặt hàng')

@section('content')
    <h3 class="header">
        Đã nhận hàng
    </h3>
    <div class="row">
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th style="width:100px">Địa chỉ giao hàng</th>
                <th style="width:100px">Số điện thoại</th>
                <th>Số lượng</th>
                <th>Người thu</th>
                <th>Số tiền thu</th>
                <th>Số tiền ship</th>
            </tr>
            </thead>

            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td>{{$order->name}}</td>
                    <td>{{$order->address}}</td>
                    <td style="word-break: break-all">{{$order->phone}}</td>
                    <td>{{$order->quantity}}</td>
                    <td>{{$order->staff->name}}</td>
                    <td>{{currency_vnd_format($order->money)}}</td>
                    <td>{{currency_vnd_format($order->ship_money)}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li>
                    <a class="waves-effect" href="{{url('manage/delivered-orders?page='.($current_page-1))}}">
                        <i class="material-icons">chevron_left</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$last_page;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/delivered-orders?page='.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $last_page)
                <li><a class="waves-effect" href="{{url('manage/delivered-orders?page='.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>

@endsection
