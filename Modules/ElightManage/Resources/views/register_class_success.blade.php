@extends('elightmanage::layouts.master')

@section('content')
    <div class="cd-section section-white page-header page-header-small" id="contact-us">
        <div class="contactus-1 section-image page-header page-header-small"
             style="background-image: url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?dpr=1&amp;auto=format&amp;fit=crop&amp;w=1500&amp;h=996&amp;q=80&amp;cs=tinysrgb&amp;crop=')">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card card-contact no-transition">
                            <br><br>
                            <div style="width: 100px; height: 100px; margin-left: auto; margin-right: auto;"><img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1513314647HFqlwocqw2B3uZn.png" ></div>
                            <h3 class="card-title text-center" style="padding-bottom: 30px">Bạn đã đăng kí thành công
                                lớp {{$class->name}}. </h3>
                            <p class="text-center">Thông tin đã gửi qua Mail của bạn. <br>Alibaba sẽ gọi lại cho
                                bạn trong thời gian sớm nhất ạ!</p><br><br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection