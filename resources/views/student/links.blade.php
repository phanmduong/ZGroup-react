@extends('layouts.public')

@section('title', 'Link tài liệu')

@section('header','Các link tài liệu')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 m3">
                <div class="collection course-category">
                    @foreach($all_course as $item)
                        @if ($item->id == $course_id)
                            <a href="{{url('/student/links/'.$item->id)}}"
                               class="collection-item active">{{$item->name}}</a>
                        @else
                            <a href="{{url('/student/links/'.$item->id)}}" class="collection-item">{{$item->name}}</a>
                        @endif
                    @endforeach
                </div>
            </div>
            <div class="col s12 m9">
                @if($loop > 0)
                    <ul class="collapsible">

                        @for($i = 0 ; $i < $loop; $i++)
                            <li>
                                <div class="collapsible-header">
                                    <img class="material-icons"
                                         src="{{$links[$i]->link_icon_url}}"
                                         style="display: inline-block;width: 40px; height:40px; border-radius: 50%; position: relative; top: 8px; margin-right: 10px;">
                                    <a href="{{(strpos($links[$i]->link_url,"http") !== false)?$links[$i]->link_url:'//'.$links[$i]->link_url}}" target="_blank">
                                        <span style="display: inline-block; line-height: 20px; position: relative; top: -6px;">
                                            {{$links[$i]->link_name}}
                                        </span>
                                    </a>
                                </div>
                            </li>
                        @endfor
                    </ul>
                @else
                    <h4>Hiện tại môn này chưa có tài liệu!!!</h4>
                @endif
            </div>
            {{--<div class="col s12 m4">--}}
            {{--<h4 class="center">Photoshop</h4>--}}
            {{--@foreach($links as $link)--}}
            {{--@if($link->course_id == 1)--}}
            {{--<div class="row">--}}
            {{--<div class="col s12">--}}
            {{--<div class="card blue darken-2">--}}
            {{--<div class="card-content white-text">--}}
            {{--<span class="card-title">{{$link->link_name}}</span>--}}
            {{--<p>{{$link->link_description}}</p>--}}
            {{--<p>Đường link: <a href="{{$link->link_url}}" target="_blank">Nhấn vào đây</a></p>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--@endif--}}
            {{--@endforeach--}}
            {{--</div>--}}
            {{--<div class="col s12 m4">--}}
            {{--<h4 class="center">Illustrator</h4>--}}
            {{--@foreach($links as $link)--}}
            {{--@if($link->course_id == 2)--}}
            {{--<div class="row">--}}
            {{--<div class="col s12">--}}
            {{--<div class="card orange darken-4">--}}
            {{--<div class="card-content white-text">--}}
            {{--<span class="card-title">{{$link->link_name}}</span>--}}
            {{--<p>{{$link->link_description}}</p>--}}
            {{--<p>Đường link: <a href="{{$link->link_url}}" target="_blank">Nhấn vào đây</a></p>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--@endif--}}
            {{--@endforeach--}}
            {{--</div>--}}
            {{--<div class="col s12 m4">--}}
            {{--<h4 class="center">After Effect</h4>--}}
            {{--@foreach($links as $link)--}}
            {{--@if($link->course_id == 3)--}}
            {{--<div class="row">--}}
            {{--<div class="col s12">--}}
            {{--<div class="card deep-purple darken-4">--}}
            {{--<div class="card-content white-text">--}}
            {{--<span class="card-title">{{$link->link_name}}</span>--}}
            {{--<p>{{$link->link_description}}</p>--}}
            {{--<p>Đường link: <a href="{{$link->link_url}}" target="_blank">Nhấn vào đây</a></p>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--</div>--}}
            {{--@endif--}}
            {{--@endforeach--}}
            {{--</div>--}}

        </div>
    </div>
@endsection