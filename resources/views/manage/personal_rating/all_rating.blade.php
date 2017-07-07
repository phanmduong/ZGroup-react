@extends('layouts.app')

@section('title','Đánh giá')

@section('content')
    <div>Lớp: <strong>{{$class->name}}</strong></div>
    @if($role == 't')
        <div>Giảng viên: <strong>{{$class->teach->name}}</strong></div>
        <ul class="collection">
            @foreach($class->registers()->where('rating_teacher','>',-1)->get() as $register)
                <li class="collection-item avatar">
                    <img src="{{!empty($register->user->avatar_url)?$register->user->avatar_url:url('img/user.png')}}"
                         alt="" class="circle">
                    <span class="title">
                        <a class="username"
                           href="{{url('profile/'.get_first_part_of_email($register->user->email))}}
                                   ">{{$register->user->name}}
                        </a>
                    </span>
                    <p>
                        <span style="color:{{rating_color($register->rating_teacher)}}">
                        {{number_format($register->rating_teacher,1)}}
                            <i class="fa fa-star" aria-hidden="true"></i>
                        </span>
                        <br>
                        {{$register->comment_teacher}}
                    </p>
                </li>
            @endforeach
        </ul>
    @elseif($role == 'ta')
        <div>Trợ giảng: <strong>{{$class->assist->name}}</strong></div>
        <ul class="collection">
            @foreach($class->registers()->where('rating_ta','>',-1)->get() as $register)
                <li class="collection-item avatar">
                    <img src="{{!empty($register->user->avatar_url)?$register->user->avatar_url:url('img/user.png')}}"
                         alt="" class="circle">
                    <span class="title">
                        <a class="username"
                           href="{{url('profile/'.get_first_part_of_email($register->user->email))}}
                                   ">{{$register->user->name}}
                        </a>
                    </span>
                    <p>
                        <span style="color:{{rating_color($register->rating_ta)}}">
                            {{number_format($register->rating_ta,1)}} <i class="fa fa-star"
                                                                         aria-hidden="true"></i>
                        </span>
                        <br>
                        {{$register->comment_ta}}
                    </p>
                </li>
            @endforeach
        </ul>
    @endif
@endsection
