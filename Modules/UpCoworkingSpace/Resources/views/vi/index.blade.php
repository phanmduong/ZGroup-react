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
    <div class="card card-raised page-carousel no-margin">
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

    
    <div class="wrapper" style="padding-top: 30px;">
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
                                    <button class="btn btn-link collapsed text-uppercase" style="white-space: normal;" data-toggle="collapse" data-target="#collapse1"
                                            aria-expanded="true" aria-controls="collapse1">
                                        STARTUP CỦA BẠN ĐANG CẦN MỘT KHÔNG GIAN LÀM VIỆC ĐỂ TẠO RA NHỮNG ĐỘT PHÁ 
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
                                    <button class="btn btn-link collapsed text-uppercase" style="white-space: normal;" data-toggle="collapse" data-target="#collapse3"
                                            aria-expanded="false" aria-controls="collapse3">
                                        MẠNG ĐANG TÌM KIẾM CƠ HỘI ĐẦU TƯ VÀ MUỐN MỞ RỘNG MẠNG LƯỚI  QUAN HỆ CỦA BẢN THÂN?
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
                                    <button style="white-space: normal;" class="btn btn-link collapsed text-uppercase" data-toggle="collapse" data-target="#collapse4"
                                            aria-expanded="false" aria-controls="collapse4">
                                            SỰ KIỆN VÀ WORKSHOP CỦA UP CÓ GÌ ĐẶC BIỆT 
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
        <div style="width: 60%; margin: 0 auto">
            <h3 class="font-weight-bold text-uppercase text-center">
                GÓI THÀNH VIÊN 
            </h3>
            <p class="text-center">
                Môi trường làm việc kích thích sự sáng tạo, hiện đại, tăng hiệu quả trong công việc.
            </p>
            <hr style="width: 20%; border-top: 1px solid #96d21f;">
        </div>
        <br/><br/><br/>
        <div style="margin: 0 auto; width: 70%">
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-blog">
                        <div class="card-image">
                            <a href="#">
                                <img class="img img-raised" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg">
                            </a>
                        </div>
                        <div>
                            <div class="up-title">
                                <h3 >COWORKING SPACE</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="card-action">
                                <h4 class="card-title no-margin" style="display: flex; justify-content: space-between;">
                                        <p style="margin-top: 10px;" class="font-weight-bold text-main-color">TỪ 300.000 VNĐ/THÁNG</p>
                                    <div class="bg-core btn btn-success">
                                            ĐĂNG KÝ NGAY
                                    </div>
                                </h4>
                            </div>
                            <br/>
                            <p class="text-justify">
                                Bạn luôn di chuyển và không dành quá nhiều thời gian trong văn phòng? Hay một không gian làm việc yên tĩnh và sáng tạo cho những ngày cuối tuần? Bao gồm 3 ngày làm việc 24/7, gói 300.000VND  cực kì linh hoạt và tiết kiệm  chi phí cho bạn 
                            </p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-blog">
                        <div class="card-image">
                            <a href="#">
                                <img class="img img-raised" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg">
                            </a>
                        </div>
                        <div>
                            <div class="up-title">
                                <h3 >PRIVATE OFFICE</h3>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="card-action">
                                <h4 class="card-title no-margin" style="display: flex; justify-content: space-between;">
                                        <p style="margin-top: 10px;" class="font-weight-bold text-main-color">TỪ 2.500.000 VNĐ/THÁNG</p>
                                    <div class="bg-core btn btn-success">
                                            ĐĂNG KÝ NGAY
                                    </div>
                                </h4>
                            </div>
                            <br/>
                            <p class="text-justify">
                                Bạn cần một chỗ ngồi cố định cho máy tính và các đồ dùng làm việc , một không gian riêng tư để tập trung làm việc , hãy sử dụng gói thành viên cố định  tại UP. Làm việc không giới hạn tại chỗ ngồi làm việc riêng của bạn.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container">
        <div style="width: 60%; margin: 0 auto">
            <h3 class="font-weight-bold text-uppercase text-center">
                UP AND BEYOND 
            </h3>
            <hr style="width: 20%; border-top: 1px solid #96d21f;">
        </div>
        <br/><br/><br/>
        <div class="row">
            <div class="col-md-4">
                <div class="card card-blog">
                    <div class="card-image">
                        <a href="#">
                            <img class="img img-raised" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg">
                        </a>
                    </div>
                    <div>
                        <div class="up-title">
                            <h4 class="text-center no-margin">VĂN PHÒNG ẢO </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-blog">
                    <div class="card-image">
                        <a href="#">
                            <img class="img img-raised" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg">
                        </a>
                    </div>
                    <div>
                        <div class="up-title">
                            <h4 class="text-center no-margin">TƯ VẤN DOANH NGHIỆP </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card card-blog">
                    <div class="card-image">
                        <a href="#">
                            <img class="img img-raised" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg">
                        </a>
                    </div>
                    <div>
                        <div class="up-title">
                            <h4 class="text-center no-margin">KẾ TOÁN DOANH NGHIỆP </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="wrapper">
        <div class="page-header page-header-small" style="background-image: url('http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg');">
            <div class="filter filter-dark"></div>

            <div class="content-center">
                <div class="container">
                    <h3 style="color: #fff" class="font-weight-bold text-uppercase text-center">
                        KHÁCH HÀNG NÓI GÌ VỀ UP
                    </h3>
                    <hr style="width: 20%; border-top: 1px solid #fff;">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="feed-back">
                                <i style="float: left;" class="fa fa-quote-left icon-main-color" aria-hidden="true"></i>
                                <div class="clearfix"></div>
                                <p class="font-italic text-left" style="color: black">
                                    Mình thích không khí làm việc hừng hực tại đây. Mọi người đều rất tập trung vào việc của mình và không bị phân tâm bởi người
                                    khác.
                                </p>
                            </div>
                            <br/>
                            <div style="display: flex;">
                                <img width="100px" height="100px" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg" class="img-circle img-no-padding img-responsive">
                                <div style="margin-left: 10px;margin-top: 10px">
                                    <p class="font-weight-bold text-left">YẾN VŨ</p>
                                    <p class="text-left"> Head of Marketing Zalora Vietnam</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feed-back">
                                <i style="float: left;" class="fa fa-quote-left icon-main-color" aria-hidden="true"></i>
                                <div class="clearfix"></div>
                                <p class="font-italic text-left" style="color: black">
                                    Tôi đã thực sự bị thuyết phục bởi không gian, con người, không khí làm việc mà tôi nhận được từ UP
                                </p>
                            </div>
                            <br/>
                            <div style="display: flex;">
                                <img width="100px" height="100px" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg" class="img-circle img-no-padding img-responsive">
                                <div style="margin-left: 10px;margin-top: 10px">
                                    <p class="font-weight-bold text-left">NGUYEN DUY ANH</p>
                                    <p class="text-left">Product Manager of Rakuten</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="feed-back">
                                <i style="float: left;" class="fa fa-quote-left icon-main-color" aria-hidden="true"></i>
                                <div class="clearfix"></div> 
                                <p class="font-italic text-left" style="color: black">
                                    UP successfully provides a dynamic and coporative environment to startups in which I feel insprired to create new ideas
                                </p>
                            </div>
                            <br/>
                            <div style="display: flex;">
                                <img width="100px" height="100px" src="http://d2xbg5ewmrmfml.cloudfront.net/up/images/9.0.jpg" class="img-circle img-no-padding img-responsive">
                                <div style="margin-left: 10px;margin-top: 10px">
                                    <p class="font-weight-bold text-left">ERIK NGHIEM</p>
                                    <p class="text-left">Projet Leader Cinnamon</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div class="container">
        <div style="width: 60%; margin: 0 auto">
            <h3 class="font-weight-bold text-uppercase text-center">
                ĐỐI TÁC CHIẾN LƯỢC
            </h3>
            <hr style="width: 20%; border-top: 1px solid #96d21f;">
        </div>
        <div style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1526032749gPg9XmuJ0VT9Oyi.png');text-align: center; background-size: 100% 100%;background-repeat: no-repeat;">
            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1526033062mB7FpiX99kZp02Y.png" height="400" width="auto" alt="">
        </div>
    </div>

@endsection





