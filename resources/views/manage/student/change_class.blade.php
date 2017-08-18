@extends('layouts.app')

@section('title',$register->user->name." - ".$register->studyClass->name)

@section('content')

    <table class="bordered">
        <tr>
            <td>Name</td>
            <td>{{$register->user->name}}</td>
        </tr>
        <tr>
            <td>Email</td>
            <td>{{$register->user->email}}</td>
        </tr>
        <tr>
            <td>Phone</td>
            <td>{{$register->user->phone}}</td>
        </tr>
        <tr>
            <td>Class</td>
            <td>{{$register->studyClass->name}}</td>
        </tr>
        <tr>
            <td>Số học viên đã đóng tiền</td>
            <td>{{$register->studyClass->registers->where('status',1)->count()}}</td>
        </tr>
        <tr>
            <td>Số học viên đăng kí</td>
            <td>{{$register->studyClass->registers->count()}}</td>
        </tr>
        <tr>
            <td>Cơ sở</td>
            <td>{{$register->studyClass->base->name}}</td>
        </tr>
    </table>
    <div class="row" style="margin-top:40px">
        <h5>Các lớp đã đăng kí</h5>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <td>Tên lớp</td>
                <td>Thời gian học</td>
                <th>Đã nộp tiền</th>
                <th>Mã học viên</th>
                <th>Số tiền</th>
                <th>Thời gian nộp</th>
                <th>Thời gian đăng kí</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($old_registers as $r)
                <tr>
                    <td>{{$r->studyClass->name}}</td>
                    <td>{{$r->studyClass->study_time}}</td>
                    <td>{{$r->status == 1 ? 'rồi' : 'chưa'}}</td>
                    <td>{{$r->code}}</td>
                    <td>{{$r->money}}</td>
                    <td>{{format_date_full_option($r->paid_time)}}</td>
                    <td>{{format_date_full_option($r->created_at)}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
    <div class="row" style="margin-top:40px">
        <h5>Các lớp hiện tại</h5>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <td>Tên lớp</td>
                <td>Thời gian học</td>
                <th>Học viên đã nộp tiền</th>
                <th>Học viên đăng kí</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            @foreach($classes as $class)
                <tr>
                    <td>{{$class->name}}</td>
                    <td>{{$class->study_time}}</td>
                    <td class="green-text">
                        @if($class->target>0)
                            {{$class->registers->where('status',1)->count()}}/{{$class->target}}
                            <div class="progress">
                                <div class="determinate"
                                     style="{!!'width:'.(($class->registers->where('status',1)->count()*100)/$class->target)!!}%"></div>
                            </div>
                        @endif

                    </td>
                    <td class="blue-text">
                        @if($class->regis_target>0)
                            {{$class->registers->count()}}/{{$class->regis_target}}
                            <div class="progress blue lighten-4">
                                <div class="determinate blue"
                                     style="{!!'width:'.(($class->registers->count()*100)/$class->regis_target)!!}%"></div>
                            </div>
                        @endif
                    </td>
                    <td><a href="{{url('manage/confirmchangeclass?registerId='.$register->id."&classId=".$class->id)}}"
                           class="btn">Đổi</a></td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection