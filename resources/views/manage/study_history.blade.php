@extends('layouts.app')

@section('title','Danh sách đăng kí học')

@section('content')
    <h4>Lịch sử học</h4>
    <div>Học viên: <strong>{{$student->name}}</strong></div>
    <div>Email: <strong>{{$student->email}}</strong></div>
    <div>Phone: <strong>{{$student->phone}}</strong></div>

    <div class="row">
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Mã số</th>
                <th>Lớp</th>
                <th>Thời gian đăng kí</th>
                <th>Bằng</th>
                <th>Trạng thái đóng tiền</th>
                <th>Thời gian đóng tiền</th>
                <th>Gọi</th>
                <th>Saler</th>
            </tr>
            </thead>

            <tbody>
            @foreach($registers as $register)
                <tr>
                    <td>
                        @if($register->code)
                            {{$register->code}}
                        @else
                            chưa có
                        @endif
                    </td>
                    <td>{{$register->studyClass->name}}</td>
                    <td>{{$register->created_at}}</td>
                    <td>{{$register->certificate}}</td>

                    @if ($register->status == 1)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#c50000">{{currency_vnd_format($register->money)}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Chưa đóng tiền</td>
                    @endif

                    <td>{{$register->paid_time}}</td>
                    <td>
                        <a href="{{url('manage/telesalehistory?page=1&user_id='.$register->user_id)}}">
                            @if($register->call_status == 0)
                                <i style="color: #a5a5a5;" class="material-icons">phone</i>
                            @elseif($register->call_status == 2)
                                <i style="color: #c50000;" class="material-icons">phone</i>
                            @else
                                <i style="color: #43a047;" class="material-icons">phone</i>
                            @endif
                        </a>
                    </td>

                    @if ($register->saler)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#{{$register->saler->color}}">{{$register->saler->name}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Không có</td>
                    @endif

                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

@endsection
