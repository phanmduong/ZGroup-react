@extends('trongdongpalace::layouts.master')
@section('content')

    <div class="cd-section section-white" id="contact-us">
        <div class="contactus-1 section-image" style="background-image: url('http://trongdongpalace.com/ckfinder/userfiles/images/16819049_1236010749817681_3211247670853520341_o.jpg')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact no-transition">
                            <h3 class="card-title text-center">Liên hệ</h3>
                            <div class="row">
                                <div class="col-md-5 offset-md-1">
                                    <div class="card-block">
                                        <div class="info info-horizontal">
                                            <div class="icon icon-info" style="color:#BA8A45">
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
                                            <div class="icon icon-danger" style="color:#BA8A45">
                                                <i class="nc-icon nc-badge" aria-hidden="true"></i>
                                            </div>
                                            <div class="description">
                                                <h4 class="info-title">Liên hệ trực tiếp</h4>
                                                <p> www.facebook.com/trongdongpalace<br>
                                                    marketing@trongdongpalace.com<br>
                                                    +84 964 25 7766<br>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <div role="form" id="contact-form" method="post" action="#">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <div class="card-block">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Họ tên</label>
                                                        <input id="e-name" type="text" name="name" class="form-control" placeholder="Ví dụ: Nguyễn Lan Anh">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Số điện thoại</label>
                                                        <input id="e-phone" type="text" name="phone" class="form-control" placeholder="Ví dụ: 0964 25 7766">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Email</label>
                                                <input id ="e-email" type="email" name="email" class="form-control" placeholder="Ví dụ: android@colorme.vn">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Lời nhắn</label>
                                                <textarea id="e-message" name="question" class="form-control" id="message" rows="6" placeholder="Nhập lời nhắn của bạn vào đây"></textarea>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div id="alert"> </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                </div>
                                                <div class="col-md-6">
                                                    <button type="submit" class="btn btn-primary pull-right"
                                                            id="submit-1" style="background-color: #BA8A45; border-color: #BA8A45">Gửi tin nhắn
                                                    </button></div>

                                            </div>
                                        </div>
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
            $("#submit-1").click(function (event) {
                event.preventDefault();
                event.stopPropagation();
                console.log("submit-1");
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                var name = $('#e-name').val();
                var email = $('#e-email').val();
                var phone = $('#e-phone').val();
                var message1= $('#e-message').val();
                var ok=0;
                if(name.trim()=="" || phone.trim()=="" || message1.trim()=="") ok=1;


                if (!name || !email || !phone  || !re.test(email) || ok==1) {
                    alert("Bạn vui lòng nhập đủ thông tin hoặc email không hợp lệ");
                    $("#alert").html("<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin và kiểm tra lại email</div>");
                } else {
                    var message = "Chúng tôi đã nhận được thông tin của bạn. Bạn vui lòng kiểm tra email";
                    alert(message);


                    $("#alert").html("<div class='alert alert-success'>" + message + "</div>");
                    var url = "{{config('app.protocol').config('app.domain')}}/api/contact?email=" + email;
                    $('#e-name').val("");
                    $('#e-email').val("");
                    $('#e-phone').val("");
                    $.post(url,
                        {
                            name: name,
                            phone: phone,
                            email: email,
                            message_str: message1,
                            _token: "{{csrf_token()}}"
                        },function (data, status) {
                            console.log("Data: " + data + "\nStatus: " + status);
                        });
                }


            });
        });
    </script>
@endsection
