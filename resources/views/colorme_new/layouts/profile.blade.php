@extends('colorme_new.layouts.master')

@section('content')
    <div class="container-fluid">
        <div class="row au-first right-image"
             style="height: 300px; background-image: url('https://static.photocdn.pt/images/articles/2017/04/28/iStock-516651882.jpg')">
            <div style="text-align: center; padding-top: 30px; padding-bottom: 20px; color:white; z-index:999999; background:rgba(0,0,0,0.3)">
                <div style="background: url('{{$user_profile->avatar_url}}') center center / cover; width: 100px; height: 100px; border-radius: 50px; display: inline-block;"></div>
                <h2>{{$user_profile->name}}</h2>
                <div>{{$user_profile->university}}</div>

                <div style="padding-top: 20px;">
                    @if (isset($user) && $user->id == $user_profile->id)
                        <button class="btn btn-success" id="button-open-cv">Tạo CV</button>
                    @endif
                </div>

                <p style="padding: 20px; font-size: 22px;"></p>
            </div>
        </div>
        <div class="row" id="bl-routing-wrapper">
            <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                <a class="routing-bar-item" href="/profile/{{$user_profile->username}}"
                   style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Tiến
                    độ</a>
                <span style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span>
                <a
                        class="routing-bar-item" href="/profile/{{$user_profile->username}}/project"
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">
                    Dự án
                </a>
                <span style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span>
                <a
                        class="routing-bar-item" href="/profile/{{$user_profile->username}}/info"
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">
                    Thông tin
                </a>
                <span style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span>
                <a
                        class="routing-bar-item" href="/profile/{{$user_profile->username}}/attendance"
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">
                    Điểm danh
                </a>

            </div>
        </div>
    </div>
    <div style="margin-top: 50px">
        @yield('content_profile')
    </div>

@endsection