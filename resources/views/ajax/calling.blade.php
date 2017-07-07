<div class="row">
    <div class="card">
        <div class="card-content">
            <ul class="collapsible" data-collapsible="accordion">
                <li>
                    <div class="collapsible-header"><i
                                class="material-icons">filter_drama</i>{{$student->name}}
                        : {{$student->phone}}</div>
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
                                    <td>{{$student->name}}</td>
                                    <td>{{$student->email}}</td>
                                    <td>{{$student->university}}</td>
                                    <td>{{$student->work}}</td>
                                    <td>{{$student->address}}</td>
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
                                @foreach($student->registers as $register)
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
                    </div>
                </li>
                <li>
                    <div class="collapsible-header"><i class="material-icons">place</i>Lịch sử gọi</div>
                    <div class="collapsible-body">
                        <ul class="collection with-header">
                            @foreach($student->is_called->sortByDesc('updated_at') as $item)
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

        <form class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <textarea id="note" class="materialize-textarea"></textarea>
                    <label for="note">Ghi chú</label>
                </div>
            </div>

        </form>
        <div class="card-action">
            <a class="waves-effect waves-light btn" onclick="callSuccess('{{$student->id}}','{{$telecall_id}}')">Đã nghe
                máy</a>
            <a class="red waves-effect waves-light btn " onclick="callFail('{{$student->id}}','{{$telecall_id}}')">Không
                nghe máy</a>
        </div>
    </div>
</div>