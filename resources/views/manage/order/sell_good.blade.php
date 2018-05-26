@extends('layouts.app')

@section('title','Thu tiền đơn hàng')

@section('content')
    <h3 class="header">
        Thu tiền đơn hàng
    </h3>

    <div class="row">
        <table>
            <tr>
                <td>Tên</td>
                <td>{{$order->name}}</td>
            </tr>
            <tr>
                <td>Email</td>
                <td>{{$order->email}}</td>
            </tr>
            <tr>
                <td>Số điện thoại</td>
                <td>{{$order->phone}}</td>
            </tr>
            <tr>
                <td>Số lượng</td>
                <td>{{$order->quantity}}</td>
            </tr>
            <tr>
                <td>Tên sản phẩm</td>
                <td>{{$order->good->name}}</td>
            </tr>
            <tr>
                <td>Ghi chú</td>
                <td>{{$order->note}}</td>
            </tr>
        </table>
    </div>

    <div class="row">
        <form action="{{url('manage/store-order-money')}}" method="post">
            {{csrf_field()}}
            <input type="hidden" name="order_id" value="{{$order->id}}"/>

            <div class="input-field col s12">
                <input id="money" type="number" name="money" class="validate" required>
                <label for="location">Số tiền</label>
            </div>

            <div class="input-field col s12">
                <input id="ship_money" type="number" name="ship_money" class="validate" required>
                <label for="ship_money">Phí ship</label>
            </div>

            <div class="input-field col s12">
                <select name="warehouse_id">
                    @foreach($warehouses as $warehouse)
                        <option value="{{$warehouse->id}}">{{$warehouse->name}}</option>
                    @endforeach
                </select>
                <label>Kho hàng</label>
            </div>
            <div class="input-field col s12">
                <input id="staff_note" type="text" name="staff_note" class="validate" required>
                <label for="location">Ghi chú</label>
            </div>
            <div class="col s12">
                <input class="btn" type="submit"/>
            </div>
        </form>
    </div>
    <script>
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection
