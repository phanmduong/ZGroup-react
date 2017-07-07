@extends('layouts.app')

@section('title','Học viên')

@section('content')
    <h3 class="header">
        Học viên
    </h3>


    <div class="row">
        <p>Khoá: <strong>{{$gen->name}}</strong></p>
        <form method="get">
            <div class="input-field col s12">
                <input id="search" placeholder="Email hoặc số điện thoại" name="search" value="{{$search}}"
                       type="text"/>
                <label for="Seach">Tìm kiếm </label>
            </div>
            <div class="input-field col s12 m6">
                <select name="paid" id="paid">
                    <option value="0" class="red-text" {{($paid==0)?"selected":" "}}>Chưa đóng</option>
                    <option value="1" class="green-text" {{($paid==1)?"selected":" "}}>Đã đóng</option>
                </select>
                <label>Trạng thái đóng tiền </label>
            </div>
            <div class="input-field col s12 m6">
                <select name="call" id="call">
                    <option value="0" class="red-text" {{($call==0)?"selected":" "}}>Chưa gọi</option>
                    <option value="1" class="green-text" {{($call==1)?"selected":" "}}>Đã gọi</option>
                </select>
                <label>Trạng thái gọi điện</label>
            </div>
            <div class="col s12" style="padding-top:20px">
                <input type="submit" class="waves-effect waves-light btn" value="Tìm"
                       id="submit"/>
            </div>
        </form>
        <table class="striped responsive-table">
            <thead>
            <tr>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                {{--<th>Trường</th>--}}
                {{--<th>Nơi làm việc</th>--}}
                <th>Các lớp học đăng kí</th>
                <th>Lịch sử gọi (Ghi chú)</th>
                @if($call == 0 )
                    <th>Trạng thái</th>
                @endif
            </tr>
            </thead>

            <tbody>
            @foreach($registers as $register)
                <tr>
                    <td>{{$register->user->name}}</td>
                    <td>{{$register->user->email}}</td>
                    <td>{{$register->user->phone}}</td>
                    {{--<td>{{$register->user->university}}</td>--}}
                    {{--<td>{{$register->user->work}}</td>--}}
                    <td>
                        @foreach($register->user->registers as $regis)
                            <p>Môn: <strong><a
                                            href="{{url('manage/editcourse/'.$regis->studyClass->course->id)}}">{{$regis->studyClass->course->name}}</a></strong>
                                Lớp: <strong> <a
                                            href="{{url('manage/editclass/'.$regis->studyClass->id)}}">{{$regis->studyClass->name}}</a></strong>
                                ({!! ($regis->status == 0)?"<strong class='red-text'>Chưa đóng tiền</strong>":"<strong class='green-text'>Đã đóng tiền</strong>"!!}
                                )
                            </p>
                        @endforeach
                    </td>
                    <td>
                        <ul class="collapsible" data-collapsible="accordion">
                            <li>
                                <div class="collapsible-header">Lịch sử gọi
                                </div>
                                <div class="collapsible-body">
                                    <ul class="collection with-header">
                                        @foreach($register->user->is_called->sortByDesc('updated_at') as $item)
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
                    </td>
                    @if($call == 0)
                        <td id="btn{{$register->id}}">
                            <button class="waves-effect waves-light btn" style="width:120px " onclick="called({{$register->id}})">Đã gọi
                            </button>
                        </td>
                    @endif
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect"
                       href="{{url('manage/studentsneedcall/'.($current_page-1)."?search=".$search."&paid=".$paid."&call=".$call)}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect"
                           href="{{url('manage/studentsneedcall/'.$i."?search=".$search."&paid=".$paid."&call=".$call)}}">{{$i}}</a>
                    </li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect"
                       href="{{url('manage/studentsneedcall/'.($current_page+1)."?search=".$search."&paid=".$paid."&call=".$call)}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>

    </div>
    <script>
        function called(id) {
            $.post("{{url('manage/setstudenttocalled')}}",
                    {
                        _token: '{{csrf_token()}}',
                        'id': id
                    },
                    function (data, status) {
                        $('#btn' + id).html('Đã gọi');
                        console.log(data);
                    });
        }
        $(document).ready(function () {
            $('select').material_select();
        });
    </script>
@endsection
