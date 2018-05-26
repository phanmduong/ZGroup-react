@extends('upcoworkingspace::layouts.master')

@section('vi-content')
    <style>
        .banner{
            background: url("http://up-co.vn/wp-content/uploads/2016/08/back2.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
            height: 600px;
        }
        .flexbox-centering {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .white-text{
            color: #fff;
        }
        #co-1{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/image1-2.jpg");
            background-position: 50% 50%;
            background-size: cover;
            height: 500px;
        }
        #co-2{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/10255509_10152836081949046_5649044726019190139_n-e1470199685922.jpg");
            background-position: 50% 50%;
            background-size: cover;
            height: 500px;
        }
        #co-3{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/13918396_10153551255295771_612429366_o-e1470198264130-781x1024.jpg");
            background-position: 50% 50%;
            background-size: cover;
            height: 500px;
        }
    </style>

    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>VÌ CỘNG ĐỒNG KHỞI NGHIỆP VIỆT NAM</h2>
        </div>
    </div>

    <div style="background: #fff;" class="container-fluid">
        <div class="container" style="color: #000;">
            <br/>
            <h3 class="text-uppercase font-weight-bold text-center">
                câu chuyện của up
            </h3>
            <br/><br/>
            <div class="row">
                <div class="col-md-4">
                    <img width="100%" height="auto" src="http://up-co.vn/wp-content/uploads/2016/07/10380516_10152836081949046_5649044726019190139_o-500x500.jpg" alt="">
                </div>
                <div class="col-md-8">
                    <p style="text-align: justify;">
                        UP được ra đời vào tháng 3 năm 2016 nhưng ý tưởng về mô hình không gian làm việc chung UP đã được ấp ủ từ rất lâu trước đó. Gây dựng nên UP cùng những nhà đồng sáng lập khác, anh Đỗ Hoài Nam – cha đẻ của Emotiv Systems với sản phẩm “máy đo bộ não người” và SeeSpace với sản phẩm chính là InAir, trải nghiệm truyền hình tương tác, đã&nbsp;từng đi rất nhiều nơi và chứng kiến sự phát triển thần kì của những startup triệu đô tại thung lũng Silicon Valley. Nghiên cứu và đầu tư nhiều mô hình kinh doanh hỗ trợ startup, anh nhận thấy rằng điều dẫn đến cái chết yểu của đa số các startup, đặc biệt là các startup non trẻ chính là chi phí vận hành quá cao làm giảm độ cạnh tranh và là cái phanh kìm hãm sự phát triển. Đã đến lúc startup Việt cần một sự hỗ trợ xứng đáng để những nỗ lực mà họ bỏ ra được trân trọng và là động lực lớn thúc đẩy nền kinh tế của đất nước. Và UP ra đời để lấp vào khoảng trống đó. Sự hỗ trợ từ UP là sự hợp thành của rất nhiều nguồn lực. Cùng một không gian làm viêc chung UP, startup được tạo mọi điều kiện để làm việc, học hỏi, mở rộng quan hệ, gây vốn, xin tư vấn với gói hỗ trợ giá tốt nhất thị trường. Đó là điều mà UP luôn cam kết để dẫn dắt, nuôi dưỡng và nâng đỡ các startup Việt.
                    </p>
                </div>
            </div>
        </div>
        <br/><br/>
        <br/><br/>
    </div>


    <div class="container-fluid">
        <br/>
        <div class="container">
            <h3 class="text-center text-uppercase font-weight-bold">
                tầm nhìn - sứ mệnh - giá trị cốt lõi
            </h3>
            <div class="row">
                <div class="col-md-4">
                    <h3 class="text-center text-uppercase font-weight-bold">
                        TẦM NHÌN
                    </h3>
                    <div class="text-justify">
                        Xây dựng và phát triển cộng đồng StartUp Việt lớn mạnh nhất Đông Nam Á, đem lại những thay đổi mạnh mẽ, tích cực và bền vững cho nền kinh tế đất nước và khu vực.
                    </div>
                </div>
                <div class="col-md-4">
                    <h3 class="text-center text-uppercase font-weight-bold">
                        sứ mệnh
                    </h3>
                    <div class="text-justify">
                        UP mang sứ mệnh nâng cánh cho StartUp Việt phát triển khỏe mạnh và đạt mục tiêu một cách nhanh nhất qua gói hỗ trợ giá tốt nhất thị trường và môi trường kết nối với mạng lưới trong giới đầu tư, kinh doanh và công nghệ.
                    </div>
                </div>
                <div class="col-md-4">
                    <h3 class="text-center text-uppercase font-weight-bold">
                        giá trị cốt lõi
                    </h3>
                    <div class="text-justify">
                        UP <b>tạo điều kiện</b> để bạn làm việc trong không gian tiện nghi với mức giá hỗ trợ nhất, <b>kết nối</b> bạn với cộng đồng StartUp và mạng lưới nhà đầu tư năng động nhất, <b>truyền lửa</b> giúp bạn kiên định theo đuổi ước mơ đến cùng.
                    </div>
                </div>
            </div>
        </div>
        <br/><br/>
    </div>

    <div style="background: #fff;" class="container-fluid">
        <div class="container" style="color: #000;">
            <br/>
            <h3 class="text-uppercase font-weight-bold text-center">
                đội ngũ sáng lập
            </h3>
            <br/>
            <p class="text-center">
                Những con người cống hiến hết mình vì cộng đồng khởi nghiệp Việt Nam
            </p>
            <br/><br/>
            <div class="row">
                <div class="col-md-4" style="overflow: hidden">
                    <div id="co-1">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Phan Minh Tuấn</b>
                        <br/>
                        <br/>
                        <b>Co-Founder/CEO </b>
                        <br/>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-4" style="overflow: hidden">
                    <div id="co-2">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Đỗ Hoài Nam</b>
                        <br/>
                        <br/>
                        <b>Co-Founder/Chairman </b>
                        <br/>
                        Founder/ Former CEO - Emotive
                        <br/>
                        Founder/CEO - Seespace
                    </p>
                </div>
                <div class="col-md-4" style="overflow: hidden">
                    <div id="co-3">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Bùi Cẩm Vân</b>
                        <br/>
                        <br/>
                        <b>COO </b>
                        <br/>
                        Strategy Consultant - Deloitte UK
                        <br/>
                        BSc. Management - LSE
                    </p>
                </div>
            </div>
        </div>
        <br/><br/>
        <br/><br/>
    </div>
@endsection

