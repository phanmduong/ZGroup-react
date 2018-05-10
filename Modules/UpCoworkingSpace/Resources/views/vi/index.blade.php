@extends('upcoworkingspace::layouts.master')

@section('vi-content')
{{-- 
    <div class="page-header page-header-small"
         style="background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg');">
        <div class="filter filter-dark"></div>
        <div class="content-center">
            <div class="container">
                <h1>KHÔNG GIAN LÀM VIỆC</h1>
                <h3>Sáng tạo, năng động, hiện đại</h3><br>
                <a class="btn btn-round btn-danger"
                   style="background-color:rgb(139, 209, 0);border-color:rgb(139, 209, 0)" data-target="#submitModal"
                   data-toggle="modal">Đăng kí trải nghiệm</a>
            </div>
        </div>
    </div> --}}
    <div class="card card-raised page-carousel">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active" style="background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg'); background-size: 100% 100%; background-repeat:no-repeat; padding-bottom: 30%;">
                    {{-- <div class="filter filter-dark"></div> --}}
                    <div class="content-center" style="position: absolute; top: 50%; left: 50%; text-align: center; color: #fff; transform: translate(-50%, -50%);">
                        <div class="container">
                            <h1>KHÔNG GIAN LÀM VIỆC</h1>
                            <h3>Sáng tạo, năng động, hiện đại</h3><br>
                            <button class="btn btn-round btn-danger"
                            style="background-color:rgb(139, 209, 0);border-color:rgb(139, 209, 0)" data-target="#submitModal"
                            data-toggle="modal">Đăng kí trải nghiệm</button>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" style="background-image: url('http://96bda424cfcc34d9dd1a-0a7f10f87519dba22d2dbc6233a731e5.r41.cf2.rackcdn.com/ermu/sliders-1/fall-residential-faders/Fall_Fader2.jpg'); background-size: 100% 100%; background-repeat:no-repeat; padding-bottom: 30%;">
                    {{-- <div class="filter filter-dark"></div> --}}
                    <div class="content-center"  style="position: absolute; top: 50%; left: 50%; text-align: center; color: #fff; transform: translate(-50%, -50%);">
                        <div class="container">
                            <h1>KHÔNG GIAN LÀM VIỆC</h1>
                            <h3>Sáng tạo, năng động, hiện đại</h3><br>
                            <button class="btn btn-round btn-danger"
                            style="background-color:rgb(139, 209, 0);border-color:rgb(139, 209, 0)" data-target="#submitModal"
                            data-toggle="modal">Đăng kí trải nghiệm</button>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" style="background-image: url('http://www.jveroassociates.com/images/slider/slider-02.jpg'); background-size: 100% 100%; background-repeat:no-repeat; padding-bottom: 30%;">
                    {{-- <div class="filter filter-dark"></div> --}}
                    <div class="content-center"  style="position: absolute; top: 50%; left: 50%; text-align: center; color: #fff; transform: translate(-50%, -50%);">
                        <div class="container">
                            <h1>KHÔNG GIAN LÀM VIỆC</h1>
                            <h3>Sáng tạo, năng động, hiện đại</h3><br>
                            <button class="btn btn-round btn-danger"
                            style="background-color:rgb(139, 209, 0);border-color:rgb(139, 209, 0)" data-target="#submitModal"
                            data-toggle="modal">Đăng kí trải nghiệm</button>
                        </div>
                    </div>
                </div>
            </div>
       
            <a class="left carousel-control carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="fa fa-angle-left"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="fa fa-angle-right"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>

    
    <div class="wrapper">
        <div class="container">
            <div style="width: 60%; margin: 0 auto">
                <h3 class="font-weight-bold text-uppercase text-center">
                    LÀM VIỆC HIỆU QUẢ VÀ SÁNG TẠO hơn TẠI UP CO-WORKING SPACE
                </h3>
                <p class="text-center">
                    Không gian làm việc chung hiện đại nhất , lớn nhất và duy nhất mở cửa 24/7 tại Việt Nam
                </p>
                <hr style="width: 20%; border-top: 1px solid #96d21f;">
            </div>
            <div class="features-1">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <button class="btn btn-link text-uppercase" data-toggle="collapse" data-target="#collapse1"
                                            aria-expanded="true" aria-controls="collapse1">
                                        Nếu là thành viên của Up, tôi sẽ nhận được quyền lợi gì?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse1" class="collapse" data-parent="#accordion">
                                <div class="card-body">
                                    Nếu bạn là thành viên của UP, bạn có thể vào văn phòng bằng thẻ thành viên. Nếu là khách, bạn có
                                    thể bấm chuông và đăng ký tại lễ tân trước khi vào.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed text-uppercase" data-toggle="collapse" data-target="#collapse3"
                                            aria-expanded="false" aria-controls="collapse3">
                                        Tôi có thể đến Up làm việc vào thời gian nào?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse3" class="collapse" data-parent="#accordion">
                                <div class="card-body">
                                    UP hoạt động 24 tiếng tất cả các ngày trong tuần. Nếu muốn làm việc đêm, bạn cần đăng kí với lễ
                                    tân trước 8h tối.
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">
                                    <button class="btn btn-link collapsed text-uppercase" data-toggle="collapse" data-target="#collapse4"
                                            aria-expanded="false" aria-controls="collapse4">
                                        Hiện UP đang có những dịch vụ nào?
                                    </button>
                                </h5>
                            </div>
                            <div id="collapse4" class="collapse" data-parent="#accordion">
                                <div class="card-body">
                                    UP có 02 gói dịch vụ chính: Thành viên linh hoạt và thành viên tháng với ưu đãi cho thành viên
                                    đăng kí dài hạn. Ngoài ra, UP cung cấp gói dịch vụ văn phòng ảo và cho thuê phòng họp.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <style>.embed-container {
                                position: relative;
                                padding-bottom: 56.25%;
                                height: 0;
                                overflow: hidden;
                                max-width: 100%;
                                height: auto;
                            }

                            .embed-container iframe, .embed-container object, .embed-container embed {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                            }</style>
                        <div class="embed-container">
                            <!-- Copy & Pasted from YouTube -->
                            <iframe src="https://www.youtube.com/embed/IA5ozLBHHYg" frameborder="0"
                                    allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            </div>

            <div class="features-1">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h3 class="title" style="font-weight: bold">NHỮNG LỢI ÍCH CHÚNG TÔI MANG ĐẾN CHO BẠN</h3>
                        <h5 class="description" style="font-weight: bold">Thành viên của UP có những lợi ích gì?</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-3">
                        <div class="info">
                            <div class="icon icon-main-color">
                                <i class="nc-icon nc-palette"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">KHÔNG GIAN MỞ
                                    SÁNG TẠO</h4>
                                <p class="description">Spend your time generating new ideas. You don't have to think of
                                    implementing.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="info">
                            <div class="icon icon-main-color">
                                <i class="nc-icon nc-bulb-63"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">PHÒNG HỌP
                                    HIỆN ĐẠI</h4>
                                <p>Larger, yet dramatically thinner. More powerful, but remarkably power efficient.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="info">
                            <div class="icon icon-main-color">
                                <i class="nc-icon nc-chart-bar-32"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">BẾP
                                    TIỆN NGHI</h4>
                                <p>Choose from a veriety of many colors resembling sugar paper pastels.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="info">
                            <div class="icon icon-main-color">
                                <i class="nc-icon nc-sun-fog-29"></i>
                            </div>
                            <div class="description">
                                <h4 class="info-title">INTERNET
                                    TỐC ĐỘ CAO</h4>
                                <p>Find unique and handmade delightful designs related items directly from our
                                    sellers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="page-header page-header-xs"
         style="background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg');">
        <div class="filter filter-dark"></div>
        <div class="content-center">
            <div class="container">
                <h2>UP CO-WORKING SPACE</h2>
                <h3>VÌ CỘNG ĐỒNG KHỞI NGHIỆP VIỆT NAM</h3>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="features-1">
            <div class="row" style="margin-bottom:50px">
                <div class="col-md-8 ml-auto mr-auto text-center">
                    <h2 class="title">Bài viết mới nhất</h2>
                    <h5 class="description">Cập nhật các thông tin cùng Up Coworking Space</h5>
                </div>
            </div>
            <div class="row">
                @foreach($newestBlogs as $newestBlog)
                    <div class="col-md-4">
                        <div class="card card-blog">
                            <div class="card-image">
                                <a href="{{'/blog/post/'.$newestBlog->id}}">
                                    <img class="img img-raised"
                                         src="{{generate_protocol_url($newestBlog->url)}}">
                                </a>
                            </div>
                            <div class="card-body">
                                <h6 class="card-category text-main-color">{{$newestBlog->category ? $newestBlog->category->name : ""}}</h6>
                                <h5 class="card-title">
                                    <a href="{{'/blog/post/'.$newestBlog->id}}">{{$newestBlog->title}}</a>
                                </h5>
                                <p class="card-description">
                                    LinkedIn is today launching its official desktop application for Windows 10,
                                    allowing the professional social networking service to... <br>
                                </p>
                                <hr>
                                <div class="card-footer">
                                    <div class="author">
                                        <a href="{{'/blog/post/'.$newestBlog->id}}">
                                            <img src="{{generate_protocol_url($newestBlog->author->avatar_url)}}"
                                                 alt="..."
                                                 class="avatar img-raised">
                                            <span>{{$newestBlog->author->name}}</span>
                                        </a>
                                    </div>
                                    <div class="stats">
                                        <i class="fa fa-clock-o" aria-hidden="true"></i> 5 min read
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
    <div class="features-1 ">
        <div class="testimonials-2 section section-testimonials">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 ml-auto mr-auto text-center">
                        <h3 class="title" style="font-weight: 600">THÀNH VIÊN CỦA UP NGHĨ GÌ?
                        </h3>
                        <h5 class="description">This is the paragraph where you can write more details about your
                            product. Keep you user engaged by providing meaningful information. Remember that by this
                            time, the user is curious, otherwise he wouldn't scroll to get here.</h5>
                    </div>
                </div>
                <div class="row">

                    <div class="col-md-2 mr-auto">
                        <div class="testimonials-people">
                            <img class="left-first-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/110862/thumb.?1482812727"
                                 alt="">
                            <img class="left-second-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/139481/thumb.jpg?1485460613"
                                 alt="">
                            <img class="left-third-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/152441/thumb.jpg?1488233314"
                                 alt="">
                            <img class="left-fourth-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/134607/thumb.?1487680276"
                                 alt="">
                            <img class="left-fifth-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/161506/thumb.?1489848178"
                                 alt="">
                            <img class="left-sixth-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/77627/thumb.jpg?1487360092"
                                 alt="">
                        </div>
                    </div>

                    <div class="col-md-6 ml-auto mr-auto">
                        <div class="page-carousel">
                            <div id="carouselExampleIndicators2" class="carousel slide" data-ride="carousel">
                                <ol class="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators2" data-slide-to="0" class=""></li>
                                    <li data-target="#carouselExampleIndicators2" data-slide-to="1" class=""></li>
                                    <li data-target="#carouselExampleIndicators2" data-slide-to="2" class="active"></li>
                                </ol>
                                <div class="carousel-inner" role="listbox">

                                    <div class="carousel-item">
                                        <div class="card card-testimonial card-plain">
                                            <div class="card-avatar">
                                                <img class="img"
                                                     src="https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg">
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-description">
                                                    "I'm newer to the front-end... With my creative side lacking in
                                                    experience this!"
                                                </h5>
                                                <div class="card-footer">
                                                    <h4 class="card-title">Chase Jackson</h4>
                                                    <h6 class="card-category">Web Developer</h6>
                                                    <div class="card-stars">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="carousel-item">
                                        <div class="card card-testimonial card-plain">
                                            <div class="card-avatar">
                                                <img class="img"
                                                     src="https://s3.amazonaws.com/creativetim_bucket/photos/134607/thumb.?1487680276">
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-description">
                                                    "Love the shapes and color palette on this one! Perfect for one of
                                                    my pet projects!"
                                                </h5>
                                                <div class="card-footer">
                                                    <h4 class="card-title">Robin Leysen</h4>
                                                    <h6 class="card-category">Web Developer</h6>
                                                    <div class="card-stars">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div class="carousel-item active">
                                        <div class="card card-testimonial card-plain">
                                            <div class="card-avatar">
                                                <img class="img"
                                                     src="https://s3.amazonaws.com/creativetim_bucket/photos/125268/thumb.jpeg?1497799215">
                                            </div>
                                            <div class="card-body">
                                                <h5 class="card-description">
                                                    "Love it. Use it for prototypes and along with Paper Dashboard."
                                                </h5>
                                                <div class="card-footer">
                                                    <h4 class="card-title">Cristi Jora</h4>
                                                    <h6 class="card-category">Web Developer</h6>
                                                    <div class="card-stars">
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                        <i class="fa fa-star" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <a class="left carousel-control carousel-control-prev"
                                   href="#carouselExampleIndicators2" role="button" data-slide="prev">
                                    <span class="fa fa-angle-left"></span>
                                    <span class="sr-only">Previous</span>
                                </a>
                                <a class="right carousel-control carousel-control-next"
                                   href="#carouselExampleIndicators2" role="button" data-slide="next">
                                    <span class="fa fa-angle-right"></span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-2 ml-auto">
                        <div class="testimonials-people">
                            <img class="right-first-person add-animation"
                                 src="https://s3.amazonaws.com/uifaces/faces/twitter/mlane/128.jpg" alt="">
                            <img class="right-second-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/125268/thumb.jpeg?1497799215"
                                 alt="">
                            <img class="right-third-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/123334/thumb.JPG?1479459618"
                                 alt="">
                            <img class="right-fourth-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/118235/thumb.?1477435947"
                                 alt="">
                            <img class="right-fifth-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/18/thumb.png?1431433244"
                                 alt="">
                            <img class="right-sixth-person add-animation"
                                 src="https://s3.amazonaws.com/creativetim_bucket/photos/167683/thumb.?1491014996"
                                 alt="">
                        </div>
                    </div>

                </div>

            </div>

        </div>
    </div>
    <div>

        <div class="cd-section section-white" id="contact-us">


            <div class="contactus-1 section-image"
                 style="background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg')">
                <div class="container">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <div class="card card-contact no-transition">
                                <h3 class="card-title text-center">Liên hệ</h3>
                                <div class="row">
                                    <div class="col-md-5 offset-md-1">
                                        <div class="card-block">
                                            <div class="info info-horizontal">
                                                <div class="icon icon-main-color">
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
                                                <div class="icon icon-main-color">
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
                                                            <input type="text" name="name" class="form-control"
                                                                   placeholder="Ví dụ: Nguyễn">
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <div class="form-group label-floating">
                                                            <label class="control-label">Tên</label>
                                                            <input type="text" name="name" class="form-control"
                                                                   placeholder="Ví dụ: Lan Anh">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Email</label>
                                                    <input type="email" name="email" class="form-control"
                                                           placeholder="Ví dụ: android@colorme.vn">
                                                </div>
                                                <div class="form-group label-floating">
                                                    <label class="control-label">Lời nhắn</label>
                                                    <textarea name="question" class="form-control" id="message" rows="6"
                                                              placeholder="Nhập lời nhắn của bạn vào đây"></textarea>
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
                                                        <button type="submit" class="btn pull-right"
                                                                style="background-color:rgb(139, 209, 0);border-color:rgb(139, 209, 0)">
                                                            Gửi tin nhắn
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
@endsection





