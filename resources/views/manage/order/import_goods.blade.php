@extends('layouts.app')

@section('title','Nhập hàng')

@section('content')
    <h3 class="header">
        Nhập hàng
    </h3>
    <div class="row">
        <form action="{{url('manage/store-imported-goods')}}" method="post">
            {{csrf_field()}}
            <div class="input-field col s12">
                <input id="quantity" type="number" name="quantity" class="validate" required>
                <label for="quantity">Số lượng</label>
            </div>


            <div class="input-field col s12">
                <select id="warehouse_id" name="warehouse_id">
                    @foreach($warehourses as $warehourse)
                        <option value="{{$warehourse->id}}">{{$warehourse->name}}</option>
                    @endforeach
                </select>
                <label>Kho hàng</label>
            </div>

            <div class="input-field col s12">
                <select id="good_id" name="good_id">
                    @foreach($goods as $good)
                        <option value="{{$good->id}}">{{$good->name}}</option>
                    @endforeach
                </select>
                <label>Sản phẩm</label>
            </div>

            <div class="input-field col s12">
                <input id="note" type="text" name="note" class="validate" required>
                <label for="note">Ghi chú</label>
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
