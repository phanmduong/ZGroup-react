<div class="row">
    {{--<table>--}}
    {{--<tr>--}}
    {{--<th>Họ tên</th>--}}
    {{--<td>{{$telecall->student->name}}</td>--}}
    {{--</tr>--}}
    {{--<tr>--}}
    {{--<th>Email</th>--}}
    {{--<td>{{$telecall->student->email}}</td>--}}
    {{--</tr>--}}
    {{--<tr>--}}
    {{--<th>Trường</th>--}}
    {{--<td>{{$telecall->student->university}}</td>--}}
    {{--</tr>--}}
    {{--<tr>--}}
    {{--<th>Nơi làm việc</th>--}}
    {{--<td>{{$telecall->student->work}}</td>--}}
    {{--</tr>--}}
    {{--<tr>--}}
    {{--<th>Địa chỉ</th>--}}
    {{--<td>{{$telecall->student->address}}</td>--}}
    {{--</tr>--}}
    {{--</table>--}}
    <div class="card">
        <div class="card-content">
            <p>Trạng
                thái:
                {!! call_status($telecall->call_status) !!}</p>
            <p>Thời gian: <strong>{{format_date_full_option($telecall->updated_at)}}</strong></p>
            <ul class="collapsible" data-collapsible="accordion">
                <li>
                    <div class="collapsible-header"><i
                                class="material-icons">filter_drama</i>{{$telecall->student->name}}
                        : {{$telecall->student->phone}}</div>
                    <div class="collapsible-body">
                        <div class="row">
                            <table class="responsive-table">
                                <thead>
                                <tr>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Trường</th>
                                    <th>Nơi làm việc</th>
                                    <th>Địa chỉ</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{$telecall->student->name}}</td>
                                    <td>{{$telecall->student->email}}</td>
                                    <td>{{$telecall->student->university}}</td>
                                    <td>{{$telecall->student->work}}</td>
                                    <td>{{$telecall->student->address}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <table class="responsive-table">
                                <thead>
                                <tr>
                                    <th>Ghi chú</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{$telecall->note}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i
                                class="material-icons">filter_drama</i>Thông tin đăng kí học
                    </div>
                    <div class="collapsible-body">
                        <div class="row">
                            <table class="responsive-table">
                                <thead>
                                <tr>
                                    <th>Khoá học</th>
                                    <th>Số buổi</th>
                                    <th>Học phí (Chưa có chiết khấu)</th>
                                    <th>Lớp</th>
                                    <th>Giờ học</th>
                                    <th>Giảng viên</th>
                                    <th>Trợ giảng</th>
                                    <th>Thời gian đăng kí</th>
                                    <th>Saler</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($telecall->student->registers as $register)
                                    <tr>
                                        <td>{{$register->studyClass->course->name}}</td>
                                        <td>{{$register->studyClass->course->duration}}</td>
                                        <td>{{currency_vnd_format($register->studyClass->course->price)}}</td>
                                        <td>{{$register->studyClass->name}}</td>
                                        <td>{{$register->studyClass->study_time}}</td>
                                        <td>{{$register->studyClass->teach['name']}}</td>
                                        <td>{{$register->studyClass->assist['name']}}</td>
                                        <td>{{format_date($register->created_at)}}</td>
                                        <td>
                                            @if($register->saler)
                                                {{$register->saler->name}}
                                            @endif
                                        </td>
                                    </tr>
                                @endforeach
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <table class="responsive-table">
                                <thead>
                                <tr>
                                    <th>Ghi chú</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{$telecall->note}}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">place</i>Lịch sử gọi</div>
                    <div class="collapsible-body">
                        <ul class="collection with-header">
                            @foreach($telecall->student->is_called->sortByDesc('updated_at') as $item)
                                <li class="collection-item">
                                    <div>{{format_date_full_option($item->updated_at)}}</div>
                                    <div><strong>{{$item->caller->name}}</strong>
                                        gọi {!!call_status($item->call_status) !!}


                                    </div>
                                    <div>Ghi chú: {{$item->note}}</div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </li>

            </ul>

        </div>
    </div>
</div>