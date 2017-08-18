@extends('layouts.app')

@section('title','Danh sách đăng kí học')

@section('content')
    <h3 class="header">
        Danh sách đăng kí
    </h3>
    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/registerlist?gen_id='.$gen->id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
    </div>

    @if(\Illuminate\Support\Facades\Session::has('change_class_message'))
        <div class="row">
            <div class="col s12">
                <div class="card-panel">
                    <span class="green-text darken-3">{!!  \Illuminate\Support\Facades\Session::get('change_class_message')!!}</span>
                </div>
            </div>
        </div>
    @endif
    <div class="row">
        <form>
            <div class="col s12 m6">
                <input name="q" value="{{$query}}" type="text" placeholder="Email, Tên hoặc số điện thoại"/>
                <input type="hidden" value="{{$current_gen->id}}" name="gen_id"/>
            </div>
            <div class="col s12 m4">
                <input type="submit" class="btn" value="search"/>
            </div>
        </form>
    </div>
    <div class="row">
        <p>Tổng số đăng kí: <strong>{{$total}}</strong></p>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Gọi</th>
                <th>Thời gian</th>
                <th>Số lần học</th>
                <th data-field="id">Họ tên</th>
                <th data-field="name">Email</th>
                <th>Đã nhận thẻ</th>
                <th>Phone</th>
                {{--<th data-field="price">Coupon</th>--}}
                <th>Saler</th>
                <th>Chiến dịch</th>
                <th>Đã đóng</th>
                <th>Lớp</th>
                <th>Ngày đăng kí</th>
                <th>Huỷ</th>
            </tr>
            </thead>

            <tbody>
            @foreach($registers as $register)
                <tr>
                    <td>
                        <a href="#call-modal" onclick="call({{$register->user_id}}, {{$register->id}})">
                            <i style="color:green"
                               class="material-icons">phone</i>
                        </a>
                    </td>
                    <td>
                        <a class="call-status-{{$register->user_id}}"
                           href="{{url('manage/telesalehistory?page=1&user_id='.$register->user_id)}}">
                            @if($register->call_status == 0)
                                @if ($register->time_to_reach == 0)
                                    <div class="time-btn">
                                        <span style="color:white">
                                            {{$register->time_to_call != '0000-00-00 00:00:00' ?
                                            ceil(diffDate(date('Y-m-d H:i:s'),$register->time_to_call)):0}}h
                                        </span>
                                    </div>
                                @else
                                    <div style="background-color: #c50000" class="time-btn">

                                        <span style="color:white">
                                        {{$register->time_to_reach}}h
                                        </span>
                                    </div>
                                @endif

                            @elseif($register->call_status == 2)
                                <div style="background-color: #5484c5" class="time-btn">
                                    <span style="color:white;position: relative;top:-7px;">Đang gọi</span>
                                </div>
                            @else
                                <div style="background-color: #43a047;" class="time-btn">
                                    <span style="color:white">{{$register->time_to_reach}}h</span>
                                </div>
                            @endif
                        </a>
                    </td>
                    <td>{{$register->study_time}}</td>
                    <td><a href="{{url('manage/changeclass/'.$register->id)}}">{{$register->user->name}}</a></td>
                    <td>
                        <a href="{{url('manage/study-history/'.$register->user_id)}}">
                            {{$register->user->email}}
                        </a>
                    </td>
                    <td>{!!$register->received_id_card?"<span class='green-text'>Rồi</span>":"<span class='red-text'>chưa</span>" !!}</td>
                    <td>{{$register->user->phone}}</td>
                    @if ($register->saler)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#{{$register->saler->color}}">{{$register->saler->name}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Không có</td>
                    @endif
                    @if ($register->marketing_campaign)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#{{$register->marketing_campaign->color}}">{{$register->marketing_campaign->name}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Không có</td>
                    @endif
                    @if ($register->status == 1)
                        <td>
                            <div style="width:120px;padding:5px 0;color:white;border-radius:3px;text-align:center;background-color:#c50000">{{currency_vnd_format($register->money)}}</div>
                        </td>
                    @else
                        <td style="text-align: center">Chưa đóng tiền</td>
                    @endif

                    <td>{{$register->studyClass->name}}</td>
                    <td>{{format_time_to_mysql(strtotime($register->created_at))}}</td>
                    <td>
                        <a onclick="return confirm('Bạn chắc chắn huỷ đăng kí này? ');"
                           href="{{url('manage/deleteregister/'.$register->id)}}"><i
                                    class="small material-icons">delete</i>
                        </a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect"
                       href="{{url('manage/registerlist?page='.($current_page-1).'&gen_id='.$current_gen->id.'&q='.$query)}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect"
                           href="{{url('manage/registerlist?page='.$i.'&gen_id='.$current_gen->id.'&q='.$query)}}">{{$i}}</a>
                    </li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect"
                       href="{{url('manage/registerlist?page='.($current_page+1).'&gen_id='.$current_gen->id.'&q='.$query)}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
    <!-- Call Modal -->
    <div id="call-modal" class="modal">
        <div class="modal-content" id="call-modal-content">
            <div class="progress" style="display: none" id="preloader">
                <div class="indeterminate"></div>
            </div>
            <div id="calling-area"></div>
        </div>
        {{--<div class="modal-footer">--}}
        {{--<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>--}}
        {{--</div>--}}
    </div>
    <script>

        $(document).ready(function () {
            $('select').material_select();
            $("#gen-select").change(function () {
                if ($(this).val() != '') {
                    window.location.href = $(this).val();
                }
            });
            $('#call-modal').modal({
                dismissible: false
            });
        });

        function callSuccess(id, telecallid) {
            var note = $('#note').val();
            console.log('hello');
            console.log('#call-status-' + global_register_id);
            $('.call-status-' + id).each(function () {
                $(this).html('<div style="background-color: green" class="time-btn">' +
                    '<span style="color:white">Đang cập nhật' +
                    '</span>' +
                    '</div>');
            });
            $('#preloader').show();
            $.post("{{url('manage/ajaxchangecallstatus')}}",
                {
                    id: id,
                    status: 1,
                    _token: '{{csrf_token()}}',
                    caller_id: '{{Auth::user()->id}}',
                    note: note,
                    telecall_id: telecallid
                },
                function (data, status) {
                });
            $('#call-modal').modal('close');
        }
        function callFail(id, telecallid) {
            var note = $('#note').val();
            $('.call-status-' + id).each(function () {
                $(this).html('<div style="background-color: #c50000" class="time-btn">' +
                    '<span style="color:white">Đang cập nhật' +
                    '</span>' +
                    '</div>');
            });
            $('#preloader').show();

            $.post("{{url('manage/ajaxchangecallstatus')}}",
                {
                    id: id,
                    status: 0,
                    '_token': '{{csrf_token()}}',
                    caller_id: '{{Auth::user()->id}}',
                    note: note,
                    telecall_id: telecallid
                },
                function (data, status) {
                });
            $('#call-modal').modal('close');
        }
        function call(id, register_id) {
            global_register_id = register_id;
//            $('#call-modal').modal('open');
            $('#preloader').show();
            $('#calling-area').html("");
            $.get("{{url('manage/getstudentforcall?id=')}}" + id + "&register_id=" + register_id, function (data, status) {
                $('#preloader').hide();
                $('#calling-area').html(data);
                $('.collapsible').collapsible({
                    accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
                });
            });
        }


    </script>
@endsection
