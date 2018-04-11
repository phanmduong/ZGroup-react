@extends('layouts.new_public')

@section('content')
    <div id="page" class="page">
        <div class="pixfort_gym_13 " id="section_gym_2">
            <div class="page_style pix_builder_bg"
                 style="background-image: url(http://d1j8r0kxyu9tj8.cloudfront.net/files/15136564431SU4N9w6HTNSkub.jpg); background-color: rgb(31, 51, 74); padding-top: 0px; padding-bottom: 0px; box-shadow: none; border-color: rgb(68, 68, 68); background-size: cover; background-attachment: fixed; background-repeat: no-repeat;">
                <div class="container">
                    <div class="sixteen columns">
                        <div class="text_page">
                            <h1 class="title"><span class="editContent" style=""><span class="pix_text"
                                                                                       rel="">KHOÁ HỌC {{strtoupper($course['name'])}}</span></span>
                            </h1>
                            <h3 class="subtitle"><span class="editContent" style=""><span class="pix_text" rel="">Chọn lớp học phù hợp với thời gian và vị trí của bạn</span></span>
                            </h3>
                        </div>
                        <div class="one_link">
		                <span class="start_btn ">
		                        <a class="slow_fade pix_text" href="#section_text_2" src="images/13_gym/arrow.png"
                                   style="color: rgb(255, 255, 255); font-size: 18px; background-color: rgb(204, 0, 0); font-family: &quot;Open Sans&quot;, sans-serif;"><span
                                            class="editContent" style="">CHỌN LỚP HỌC</span></a>
		                </span>
                        </div>
                        <div class="arrow_st"><a href="#" id="a_press"><img src="images/13_gym/arrow.png" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="light_gray_bg big_padding pix_builder_bg " id="section_text_2" style="outline-offset: -3px;">
            <div class="container">
                <div class="fourteen columns offset-by-one">
                    @foreach($bases as $base)
                        {{$base->classes()->where('course_id',$course_id)->where('status', 1)->orderBy('gen_id', 'desc')->orderBy('name','desc')->count() == 0}}
                        <h3>{{$base->name}} : {{$base->address}}</h3><br>
                        <div class="row">
                            @foreach($base->classes()->where('course_id',$course_id)->where('status', 1)->orderBy('gen_id', 'desc')->orderBy('name','desc')->get() as $class)
                                <div class="event_box row pix_builder_bg">
                                    <div class="event_box_1 ">
                                        <div class="event_box_img ">
                                            <img src="{{$course->icon_url}}" alt=""
                                                 style="border-radius: 100%; border-color: rgb(68, 68, 68); border-style: none; border-width: 1px; width: 113px; height: 113px;">
                                        </div>
                                    </div>
                                    <div class="event_box_2">
                                        <div class="padding_15 hor_padding">
                                            <h4>
                                                <strong>Lớp {{$class->name}}</strong>
                                            </h4>
                                            <p class="editContent small_text light_gray">
                                                <strong>{{$class->base->name}}:</strong> {{$class->base->address}}
                                                <br>
                                                <strong>Khai giảng ngày:</strong> {{date("d/m/Y", strtotime($class->datestart))}}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="event_box_3">
                                        <div class="hor_padding">
                                            <h4>
                                                <strong>{{$class->study_time}}</strong>
                                            </h4>
                                            <span class="link_3_btn editContent"><a class="slow_fade pix_text"
                                                                                    style="color: #c50000;"
                                                                                    href="{{url('/classes/register/'.$class->id."/".$saler_id."/".$campaign_id)}}">Đăng ký ngay</a></span>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
@endsection