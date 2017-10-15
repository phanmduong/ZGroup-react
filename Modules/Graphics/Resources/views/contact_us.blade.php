@extends('graphics::layouts.master')
@section('content')
    <div class="cd-section section-white" id="contact-us">
        <div class="contactus-1 section-image" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035903jSFNtNO4CXL5lfZ.png')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact no-transition">
                            <h3 class="card-title text-center">Liên hệ</h3>
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
                                    <form role="form" id="contact-form" method="post" action="/question">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <div class="card-block">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Họ</label>
                                                        <input type="text" name="name" class="form-control" placeholder="Ví dụ: Nguyễn">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Tên</label>
                                                        <input type="text" name="name" class="form-control" placeholder="Ví dụ: Lan Anh">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Email</label>
                                                <input type="email" name="email" class="form-control" placeholder="Ví dụ: android@colorme.vn">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Lời nhắn</label>
                                                <textarea name="question" class="form-control" id="message" rows="6" placeholder="Nhập lời nhắn của bạn vào đây"></textarea>
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
                                                    <button type="submit" class="btn btn-primary pull-right">Gửi tin nhắn
                                                    </button></div>
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

@endsection
