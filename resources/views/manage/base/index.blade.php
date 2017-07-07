@extends('layouts.app')

@section('title','Danh sách cơ sở')

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
            <a href="{{url('manage/newbase')}}" class="waves-effect waves-light btn red darken-4">Tạo mới</a>
        </div>
    </div>
    <div class="row">
        <div class="col s12">
            <ul class="collection">
                @foreach($bases as $base)
                    <li class="collection-item dismissable" style="overflow: hidden">
                        <div style="float: left">
                            <div style="font-weight: bold"><a class="base_name"
                                                              href="{{url('manage/bases/'.$base->id)}}">{{$base->name}}</a>
                            </div>
                            <div style="color: #888888;">{{$base->address}}</div>
                            <div style="color: #888888;">Cần người trực: {{$base->center==1?"Yes":"No"}}</div>
                        
                        </div>
                        <a href="{{url('manage/deletebase/'.$base->id)}}"
                           onclick="return confirm('Bạn có chắc muốn xoá cơ sở này?')" class="secondary-content"><i
                                    class="material-icons red-text text-darken-4">delete</i></a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
@endsection