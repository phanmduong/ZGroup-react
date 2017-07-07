@extends('layouts.app')

@section('title','Download Survey')

@section('content')
    <h4 class="header">Download survey theo khoá </h4>
    <div>8 Khoá gần nhất</div>
    <ul class="collapsible" data-collapsible="accordion">
        @foreach($surveys as $survey)
            <li>
                <div class="collapsible-header"><i class="material-icons">feedback</i>{{$survey->name}}</div>
                <div class="collapsible-body">
                    <div class="collection">
                        @foreach($gens as $gen)
                            <a href="{{url('manage/downloadsurveyfile?gen_id='.$gen->id.'&survey_id='.$survey->id)}}"
                               class="collection-item">
                                Khoá {{$gen->name}} - <span style="color:#888">{{$gen->survey_users()->where('content','<>','')->where('survey_id','=',$survey->id)->count()}}
                                    học viên đã làm</span>
                            </a>
                        @endforeach
                    </div>
                </div>
            </li>
        @endforeach
    </ul>

    <h4 class="header">Download survey theo lớp</h4>
    <div>8 Khoá gần nhất</div>
    <ul class="collapsible" data-collapsible="accordion">
        @foreach($surveys as $survey)
            <li>
                <div class="collapsible-header"><i class="material-icons">feedback</i>{{$survey->name}}</div>
                <div class="collapsible-body">

                    @foreach($gens as $gen)
                        <ul style="margin:0;border:none" class="collapsible" data-collapsible="accordion">
                            <li>
                                <div class="collapsible-header">Khoá {{$gen->name}}
                                </div>
                                <div class="collapsible-body">
                                    <div class="collection">
                                        @foreach($gen->studyclasses as $class)
                                            <a target="_blank"
                                               href="{{url('manage/downloadsurveyclass?class_id='.$class->id.'&survey_id='.$survey->id)}}"
                                               class="collection-item">
                                                Lớp {{$class->name}}
                                                {{--<span style="color:#888">--}}
                                                    {{--{{--}}
                                                        {{--\Illuminate\Support\Facades\DB::table('survey_users')--}}
                                                            {{--->where('survey_users.status', 1)--}}
                                                            {{--->where('survey_users.gen_id', $gen->id)--}}
                                                            {{--->whereExists(function ($query) use ($class) {--}}
                                                                {{--$query->select(\Illuminate\Support\Facades\DB::raw(1))--}}
                                                                      {{--->from('registers')--}}
                                                                      {{--->whereRaw('registers.user_id = survey_users.user_id')--}}
                                                                      {{--->where('registers.class_id', $class->id);--}}
                                                            {{--})->count()--}}
                                                    {{--}} học viên đã làm--}}
                                                {{--</span>--}}
                                            </a>
                                        @endforeach
                                    </div>
                                </div>
                            </li>
                        </ul>

                    @endforeach
                </div>
                </div>
            </li>
        @endforeach
    </ul>
@endsection
