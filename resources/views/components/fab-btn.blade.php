<div class="fixed-action-btn" style="bottom: 45px; right: 30px; width: 150px;">
    <a class="btn-floating btn-large right" style="position: relative; right: -7.5px; background-color: #c00002;">
        <i class="large material-icons">view_list</i>
    </a>
    <ul class="center">
        <li><span class="fab-btn">Lớp học</span><a class="btn-floating green"
                                                   href="{{url('group/classes')}}"><i
                        class="material-icons">book</i></a></li>
        <li><span class="fab-btn">Đăng bài</span><a class="btn-floating red"
                                                    href="{{url('product/upload')}}"><i
                        class="material-icons">file_upload</i></a></li>
        <li><span class="fab-btn">Đổi buổi</span><a class="btn-floating yellow darken-1"
                                                    href="{{url('student/classes')}}"><i
                        class="material-icons">schedule</i></a>
        </li>
        <li><span class="fab-btn">Giáo trình</span><a class="btn-floating green"
                                                      href="{{url('student/lessoncontent')}}"><i
                        class="material-icons">layers</i></a></li>
        <li><span class="fab-btn">Tài liệu</span><a class="btn-floating brown"
                                                    href="{{url('student/links')}}"><i
                        class="material-icons">attach_file</i></a>
        </li>
        <li><span class="fab-btn">Đăng ký học</span><a class="btn-floating purple"
                                                       href="{{url('/courses')}}"><i
                        class="material-icons">school</i></a></li>
        {{--@endif--}}
        
        {{--<li><span class="fab-btn">Chia sẻ</span><a class="btn-floating"--}}
        {{--style=" background-color: #3b5998; padding-top: 2px;"--}}
        {{--onClick="window.open('http://www.facebook.com/sharer/sharer.php?s=100&p[url]={{url('profile').'/'.get_first_part_of_email($target_user->email)}}','sharer','toolbar=0,status=0,width=580,height=325');"--}}
        {{--href="javascript: void(0)"><i--}}
        {{--class="fa fa-facebook"></i></a></li>--}}
    </ul>
</div>