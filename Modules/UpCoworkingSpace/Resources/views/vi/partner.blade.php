@extends('upcoworkingspace::layouts.master')

@section('vi-content')
    <style>
        .banner{
            background: url("http://up-co.vn/wp-content/uploads/2016/08/back2.jpg");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            background-position: center center;
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
        hr{
            border-top: 1px solid #a2c300;
        }
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>VÌ CỘNG ĐỒNG KHỞI NGHIỆP VIỆT NAM</h2>
        </div>
    </div>

    <div class="container">
        <br/><br/>
        <div class="row">
            <div class="col-md-4">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/2.1.a-1-800x450.jpg" width="100%" height="auto" alt="">
            </div>
            <div class="col-md-8">
                <h2 class="font-weight-bold text-uppercase">
                    đối tác của up
                </h2>
                <p class="text-justify">
                    UP sẽ không thành công nếu không có các đối tác chiến lược. Sự hỗ trợ vô giá của các đối tác đã đưa chúng tôi trở thành cộng đồng khởi nghiệp và doanh nhân lớn nhất Việt Nam. Với sự cam kết vì cộng đồng và sự hỗ trợ từ phía các đối tác, UP luôn là nơi dành cho những con người dám đột phá, đổi mới dẫn đầu tương lai của công nghệ.
                    <br/>
                    Để tìm hiểu thêm về cơ hội hợp tác, vui lòng liên hệ với Community Manager của chúng tôi tại: van@up-co.vn
                </p>
            </div>
        </div>
        <br/><br/>
        <h3 class="font-weight-bold text-uppercase">
            đối tác chiến lược
        </h3>
        <br/><br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/Logo-VNPT-1-150x150.jpg" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    VNPT hiện là Tập đoàn Bưu chính Viễn thông hàng đầu tại Việt Nam. Kế thừa 70 năm xây dựng, phát triển và gắn bó trên thị trường viễn thông Việt Nam, VNPT vừa là nhà cung cấp dịch vụ đầu tiên đặt nền móng cho sự phát triển của ngành Bưu chính, Viễn thông Việt Nam, vừa là tập đoàn có vai trò chủ chốt trong việc đưa Việt Nam trở thành 1 trong 10 quốc gia có tốc độ phát triển Bưu chính Viễn thông nhanh nhất toàn cầu.
                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    VNPT hỗ trợ miễn phí Internet tốc độ cao cho tất cả thành viên UP. Bên cạnh đấy là các gói hỗ trợ 30-50% cho các startup.
                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/images-150x150.png" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    Là một trong những ngân hàng TMCP thành lập sớm nhất tại Việt nam, VPBank đã có những bước phát triển vững chắc trong suốt lịch sử của ngân hàng. Đặc biệt từ năm 2010, VPBank đã tăng trưởng vượt bậc với việc xây dựng và triển khai chiến lược chuyển đổi toàn diện dưới sự hỗ trợ của một trong các công ty tư vấn chiến lược hàng đầu thế giới. Theo chiến lược này, VPBank đặt mục tiêu trở thành một trong 5 ngân hàng TMCP hàng đầu Việt Nam và một trong 3 ngân hàng TMCP bán lẻ hàng đầu Việt Nam vào năm 2017.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    Ra mắt Không gian làm việc chung UP@VPBank – Sự kết hợp đầu tiên giữa 1 Không gian làm việc chung và Ngân hàng đánh dấu những bước đi tiếp theo mang lại giá trị cho cộng đồng start-up Việt.                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/facebook-logo-150x150.png" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    Facebook – mạng xã hội hàng đầu trên thế giới hiện nay và có nhiều số người dùng nhất tại Việt Nam. Facebook không chỉ tạo ra cuộc cách mạng trong sự giao tiếp và chia sẻ thông tin mà còn tạo ra những ứng dụng đột phá giúp tăng tính cạnh tranh cho doanh nghiệp qua ứng dụng Facebook for Business.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    Facebook sẽ tăng cường các khoá training và mở ra nhiều cơ hội đầu tư cho các thành viên tại UP

                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/Swequity-e1467293821896-150x150.jpg" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">

                    Swequity Ultimate Fitness được ra đời với tiêu chí là điểm đến yêu thích của những người đam mê gym theo một cách khoa học và có đam mê cháy bỏng muốn thay đổi bản thân. Swequity là không gian tập luyện giúp người tập nắm vững kĩ thuật và tăng hiệu quả luyện tập với những dụng cụ hàng đầu như Rouge và LifeFitness Áp dụng tại Tầng 10 tòa nhà Hanoi Creative City, số 1 Lương Yên, Hà Nội.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    Giảm giá tại Swequity 10% khi sử dụng gói 6 tháng và 15% khi sử dụng gói 1 năm cho member của UP
                    <br/>
                    *Đặc biệt: Kết hợp gói thành viên giá 1,900,000/tháng sử dụng ở cả UP và SUF                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/12607083_1003305676402840_1415203592_n-e1467293639309-150x150.jpg" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    Tổ chức Tình nguyện về giáo dục Volunteer For Education (VEO) là tổ chức phi lợi nhuận hỗ trợ giáo dục tại Việt Nam. Tổ chức là một cộng đồng mạng lưới kết nối các TNV trên toàn thế giới nhằm chung tay giúp đỡ những đối tượng khó khăn thông qua các chương trình giáo dục của VEO. Chương trình du lịch thiện nguyện của VEO đã và đang chứng minh những tác động tích cực của tổ chức cho xã hội.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    VEO tặng 200 voucher 100,000 đ cho các members tại UP                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/logomoicmc-150x150.png" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    CMC là một trong những tập đoàn công nghệ hàng đầu Việt Nam với 23 năm xây dựng và phát triển. Được tổ chức theo mô hình công ty mẹ – con với 8 công ty thành viên, một viện nghiên cứu công nghệ hoạt động tại Việt Nam và nhiều nước trên thế giới, tập đoàn CMC đã và đang khẳng định vị thế trên thị trường nội địa và hướng tới thị trường khu vực, quốc tế thông qua những hoạt động kinh doanh chủ lực.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    CMC tặng miễn phí các gói dịch vụ Office 365 từ Microsoft cho các Members tại UP                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/eDoctor-150x150.png" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    eDoctor là ứng dụng cài đặt trên di động, với những chức năng cơ bản được cung cấp miễn phí cho người dùng như hỏi đáp với bác sĩ, tra cứu thuốc, tìm phòng khám hay nhà thuốc gần nhất. Hiện nay ứng dụng eDoctor đã có hàng chục ngàn người sử dụng và con số đang tăng theo mức lũy tiến.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    1. eDoctor tặng 100 thẻ trị giá 100k/thẻ cho 100 bạn renew full time tại UP
                    <br/>
                    2. eDoctor tặng 100 thẻ trị giá 50k/thẻ cho các bạn đăng ký trong tháng 8                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/Untitled-1-e1467295244377-150x150.jpg" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">

                    Global Shapers Community (GSC) được lập nên bởi Diễn Đàn Kinh Tế Thế Giới (World Economic Forum) vào năm 2011 dành cho những người trẻ  có tiềm năng trở thành lãnh đạo tương lai. GSC hiện nay đã trở một cộng đồng gồm các tổ chức thành viên ở 453 thành phố lớn trên thế giới,  tiến hành những hoạt động và dự án khác nhau tạo ra tác động tích cực tới cộng đồng trên rất nhiều lĩnh vực: môi trường, kinh doanh, sức khỏe, nghệ thuật, văn hóa.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    Cơ hội tham gia mạng lưới Global Shapers (Diễn đàn kinh tế thế giới) để nhận cơ hội tham dự các hội thảo lớn, các buổi training và gặp gỡ nhà đầu tư trên toàn thế giới.                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/koh-2-150x150.png" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    Koh Samui Hut là chuỗi cửa hàng phục vụ thức quà Thái đúng điệu nhất với sự lựa chọn đa dạng. Nếu đang tìm kiếm một địa chỉ ẩm thực uy tín, hãy đến với Koh Samui Hut và có những trải nghiệm cho riêng mình. Áp dụng tại 183 Giảng Võ, 34A Quang Trung, Hà Nội.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    Giảm giá 15% cho thành viên UP khi sử dụng dịch vụ                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/cong-150x150.png" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">
                    Cộng cà phê nơi chất lượng được đặt lên hàng đầu gợi nhớ lại thời xã hội chủ nghĩa theo kiểu hóm hỉnh, giễu nhại, với tường gạch mộc, bàn ghế thủ công tự đóng, tranh cổ động và điểm một chút màu quân đội. Áp dụng tại 15 Trúc Bạch, 101B1 Trần Huy Liệu, 101 Vạn Phúc, 54 Mã Mây, Hà Nội.                </p>
            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    Giảm giá 10% cho thành viên UP khi sử dụng dịch vụ                </p>
            </div>
        </div>
        <hr width="80%">
        <br/>
        <div class="row">
            <div class="col-md-3">
                <img src="http://up-co.vn/wp-content/uploads/2016/06/logo-150x150.jpg" width="150" height="150" alt="">
            </div>
            <div class="col-md-6">
                <p class="text-justify">

                    ColorME là trung tâm dạy thiết kế cho người mới bắt đầu, hiện tại ColorME đang có 4 khoá học chính: Photoshop(PS), Illustrator (AI), After Efects(AE), Nhiếp Ảnh(PT). Với đội ngũ giảng viên chất lượng, siêu nhiệt tình , ColorMe cam kết sẽ là nguồn cảm hứng vô hạn để bạn bắt đầu con đường thiết kế của mình. Hơn 3500 học viên đã theo học tại colorME trong năm vừa qua, tiếp bước đó, colorME hiện đã mở ra 2 cơ sở ở Hà Nội.            </div>
            <div class="col-md-3">
                <p class="text-justify">
                    1. Tặng 02 bộ toolkit thiết kế độc quyền của ColorME cho thành viên UP sử dụng không thời hạn.
                    <br/>
                    2. Giảm 15% cho thành viên UP khi đăng ký khóa học bất kì tại ColorME            </div>
        </div>
        <hr width="80%">
        <br/>
    </div>
@endsection