@extends('upcoworkingspace::layouts.master')

@section('vi-content')
    <style>
        .banner {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/back2.jpg");
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
            <h2>đội ngũ sáng lập </h2>
        </div>
    </div>

    <div style="background: #fff;" class="container-fluid">
        <div class="container" style="color: #000;">
            <br/>
            <br/>
            <h3 class="text-uppercase font-weight-bold text-center">
                NHỮNG BỘ NÃO ĐẰNG SAU....
            </h3>
            <br/>
            <p class="text-center">
                Chúng tôi mong muốn xây dựng một cộng đồng sáng tạo của những người khởi nghiệp
                <br/>
                Nơi mà giá trị cốt lõi không chỉ dừng lại ở một không gian làm việc chung
                <br/>
                Mà còn là những cơ hội để cộng đồng khởi nghiệp trẻ biến hoài bão thay đổi thế giới của họ thành sự thật
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

