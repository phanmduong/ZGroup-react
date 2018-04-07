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
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>vì cộng đồng khởi nghiệp việt nam</h2>
        </div>
    </div>
    <br/>
    <br/>
    <div class="container">
        <p>
            <b>Trụ sở Up Co-working Space</b>
            <br/><br/>
            Địa chỉ: Tầng 8, tòa nhà Hanoi Creative City, Số 1 phố Lương Yên, Phường Bạch Đằng, Quận Hai Bà Trưng, Hà Nội.
            <br/>
            Điện thoại: (+84)24 7 308 0668
            <br/>
            Email: info@up-co.vn
            <br/><br/>
            <b>Hướng dẫn chỉ đường tới Up</b>
            <br/><br/>
            UP được đặt tại khu vực trung tâm với vị trí thuận lợi, tiện việc đi lại cho các thành viên. Bạn chỉ mất:
        </p>
        <ul>
            <li>
                3 phút từ Nhà hát lớn
            </li>
            <li>
                5 phút từ cầu Chương Dương
            </li>
            <li>
                5 phút từ Times City
            </li>
            <li>
                6 phút từ Đại học Bách Khoa
            </li>
        </ul>
        <br/>
        <p>
            Bạn có thể đến UP bằng: Ô tô (có chỗ đỗ xe), Xe máy (gửi xe miễn phí) và Xe bus
        </p>
        <br/><br/>
    </div>


@endsection

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
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>contact us</h2>
        </div>
    </div>
    <br/>
    <br/>
    <div class="container">
        <p>
            <h3 class="font-weight-bold">COME & VISIT</h3>
            <br/>
            <b>Address:</b> Level 8, No. 1 Luong Yen street, Hanoi Creative City Building, 1 Luong Yen Stress, Hai Ba Trung, Hanoi.
            <br/>
            <b>Phone:</b> (+84)4 7 308 0668
            <br/>
            <b>Email:</b> info@up-co.vn
            <br/><br/>
            <h3 class="font-weight-bold">HOW TO COME UP COWORKING SPACE? </h3>
            <br/>
            UP coworking space is nearly the center of Hanoi City, if you want go to Up, you only need to:
        </p>
        <ul>
            <li>
                    3 minutes from Hanoi Opera House
            </li>
            <li>
                    5 minutes from Chuong Duong Bridge
            </li>
            <li>
                    5 minutes from Times City
            </li>
            <li>
                    6 minutes from Hanoi Technology University
            </li>
        </ul>
        <br/><br/>
    </div>


@endsection