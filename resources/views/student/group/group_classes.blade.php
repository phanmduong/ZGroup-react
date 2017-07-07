@extends('layouts.public')

@section('title','Lớp học')

@section('header','Giáo trình')

@section('content')
    <div class="container">
        <div class="row">
            @foreach($classes as $class)
                <div class="col s12 m6 l4">
                    <div class="card">
                        <div class="card-image">
                            <img src="{{$class->course->image_url}}">
                        </div>
                        <div class="card-content">
                            <h5>Lớp {{$class->name}}</h5>
                            @if($class->teach)
                                <p>Giảng viên: <b>{{$class->teach->name}}</b></p>
                            @else
                                <p>Giảng viên: <b>Chưa cập nhật</b></p>
                            @endif
                            @if($class->assist)
                                <p>Trợ giảng: <b>{{$class->assist->name}}</b></p>
                            @else
                                <p>Giảng viên: <b>Chưa cập nhật</b></p>
                            @endif
                            <p><i class="material-icons tiny">access_time</i> {{$class->study_time}}</p>
                            <p><i class="material-icons tiny">place</i> {{$class->classroom}}: {{$class->base->address}}
                            </p>
                        </div>
                        <div class="card-action">
                            <a href="{{url('group/class/'.$class->id)}}">Vào lớp</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
@endsection