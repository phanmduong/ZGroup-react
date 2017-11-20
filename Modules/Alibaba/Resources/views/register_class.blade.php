@extends('alibaba::layouts.master')

@section('content')
    <div class="cd-section section-white" id="contact-us">
        <div class="contactus-1 section-image"
             style="background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=996&amp;q=80&amp;cs=tinysrgb&amp;crop=')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact no-transition">
                            <h3 class="card-title text-center">Đăng kí học viên lớp {{$class->name}}</h3>
                            <div id="container-form-register">
                                <div class="row">
                                    <div class="col-md-5 offset-md-1">
                                        <div class="card-block">
                                            <div class="info info-horizontal">
                                                <div class="icon icon-info" style="color:#c50000">
                                                    <i class="nc-icon nc-pin-3" aria-hidden="true"></i>
                                                </div>
                                                <div class="description">
                                                    <h4 class="info-title">Địa chỉ của chúng tôi</h4>
                                                    <p> 175 Chùa Láng<br>
                                                        Đống Đa<br>
                                                        Hà Nội
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="info info-horizontal">
                                                <div class="icon icon-danger" style="color:#c50000">
                                                    <i class="nc-icon nc-badge" aria-hidden="true"></i>
                                                </div>
                                                <div class="description">
                                                    <h4 class="info-title">Liên hệ trực tiếp</h4>
                                                    <p> Hùng Nguyễn<br>
                                                        +84 168 402 6343<br>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <form role="form" id="contact-form" method="post"
                                              action="{{url('/store-register')}}">
                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <input type="hidden" name="class_id" value={{$class->id}}>
                                            <div class="card-block">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Họ và tên</label>
                                                    <input type="text" name="name" class="form-control"
                                                           placeholder="Ví dụ: Nguyễn Văn A" value="{{old('name')}}">
                                                    @if ($errors->has('name'))
                                                        <strong class="red-text">Xin bạn vui lòng điền họ và tên</strong>
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Email</label>
                                                    <input type="email" name="email" class="form-control"
                                                           placeholder="Ví dụ: abc@gmail.com" value="{{old('email')}}">
                                                    @if ($errors->has('email'))
                                                        @if(empty(old('email')))
                                                            <strong class="red-text">Xin bạn vui lòng điền email</strong>
                                                        @else
                                                            <strong class="red-text">{{$errors->first('email')}}</strong>
                                                        @endif
                                                    @endif
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Số điện thoại</label>
                                                    <input type="tel" name="phone" class="form-control"
                                                           placeholder="Ví dụ: 0123456789" value="{{old('phone')}}">
                                                    @if ($errors->has('phone'))
                                                        <strong class="red-text">Xin bạn vui lòng điền số điện
                                                            thoại</strong>
                                                    @endif
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <div class="checkbox">
                                                            <input id="checkbox1" type="checkbox">
                                                            <label for="checkbox1">
                                                                Tôi không phải là robot!
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <button type="submit" class="btn btn-primary pull-right">Gửi tin
                                                            nhắn
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("form").submit(function () {
                $('#container-form-register').html("<strong class='green-text'>Bạn vui lòng chờ 1 chút, đơn đăng kí đang được gửi</strong>");
            });
        });
    </script>

@endsection