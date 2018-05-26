@extends('layouts.app')

@section('title',$action.' landing page')

@section('content')
    <h3 class="header">
        {{$action}} landing page
    </h3>
    <div class="row">
        <form action="{{url('/manage/landing-store')}}" method="post" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="<?php echo csrf_token(); ?>">
            <input type="hidden" name="id" value="{{(isset($landing)?$landing->id:-1)}}">
            <div><h4>Môn học</h4></div>
            <div class="row">
                <div class="input-field col s12 m6">
                    <select class="icons" name="course_id" required>
                        <option value="" disabled selected>Chọn một môn</option>
                        @foreach($courses as $course)
                            <option value="{{$course->id}}" data-icon="{{$course->icon_url}}"
                                    class="circle" {{(isset($landing) && $landing->course_id == $course->id)?"selected":''}}>{{$course->name}}</option>
                        @endforeach
                    </select>
                    <label>Đây là landing page của môn:</label>
                </div>
            </div>
            <div class="file-field input-field">
                <div class="btn">
                    <span>Cover Landing</span>
                    <input type="file" name="cover_promo">
                </div>
                <div class="file-path-wrapper">
                    <input class="file-path validate" type="text"
                           value="{{isset($landing)?$landing->cover_promo_url:''}}">
                </div>
            </div>
            <div><h4>Embbed iframe code from youtube</h4></div>
            <div class="row">
                <div class="input-field col s6">
                    <input value="{{isset($landing)?$landing->video_url:''}}" id="video_url" type="text"
                           class="validate"
                           name="video_url">
                    <label class="active" for="policy">Video URL</label>
                </div>
            </div>
            <!-- Reason -->
            <div><h4>Lý do học môn này tại colorME</h4></div>
            @for($i = 1; $i <= 3; $i++)
                <div class="row">
                    <div class="input-field col s6">
                        <input value="{{isset($reasons)?$reasons['reason_name'.$i]:''}}"
                               id="reason_name{{$i}}" type="text" class="validate"
                               name="reason_name{{$i}}">
                        <label class="active" for="reason_name{{$i}}">Lý do {{$i}}</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input value="{{isset($reasons)?$reasons['reason_detail'.$i]:''}}"
                               id="reason_detail{{$i}}" type="text" class="validate"
                               name="reason_detail{{$i}}">
                        <label class="active" for="reason_detail{{$i}}">Giải thích lý do {{$i}}</label>
                    </div>
                </div>
                <div class="file-field input-field">
                    <div class="btn">
                        <span>Hình mô tả lý do {{$i}}</span>
                        <input type="file" name="reason_img{{$i}}">
                    </div>
                    <div class="file-path-wrapper">
                        <input class="file-path validate" type="text"
                               value="{{isset($reasons)?$reasons['reason_img_url'.$i]:''}}">
                    </div>
                </div>
                <div style="height: 100px"></div>
                @endfor
                        <!-- Demo Product -->
                <div><h4>Bài tập học viên</h4></div>
                @for($i = 1; $i <= 6; $i++)
                    <div class="row">
                        <div class="input-field col s6">
                            <input value="{{isset($demos)?$demos['demo'.$i]:''}}" id="demo{{$i}}" type="text"
                                   class="validate" name="demo{{$i}}">
                            <label class="active" for="demo{{$i}}">Bài tập học viên {{$i}}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input value="{{isset($demos)?$demos['demo_preview'.$i]:''}}" id="demo_preview{{$i}}"
                                   type="text" class="validate" name="demo_preview{{$i}}">
                            <label class="active" for="demo_preview{{$i}}">Link preview demo {{$i}}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input value="{{isset($demos)?$demos['demo_author'.$i]:''}}" id="demo_author{{$i}}"
                                   type="text"
                                   class="validate" name="demo_author{{$i}}">
                            <label class="active" for="demo_author{{$i}}">Tác giả demo {{$i}}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input value="{{isset($demos)?$demos['demo_author_gen'.$i]:''}}" id="demo_author_gen{{$i}}"
                                   type="text" class="validate" name="demo_author_gen{{$i}}">
                            <label class="active" for="demo_author_gen{{$i}}">Chi tiết về tác giả {{$i}}</label>
                        </div>
                    </div>
                    <div style="height: 100px"></div>
                    @endfor
                            <!--Timeline-->
                    <input type="hidden" value="{{isset($landing) ? $landing->class_number : 1}}" name="class_number"
                           id="class_number">
                    <?php $loop = isset($landing) ? $landing->class_number : 1?>
                    <div><h4>Timeline buổi học</h4></div>
                    @for($i = 1; $i <= $loop; $i++)
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="{{isset($timeline)?$timeline['class_name'.$i]:''}}" id="class_name{{$i}}"
                                       type="text" class="validate" name="class_name{{$i}}">
                                <label class="active" for="class_name{{$i}}">Tên buổi {{$i}}</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="{{isset($timeline)?$timeline['class_detail'.$i]:''}}"
                                       id="class_detail{{$i}}"
                                       type="text" class="validate" name="class_detail{{$i}}">
                                <label class="active" for="class_detail{{$i}}">Chi tiết buổi {{$i}}</label>
                            </div>
                        </div>
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>Ảnh minh họa buổi {{$i}}</span>
                                <input type="file" name="class_img{{$i}}">
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text"
                                       value="{{isset($timeline)?$timeline['class_img_url'.$i]:''}}">
                            </div>
                        </div>
                        <div style="height: 100px"></div>
                        {{--<hr style="color:red;">--}}
                    @endfor
                    <div id="add-class" class="btn">Thêm lớp</div>

                    <!--Feedback-->
                    <div><h4>Feedback học viên</h4></div>
                    @for($i = 1; $i <= 3; $i++)
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="{{isset($feedbacks)?$feedbacks['feedback_author'.$i]:''}}"
                                       id="feedback_author{{$i}}" type="text" class="validate"
                                       name="feedback_author{{$i}}">
                                <label class="active" for="feedback_author{{$i}}">Feedback author {{$i}}</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="{{isset($feedbacks)?$feedbacks['feedback_detail'.$i]:''}}"
                                       id="feedback_detail{{$i}}" type="text" class="validate"
                                       name="feedback_detail{{$i}}">
                                <label class="active" for="feedback_detail{{$i}}">Feedback detail {{$i}}</label>
                            </div>
                        </div>
                        <div class="file-field input-field">
                            <div class="btn">
                                <span>Feedback avatar {{$i}}</span>
                                <input type="file" name="feedback_ava{{$i}}">
                            </div>
                            <div class="file-path-wrapper">
                                <input class="file-path validate" type="text"
                                       value="{{isset($feedbacks)?$feedbacks['feedback_ava_url'.$i]:''}}">
                            </div>
                        </div>
                        <div style="height: 100px"></div>
                    @endfor
                    <div><h4>Chính sách giá</h4></div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input value="{{isset($landing)?$landing->policy:''}}" id="policy" type="text"
                                   class="validate"
                                   name="policy">
                            <label class="active" for="policy">Chính sách giá</label>
                        </div>
                    </div>
                    <div><h4>Seo URL</h4></div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input value="{{isset($landing)?$landing->seo_url:''}}" id="seo_url" type="text"
                                   class="validate"
                                   name="seo_url">
                            <label class="active" for="policy">SEO URL</label>
                        </div>
                    </div>
                    <div>
                        <input type="submit" value="Lưu" class="btn">
                    </div>
        </form>
    </div>

    <script>
        //        $(document).ready(function () {
        //            Materialize.updateTextFields();
        //        });
        $(document).ready(function () {
            $('select').material_select();
        });
        var initCount = {{isset($landing)?$landing->class_number:1}} +0;
        var count = initCount + 1;

        $('#add-class').click(function () {
            var new_class = '<div class="row"><div class="input-field col s6"><input value="" id="class_name' + count + '" type="text" class="validate" name="class_name' + count + '"><label class="active" for="class_name' + count + '">Tên buổi ' + count + '</label></div></div><div class="row"><div class="input-field col s6"><input value="" id="class_detail' + count + '" type="text" class="validate" name="class_detail' + count + '"><label class="active" for="class_detail' + count + '">Chi tiết buổi ' + count + '</label></div></div><div class="file-field input-field"><div class="btn"><span>Ảnh minh họa buổi ' + count + '</span><input type="file" name="class_img' + count + '"></div><div class="file-path-wrapper"><input class="file-path validate" type="text" value=""></div></div><div style="height: 100px"></div>';
            $(new_class).insertBefore('#add-class');
            $('#class_number').val(count);
            count++;
        });
    </script>
@endsection
