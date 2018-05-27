@extends('layouts.app')

@section('title','Danh sách lớp học')

@section('content')
    <h3 class="header">
        Lớp
    </h3>
    <div class="row">
        <form action="{{url('manage/classes')}}">
            <input value='{{$search}}' placeholder="Tên lớp" type="text" name="search">
            <input class="btn" type="submit">
        </form>
        <p>Tổng số môn: <strong>{{$total}}</strong></p>

        @if($user->role == 2)
            <p><a href="{{url('manage/addclass')}}" class="waves-effect waves-light btn red lighten-1"><i
                            class="tiny-icons left fa fa-plus"></i>Thêm lớp mới</a></p>
        @endif
        <p></p>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Ngày khai giảng</th>
                <th>Giờ</th>
                <th>Khoá</th>
                <th>Môn</th>
                <th>Giảng viên</th>
                <th>Trợ giảng</th>
                <th>Trạng thái tuyển sinh</th>
                <th style="padding-right:10px">Xoá</th>
                @if ($user->role == 2)
                    <th style="padding-right:10px">Duplicate</th>
                @endif
            </tr>
            </thead>

            <tbody>
            @foreach($classes as $class)
                <tr>
                    <td><a href="{{url('manage/editclass/'.$class->id)}}">{{$class->name}}</a></td>
                    <td>{{format_date($class->datestart)}}</td>
                    <td>{{$class->study_time}}</td>
                    <td><a href="{{url('manage/editgen/'.$class->gen_id)}}">{{$class->gen->name}}</a></td>
                    <td><a href="{{url('manage/editcourse/'.$class->course_id)}}">{{$class->course->name}}</a></td>
                    <td>
                        @if($class->teach)
                            {{$class->teach['name']}}
                        @else
                            Chưa bổ nhiệm
                        @endif
                    </td>

                    <td>
                        @if($class->assist)
                            {{$class->assist['name']}}
                        @else
                            Chưa bổ nhiệm
                        @endif
                    </td>
                    <td>
                        <div class="switch">
                            <label>
                                <input name="status" id="class_status" onclick="change_status({{$class->id}});"
                                       type="checkbox" {{($class->status==1)?"checked":""}} />
                                <span class="lever"></span>
                            </label>
                        </div>

                    </td>
                    <td>
                        @if($class->registers->count()>0)
                            Đã có <strong>{{$class->registers->count()}}</strong> học viên
                        @else
                            <a onclick="return confirm('Bạn chắc chắn xoá lớp này? ');"
                               href="{{url('manage/deleteclass/'.$class->id)}}"><i
                                        class="small material-icons">delete</i>
                            </a>
                        @endif

                    </td>
                    @if ($user->role == 2)
                        <td class="center">
                            <a href="{{url('manage/duplicateclass/'.$class->id)}}"><i
                                        class="small material-icons">content_copy</i></a>
                        </td>
                    @endif
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/classes/'.($current_page-1))."?search=".$search}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/classes/'.$i)."?search=".$search}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect" href="{{url('manage/classes/'.($current_page+1))."?search=".$search}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>

    <script>
        function change_status(id) {
            $.post("{{url('manage/changeclassstatus')}}",
                {
                    "class_id": id,
                    '_token': '{{csrf_token()}}'
                },
                function (data, status) {
                    console.log(status);
                });
        }
    </script>
@endsection
