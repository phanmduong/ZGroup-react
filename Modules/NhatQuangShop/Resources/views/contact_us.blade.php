@extends('nhatquangshop::layouts.master')
@section('content')

    <div class="cd-section section-white" id="contact-us">
        <div class="contactus-1 section-image" style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1508035903jSFNtNO4CXL5lfZ.png')">
            <div class="container">
                <div>
                    <div class="card card-contact no-transition" id="map">

                    </div>
                </div>
            </div>
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
                                                <p> <strong>Số 10, Ngách 59, đường Quan Hoa,
                                                        <br>  Cầu Giấy, Hà Nội </strong>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="info info-horizontal">
                                            <div class="icon icon-info" style="color:#5387db">
                                                <i class="fa fa-facebook" aria-hidden="true"></i>
                                            </div>
                                            <div class="description">
                                                <h4 class="info-title">Facebook</h4>
                                                <a href=" https://www.facebook.com/nhatquang0113 "><p><strong>https://www.facebook.com/nhatquang0113</strong></p></a>
                                            </div>
                                        </div>

                                        <div class="info info-horizontal">
                                            <div class="icon icon-info" style="color:#5387db">
                                                <i class="fa fa-globe" aria-hidden="true"></i>
                                            </div>
                                            <div class="description">
                                                <h4 class="info-title">Website</h4>
                                                <a href="#"><p><strong>http://nhatquangshop.vn/</strong></p></a>

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
                                            <div class="form-group label-floating">
                                                <label class="control-label">Họ và tên (*) </label>
                                                <input id ="e-name"  name="name" class="form-control" placeholder="Ví dụ: Nguyen Hung Cuong">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Email (*)</label>
                                                <input id ="e-email" type="email" name="email" class="form-control" placeholder="Ví dụ: android@colorme.vn">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Số điện thoại</label>
                                                <input id ="e-phone" name="phone" class="form-control" placeholder="Ví dụ: 0123456789">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Địa chỉ </label>
                                                <input id ="e-address"  name="name" class="form-control" placeholder="Ví dụ: Nguyen Hung Cuong">
                                            </div>
                                            <div class="form-group label-floating">
                                                <label class="control-label">Lời nhắn (*)</label>
                                                <textarea id="e-message" name="message_str" class="form-control" id="message" rows="6" placeholder="Nhập lời nhắn của bạn vào đây"></textarea>
                                            </div>
                                            <div class="row">
                                                <div class="col-sm-12">
                                                    <div id="alert"> </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-6">
                                                    {{--<div class="checkbox">--}}
                                                        {{--<input id="checkbox1" type="checkbox">--}}
                                                        {{--<label for="checkbox1">--}}
                                                            {{--Tôi không phải là robot!--}}
                                                        {{--</label>--}}
                                                    {{--</div>--}}

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

            var name = $('#e-name').val();
            var email = $('#e-email').val();
            var phone = $('#e-phone').val();
            var address = $('#e-address').val();
            var message1= $('#e-message').val();

            if (!name || !email  || !phone || !address) {
                alert("Bạn vui lòng nhập đủ thông tin");
                $("#alert").html("<div class='alert alert-danger'>Bạn vui lòng nhập đủ thông tin</div>");
            } else {
                var message = "Chúng tôi đã nhận được thông tin của bạn. Bạn vui lòng kiểm tra email";
                alert(message);


                $("#alert").html("<div class='alert alert-success'>" + message + "</div>");
                var url = "http://nhatquangshop.test/contact_information?email=" + email;
                $('#e-name').val("");
                $('#e-email').val("");
                $('#e-phone').val("");
                $.post(url,
                    {
                        name: name,
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
    <script>
        function initMap() {
            var uluru = {lat: 21.0343164, lng: 105.8028924};
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: uluru,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            var marker = new google.maps.Marker({
                position: uluru,
                map: map
            });
        }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDkkRUAWB396Wvyzlu9e5HQ02JBTpZ2QUA&callback=initMap"></script>
@endsection
