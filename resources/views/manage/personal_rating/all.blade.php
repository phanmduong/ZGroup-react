@extends('layouts.app')

@section('title','Đánh giá')

@section('content')
    <h3 class="header">Đánh giá</h3>
    <div class="row">
        <div class="col s12">
            <h5>Giảng viên</h5>
        </div>
        @foreach($teachers as $teacher)
            <div class="col s12 m4">
                <div class="card-panel" style="padding:8px 12px 22px 12px">
                    <img src="{{!empty($teacher->avatar_url)?$teacher->avatar_url:url('img/user.png')}}"
                         style="height:50px;width:50px;margin:4px 10px 4px 0px;float:left" class="circle">
                    <div style="padding-top:5px">
                        <a class="username"
                           href="{{url('manage/ratingdetail?r=t&id='.$teacher->id)}}">{{$teacher->name}}</a>
                    </div>
                    <div><strong
                                style="color:{{rating_color($teacher->rating_avg)}}">{{number_format($teacher->rating_avg,1)}}
                            <i class="fa fa-star" aria-hidden="true"></i></strong>
                        - <span style="color:#9b9b9b">{{$teacher->rating_number}} lượt đánh giá</span></div>
                </div>
            </div>
        @endforeach


        <div class="row">
            <div class="col s12">
                <h5>Trợ giảng</h5>
            </div>
            @foreach($assistants as $assistant)
                <div class="col s12 m4">
                    <div class="card-panel" style="padding:8px 12px 22px 12px;">
                        <img src="{{!empty($assistant->avatar_url)?$assistant->avatar_url:url('img/user.png')}}"
                             style="height:50px;width:50px;margin:4px 10px 4px 0px;float:left" class="circle">
                        <div style="padding-top:5px">
                            <a class="username"
                               href="{{url('manage/ratingdetail?r=ta&id='.$assistant->id)}}">{{$assistant->name}}</a>
                        </div>
                        <div><strong
                                    style="color:{{rating_color($assistant->rating_avg)}}">{{number_format($assistant->rating_avg,1)}}
                                <i class="fa fa-star"
                                   aria-hidden="true"></i></strong></strong>
                            - <span style="color:#9b9b9b">{{$assistant->rating_number}} lượt đánh giá</span></div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection
