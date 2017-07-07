@extends('layouts.app')

@section('title','Tạo mới danh mục')

@section('content')
    <div class="row">
        <form class="col s12" method="post" action="{{url('manage/storecategoryproduct')}}">
            {{csrf_field()}}
            @if($category!=null)
                <input type="hidden" name="id" value="{{$category->id}}"/>
            @endif
            <div class="row">
                <div class="input-field col s12">
                    <input name="name" value="{{($category!=null)?$category->name:''}}" id="name" type="text"
                           class="validate">
                    <label for="name">Tên Danh Mục</label>
                </div>
                <div class="col s12">
                    <input type="submit" value="submit" class="btn"/>
                </div>
            </div>

        </form>
    </div>
@endsection