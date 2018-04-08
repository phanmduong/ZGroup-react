@extends('upcoworkingspace::layouts.en-master')




@section('en-content')
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

        #mentor-1 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/1.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-2 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/nguyenduylan.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-3 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/2.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-4 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/4.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-5 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/3.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-6 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/6.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-7 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/5.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-8 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/11.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-9 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/7.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-10 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/12.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-11 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/9.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }

        #mentor-12 {
            background: url("http://up-co.vn/wp-content/uploads/2016/08/8.png");
            background-position: 50% 50%;
            background-size: cover;
            height: 350px;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>UP MENTORS</h2>
        </div>
    </div>

    <div style="background: #fff;" class="container-fluid">
        <div class="container" style="color: #000;">
            <br/>
            <br/>
            <h3 class="text-uppercase font-weight-bold text-center">
                    UP MENTORS
            </h3>
            <br/>
            <p class="text-center">
                    It is our pleasure to welcome honorable members to UP co-working space. Come to UP to listen, to learn and to share stories with them.ật
            </p>
            <br/><br/>
            <div class="row">
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-1">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br/>
                        <b>Nguyễn Đức Thành</b>
                        <br/>
                        <br/>
                        Viện trưởng VEPR
                        Viện Nghiên cứu Kinh tế và Chính sách
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-2">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Nguyễn Duy Lân</b>
                        <br>
                        <br>
                        Super Star người Việt kỳ cựu nhất ở Microsoft Headquarter Redmond
                        Chuyên gia hàng đầu về enterprise security.
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-3">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Cao Toàn Mỹ</b>
                        <br>
                        <br>
                        MCofounder VNG
                        <br/>
                        Một trong những nhà đầu tư thiên thần năng động nhất hiện nay
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-4">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Tuấn Nguyễn</b>
                        <br>
                        <br>
                        VC Corp
                        <br/>
                        chuyên gia về thương mại điện tử và marketing
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-5">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phạm Diệp Anh</b>
                        <br>
                        <br>
                        Founder của SilkyVietnam
                        <br/>
                        Biên tập viên VTV
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-6">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Lê Huỳnh Kim Ngân</b>
                        <br>
                        <br>
                        Founder Twenty.vn
                        <br/>
                        Cái tên nổi bật trong giới Công nghệ - Khởi nghiệp
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-7">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phan Minh Tuấn</b>
                        <br>
                        <br>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-8">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phan Minh Tuấn</b>
                        <br>
                        <br>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-9">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phan Minh Tuấn</b>
                        <br>
                        <br>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-10">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phan Minh Tuấn</b>
                        <br>
                        <br>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-11">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phan Minh Tuấn</b>
                        <br>
                        <br>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>
                <div class="col-md-3" style="overflow: hidden">
                    <div id="mentor-12">

                    </div>
                    <p style="background: #f9f9f9;" class="text-center">
                        <br>
                        <b>Phan Minh Tuấn</b>
                        <br>
                        <br>
                        MSc. Real Estate Management - Greenwich University
                    </p>
                </div>


            </div>
        </div>
        <br/><br/>
        <br/><br/>
    </div>

@endsection
