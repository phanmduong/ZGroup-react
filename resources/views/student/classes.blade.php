@extends('layouts.public')

@section('title','Đổi buổi học')

@section('header','Đổi buổi học')

@section('content')
    <div class="container">

        @if(!$has_registered)
            <div class="row">
                <h5 class="center">Bạn chưa đăng kí khoá học nào. <a href="{{ url('courses')}}"> Đăng kí ngay</a></h5>
            </div>
        @else
            <div class="row">
                <div class="col s12 m3">
                    <h5>Lớp học</h5>
                    <div class="collection course-category">
                        @foreach($registers as $register)
                            @if ($class->id == $register->studyClass->id)
                                <a href="{{url('student/classes/'.$register->studyClass->id)}}"
                                   class="collection-item active">{{$register->studyClass->name}}</a>
                            @else
                                <a href="{{url('student/classes/'.$register->studyClass->id)}}"
                                   class="collection-item">{{$register->studyClass->name}}</a>
                            @endif
                        @endforeach
                    </div>
                </div>
                <div class="col s12 m9">

                    @if (Session::has('message'))
                        <div class="row">
                            <div class="col s12">
                                <div class="card-panel teal">
                                    <span class="white-text">{!! Session::get('message') !!}</span>
                                </div>
                            </div>
                        </div>

                    @endif

                    <h5>Buổi học</h5>
                    <ul class="collapsible" data-collapsible="accordion">
                        @foreach($registers->where('class_id',$class->id)->first()->attendances as $attendance)

                            <li>
                                <div class="collapsible-header">
                                    <img class="material-icons"
                                         src="{{$attendance->classLesson->studyClass->course->icon_url}}"
                                         style="display: inline-block;width: 40px; height:40px; border-radius: 50%; position: relative; top: 8px; margin-right: 10px;">
                                <span style="display: inline-block; line-height: 20px; position: relative; top: -6px;">Lớp <strong
                                            style="font-weight: bold">{{$attendance->classLesson->studyClass->name}}</strong>
                                    - Buổi {{$attendance->classLesson->lesson->order}}
                                    : {{$attendance->classLesson->lesson->name}} <span
                                            class="grey-text">({{format_date($attendance->classLesson->time)}}
                                        )</span></span></div>
                                <div class="collapsible-body">


                                    <table class="responsive-table">
                                        <thead>
                                        <tr>
                                            <th>Lớp</th>
                                            <th>Sĩ số</th>
                                            <th>Ngày học</th>
                                            <th>Giờ học</th>
                                            <th>Địa điểm</th>
                                            <th>Trạng thái</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        @foreach($attendance->classLesson->lesson->classLessons as $classLesson1)
                                            @if($classLesson1->id != $attendance->classLesson->id && $classLesson1->studyClass->gen_id == $attendance->register->gen_id)
                                                <tr>
                                                    <form method="post" action="{{url('student/changeclass')}}">
                                                        {{csrf_field()}}
                                                        <input type="hidden" name="class_lesson_id_to"
                                                               value="{{$classLesson1->id}}">
                                                        <input type="hidden" name="origin_class_id"
                                                               value="{{$class->id}}">
                                                        <input type="hidden" name="class_lesson_id_from"
                                                               value="{{$attendance->classLesson->id}}">
                                                        <td>{{$classLesson1->studyClass->name}}</td>
                                                        <td>{{$classLesson1->attendances()
                                                    ->whereExists(function ($query) {
                                                                $query->select(DB::raw(1))
                                                                      ->from('registers')
                                                                      ->whereRaw('registers.status = 1')
                                                                      ->whereRaw('registers.id = attendances.register_id');
                                                            })->get()->count()}}</td>
                                                        <td>{{format_date($classLesson1->time)}}</td>
                                                        <td>{{$classLesson1->studyClass->study_time}}</td>
                                                        <td>{{$classLesson1->studyClass->base->address}}</td>
                                                        <td>@if($classLesson1->studyClass->activated != 1)
                                                                <strong class="grey-text">Chưa bắt đầu</strong>

                                                            @elseif($classLesson1->attendances()
                                                            ->whereExists(function ($query) {
                                                                    $query->select(DB::raw(1))
                                                                          ->from('registers')
                                                                          ->whereRaw('registers.status = 1')
                                                                          ->whereRaw('registers.id = attendances.register_id');
                                                                })->get()->count() >= $classLesson1->studyClass->target)
                                                                <strong class="red-text">Đã đầy</strong>
                                                            @else
                                                                <input type="submit" class="btn"
                                                                       value="Chuyển"/>
                                                            @endif</td>
                                                    </form>

                                                </tr>
                                            @endif
                                        @endforeach
                                        </tbody>
                                    </table>


                                </div>
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>
        @endif
    </div>
@endsection