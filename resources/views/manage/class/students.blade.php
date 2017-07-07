@extends('layouts.app')

@section('title','Lớp '.$class->name)

@section('content')
    <div class="row">
        <h3 class="header">Lớp {{$class->name}}</h3>
        @if ($class->teach)
            <div>Giảng viên: <strong>{{$class->teach->name}}</strong></div>
        @endif
        @if ($class->assist)
            <div>Trợ giảng: <strong>{{$class->assist->name}}</strong></div>
        @endif
        <div>Tổng số học viên đã đóng tiền: <strong>{{count($students)}}</strong></div>
        @if ($max_score != 0)
            <div>Tổng hệ số: <strong>{{$max_score}}</strong></div>
            <div style="padding: 20px 0">
                <a href="{{url("/compute-certificate/".$class->id)}}" class="btn">Tổng kết bằng</a>
            </div>
        @endif
        <table>
            <thead>
            <tr>
                <th>Tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Trường</th>
                <th>Tiền học</th>
                <th>Mã thẻ</th>
                <th>Đã nhận thẻ</th>
                <th>Bằng</th>
                <th>Số buổi đã đi</th>
                <th>Tổng hệ số</th>
            </tr>
            </thead>
            <tbody>
            @foreach($students as $student)
                <tr>
                    <td>{{$student->name}}</td>
                    <td>{{$student->email}}</td>
                    <td>{{$student->phone}}</td>
                    <td>{{$student->university}}</td>
                    <td><span class="cm-badge"
                              style="background-color: #c50000">{{number_format($student->money)}}</span></td>
                    <td>{{$student->code}}</td>
                    <td>{!!  $student->received_id_card ? "<span class='cm-badge'>Rồi</span>": '<span class="red-text">Chưa</span>'!!}</td>
                    <td>{{$student->certificate}}</td>
                    <td>{{$student->total_attendances}}</td>
                    @if($max_score == 0)
                        <td>0</td>
                    @else
                        <td>{{$student->score*100 / $max_score}}% ({{$student->score}}/{{$max_score}})</td>
                    @endif

                </tr>
            @endforeach
            </tbody>
        </table>


    </div>
@endsection