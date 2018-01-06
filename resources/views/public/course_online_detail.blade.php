@extends('layouts.2018-public')

@section('content')
    <div>
        <div class="container-fluid">
            <div class="row au-first right-image"
                 style="height: 300px; background-image: url('{{$course->cover_url}}')">
            </div>
            <div class="row" id="bl-routing-wrapper">
                <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                    <a class="routing-bar-item" href="#first-after-nav"
                       style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Thông
                        tin</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#pick-class"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Đăng
                        kí</a>
                </div>
            </div>
            <br> <br>
        </div>
        <div class="container" id="first-after-nav">
            <div class="row">
                <div class="col-md-1">
                </div>
                <div class="col-md-10">
                    <div class="row">
                        <div class="col-md-12">
                            <h1 class="landing-title">{{$lesson_selected->name}}</h1>
                            <p>{{$lesson_selected->description}}</p>
                            <br>
                        </div>
                        <div class="col-md-8">
                            <div class='embed-container'>
                                <iframe src='{{$lesson_selected->video_url}}'
                                        frameborder='0' webkitAllowFullScreen mozallowfullscreen
                                        allowFullScreen></iframe>
                            </div>
                            <br>
                            <br>
                            <div>
                                {!! convert_image_html($lesson_selected->detail) !!}}
                            </div>
                            <br>
                            <p></p>
                            <div class="comments">
                                <div class="comment-wrap">
                                    <div class="photo">
                                        <div class="avatar"
                                             style="background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg')"></div>
                                    </div>
                                    <div class="comment-block">
                                        <form action="">
                                            <textarea name="" id="" cols="30" rows="3"
                                                      placeholder="Đặt câu hỏi"></textarea>
                                        </form>
                                    </div>
                                </div>

                                <div class="comment-wrap">
                                    <div class="photo">
                                        <div class="avatar"
                                             style="background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/jsa/128.jpg')"></div>
                                    </div>
                                    <div class="comment-block  product-item">
                                        <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Iusto temporibus iste nostrum dolorem natus recusandae incidunt
                                            voluptatum. Eligendi voluptatum ducimus architecto tempore, quaerat
                                            explicabo veniam fuga corporis totam reprehenderit quasi
                                            sapiente modi tempora at perspiciatis mollitia, dolores voluptate. Cumque,
                                            corrupti?</p>
                                        <div class="bottom-comment">
                                            <div class="comment-date">Aug 24, 2014 @ 2:35 PM</div>
                                            <ul class="comment-actions">
                                                <li class="complain">Thích</li>
                                                <li class="reply">Trả lời</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="comment-wrap">
                                    <div class="photo">
                                        <div class="avatar"
                                             style="background-image: url('https://s3.amazonaws.com/uifaces/faces/twitter/felipenogs/128.jpg')"></div>
                                    </div>
                                    <div class="comment-block  product-item">
                                        <p class="comment-text">Lorem ipsum dolor sit amet, consectetur adipisicing
                                            elit. Iusto temporibus iste nostrum dolorem natus recusandae incidunt
                                            voluptatum. Eligendi voluptatum ducimus architecto tempore, quaerat
                                            explicabo veniam fuga corporis totam.</p>
                                        <div class="bottom-comment">
                                            <div class="comment-date">Aug 23, 2014 @ 10:32 AM</div>
                                            <ul class="comment-actions">
                                                <li class="complain">Thích</li>
                                                <li class="reply">Trả lời</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            @foreach($course->terms()->orderBy('order')->get() as $term)
                                <div class="course-term">
                                    <a data-toggle="collapse" href="#collapse{{$term->id}}"
                                       class="{{$term->id == $lesson_selected->term->id ? '' : 'collapsed'}} "
                                       aria-expanded="{{$term->id == $lesson_selected->term->id ? 'true' : 'false'}}">
                                        <div style="background:#138edc; color:white; padding:10px">
                                            <div style="display: flex; flex-direction: row; justify-content: space-between">
                                                <div>
                                                    <p style="font-weight: 600; font-size:18px">{{$term->name}}</p>
                                                    <p style="font-weight: 200;">{{$term->short_description}}</p>
                                                </div>
                                                <div>
                                                    <i style="font-size:25px" class="fa fa-angle-down"
                                                       aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <br>
                                    <div id="collapse{{$term->id}}"
                                         aria-expanded="{{$term->id == $lesson_selected->term->id ? 'true' : 'false'}}"
                                         class="collapse {{$term->id == $lesson_selected->term->id ? 'in' : ''}}">
                                        @foreach($term->lessons()->orderBy('order')->get() as $lesson)

                                            <a href="/elearning/{{$course->id}}/{{$lesson->id}}"
                                               style="color:black; display: flex; flex-direction: row; cursor: pointer">
                                                <div style="font-size:20px;color:#138edc;">
                                                    <i class="fa fa-check-circle" aria-hidden="true"></i>
                                                </div>
                                                <div style="padding-left: 10px">
                                                    <p style="font-weight: 600">{{$lesson->name}}</p>
                                                    <p>{{$lesson->description}}</p>
                                                </div>
                                            </a>
                                        @endforeach
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
            <br><br><br>
        </div>
    </div>
@endsection