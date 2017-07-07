@extends('layouts.app')

@section('title','Danh sách')

@section('content')
    <div class="row">
        <div class="col s12">
            <h3 class="header">Tạo danh sách</h3>
        </div>
    </div>
    <div class="row">
        <form class="col s12" method="post" action="{{url('manage/store_subscribers_list')}}">
            {{csrf_field()}}
            lưu ý: Tất cả dấu phẩy trong tên sẽ đc tự động thay bằng "và"
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" name="name" type="text" class="validate">
                    <label for="name">Tên</label>
                </div>
            </div>
            <div class="row">
                <div class="col s12">
                    <input type="submit" class="btn" />
                </div>
            </div>
        </form>
    </div>

@endsection
