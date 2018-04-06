@extends('upcoworkingspace::layouts.master')

@section('content')
    <style>
        .banner {
            background: url("http://up-co.vn/wp-content/uploads/2016/06/alleydesks2.jpg");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
            height: 400px;
        }

        .flexbox-centering {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .white-text {
            color: #fff;
        }
        .green-text {
            color: #96d21f;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>tham gia đội ngũ up </h2>
        </div>
    </div>
    <br/>
    <br/>

    <div class="container">
        <h2 class="text-center font-weight-bold text-uppercase">
            TRỞ THÀNH 1 THÀNH VIÊN CỦA GIA ĐÌNH UP
        </h2>
        <br/>
        <p class="text-center">
            Bạn đang tìm kiếm một công việc trong thị trường khởi nghiệp Việt Nam? Trở thành thành viên của cộng đồng StartUp lớn nhất trong mảng Startup, Freelancers, doanh nhân, sáng tạo và kỹ thuật.
        </p>
        <br/><br/>
        <div class="row">
            <div class="col-md-6">
                <h3 class="text-uppercase font-weight-bold">
                    TUYỂN DỤNG
                </h3>
                <br/>
                <p class="font-weight-bold">
                    Về Up:
                </p>
                <p class="text-justify">
                    Công ty Cổ phần Phát triển UP là chủ sở hữu chuỗi hệ thống UP Co-working Space – Không gian làm việc chung  lớn nhất, hiện đại nhất và duy nhất mở cửa 24/7 tại Việt Nam.
                    <br/><br/>
                    UP được thành lập với tầm nhìn xây dựng và phát triển cộng đồng khởi nghiệp tại Việt Nam lớn mạnh nhất Đông Nam Á, đem lại những thay đổi mạnh mẽ, tích cực và bền vững cho nền kinh tế đất nước và khu vực.
                    <br/><br/>
                    UP mang sứ mệnh nâng cánh cho cộng đồng khởi nghiệp Việt Nam phát triển khỏe mạnh và đạt mục tiêu một cách nhanh nhất qua gói hỗ trợ giá tốt nhất thị trường và môi trường kết nối với mạng lưới trong giới đầu tư, kinh doanh và công nghệ.
                    <br/><br/>
                    UP luôn tạo một môi trường làm việc năng động, sáng tạo, thân thiện với cơ hội thăng tiến cao cho các bạn trẻ có đam mê và nhiệt huyết.
                </p>
                <br/>
                <p class="font-weight-bold">
                    Vị trí tuyển dụng (CLICK ĐỂ XEM CHI TIẾT VỀ CÔNG VIỆC):
                </p>
                <ul>
                    <li>
                        <a href="" class="green-text">Nhân viên cộng đồng và sự kiện</a>
                    </li>
                    <li>
                        <a href="" class="green-text">Quản lý cộng đồng và sự kiện</a>
                    </li>
                    <li>
                        <a href="" class="green-text">Trường phòng vận hành HCM</a>
                    </li>
                    <li>
                        <a href="" class="green-text">Chuyện viên pháp chế</a>
                    </li>
                    <li>
                        <a href="" class="green-text">Nhân viên kinh doanh</a>
                    </li>
                </ul>
            </div>
            <div class="col-md-6">
                <img src="http://up-co.vn/wp-content/uploads/tuyen-dung-hr-01-1-1-732x1024.jpg" width="100%" height="auto" alt="">
            </div>
        </div>
    </div>
@endsection