@extends('layouts.app')

@section('title','Quản lý nhân sự')

@section('content')
    <div class="row">
        <div class="input-field col s12">
            <select id="gen-select">
                @foreach($gens as $gen)
                    <option value="{{url('manage/comment?gen_id='.$gen->id)}}"
                            {{$gen->id == $current_gen->id?"selected":""}}>Khoá {{$gen->name}}</option>
                @endforeach
            </select>
            <label>Khoá</label>
        </div>
    </div>

    <div class="row">
        <div class="input-field col s12">
            <select id="class-select">
                @foreach($classes as $class)
                    <option value="{{url('manage/comment?gen_id='.$current_gen->id.'&class_id='.$class->id)}}"
                            {{$class->id == $current_class->id?"selected":""}}>Lớp {{$class->name}}</option>
                @endforeach
            </select>
            <label>Lớp</label>
        </div>
    </div>



    <h5>Danh sách bài viết</h5>
    <div class="row">
        <table class="striped">
            <thead>
            <tr>
                <th></th>
                <th>Giảng viên</th>
                <th></th>
                <th>Trợ giảng</th>
                <th>lớp</th>
                <th>topic</th>
                <th>bài</th>
                <th>comment</th>
            </tr>
            </thead>
            @foreach($posts as $post)
                <tr>
                    <td>
                        @if ($post->teacher)
                            <img src="{{$post->teacher->avatar_url ? $post->teacher->avatar_url : "http://api.colorme.vn/img/user.png"}}"
                                 style="border-radius:20px;width:40px;height: 40px;"/>
                        @endif
                    </td>
                    <td>
                        @if($post->hasTopic)
                            @if ($post->teacher)
                                {{$post->teacher->name}}
                            @else
                                Lớp này không có giảng viên
                            @endif
                        @else
                            Bài nảy không nộp vào topic nào
                        @endif
                    </td>
                    <td>
                        @if ($post->assist)
                            <img src="{{$post->assist->avatar_url ? $post->assist->avatar_url : "http://api.colorme.vn/img/user.png"}}"
                                 style="border-radius:20px;width:40px;height: 40px;"/>
                        @endif
                    </td>
                    <td>
                        @if($post->hasTopic)
                            @if ($post->assist)
                                {{$post->assist->name}}
                            @else
                                Lớp này không có trợ giảng
                            @endif
                        @else
                            Bài nảy không nộp vào topic nào
                        @endif
                    </td>
                    <td>
                        @if($post->hasTopic)
                            @if ($post->class->group)
                                <a target="_blank"
                                   href="{{url('group/'.$post->class->group->link)}}">{{$post->class->name}}</a>
                            @else
                                Lớp này không có nhóm
                            @endif
                        @else
                            Bài nảy không nộp vào topic nào
                        @endif
                    </td>
                    <td>
                        @if($post->hasTopic)
                            <a target="_blank"
                               href="{{url('post/'.convert_vi_to_en($post->topic->title).'-'.$post->id)}}">{{$post->topic->title}}</a>
                        @else
                            Bài nảy không nộp vào topic nào
                        @endif
                    </td>
                    <td>{{$post->title}}</td>
                    <td>
                        @if($post->hasTopic)
                            @if($post->teacher_comments->count() == 0 && $post->assist_comments->count() == 0)
                                <div style="background-color: #c50000;text-align: center;
                                width:100px!important;border-radius:5px;padding:8px 4px 2px 4px;width: 30px">
                                    <i style="color:white"
                                       class="material-icons">message</i>
                                    <span style="color:white;position: relative;top:-7px;">
                                            {{$post->created_at != '0000-00-00 00:00:00' ?
                                            ceil(diffDate(date('Y-m-d H:i:s'),$post->created_at))+24:0}}h
                                        </span>
                                </div>
                            @else
                                @if($post->teacher_comments->count() != 0)
                                    <strong>Giảng viên:</strong> đă comment: <br>
                                    <ul class="collection">
                                        @foreach($post->teacher_comments as $comment)
                                            <li class="collection-item">
                                                <span>{!!$comment->content!!}</span><br>
                                                <div style="padding: 5px 10px;background:#00897b;color: white;width: 120px">
                                                    <strong>{{(timeRange($post->created_at, $comment->created_at))}}</strong>
                                                </div>
                                            </li>
                                        @endforeach
                                    </ul>
                                @endif

                                @if($post->assist_comments->count() != 0)
                                    <strong>Trợ giảng:</strong> đã comment:<br>
                                    <ul class="collection">
                                        @foreach($post->assist_comments as $comment)
                                            <li class="collection-item">
                                                <span>{!!$comment->content!!}</span><br>
                                                <div style="padding: 5px 10px;background:#00897b;color: white;width: 120px">
                                                    <strong>{{(timeRange($post->created_at, $comment->created_at))}}</strong>
                                                </div>
                                            </li>
                                        @endforeach
                                    </ul>
                                @endif

                            @endif
                        @else
                            Bài nảy không nộp vào topic nào
                        @endif

                    </td>
                </tr>
            @endforeach
            <tbody>

            </tbody>
        </table>
    </div>
    {{$postsPagninate->links()}}

    <script>
        $(document).ready(function () {
            $('select').material_select();
            $("#gen-select").change(function () {
                if ($(this).val() != '') {
                    window.location.href = $(this).val();
                }
            });
            $("#class-select").change(function () {
                if ($(this).val() != '') {
                    window.location.href = $(this).val();
                }
            });
        });
    </script>

@endsection