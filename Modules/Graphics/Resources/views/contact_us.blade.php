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
                                    <div role="form" id="contact-form" method="post" action="#">
                                        <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                        <div class="card-block">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Họ</label>
                                                        <input id="e-name1" type="text" name="name" class="form-control" placeholder="Ví dụ: Nguyễn">
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group label-floating">
                                                        <label class="control-label">Tên</label>
                                                        <input id="e-name2" type="text" name="name" class="form-control" placeholder="Ví dụ: Lan Anh">
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
                                                    <button type="submit" class="btn btn-primary pull-right" id="submit-1">Gửi tin nhắn
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
            var name1 = $('#e-name1').val();
            var email = $('#e-email').val();
            var name2 = $('#e-name2').val();
            var message1= $('#e-message').val();
            var ok=0;
            if(name1.trim()=="" || name2.trim()=="" || message1.trim()=="") ok=1;


            if (!name1 || !email || !name2  || !re.test(email) || ok==1) {
                alert("Bạn vui lòng nhập đủ thông tin hoặc email không hợp lệ");
                $("#alert").html("<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin và kiểm tra lại email</div>");
            } else {
                var message = "Chúng tôi đã nhận được thông tin của bạn. Bạn vui lòng kiểm tra email";
                alert(message);


                $("#alert").html("<div class='alert alert-success'>" + message + "</div>");
                var url = "{{config('app.protocol').config('app.domain')}}/contact_information?email=" + email;
                $('#e-name1').val("");
                $('#e-email').val("");
                $('#e-name2').val("");
                $.post(url,
                    {
                        name: name1+" "+ name2,
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
