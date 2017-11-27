@extends('alibaba::layouts.master')

@section('content')
    <div class="cd-section section-white page-header page-header-small" id="contact-us">
        <div class="contactus-1 section-image page-header page-header-small"
             style="background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=996&amp;q=80&amp;cs=tinysrgb&amp;crop=')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact">
                            <h3 class="card-title text-center" style="padding-bottom: 30px">Học
                                viên {{$user->name}}</h3>
                            <div class="col-md-9 row" style="margin: auto;">
                                <p>
                                    <img src="{{$course->icon_url}}">
                                    <span style="font-weight: 900">Tên lớp: </span>
                                    {{$studyClass->name}}
                                    &nbsp&nbsp
                                    <span style="font-weight: 900">Thời gian: </span>
                                    {{format_vn_short_datetime(strtotime($register->updated_at))}}
                                    &nbsp&nbsp
                                    <span style="font-weight: 900">Số tiền: </span>
                                    {{$register->money}}
                                    &nbsp&nbsp
                                    @if($register->status == 1)
                                        <strong style="color: green;">(Hoàn thành)</strong>
                                    @else
                                        <strong style="color: #761c19;">(Chưa hoàn thành)</strong>
                                    @endif
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection