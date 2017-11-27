@extends('alibaba::layouts.master')

@section('content')
    <div class="cd-section section-white" id="contact-us">
        <div class="contactus-1 section-image"
             style="background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=996&amp;q=80&amp;cs=tinysrgb&amp;crop=')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact no-transition">
                            <h3 class="card-title text-center">Nhập mã học viên để kiểm tra</h3>
                            <div id="container-form-register">
                                <div class="row">
                                    <div class="col-md-6" style="margin: auto">
                                        <form role="form" id="contact-form" method="post"
                                              action="{{url('/check')}}">
                                            {{csrf_field()}}
                                            <div class="card-block">
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Mã đăng ký khóa học</label>
                                                    <input type="text" name="code" class="form-control"
                                                           placeholder="Ví dụ: AB1234">
                                                    @if($errors->has('code'))
                                                        <strong class="red-text">Xin bạn vui lòng điền mã</strong>
                                                    @endif
                                                    @if($errors->has('register'))
                                                        <strong class="red-text">Không tồn tại đăng ký vui lòng điền
                                                            lại mã</strong>
                                                    @endif
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                    </div>
                                                    <div class="col-md-6">
                                                        <button type="submit" class="btn btn-primary pull-right">Kiểm
                                                            tra
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