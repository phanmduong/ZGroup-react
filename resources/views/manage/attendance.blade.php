@extends('layouts.app')

@section('title','Điểm danh')

@section('content')

    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/attendance?gen_id='.$gen->id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
    </div>
    <div class="row">
        <h3 class="header">Điểm danh</h3>
        <a href="{{url('manage/scanqrcode')}}" class="waves-effect waves-light btn">Scan QR code</a>
        {{--<p>Khóa hiện tại: {{$current_gen->name}}</p>--}}
        <ul class="collapsible" data-collapsible="accordion">
            @foreach($classes as $class)
                {{--<tr>--}}
                {{--<td><a href="{{ url('manage/attendancelist/'.$class->id) }}">{{ $class->name }}</a></td>--}}
                {{--<td>{{ $class->study_time }}</td>--}}
                {{--<td>{{ $class->teach->name }}</td>--}}
                {{--<td>{{ $class->assist->name }}</td>--}}
                {{--</tr>--}}
                <li>
                    <div class="collapsible-header">
                        <img style="width: 37px;height:37px;margin-top:12px;margin-right:12px"
                             src="{{$class->course->icon_url}}" class="circle"/>
                        <span style="position: relative;bottom:15px">Lớp <strong>{{$class->name}}</strong>
                            {{$class->study_time}}</span>
                    </div>
                    <div class="collapsible-body">
                        @if($class->activated == 1)
                            <ul class="collection with-header">
                                @foreach($class->course->lessons->sortBy('order') as $lesson)
                                    <li class="collection-item">
                                        @if($lesson->classLessons->where('class_id',$class->id)->count()>0)
                                            <div>
                                            </div>
                                            <a href="{{url('manage/attendancelist/'.$lesson->classLessons->where('class_id',$class->id)->first()->id)}}">Buổi {{$lesson->order}}
                                                : {{$lesson->name}}</a>

                                            @if($lesson->classLessons->where('class_id',$class->id)->reduce(function($carry,$classLesson){
                                                    return $carry + $classLesson->attendances()->count();
                                                },0) >0)
                                                <div>
                                                    {{$lesson->classLessons->where('class_id',$class->id)->reduce(function($carry,$classLesson){
                                                        return $carry + $classLesson->attendances()->where('status',1)->count();
                                                    },0)}}
                                                    /{{$lesson->classLessons->where('class_id',$class->id)->reduce(function($carry,$classLesson){
                                                    return $carry + $classLesson->attendances()->count();
                                                },0)}}
                                                </div>
                                                <div class="progress">
                                                    <div class="determinate" style="width: {{$lesson->classLessons->where('class_id',$class->id)->reduce(function($carry,$classLesson){
                                                    return $carry + $classLesson->attendances()->where('status',1)->count();
                                                },0)*100/$lesson->classLessons->where('class_id',$class->id)->reduce(function($carry,$classLesson){
                                                    return $carry + $classLesson->attendances()->count();
                                                },0)}}%"></div>
                                                </div>
                                            @endif
                                        @else
                                            Không có lớp nào
                                        @endif
                                    </li>
                                @endforeach
                            </ul>
                        @else

                            Chưa kích hoạt
                        @endif
                    </div>
                </li>
            @endforeach
        </ul>


    </div>
    <script>
        $(document).ready(function () {
            $('.collapsible').collapsible({
                accordion: false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
            });
            $(document).ready(function () {
                $('select').material_select();
                $("#gen-select").change(function () {
                    if ($(this).val() != '') {
                        window.location.href = $(this).val();
                    }
                });
            });
        });

    </script>
@endsection