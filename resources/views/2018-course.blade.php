@extends('layouts.2018-public')

@section('content')

    {!! $course->detail !!}
    <div style="" id="pick-class">
        <br> <br>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-10">
                        <div class="row">
                            <h2 class="landing-title" class="section-heading">Chọn cơ sở gần bạn<br>Sau đó chọn lớp
                                phù hợp</h2>
                            @foreach($bases as $base)
                                {{$base->classes()->where('course_id',$course_id)->where('status', 1)->orderBy('gen_id', 'desc')->orderBy('name','desc')->count() == 0}}
                                <h3>{{$base->name}} : {{$base->address}}</h3><br>
                                <div class="row">
                                    @foreach($base->classes()->where('course_id',$course_id)->where('status', 1)->orderBy('gen_id', 'desc')->orderBy('name','desc')->get() as $class)
                                        <div class="col-md-6" style="margin-bottom: 20px">
                                            <div class="product-item" style="padding: 5%">
                                                <div class="card-body">
                                                    <a href="#">
                                                        <img width="60" height="60" style="display: inline-block; margin-right:10px"
                                                             class="media-object img-circle"
                                                             src="{{$course->icon_url}}"
                                                             alt="avatar url"></a>
                                                    <h4 class="card-title" style="display: inline">Lớp {{$class->name}}</h4>
                                                    <br>
                                                    <ul class="class-item-info">
                                                        <li><span class="glyphicon glyphicon-time"></span>
                                                            <strong>Thời gian:</strong> {{$class->study_time}}
                                                        </li>
                                                        <li><span class="glyphicon glyphicon-map-marker"></span>
                                                            <strong>{{$class->base->name}}:</strong> {{$class->base->address}}
                                                        </li>
                                                        <li><span class="glyphicon glyphicon-calendar"></span>
                                                            <strong>Khai giảng ngày:</strong> {{date("d/m/Y", strtotime($class->datestart))}}
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="card-footer">
                                                    <a href="{{url('/classes/register/'.$class->id."/".$saler_id."/".$campaign_id)}}">
                                                        <button class="btn-register">Đăng ký</button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
    </div>
@endsection