@extends('layouts.public')

@section('title','Đăng kí học')
@section('header','Đăng kí học')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col s12 m5">
                <div class="card">
                    <div class="card-content">
                        {{--<p class="card-title">{{$course->name}}</p>--}}
                        <p>{!!  $course->detail!!}</p>
                    </div>
                    <div class="card-action">
                        <p class="card-title">Lớp {{$class->name}}</p>
                        <p>
                            <i class="tiny material-icons">schedule</i> {{$class->study_time}}
                        </p>
                        <p>
                            <i class="tiny material-icons">description</i> {{$class->description}}
                        </p>
                        {{--<p>--}}
                        {{--<i class="tiny material-icons">perm_identity</i> Giảng viên <strong>{{$class->teach['name']}}</strong>--}}
                        {{--</p>--}}
                        {{--<p>--}}
                        {{--<i class="tiny material-icons">supervisor_account</i> Trợ giảng <strong>{{$class->assist['name']}}</strong>--}}
                        {{--</p>--}}
                    </div>
                </div>
            </div>
            <div class="col s12 m7">

                <div class="card">

                    <form method="POST" action="{{url('classes/register_store')}}">
                        <input type="hidden" name="class_id" value="{{$class->id}}"/>
                        @if($saler_id)
                            <input type="hidden" name="saler_id" value="{{$saler_id}}"/>
                        @endif

                        @if($campaign_id)
                            <input type="hidden" name="campaign_id" value="{{$campaign_id}}"/>
                        @endif

                        {!! csrf_field() !!}
                        <div class="card-content">
                            @if($errors->count()>0)
                                <div class="row">
                                    <div style="padding:7px" class=" col s12 red darken-2-2 white-text center">
                                        Bạn vui lòng điền đủ những thông tin bắt buộc
                                    </div>
                                </div>
                            @endif
                            <div class="row">
                                <div class="input-field col s12 ">
                                    <input id="name" name="name" type="text"
                                           class="validate {{$errors->has('name')?'invalid':''}}"
                                           value="{{old('name')}}">
                                    <label for="name">Họ tên</label>
                                    @if ($errors->has('name'))
                                        <strong class="red-text">Xin bạn vui lòng điền họ và tên</strong>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="phone" name="phone" type="text"
                                           class="validate {{$errors->has('phone')?'invalid':''}}"
                                           value="{{old('phone')}}">
                                    <label for="phone">Số điện thoại</label>
                                    @if ($errors->has('phone'))
                                        <strong class="red-text">Xin bạn vui lòng điền số điện thoại</strong>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="email" name="email" type="email"
                                           class="validate {{$errors->has('email')?'invalid':''}}"
                                           value="{{old('email')}}">
                                    <label for="email">Email</label>
                                    @if ($errors->has('email'))
                                        @if(empty(old('email')))
                                            <strong class="red-text">Xin bạn vui lòng điền email</strong>
                                        @else
                                            <strong class="red-text">{{$errors->first('email')}}</strong>
                                        @endif
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <label>Giới tính</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12 ">

                                    <div>
                                        <input class="with-gap" name="gender" type="radio" id="gender1"
                                               value="1" {{(old('gender')==1)?"checked":""}}/>
                                        <label for="gender1">Nam</label>
                                    </div>
                                    <div>
                                        <input class="with-gap" name="gender" type="radio" id="gender2"
                                               value="2" {{(old('gender')==2)?"checked":""}}/>
                                        <label for="gender2">Nữ</label>
                                    </div>
                                    <div>
                                        <input class="with-gap" name="gender" type="radio" value="3"
                                               id="gender3"{{(old('gender')==3)?"checked":""}}/>
                                        <label for="gender3">Khác</label>
                                    </div>

                                </div>
                            </div>
                            @if ($errors->has('gender'))
                                <div class="row">
                                    <div class="input-field col s12">
                                        <strong class="red-text">Xin bạn vui lòng chọn giới tính</strong>
                                    </div>
                                </div>

                            @endif

                            <div class="row">
                                <div class="input-field col s12 ">
                                    <input type="text" name="dob" id="dob"
                                           value="{{old('dob')}}"
                                           class="datepicker validate {{$errors->has('dob')?'invalid':''}}">

                                    <label for="dob">Ngày sinh</label>
                                    @if ($errors->has('dob'))
                                        <strong class="red-text">Xin bạn vui lòng chọn ngày sinh</strong>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12 ">
                                    <input id="university" name="university" type="text"
                                           class="validate {{$errors->has('university')?'invalid':''}}"
                                           value="{{old('university')}}">
                                    <label for="university">Trường học</label>
                                    @if ($errors->has('university'))
                                        <strong class="red-text">Xin bạn vui lòng nhập trường học</strong>
                                    @endif
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="work" name="work" type="text"
                                           class="validate {{$errors->has('work')?'invalid':''}}"
                                           value="{{old('work')}}">
                                    <label for="work">Nơi làm việc (Không bắt buộc)</label>
                                    @if ($errors->has('work'))
                                        <strong class="red-text">Xin bạn vui lòng điền Nơi làm việc</strong>
                                    @endif
                                </div>
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="address" name="address" type="text"
                                           class="validate {{$errors->has('address')?'invalid':''}}"
                                           value="{{old('address')}}">
                                    <label for="address">Địa chỉ</label>
                                    @if ($errors->has('address'))
                                        <strong class="red-text">Xin bạn vui lòng điền Địa chỉ</strong>
                                    @endif
                                </div>

                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <select name="how_know">
                                        <option value="" disabled
                                                {{empty(old('how_know'))?'selected':''}}>Vui lòng chọn 1 lý do
                                        </option>
                                        <option value="1" {{old('how_know')==1?'selected':''}}>Facebook</option>
                                        <option value="6"{{old('how_know')==6?'selected':''}}>Instagram</option>
                                        <option value="2"{{old('how_know')==2?'selected':''}}>Người quen</option>
                                        <option value="3"{{old('how_know')==3?'selected':''}}>Google</option>
                                        <option value="5"{{old('how_know')==5?'selected':''}}>Lý do khác</option>
                                    </select>
                                    <label>Lý do bạn biết đến colorME</label>
                                    @if ($errors->has('how_know'))
                                        <strong class="red-text">Xin bạn vui lòng chọn lý do bạn biết đến
                                            colorME</strong>
                                    @endif
                                </div>
                                <div class="input-field col s12" id="other" style="display:none">
                                    <input id="other_reason" name="other_reason" type="text"
                                           class="validate {{$errors->has('other_reason')?'invalid':''}}">
                                    <label for="other_reason">Lý do khác</label>

                                </div>


                            </div>
                            <div class="row">
                                <div class="input-field col s12 ">
                                    <input placeholder="Ví dụ: facebook.com/hung7495" id="facebook" name="facebook"
                                           type="text" class="validate {{$errors->has('facebook')?'invalid':''}}"
                                           value="{{old('facebook')}}">
                                    <label for="facebook">Link facebook</label>
                                    @if ($errors->has('facebook'))
                                        <strong class="red-text">Xin bạn vui lòng điền facebook của mình vào</strong>
                                    @endif
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12 ">
                                    <input placeholder="Không bắt buộc" id="leader_phone" name="leader_phone"
                                           type="text" class="validate"
                                           value="{{old('leader_phone')}}">
                                    <label for="leader_phone">Số điện thoại nhóm trưởng</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12 ">
                                    <input placeholder="Không bắt buộc" id="coupon" name="coupon" type="text"
                                           class="validate"
                                           value="{{old('coupon')}}">
                                    <label for="coupon">Mã giảm giá </label>
                                </div>
                            </div>
                            <div id="btn-submit-container">
                                <button type="submit" name="submit" class="waves-effect waves-light btn red darken-4"><i
                                            class="material-icons left">done</i>Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("form").submit(function () {
                $('#btn-submit-container').html("<strong class='green-text'>Bạn vui lòng chờ 1 chút, đơn đăng kí đang được gửi</strong>");
            });
            $('.datepicker').datepicker();
            $('select').material_select();
            $('select').on('change', function (e) {

                var optionSelected = $("option:selected", this);
                var valueSelected = this.value;
                console.log(valueSelected);
                if (valueSelected == 5) {
                    $('#other').fadeIn();
                } else {
                    $('#other').fadeOut();
                }
            });
        });
    </script>
@endsection
