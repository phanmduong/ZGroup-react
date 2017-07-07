@extends('layouts.app')

@section('title','Danh sách kho hàng')

@section('content')
    <h3 class="header">
        Danh sách kho hàng
    </h3>
    <div class="row">
        <form action="{{url('manage/store-warehouse')}}" method="post">
            {{csrf_field()}}
            <div class="input-field col s12">
                <input id="name" type="text" name="name" class="validate" required>
                <label for="name">Tên</label>
            </div>
            <div class="input-field col s12">
                <input id="location" type="text" name="location" class="validate" required>
                <label for="location">Địa chỉ</label>
            </div>
            <div class="col s12">
                <input class="btn" type="submit"/>
            </div>
        </form>
    </div>
@endsection
