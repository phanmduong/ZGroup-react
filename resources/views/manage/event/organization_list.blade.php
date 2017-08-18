@extends('layouts.app')

@section('title','Tổ chức')

@section('content')
    <h3 class="header">
        Tổ chức
    </h3>

    <div class="row">
        <a class="btn" href="{{url("manage/createorganization")}}">Tạo mới</a>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Thời gian tạo</th>
                <th>Xoá</th>
            </tr>
            </thead>

            <tbody>
            @foreach($organizations as $organization)
                <tr>
                    <td><a href="{{url("manage/editorganization/".$organization->id)}}">{{$organization->name}}</a></td>
                    <td>{{$organization->created_at}}</td>
                    <td>
                        @if($organization->events()->count() == 0)
                            <a href="{{url('manage/deleteorganization/'.$organization->id)}}"><i class="material-icons">delete</i></a>
                        @else
                            Có {{$organization->events()->count()}} sự kiện
                        @endif
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>

    </div>

@endsection
