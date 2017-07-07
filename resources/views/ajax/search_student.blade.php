<style>
    th, td {
        height: 60px;
    }
</style>
<ul class="collapsible" data-collapsible="accordion">
    @foreach($students as $student)
        <li>
            <div class="collapsible-header"><i class="tiny material-icons">contacts</i>{{$student->name}}
                ({{$student->email}}) ({{$student->phone}})
            </div>
            <div class="collapsible-body">
                <table class="responsive-table">
                    <thead>
                    <tr>
                        <th>Lớp</th>
                        <th>Thời gian đăng kí</th>
                        <th>Mã học viên</th>
                        <th>Tổng số tiền nộp</th>
                        <th>Đã nhận thẻ</th>
                        <th>Ghi chú</th>
                        <th>Ngày nộp</th>
                        <th>Nộp</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($student->registers as $register)
                        <tr>
                            <td>
                                <a href="{{url('manage/editclass/'.$register->studyClass->id)}}">{{$register->studyClass->name}}
                                    ({{$register->studyClass->course->name}})</a>
                            </td>
                            <td>{{format_date($register->created_at)}}</td>
                            <td id="{{'containcode'.$register->id}}">
                                @if(isset($register->code) && $register->code != null)

                                    <div>
                                        <input disabled type="text" id="{{'code'.$register->id}}"
                                               value="{{$register->code}}">
                                    </div>

                                @else

                                    <div>
                                        <input type="text" id="{{'code'.$register->id}}"
                                               value="{{first_part_of_code($register->studyClass->name,$waitingCode,$nextCode)}}">
                                    </div>

                                @endif

                            </td>
                            <td id="{{'containmoney'.$register->id}}">

                                @if(isset($register->status) && $register->status == 1)

                                    <div>
                                        <input disabled type="text" id="{{'money'.$register->id}}"
                                               value="{{$register->money}}">
                                    </div>

                                @else

                                    <div>
                                        <input type="text" id="{{'money'.$register->id}}"
                                               value="{{$register->money}}">
                                    </div>

                                @endif
                            </td>
                            <td>
                                @if(isset($register->code) && $register->code != null)

                                    <input disabled="true" checked="{{$register->received_id_card}}" type="checkbox"
                                           id="{{'received_id_card'.$register->id}}"/>
                                    <label for="{{'received_id_card'.$register->id}}"></label>

                                @else

                                    <input type="checkbox" id="{{'received_id_card'.$register->id}}"/>
                                    <label for="{{'received_id_card'.$register->id}}"></label>

                                @endif
                            </td>
                            <td id="{{'containnote'.$register->id}}">
                                @if(isset($register->status) && $register->status == 1)

                                    <div>
                                        <input disabled type="text" id="{{'note'.$register->id}}"
                                               value="{{$register->note}}">

                                    </div>
                                @else

                                    <div>
                                        <input type="text" id="{{'note'.$register->id}}"
                                               value="{{$register->note}}">
                                    </div>

                                @endif
                            </td>
                            <td id="{{'containtime'.$register->id}}">
                                @if($register->money > 0)
                                    {{format_date_full_option($register->paid_time)}}
                                @else
                                    <strong>Chưa nộp</strong>
                                @endif
                            </td>
                            <td id="{{'containbutton'.$register->id}}">
                                @if(isset($register->status) && $register->status == 1)
                                    <strong class="green-text">Đã nộp đủ</strong>
                                @else
                                    @if($register->studyClass->target <= $register->where('status',1)->where('class_id', $register->studyClass->id)->count())
                                        <button onclick="confirmMoney('{{$register->id}}',1,true,'Lớp này đã có {{$register->where('status',1)->where('class_id', $register->studyClass->id)->count()}}/{{$register->studyClass->target}} học viên! Bạn vẫn muốn thêm học sinh?')"
                                                class="collect-money waves-effect waves-light btn">Nộp
                                        </button>
                                    @else
                                        <button onclick="confirmMoney('{{$register->id}}',1,false)"
                                                class="waves-effect waves-light btn">Nộp
                                        </button>
                                    @endif
                                    {{--<button onclick="confirmMoney('{{$register->id}}',0)"--}}
                                    {{--class="waves-effect waves-light btn red">chưa đủ--}}
                                    {{--</button>--}}
                                @endif
                                <div id="loading-text{{$register->id}}" style="display: none" class='green-text'>Đang
                                    lưu, xin vui lòng chờ...
                                    <div class="progress">
                                        <div class="indeterminate"></div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </li>
    @endforeach
</ul>