@extends('layouts.app')

@section('title','Sự kiện')

@section('content')
    <h3 class="header">
        Sự kiện
    </h3>
    <div class="row">
        <a class="btn" href="{{url('manage/createevent')}}">Tạo sự kiện</a>
        <table class="responsive-table bordered">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Tổ chức</th>
                <th>Số lượng dữ liệu</th>
                <th>Thời gian</th>
            </tr>
            </thead>

            <tbody>
            @foreach($events as $event)
                <tr>
                    <td><a href="{{url("/manage/editevent/".$event->id)}}">{{$event->name}}</a></td>
                    <td>
                        <a href="{{url("/manage/editorganization/".$event->organization->id)}}">{{$event->organization->name}}</a>
                    </td>
                    <td>{{$event->emails->count()}}</td>
                    <td>{{$event->organization->created_at}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>

    </div>

@endsection
