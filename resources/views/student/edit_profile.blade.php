@extends('layouts.public')

@section('title', 'Sửa thông tin cá nhân')

@section('header', 'Sửa thông tin cá nhân')
@section('content')
    <style>
        #edit-info {
            padding: 50px 0;
            background-color: white;
            box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.1);
            transition: all 1s ease-in;
            -webkit-transition: all 1s ease-in;
        }

        .label {
            text-align: right;
            line-height: 32px;
            font-weight: bold;
        }

        .value {
            height: 2rem !important;
        }

        #success {
            margin-bottom: 0;
        }
    </style>
    <div class="container">
        <div class="row" id="success" style="background-color: #2ca02c; color: white; display: none;">
            <div class="col s12 center">
                <p>Bạn đã thay đổi thành công</p>
            </div>
        </div>
        <div class="row" id="error" style="background-color: #8b1014; color: white; display: none;">
            <div class="col s12 center">
                <p>Thay đổi của bạn có lỗi</p>
            </div>
        </div>
        <div class="row" id="edit-info">
            <h4 class="center" style="padding-bottom: 10px;">Sửa thông tin cá nhân</h4>
            <form id="editProfileForm" action="{{url('profile/save_profile/'.$user->id)}}" method="post">
                <input type="hidden" name="id" value="{{$user->id}}">
                {{csrf_field()}}
                <div class="row">
                    <div class="col s5 label">Họ và tên</div>
                    <div class="col s4">
                        <input type="text" name="name" id="name" class="value" value="{{$user->name}}">
                    </div>
                </div>
                <div class="row">
                    <div class="col s5 label">Ngày sinh</div>
                    <div class="col s4">
                        <input type="date" name="dob" id="dob" class="value"
                               value="{{(strtotime($user->dob) != 0)?$user->dob:""}}">
                    </div>
                </div>
                <div class="row">
                    <div class="col s5 label" style="line-height: 45px !important;">Giới tính</div>
                    <div class="col s4">
                        <select name="gender">
                            <option value="0" name="gender" id="gender0" disabled selected>Chọn một lựa chọn</option>
                            <option value="1" name="gender" id="gender1">Nam</option>
                            <option value="2" name="gender" id="gender2">Nữ</option>
                            <option value="3" name="gender" id="gender3">Khác</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col s5 label">Trường</div>
                    <div class="col s4">
                        <input type="text" name="university" id="university" class="value"
                               value="{{$user->university}}">
                    </div>
                </div>
                <div class="row">
                    <div class="col s5 label">Nơi làm việc</div>
                    <div class="col s4">
                        <input type="text" name="work" id="work" class="value" value="{{$user->work}}">
                    </div>
                </div>
                <div class="row center">
                    <button type="submit" class="btn btn-default waves-effect" id="save-change">Lưu thay đổi</button>
                    <a href="{{url('/profile').'/'.get_first_part_of_email($user->email)}}"
                       class="btn grey waves-effect">Quay về trang cá nhân</a>
                </div>
            </form>
        </div>
    </div>
    {{--<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>--}}
    {{--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.5/jquery.min.js"></script>--}}
    {{--<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>--}}

    <script>
        $(document).ready(function () {
            check_gender();
            $('select').material_select();
            triggerEditStatus();
//            changeDateFormatInput();
        });

        function check_gender() {
            var gender = "{{$user->gender}}";
            $("option").removeAttr("selected");
            if (gender === "0") {
                $("#gender0").attr("selected", true);
            }
            if (gender === "1") {
                $("#gender1").attr("selected", true);
            }
            if (gender === "2") {
                $("#gender2").attr("selected", true);
            }
            if (gender === "3") {
                $("#gender3").attr("selected", true);
            }
        }

        function triggerEditStatus() {
            var message = "{{session('isChanged')}}";
            if (message == 1) {
                $('#success').fadeIn();
                setInterval(function () {
                    $('#success').animate(
                            {
                                'height': 0,
                                'opacity': 0
                            }, 1000)
                }, 2000);
            }
//            else {
//                $("#error").fadeIn();
//                setInterval(function () {
//                    $('#error').fadeOut();
//                }, 2000);
//            }
        }
        //        function changeDateFormatInput(){
        //            $('#dob').datepicker({dateFormat: 'dd/mm/yy'});
        //        }
    </script>
@endsection