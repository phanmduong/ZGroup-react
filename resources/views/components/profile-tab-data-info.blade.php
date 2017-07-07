@if($canEdit)
    <a href="{{url('/profile/edit').'/'.$user->id}}"
       id="btn-change-info" class="hvr-round-corners"
       style="cursor: pointer;
         color: white;
         padding: 5px;
         /*position: absolute;*/
         /*top: 20px;*/
         /*left: 30px;*/
         margin-bottom: 10px;
         width: 200px;
         background: #c00002;
         text-align: center;">
        Sửa thông tin cá nhân
    </a>
@endif
<div class="row">
    <p class="user-info-text">Họ và tên<br><b>{{$user->name}}</b></p>
    <p class="separate-dot">&#9679</p>
    <p class="user-info-text">Ngày
        sinh<br><b>{{(strtotime($user->dob) != 0)?date("d-m-Y",strtotime($user->dob)):""}}</b>
    </p>
    <p class="separate-dot">&#9679</p>
    <p class="user-info-text">Giới tính
        <br><b>{{($user->gender == 1)?"Nam":(($user->gender == 2)?"Nữ":(($user->gender == 3)?"Khác":""))}}</b>
    </p>
    <p class="separate-dot">&#9679</p>
    <p class="user-info-text">Trường<br><b>{{$user->university}}</b></p>
    <p class="separate-dot">&#9679</p>
    <p class="user-info-text">Nơi làm việc<br><b>{{$user->work}}</b></p>
    <p class="separate-dot">&#9679</p>
    <p class="user-info-text">Các môn đã học tại colorME<br>
        @foreach($course_learning_id as $course_id)
            <a href="{{url('classes/'.$course_id)}}"><img
                        src="{{\App\Course::find($course_id)->icon_url}}"
                        style="width: 40px; border: solid 1px rgba(0,0,0,0.3);
                        background-color: white;
                        box-shadow: 0 0 0 2px rgba(255,255,255,1);
                        position: relative;
                        top: 10px;">
            </a>
        @endforeach
    </p>
</div>