@extends('layouts.app')

@section('title','Danh sách môn học')

@section('content')
    <h3 class="header">
        Môn
    </h3>
    <div class="row">
        <p>Tổng số môn: <strong>{{$total}}</strong></p>

        <p><a href="{{url('manage/addcourse')}}" class="waves-effect waves-light btn red lighten-1"><i
                        class="tiny-icons left fa fa-plus"></i>Thêm môn mới</a></p>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Ảnh</th>
                <th>Icon</th>
            </tr>
            </thead>

            <tbody>
            @foreach($courses as $course)
                <tr>
                    <td><a href="{{url('manage/editcourse/'.$course->id)}}">{{$course->name}}</a></td>
                    <td>{{$course->description}}</td>
                    <td>{{currency_vnd_format($course->price)}}</td>
                    <td><img src="{{$course->image_url}}" width="100"/></td>
                    <td><img src="{{$course->icon_url}}" width="50"/></td>
                </tr>
            @endforeach
            </tbody>
        </table>
        <ul class="pagination">
            @if($current_page != 1)
                <li><a class="waves-effect" href="{{url('manage/courses/'.($current_page-1))}}"><i
                                class="material-icons">chevron_left</i></a></li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
            @endif
            @for($i=1;$i<=$num_pages;$i++)
                @if($current_page == $i)
                    <li class="active"><a href="#!">{{$i}}</a></li>
                @else
                    <li><a class="waves-effect" href="{{url('manage/courses/'.$i)}}">{{$i}}</a></li>
                @endif
            @endfor
            @if($current_page != $num_pages)
                <li><a class="waves-effect" href="{{url('manage/courses/'.($current_page+1))}}"><i
                                class="material-icons">chevron_right</i></a>
                </li>
            @else
                <li class="disabled"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
            @endif
        </ul>
    </div>
    <h3 class="header">
        Landing Page
    </h3>
    <div class="row">
        <p><a href="{{url('/manage/landing-create')}}" class="waves-effect waves-light btn red lighten-1"><i
                        class="tiny-icons left fa fa-plus"></i>Tạo landing page</a></p>
        <table class="responsive-table striped">
            <thead>
            <tr>
                <th>ID</th>
                <th>Môn học</th>
                <th>Link</th>
                <th>Hành động</th>
            </tr>
            </thead>

            <tbody>
            @foreach($landing as $landing)
                <tr>
                    <td>{{$landing->id}}</td>
                    <td>{{$landing->course->name}}</td>
                    @if($landing->seo_url == null)
                        <td><a href="{{url('/landing'.'/'.$landing->course->name.'/?id='.$landing->id)}}"
                               target="_blank">{{url('/landing'.'/'.$landing->course->name.'/?id='.$landing->id)}}</a>
                        </td>
                    @else
                        <td><a href="{{url('/landing'.'/'.$landing->seo_url.'/?id='.$landing->id)}}"
                               target="_blank">{{url('/landing'.'/'.$landing->seo_url.'/?id='.$landing->id)}}</a>
                        </td>
                    @endif
                    <td><a href="{{url('/manage/landing-edit/'.$landing->id)}}" class="btn red accent-2">Sửa</a>
                        <a href="{{url('/manage/landing-duplicate/'.$landing->id)}}" class="btn"
                             style="margin-left: 5px" disabled>Nhân đôi
                        </a>
                        <a href="{{url('/manage/landing-delete/'.$landing->id)}}" class="btn brown darken-4">Xóa</a>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>


@endsection
