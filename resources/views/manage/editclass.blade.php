@extends('layouts.app')

@section('title','Danh sách đăng kí học')

@section('content')
    <h3 class="header">
        {{($isEdit)?"Sửa":"Thêm mới"}} lớp học
    </h3>
    @if($errors->has('schedule_id'))
        <p class="card red-text" style="padding:10px"><strong>Bạn cần phải chọn lịch học</strong></p>
    @endif
    @if($errors->has('gen_id'))
        <p class="card red-text" style="padding:10px"><strong>Bạn cần phải chọn khoá</strong></p>
    @endif
    @if($errors->has('course_id'))
        <p class="card red-text" style="padding:10px"><strong>Bạn cần phải chọn môn</strong></p>
    @endif
    <div class="row">
        <form method="post" action="{{url('manage/storeclass')}}">
            {{csrf_field()}}
            <input type="hidden" name="id" value="{{$class->id}}"/>
            <div class="row">
                <div class="input-field col s12">
                    <input id="name" name="name" type="text" value="{{$class->name}}" class="validate">
                    <label for="name">Tên lớp</label>
                </div>
                <div class="input-field col s12">
                    <input id="description" name="description" type="text" value="{{$class->description}}"
                           class="validate">
                    <label for="description">Mô tả</label>
                </div>
                <div class="input-field col s12">
                    <input id="target" name="target" type="text" value="{{$class->target}}"
                           class="validate">
                    <label for="target">Chỉ tiêu nộp tiền</label>
                </div>
                <div class="input-field col s12">
                    <input id="regis_target" name="regis_target" type="text" value="{{$class->regis_target}}"
                           class="validate">
                    <label for="regis_target">Chỉ tiêu đăng kí</label>
                </div>
                <div class="input-field col s12">
                    <input id="study_time" name="study_time" type="text"
                           value="{{$class->study_time}}">
                    <label for="duration">Giờ học </label>
                </div>

                <div class="input-field col s12">
                    <select name="schedule_id">
                        <option value="" disabled selected>Choose your option</option>
                        @foreach($schedules as $s)
                            @if($s->id == $class->schedule_id)
                                <option value="{{$s->id}}" selected>{{$s->name}} {{$s->description}}</option>
                            @else
                                <option value="{{$s->id}}">{{$s->name}}: {{$s->description}}</option>
                            @endif
                        @endforeach
                    </select>
                    <label>Lịch học</label>
                </div>

                <div class="input-field col s12">
                    <select name="room_id">
                        @foreach($bases as $base)
                            <optgroup label="{{$base->name}} ({{$base->address}})">
                                @foreach($base->rooms as $room)
                                    @if($room->id == $class->room_id)
                                        <option value="{{$room->id}}" selected>{{$base->name}}: {{$room->name}}</option>
                                    @else
                                        <option value="{{$room->id}}">{{$base->name}}: {{$room->name}}</option>
                                    @endif
                                @endforeach
                            </optgroup>
                        @endforeach
                    </select>
                    <label>Phòng học</label>
                </div>
                <div class="input-field col s12 m6">
                    <select class="icons" name="course_id" id="course_id">
                        <option value="" disabled selected>Choose your option</option>
                        @foreach($courses as $course)
                            <option value="{{$course->id}}"
                                    {{($class->course_id == $course->id)?"selected":""}} data-icon="{{$course->icon_url}}"
                                    class="left circle">{{$course->name}}</option>
                        @endforeach
                    </select>
                    <label>Môn học </label>
                </div>
                <div class="input-field col s12 m6">
                    <select class="icons" name="gen_id" id="gen_id">
                        <option value="" disabled selected>Choose your option</option>
                        @foreach($gens as $gen)
                            <option value="{{$gen->id}}"
                                    {{($class->gen_id == $gen->id)?"selected":""}}  class="left circle">{{$gen->name}}</option>
                        @endforeach
                    </select>
                    <label>Khoá học </label>
                </div>

                <div class="input-field col s12 m6">
                    <select name="teacher_id" id="teacher_id">
                        <option value="" disabled selected>Choose your option</option>
                        @foreach($staffs as $staff)
                            <option value="{{$staff->id}}"
                                    {{($staff->id == $class->teacher_id)?"selected":""}}
                                    class="left circle">{{$staff->name}}({{$staff->email}})
                            </option>
                        @endforeach
                    </select>
                    <label>Giảng viên </label>
                </div>
                <div class="input-field col s12 m6">
                    <select name="teaching_assistant_id" id="teaching_assistant_id">
                        <option value="" disabled selected>Choose your option</option>
                        @foreach($staffs as $staff)
                            <option value="{{$staff->id}}"
                                    {{($staff->id == $class->teaching_assistant_id)?"selected":""}}
                                    class="left circle">{{$staff->name}}({{$staff->email}})
                            </option>
                        @endforeach
                    </select>
                    <label>Trợ giảng </label>
                </div>
                <div class="col s12" style="padding-bottom: 20px">
                    <label>Trạng thái tuyển sinh</label>
                    <!-- Switch -->
                    <div class="switch">
                        <label>
                            Đóng
                            <input name="status" type="checkbox" {{($class->status==1)?"checked":""}}>
                            <span class="lever"></span>
                            Mở
                        </label>
                    </div>
                </div>

                <div class="col s12">
                    <label for="datestart">Ngày khai giảng</label>
                    <input type="text" name="datestart" id="datestart"
                           value="{{$class->datestart}}"
                           class="datepicker-new validate {{$errors->has('dob')?'invalid':''}}"/>
                </div>

                <div class="col s12" style="padding-top:20px">
                    <input type="submit" class="waves-effect waves-light btn" value="submit" name="submit"
                           id="submit"/>
                </div>


            </div>
        </form>

    </div>
    <div class="row">
        @if($class->id)
            @if($class->schedule)
                <a class="btn" href="{{url("manage/set_class_lesson_time?class_id=".$class->id)}}">
                    tự động thêm thời gian cho buổi học
                </a>
            @else
                <div class="card red-text" style="padding: 10px"><p>Bạn chưa set lịch học nên không thể thêm lịch tự động</p></div>

            @endif
        @endif
        <h3 class="header">Buổi học của lớp {{$class->name}}</h3>
        {{--<button onclick="refresh_lesson('{{$class->id}}')" class="waves-effect waves-light btn">Cập nhật buổi</button>--}}
        <div class="col s12" id="class-lesson-container">

        </div>
    </div>
    <script>
        function save(lesson_id) {
            var class_id = '{{$class->id}}';
            $.post(
                "{{url('manage/saveclasslessontime')}}",
                {
                    _token: '{{csrf_token()}}',
                    'class_id': class_id,
                    'lesson_id': lesson_id,
                    time: $('#class-lesson-time' + lesson_id).val()
                },
                function (data, status) {
                    console.log(data);
                    $('#message' + lesson_id).html(data);
                }
            );
        }
        function refresh_lesson(class_id) {
            $('#class-lesson-container').html('<h3>Loading...</h3>');
            $.post(
                "{{url('manage/refreshclasslesson')}}",
                {
                    _token: '{{csrf_token()}}',
                    'class_id': class_id
                },
                function (data, status) {
                    console.log(data);
                    $('#class-lesson-container').html(data);
                }
            );
        }
        $(document).ready(function () {
            refresh_lesson({{$class->id}});

            $('.datepicker-new').datepicker();

            $(document).ready(function () {
                $('select').material_select();
            });
        });
    </script>

@endsection
