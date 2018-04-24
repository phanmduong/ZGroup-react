@extends('upcoworkingspace::layouts.master')

@section('vi-content')
    <style>
        .banner{
            background: url("http://up-co.vn/wp-content/uploads/2016/07/khong-gian-lam-viec-1.jpg");
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
        .white-text{
            color: #fff;
        }
        .co-input{
            border: 1px solid #8bd100;
            padding: 10px;
        }

    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>contact us</h2>
        </div>
    </div>

    <div class="container">
        <br/><br/>
        <br/>
        <form>
            <div class="row">
                    <div class="col-md-6">
                        <img src="http://up-co.vn/wp-content/uploads/Anh-10-1024x633.jpg" width="100%" height="auto" alt="">
                    </div>
                    <div class="col-md-6">
                        <h3 class="text-center font-weight-bold">
                                Khám phá và trải nghiệm 01 ngày miễn phí tại UP Coworking Space
                        </h3>
                        <br/>
                        <div class="row">
                            <label class="font-weight-bold" for="name">Họ và tên *</label>
                            <input type="text" class="form-control co-input" name="name" id="name" required>
                        </div>
                        <br/>
                        <div class="row">
                            <label class="font-weight-bold" for="email">Email</label>
                            <input type="email" class="form-control co-input" id="email" name="email"  required>
                        </div>
                        <br/>
                        <div class="row">
                            <label class="font-weight-bold" for="phone">Số điện thoại *</label>
                            <input type="text" class="form-control co-input" name="phone" id="phone" required>
                        </div>
                        <br/>
                        <div class="row">
                            <br/>
                            <input style="background: #8bd100;
                            border: 0;
                            color: #fff;
                            font-weight: bold;
                            padding: 10px 15px;
                            width: 100%;
                            text-transform: uppercase;
                            font-size: 18px;" type="submit" name="submit" id="submit" value="Submit" class="btn btn-success">
                        </div>
                        <br/>
                        <p class="font-weight-bold">
                                Địa điểm đăng ký trải nghiệm *
                        </p>
                        <label><input type="radio" name="optradio"><span> 
        
                                UP Lương Yên: Tầng 8, toà nhà Hanoi Creative City, số 1 Lương Yên, Hai Bà Trưng, Hà Nội</span></label>
                        <br/>
                        <label><input type="radio" name="optradio"><span> BKHUP: Tầng 3, toà nhà A17, số 17 Tạ Quang Bửu, Hai Bà Trưng, Hà Nội</span></label>
                        <br/>
                        <label><input type="radio" name="optradio"><span> UP Kim Mã: Tầng 5, tòa nhà VIT, số 519 Kim Mã, Ba Đình, Hà Nội</span></label>
                        <br/>
                        <label><input type="radio" name="optradio"><span> UP@VPBank: Tầng 21, số 89 Láng Hạ, Ba Đình, Hà Nội</span></label>
                        <br/>
                        <label><input type="radio" name="optradio"><span> 
                                UP Bách Khoa Hồ Chí Minh: Số 268 Lý Thường Kiệt, phường 14, quận 10, Hồ Chí Minh</span></label>
                        <br/>
                        <div class="row">
                            <img src="http://up-co.vn/wp-content/uploads/2016/06/up-212x160-106x80.png" alt="Up" class="m-auto">
                        </div>
                    </div>
            </div>
                <br/><br/>
        </form>
    </div>


@endsection
