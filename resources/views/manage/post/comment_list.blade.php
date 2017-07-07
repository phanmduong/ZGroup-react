@extends('layouts.app')

@section('title','Quản lý nhân sự')

@section('content')
    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/comment-list?gen_id='.$gen->id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
    </div>

    <div class="row">
        <table class="striped centered">
            <thead>
            <tr>
                <th>Nhân viên</th>
                <th>Lớp</th>
                <th>Tổng</th>
            </tr>
            </thead>

            <tbody>
            @foreach($staffs as $staff)
                <td>{{$staff->name}}</td>
                <td>
                    Giảng viên
                    <ul class="collection">
                        @foreach($staff->teach_classes as $class)
                            <li class="collection-item" style="display: flex;text-align: center">
                                <div style="flex: 1 1 0px">
                                    <img src="{{$class->class->course->icon_url}}"
                                         height="20" width="20" style="border-radius: 10px;top: 5px;position: relative;" alt="">
                                    {{$class->class->name}}
                                </div>

                                <div class="progress" style="flex: 2 2 0px">
                                    <div class="determinate"
                                         style="width: {{ ($class->uncomments + $class->commented) == 0 ? 0 :
                                                 $class->commented*100/($class->uncomments + $class->commented)}}%"></div>
                                </div>

                                <div style="flex: 1 1 0px">{{$class->commented}}/{{$class->uncomments + $class->commented}}</div>
                                <div class="{{$class->uncomments == 0? 'green-text' :'red-text'}}"
                                     style="flex: 1 1 0px">{{currency_vnd_format($class->uncomments * $penalty)}}</div>
                            </li>
                        @endforeach
                    </ul>
                    Trợ giảng
                    <ul class="collection">
                        @foreach($staff->assist_classes as $class)
                            <li class="collection-item" style="display: flex;text-align: center">
                                <div style="flex: 1 1 0px">
                                    <img src="{{$class->class->course->icon_url}}"
                                         height="20" width="20" style="border-radius: 10px;top: 5px;position: relative;" alt="">
                                    {{$class->class->name}}
                                </div>

                                <div class="progress" style="flex: 2 2 0px">
                                    <div class="determinate"
                                         style="width: {{ ($class->uncomments + $class->commented) == 0 ? 0 :
                                                 $class->commented*100/($class->uncomments + $class->commented)}}%"></div>
                                </div>

                                <div style="flex: 1 1 0px">{{$class->commented}}/{{$class->uncomments + $class->commented}}</div>
                                <div class="{{$class->uncomments == 0? 'green-text' :'red-text'}}"
                                     style="flex: 1 1 0px">{{currency_vnd_format($class->uncomments * $penalty)}}</div>
                            </li>
                        @endforeach
                    </ul>
                </td>
                <td>
                    <div class="{{$staff->uncomments == 0? 'green-text' :'red-text'}}">
                        {{currency_vnd_format(($staff->uncomments) * $penalty)}}
                    </div>
                </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>

    <script>
        $(document).ready(function () {
            $('select').material_select();
            $("#gen-select").change(function () {
                if ($(this).val() != '') {
                    window.location.href = $(this).val();
                }
            });
        });
    </script>

@endsection