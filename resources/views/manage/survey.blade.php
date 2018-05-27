@extends('layouts.app')

@section('title','Survey')

@section('content')
    <h3 class="header">Danh sách survey</h3>
    <a class="waves-effect waves-light btn modal-trigger blue" href="{{url('manage/downloadsurvey')}}">Download</a>
    <a class="waves-effect waves-light btn modal-trigger orange"
       href="{{url('rating/classes?gen_id='.$current_gen->id)}}">Gửi đánh giá</a>
    <!-- Modal Structure -->
    <div id="download" class="modal">
        <div class="modal-content">
            <h4 style="margin-bottom: 10px">Download</h4>
            <ul class="collection">
                @foreach($gens as $gen)
                    <a target="_blank" href="{{url('survey/download?gen_id='.$gen->id)}}"
                       class=" collection-item">Khoá {{$gen->name}}</a>
                @endforeach
            </ul>
        </div>

    </div>
    <form method="post" action="{{url('manage/storesurvey')}}">
        <div class="row">
            {{csrf_field()}}
            <div class="input-field col s6">
                <input type="text" class="validate" name="survey_name" id="survey_name">
                <label for="survey_name">Tên survey</label>

            </div>
            <div class="col s6">
                <input class="waves-effect waves-light btn" type="submit" value="Tạo"/>
            </div>

        </div>
    </form>

    <ul class="collapsible" data-collapsible="accordion">
        @foreach($surveys as $survey)
            <li>
                <div class="collapsible-header" style="position: relative;">
                    <i class="material-icons">feedback</i>
                    <a href="{{url('manage/survey/'.$survey->id)}}">{{$survey->name}}</a>
                    <div class="switch" style="position: absolute; top: 0; right: 5px">
                        <label>
                            <input name="status" id="survey_status{{$survey->id}}"
                                   onclick="change_status({{$survey->id}});"
                                   type="checkbox" {{$survey->active?"checked":""}} />
                            <span class="lever"></span>
                        </label>
                    </div>
                </div>
                <div class="collapsible-body">
                    <div class="row">
                        <div class="input-field col s12 m6">
                            <select id="select-course-{{$survey->id}}" onchange="chooseCourse({{$survey->id}})">
                                <option value="" disabled selected>Chọn môn</option>
                                @foreach($courses as $course)
                                    <option value="{{$course->id}}">{{$course->name}}</option>
                                @endforeach
                            </select>
                            <label>Môn học</label>
                        </div>

                        @foreach($courses as $course)
                            <div class="input-field col s12 m6 lesson-survey-{{$survey->id}}" style="display: none"
                                 id="select-lessons-{{$survey->id}}-{{$course->id}}">
                                <select>
                                    @foreach($course->lessons()->orderBy('order')->get() as $lesson)
                                        <option value="{{$lesson->id}}">Buổi {{$lesson->order}}: {{$lesson->name}}
                                        </option>
                                    @endforeach
                                </select>
                                <label>Buổi học</label>
                            </div>
                        @endforeach
                        <div class="input-field col s12 m6 time-display-{{$survey->id}}"
                             id="time-display-{{$survey->id}}" style="display:none">
                            <input id="time_display_{{$survey->id}}" type="number" min="1" max="120" class="validate">
                            <label for="time_display_{{$survey->id}}">Thời gian hiển thị (phút)</label>
                        </div>

                        <div class="input-field col s12 m6 start-time-display-{{$survey->id}}"
                             id="start-time-display-{{$survey->id}}" style="display:none">
                            <input id="start_time_display_{{$survey->id}}" type="number" min="1" max="120"
                                   class="validate">
                            <label for="start_time_display_{{$survey->id}}">Bắt đầu hiển thị (Phút thứ mấy của buổi
                                học)</label>
                        </div>

                        <div class="col s12 m4" style="padding-top:20px">
                            <button onclick="addLesson({{$survey->id}})" class="btn darken-4 red">Thêm</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12 blue-text darken-4" id="message-survey-{{$survey->id}}">
                        </div>
                        <div class="col s12">
                            <ul class="collection" id="lesson-collection-{{$survey->id}}">
                                @foreach($survey->lessons as $lesson)

                                    <li class="collection-item"
                                        id="collection-item-{{$survey->id}}-{{$lesson->id}}">{{$lesson->course->name}} -
                                        Buổi {{$lesson->order}}
                                        : {{$lesson->name}} -
                                        Hiển thị vào phút thứ <strong>{{$lesson->pivot->start_time_display}}</strong>
                                        trong vòng <strong>{{$lesson->pivot->time_display}}</strong> phút
                                        <span class="secondary-content"><a href="#!"
                                                                           onclick="removeLesson({{$lesson->id}},{{$survey->id}})"
                                                                           class=" red-text darken-4">delete</a></span>
                                    </li>

                                @endforeach
                            </ul>
                        </div>
                    </div>


                </div>
            </li>
        @endforeach
    </ul>

    <div>
        {{$surveys->links()}}
    </div>


    {{--<table class="responsive-table">--}}
    {{--<thead>--}}
    {{--<tr>--}}
    {{--<th>Tên</th>--}}
    {{--<th>Người tạo</th>--}}
    {{--<th>Ngày tạo</th>--}}
    {{--<th>Thư cám ơn</th>--}}
    {{--<th>Gửi</th>--}}
    {{--</tr>--}}
    {{--</thead>--}}
    {{----}}
    {{--<tbody>--}}
    {{--@foreach($surveys as $survey)--}}
    {{----}}
    {{--<tr>--}}
    {{--<td><a href="{{url('manage/survey/'.$survey->id)}}">{{$survey->name}}</a></td>--}}
    {{--<td>{{$survey->user->name}}</td>--}}
    {{--<td>{{format_date_full_option($survey->created_at)}}</td>--}}
    {{--<td><input {{$survey->is_final == 1?'checked':''}}--}}
    {{--survey_id="{{$survey->id}}"--}}
    {{--style="position:initial;left:0!important;visibility: visible!important;" type="checkbox"--}}
    {{--class="send_mail_goodbye"/></td>--}}
    {{--<td><a href="{{url('survey/classes?gen_id='.$current_gen->id.'&survey_id='.$survey->id)}}"><i--}}
    {{--class="material-icons">play_arrow</i></a></td>--}}
    {{--</tr>--}}
    {{--@endforeach--}}
    {{----}}
    {{--</tbody>--}}
    {{--</table>--}}
    {{----}}
    <script>

        function change_status(id) {
            $.post("{{url('manage/changesurveystatus')}}",
                {
                    "survey_id": id,
                    '_token': '{{csrf_token()}}'
                },
                function (data, status) {
                    console.log(status);
                });
        }
        function removeLesson(lesson_id, survey_id) {
            var messageSelector = '#message-survey-' + survey_id;
            $('#collection-item-' + survey_id + '-' + lesson_id + ' span').text('đang xoá...');
            $.post('{{url('api/removesurveylesson')}}',
                {
                    _token: '{{csrf_token()}}',
                    lesson_id: lesson_id,
                    survey_id: survey_id
                },
                function (data, status) {
                    $(messageSelector).text(data.message);
                    $('#collection-item-' + survey_id + '-' + lesson_id).remove();
                })
                .fail(function (xhr, status, error) {
                    console.log(xhr.responseText);
                });
        }
        function chooseCourse(survey_id) {
            var select_id = '#select-course-' + survey_id;
            var value = $(select_id).val();
            var select_lessons_id = '#select-lessons-' + survey_id + '-' + value;
            var all_lessons_select = '.lesson-survey-' + survey_id;
            $(all_lessons_select).hide();
            $(select_lessons_id).show();

            var time_display_id = '#time-display-' + survey_id;
            $(time_display_id).show();

            var start_time_display_id = '#start-time-display-' + survey_id;
            $(start_time_display_id).show();
        }
        function addLesson(survey_id) {
            var messageSelector = '#message-survey-' + survey_id;
            $(messageSelector).text('Đang thêm...');
            var select_id = '#select-course-' + survey_id;
            var value = $(select_id).val();
            var select_lessons_id = '#select-lessons-' + survey_id + '-' + value + ' select';
            var lesson_id = $(select_lessons_id).val();

            var start_time_display_id = '#start_time_display_' + survey_id;
            var start_time_display = $(start_time_display_id).val();

            var time_display_id = '#time_display_' + survey_id;
            var time_display = $(time_display_id).val();

            $.post('{{url('api/surveylesson')}}',
                {
                    _token: '{{csrf_token()}}',
                    lesson_id: lesson_id,
                    survey_id: survey_id,
                    start_time_display: start_time_display,
                    time_display: time_display
                },
                function (data, status) {
                    $(start_time_display_id).val('');
                    $(time_display_id).val('');
                    $(messageSelector).text(data.message);
                    if (data.status == 1) {
                        var row = '<li id="collection-item-' + survey_id + '-' + lesson_id + '" class="collection-item">' + data.lesson.course + ' - Buổi ' + data.lesson.order +
                            ': ' + data.lesson.name + '- Hiển thị vào phút thứ ' + start_time_display + ' trong vòng ' + time_display + ' phút ' +
                            '<span class="secondary-content"><a onclick="removeLesson(' + lesson_id + ',' + survey_id + ')" href="#!" class="secondary-content red-text darken-4">' +
                            'delete</a></span>' +
                            '</li>';
                        $('#lesson-collection-' + survey_id).append(row);
                    }
                })
                .fail(function (xhr, status, error) {
                    console.log(xhr.responseText);
                });
        }
        $(document).ready(function () {
            $('select').material_select();
//            $('select').change(function () {
//                alert('hi');
//            });
            // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
            $('.modal').modal();
            $(".send_mail_goodbye").change(function () {
                var survey_id = $(this).attr('survey_id');
                var url = "{{url('manage/attachmailgoodbye/')}}" + "/" + survey_id;
                $.get(url, function (data, status) {
                    console.log(data);
                });
//                if (this.checked) {
//                    alert('check');
//                } else {
//                    alert('uncheck');
//                }
            });
        });

    </script>

@endsection
