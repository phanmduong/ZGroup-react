@extends('layouts.public')

@section('title','Giáo trình')

@section('header','Giáo trình')

@section('content')
    <div class="container">


        <div class="row">
            <div class="col s12 m3" id="navigation">
                <h5>Lớp học</h5>
                <ul class="collapsible" data-collapsible="expandable">
                    @foreach($courses as $course)
                        <li>
                            <div class="collapsible-header" id="click{{$course->id}}">
                                <img class="material-icons"
                                     src="{{$course->icon_url}}"
                                     style="display: inline-block;width: 40px; height:40px; border-radius: 50%; position: relative; top: 8px; margin-right: 10px;">
                                <span style="display: inline-block; line-height: 20px; position: relative; top: -6px;">{{$course->name}}</span>
                            </div>
                            <div class="collapsible-body ">
                                <ul class="collection">
                                    @foreach($course->lessons as $item)
                                        <a href="{{url('student/lessoncontent/'.$item->id)}}"
                                           class="collection-item z-depth-1 btn-show-giaotrinh {{isset($current_lesson)?(($current_lesson->id == $item->id)?'selected':''):''}}">Buổi {{$item->order}}</a>
                                    @endforeach
                                </ul>
                            </div>
                        </li>
                    @endforeach
                </ul>
            </div>
            <div class="col s12 m9">

                @if(isset($current_lesson))
                    <h5>{{$current_lesson->name}}</h5>
                    <div class="z-depth-1  detail" style="padding:5px 12px">
                        {!! $current_lesson->detail_content !!}
                    </div>
                @endif

            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            @if(isset($current_lesson))
            $("#click{{$current_lesson->course->id}}").addClass('active');
            @endif
        });

        {{--function openModal(lesson_id, title) {--}}

        {{--$('#modal-title').html(title);--}}
        {{--$('#modal-giao-trinh').openModal(--}}
        {{--{--}}
        {{--complete: function () {--}}
        {{--$('#modal-content').html('');--}}
        {{--}--}}
        {{--}--}}
        {{--);--}}
        {{--//        $('#modal-giao-trinh').css('width','90%');--}}
        {{--$('#loading').show();--}}
        {{--$.post(--}}
        {{--'{{url('student/getlessoncontent')}}',--}}
        {{--{--}}
        {{--_token: '{{csrf_token()}}',--}}
        {{--'lesson_id': lesson_id--}}
        {{--},--}}
        {{--function (data, status) {--}}
        {{--$('#modal-content').html(data);--}}
        {{--$('#loading').hide();--}}
        {{--}--}}
        {{--);--}}
        {{--}--}}
    </script>
@endsection