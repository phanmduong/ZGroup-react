@extends('layouts.app')

@section('title','Chi tiết kho hàng')

@section('content')
    <h3 class="header">
        {{$warehouse->name}}
    </h3>
    <p>Địa chỉ: {{$warehouse->location}}</p>

    <div class="row">
        @if(session('message'))
            <div class="card-panel blue-text text-darken-2">{{session('message')}}</div>
        @endif
        <table class="striped">
            <thead>
            <tr>
                <td>Sản phẩm</td>
                <td>Số lượng trong kho</td>
                <td>Chuyển kho</td>
            </tr>
            </thead>
            <tbody>
            @foreach($warehouse->goodWarehouses as $goodWarehouse)
                <tr>
                    <td>{{$goodWarehouse->good->name}}</td>
                    <td>{{$goodWarehouse->quantity}}</td>
                    <td>
                        <form action="{{url('manage/move-warehouse')}}" method="post">
                            {{csrf_field()}}
                            <input type="hidden" value="{{$goodWarehouse->id}}" name="good_warehouse_id"/>
                            <div class="input-field col s12">
                                <select name="warehouse_id">
                                    @foreach($warehouses as $warehouse)
                                        @if($goodWarehouse->warehouse->id != $warehouse->id)
                                            <option value="{{$warehouse->id}}">{{$warehouse->name}}</option>
                                        @endif
                                    @endforeach
                                </select>
                                <label for="quantity">Kho hàng</label>
                            </div>
                            <div class="input-field col s12">
                                <input type="number" name="quantity" placeholder="Số lượng hàng"
                                       max="{{$goodWarehouse->quantity}}" min="0"/>
                                <label for="quantity">Số lượng hàng</label>
                            </div>
                            <div class="input-field col s12">
                                <input type="submit" value="Chuyển" class="btn"/>
                            </div>
                        </form>
                    </td>
                </tr>
            </tbody>
            @endforeach
        </table>
    </div>

    <script>
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection
