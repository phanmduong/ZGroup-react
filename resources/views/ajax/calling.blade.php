<div class="row">
    <div class="card">
        <div class="card-content">

            <div class="row">
                <div class="col s12">
                    <ul class="collapsible" data-collapsible="accordion">
                        <li>
                            <div class="collapsible-header"><i
                                        class="material-icons">filter_drama</i>{{$student->name}}
                                : {{$student->phone}}</div>
                            <div class="collapsible-body">
                                <div class="row">
                                    <ul class="collection">
                                        <li class="collection-item">{{$student->name}}</li>
                                        <li class="collection-item">{{$student->email}}</li>
                                        <li class="collection-item">{{$student->university}}</li>
                                        <li class="collection-item">{{$student->work}}</li>
                                        <li class="collection-item">{{$student->address}}</li>
                                    </ul>
                                    {{--<table class="responsive-table">--}}
                                    {{--<thead>--}}
                                    {{--<tr>--}}
                                    {{--<th>Họ tên</th>--}}
                                    {{--<th>Email</th>--}}
                                    {{--<th>Trường</th>--}}
                                    {{--<th>Nơi làm việc</th>--}}
                                    {{--<th>Địa chỉ</th>--}}
                                    {{--</tr>--}}
                                    {{--</thead>--}}
                                    {{--<tbody>--}}
                                    {{--<tr>--}}
                                    {{--<td>{{$student->name}}</td>--}}
                                    {{--<td>{{$student->email}}</td>--}}
                                    {{--<td>{{$student->university}}</td>--}}
                                    {{--<td>{{$student->work}}</td>--}}
                                    {{--<td>{{$student->address}}</td>--}}
                                    {{--</tr>--}}
                                    {{--</tbody>--}}
                                    {{--</table>--}}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i
                                        class="material-icons">filter_drama</i>Thông tin đăng kí học
                            </div>
                            <div class="collapsible-body">
                                <div class="row">

                                    @foreach($student->registers as $register)
                                        <div class="col m6" style="border: 1px solid #7a7a7a;">
                                            <ul class="collection">
                                                <li class="collection-item">
                                                    Môn {{$register->studyClass->course->name}}</li>
                                                {{--<li class="collection-item">{{$register->studyClass->course->duration}}--}}
                                                {{--buổi--}}
                                                {{--</li>--}}
                                                {{--<li class="collection-item">{{currency_vnd_format($register->studyClass->course->price)}}</li>--}}
                                                <li class="collection-item">Lớp {{$register->studyClass->name}}</li>
                                                <li class="collection-item">{{$register->studyClass->study_time}}</li>
                                                <li class="collection-item">Ngày bắt
                                                    đầu: {{$register->studyClass->study_time}}</li>

                                                {{--<li class="collection-item">--}}
                                                {{--Giảng viên:--}}
                                                {{--{{$register->studyClass->teach['name'] ? $register->studyClass->teach['name'] : "Chưa có"}}--}}
                                                {{--</li>--}}
                                                {{--<li class="collection-item">--}}
                                                {{--Trợ giảng:--}}
                                                {{--{{$register->studyClass->assist['name'] ? $register->studyClass->assist['name'] : "Chưa có"}}--}}
                                                {{--</li>--}}
                                                <li class="collection-item">{{format_time_to_mysql(strtotime($register->created_at))}}</li>
                                                <li class="collection-item">
                                                    Saler: {{$register->saler ? $register->saler->name : "Không có"}}</li>

                                            </ul>
                                        </div>
                                    @endforeach

                                    {{--<table class="responsive-table">--}}
                                    {{--<thead>--}}
                                    {{--<tr>--}}
                                    {{--<th>Khoá học</th>--}}
                                    {{--<th>Số buổi</th>--}}
                                    {{--<th>Học phí (Chưa có chiết khấu)</th>--}}
                                    {{--<th>Lớp</th>--}}
                                    {{--<th>Giờ học</th>--}}
                                    {{--<th>Giảng viên</th>--}}
                                    {{--<th>Trợ giảng</th>--}}
                                    {{--<th>Thời gian đăng kí</th>--}}
                                    {{--<th>Saler</th>--}}
                                    {{--</tr>--}}
                                    {{--</thead>--}}
                                    {{--<tbody>--}}
                                    {{--@foreach($student->registers as $register)--}}
                                    {{--<tr>--}}
                                    {{--<td>{{$register->studyClass->course->name}}</td>--}}
                                    {{--<td>{{$register->studyClass->course->duration}}</td>--}}
                                    {{--<td>{{currency_vnd_format($register->studyClass->course->price)}}</td>--}}
                                    {{--<td>{{$register->studyClass->name}}</td>--}}
                                    {{--<td>{{$register->studyClass->study_time}}</td>--}}
                                    {{--<td>{{$register->studyClass->teach['name']}}</td>--}}
                                    {{--<td>{{$register->studyClass->assist['name']}}</td>--}}
                                    {{--<td>{{format_date($register->created_at)}}</td>--}}
                                    {{--<td>--}}
                                    {{--@if($register->saler)--}}
                                    {{--{{$register->saler->name}}--}}
                                    {{--@endif--}}
                                    {{--</td>--}}
                                    {{--</tr>--}}
                                    {{--@endforeach--}}
                                    {{--</tbody>--}}
                                    {{--</table>--}}
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="collapsible-header"><i class="material-icons">place</i>Lịch sử gọi</div>
                            <div class="collapsible-body">
                                <ul class="collection with-header">
                                    @foreach($student->is_called->sortByDesc('updated_at') as $item)
                                        <li class="collection-item">
                                            <div>{{format_date_full_option($item->updated_at)}}</div>
                                            <div><strong>{{$item->caller ? $item->caller->name : "Đã xoá"}}</strong>
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
                <form class="input-field col s12">
                    <textarea id="note" class="materialize-textarea"></textarea>
                    <label for="note">Ghi chú</label>
                </form>
            </div>
        </div>


        <div class="card-action">
            <a class="waves-effect waves-light btn" onclick="callSuccess('{{$student->id}}','{{$telecall_id}}')">Đã nghe
                máy</a>
            <a class="red waves-effect waves-light btn " onclick="callFail('{{$student->id}}','{{$telecall_id}}')">Không
                nghe máy</a>
        </div>
    </div>
</div>