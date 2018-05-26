@extends('layouts.app')

@section('title','Danh mục')

@section('content')
    <style>
        .base_name {
            color: black;
        }

        .base_name:hover {
            color: #c50000;
        }
    </style>
    <div class="row">
        <div class="col s12">
            <a href="{{url('manage/newcategory')}}" class="waves-effect waves-light btn red darken-4">Tạo mới</a>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="collection">
                @foreach($categories as $category)
                    <li class="collection-item">
                        <div>
                            <a href="{{url('manage/category/'.$category->id)}}">{{$category->name}}</a>
                            <a href="{{url('manage/deletecategory/'.$category->id)}}"
                               onclick="return confirm('Bạn có chắc muốn xoá?')" class="secondary-content"><i
                                        class="material-icons red-text text-darken-4">delete</i></a>
                        </div>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection