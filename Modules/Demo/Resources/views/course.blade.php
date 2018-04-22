@extends('demo::layouts.master') @section('content')
<div class="page-header page-header-xs" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1510991179Dz6rALtf43ja91K.jpg'); box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.15);">
    <div class="container">
        <br>
        <br>
        <div class="row">
            <div class="col-md-8" style="margin-top:10%">
                <h2 style="font-weight:600; color:#ffffff!important">
                    <b>{{$course['name']}}</b>
                </h2>
                <br>
                <h5 class="description" style="font-weight:100; color:#ffffff!important">Đăng ký khóa học {{$course['name']}}</h5>
                <br>
            </div>
        </div>
    </div>
</div>
<br>
<br>
<div class="container" id="class-list">
    @foreach($bases as $base) {{$base->classes()->where('course_id',$course_id)->where('gen_id',$current_gen_id)->count() ==
    0}}
    <h3>{{$base->name}} : {{$base->address}}</h3>
    <br>
    <div class="row">
        @foreach($base->classes()->where('status',1)->where('course_id',$course_id)->where('gen_id',$current_gen_id)->orderBy('created_at','asc')->get()
        as $class)
        <div class="col-md-6">
            <div style="background:white; margin-bottom:20px; border-radius:20px; padding:3%">
                <div>
                    <div style="display:flex;flex-direction:row">
                        <div style="margin-right:20px; border-radius:25px">
                            <img src="{{$course->icon_url}}" style="border-radius:50%; height:100px;width:100px" />
                        </div>
                        <div>
                            <h5 style="font-weight:600; margin-top:10px">Lớp {{$class->name}}</h5>
                            <p>
                                <i class="fa fa-clock-o"></i>
                                <b>Khai giảng ngày:
                                </b> {{date("d-m-Y", strtotime($class->datestart))}}

                                <br>

                                <i class="fa fa-calendar"></i>
                                <b>Lịch học:</b> {{$class->study_time}}

                                <br>

                                <i class="fa fa-map-marker"></i>
                                <b>Địa điểm:</b> {{$class->base->name}} : {{$class->base->address}}
                                <br>
                                <br>
                            </p>
                            @if($class->status == 1)
                            <a class="btn btn-round btn-danger" style="background-color:#FF6D00;border-color:#FF6D00" 
                                href="/register/{{$class->id}}/{{$campaign_id}}/{{$saler_id}}">
                                <i class="fa fa-plus"></i> Đăng ký
                            </a>
                            @else
                            <a class="btn btn-round" href="#" onClick="return false;">
                                <i class="fa fa-plus"></i> Hết chỗ </a>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @endforeach
</div>
@endsection 