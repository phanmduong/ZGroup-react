@extends('demo::layouts.master')

@section('content')
    <div class="container">
        <div class="row au-first right-image"
             style="height: 300px; background-image: url({{$gen_cover}});">
        </div>
        <div class="row" id="bl-routing-wrapper">
            <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                <a class="routing-bar-item" href="#first-after-nav"
                   style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Khoá
                    học</a><span
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span><a
                        class="routing-bar-item" href="/posts/7"
                        style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Học
                    viên</a>
            </div>
        </div>
        <div id="first-after-nav"></div>
        @foreach($categories as $category)
            <div class="row">
                        <div class="col-md-12">
                            <h3>{{$category->name}}</h3>
                        </div>
                        @foreach($category->courses as $course)
                            @if($course->status == 1)
                            <div class="col-md-4">
    					<div class="card card-profile card-plain">
    						<div class="card-img-top">
    							<a href="/course/{{convert_vi_to_en($course->name)}}{{isset($saler_id) && isset($campaign_id) ? '/'.$saler_id.'/'.$campaign_id : ''}}">
    								<img class="img" src="{{$course->image_url}}" />
    							</a>
    						</div>
    						<div class="card-body">
    							<h4 class="card-title">{{$course->name}}</h4>
    							<h6 class="card-category">{{$course->duration}} buổi</h6>
                                <p class="card-description">
                                                    {{$course->description}}
                                </p>
    							<div class="card-footer">
    								<a href="#pablo" class="btn btn-neutral btn-link btn-just-icon"><i class="fa fa-linkedin"></i></a>
    								<a href="#pablo" class="btn btn-neutral btn-link btn-just-icon"><i class="fa fa-facebook"></i></a>
    								<a href="#pablo" class="btn btn-neutral btn-link btn-just-icon"><i class="fa fa-dribbble"></i></a>
    							</div>
    						</div>
    					</div>
    				</div>
                            @endif
                        @endforeach
                    </div>
        @endforeach                
    </div>
@endsection