@extends('layouts.app')

@section('title','Điểm danh')

@section('content')
    
    {{--<div class="row">--}}
    {{--<h3 class="header">Thêm học viên vào lớp</h3>--}}
    {{--<form method="post" action="{{url('manage/changeattendance')}}">--}}
    {{--<div class="input-field col s12">--}}
    {{--<input id="search" type="text" class="validate">--}}
    {{--<label for="search">Tên,số điện thoại hoặc Email Người nhận</label>--}}
    {{--</div>--}}
    
    {{--<div class="col s12">--}}
    {{--{{csrf_field()}}--}}
    {{--<input type="hidden" name="student_id" id="student_id"/>--}}
    {{--<input type="hidden" name="class_lesson_id" id="class_lesson_id" value='{{$classLesson->id}}'/>--}}
    {{--<p>Họ tên: <span id="name" style="font-weight: bold"> </span></p>--}}
    {{--<p>Email: <span id="email" style="font-weight: bold"> </span></p>--}}
    {{--<p>Số điện thoại: <span id="phone" style="font-weight: bold"></span></p>--}}
    {{--<input id="btn-add-student" type="submit" disabled class=" btn"--}}
    {{--value="Thêm"/>--}}
    {{--</div>--}}
    
    {{--</form>--}}
    {{--</div>--}}
    
    <div class="row">
        <h3 class="header">Điểm danh</h3>
        <p>Khóa hiện tại: {{$current_gen->name}}</p>
        <p>Lớp {{$classLesson->studyClass->name}} có {{$classLesson->attendances->count()}} học viên</p>
        
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên học sinh</th>
                <th>Email</th>
                <th>Lớp đăng kí</th>
                <th>Thiết bị</th>
                <th>Có mặt</th>
                {{--<th>Bài tập</th>--}}
            </tr>
            </thead>
            <tbody>
            @foreach($attendances as $attendance)
                @if($attendance != null && $attendance->register != null)
                    <tr>
                        <td>{{ $attendance->register->user->name }}</td>
                        <td>{{ $attendance->register->user->email }}</td>
                        <td>{{$attendance->register->studyClass->name}}</td>
                        <td id="device{{$attendance->id}}">{{$attendance->device}}</td>
                        <td>
                            <div class="switch">
                                <label>
                                    <input name="status" id="attend_status{{$attendance->id}}"
                                           onclick="change_attend_status({{$attendance->id}});"
                                           type="checkbox" {{($attendance->status==1)?"checked":""}} />
                                    <span class="lever"></span>
                                </label>
                            </div>
                        </td>
                        {{--<td>--}}
                            {{--<div class="switch">--}}
                                {{--<label>--}}
                                    {{--<input name="status" id="hw_status{{$attendance->id}}"--}}
                                           {{--onclick="change_hw_status({{$attendance->id}});"--}}
                                           {{--type="checkbox" {{($attendance->hw_status==1)?"checked":""}} />--}}
                                    {{--<span class="lever"></span>--}}
                                {{--</label>--}}
                            {{--</div>--}}
                        {{--</td>--}}
                    </tr>
                @endif
            @endforeach
            </tbody>
        </table>
    </div>
    <script>
        
        function change_attend_status(attendance_id) {
            $("#device"+attendance_id).html("Máy tính");
            $.post('{{url('manage/changeattendstatus')}}', {
                '_token': '{{csrf_token()}}',
                'attendance_id': attendance_id
            }, function (data, status) {
                $("#device"+attendance_id).html(data);
            });
        }
        {{--function change_hw_status(attendance_id) {--}}
            {{--$("#device"+attendance_id).html("Máy tính");--}}
            {{--$.post('{{url('manage/changehwstatus')}}', {--}}
                {{--'_token': '{{csrf_token()}}',--}}
                {{--'attendance_id': attendance_id--}}
            {{--}, function (data, status) {--}}
                {{--$("#device"+attendance_id).html(data);--}}
            {{--});--}}
        {{--}--}}
        
        {{--$("#search").autocomplete({--}}
        {{--minLength: 0,--}}
        {{--source: '{{url('manage/autostudent')}}',--}}
        {{--focus: function (event, ui) {--}}
        {{--$("#search").val(ui.item.name);--}}
        {{--return false;--}}
        {{--},--}}
        {{--select: function (event, ui) {--}}
        {{--$("#search").val(ui.item.name);--}}
        {{--$("#name").html(ui.item.name);--}}
        {{--$("#email").html(ui.item.email);--}}
        {{--$("#phone").html(ui.item.phone);--}}
        {{--$("#student_id").val(ui.item.id);--}}
        {{--$("#btn-add-student").removeAttr('disabled');--}}
        {{--}--}}
        {{--})--}}
        {{--.autocomplete("instance")._renderItem = function (ul, item) {--}}
        {{--return $("<li style='border-bottom: 1px solid black'>")--}}
        {{--.append("<a><strong style='font-weight: bold'>" + item.name + "</strong><br>" + item.email + "<br>" + item.phone + "</a>")--}}
        {{--.appendTo(ul);--}}
        {{--};--}}
        {{--});--}}
    </script>
@endsection