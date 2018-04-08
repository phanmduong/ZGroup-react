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
    </style>
    <div class="banner flexbox-centering">
        <div class="text-uppercase text-center white-text">
            <h3>UP CO-WORKING space</h3>
            <h2>ĐỐI TÁC TRUYỀN THÔNG</h2>
        </div>
    </div>
    <br/>
    <br/>
    <div class="container">
        <p class="text-center">
            Bạn có câu hỏi về không gian làm việc chung UP. Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn! Dưới
            đây là những câu hỏi thường gặp. Nhấp chuột vào câu hỏi để tìm câu trả lời.
            <br/>
            Nếu bạn có bất kì câu hỏi nào khác, xin hãy email cho Marketing Manager của UP: <a style="color: #96d21f;"
                                                                                               href="#" target="_blank">anhnn@up-co.vn</a>
        </p>
        <br/><br/>
        <div id="accordion">
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapse1"
                                aria-expanded="true" aria-controls="collapse1">
                            Nếu là thành viên của Up, tôi sẽ nhận được quyền lợi gì?
                        </button>
                    </h5>
                </div>

                <div id="collapse1" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Làm việc và sáng tạo trong một môi trường hiện đại, chuyên nghiệp, đầy đủ tiện nghi.
                        <ul>
                            <li>
                                Dùng phòng họp hiện đại 24/7
                            </li>
                            <li>
                                Miễn phí sử dụng màn hình led 86 inch, máy chiếu 3D, Apple TV
                            </li>
                            <li>
                                Miễn phí trà và cafe
                            </li>
                            <li>
                                Gửi xe miễn phí
                            </li>
                            <li>
                                Kết nối và mở rộng quan hệ với các freelancer, developer, designer, startup đủ mọi lĩnh
                                vực tại Up
                            </li>
                            <li>
                                Miễn phí tất cả các sự kiện tại UP
                            </li>
                            <li>
                                Hỗ trợ đăng ký doanh nghiệp
                            </li>
                            <li>
                                Học hỏi và kết nối trong các sự kiện tổ chức bởi UP với sự hiện diện của khách mời nổi
                                tiếng và các chuyên gia đầu ngành
                            </li>
                            <li>
                                Nhận lời khuyên, tư vấn về luật doanh nghiệp và thiết kế đồ họa từ các đối tác tin cậy
                                của UP
                            </li>
                            <li>
                                Giao lưu, gặp gỡ và cơ hội tiếp cận nguồn vốn đầu tư từ các nhà đầu tư và các quỹ đầu tư
                                lớn
                            </li>
                            <li>
                                Và tận hưởng mọi quyền lợi với thẻ thành viên Up:
                            </li>
                            <li>
                                Miễn phí khi chơi tại Dóo (tầng 6,7 cùng toà nhà)
                            </li>
                            <li>
                                Voucher từ Edoctor và Uber
                            </li>
                            <li>
                                Giảm 15% khi đăng ký Swequity Gym (tầng 10 cùng toà nhà)
                            </li>
                            <li>
                                Giảm 10% khi uống Boo cafe (tầng 1 cùng toà nhà)
                            </li>
                            <li>
                                Giảm 15% tại Kohsamui (183 Giảng Võ, 34A Quang Trung)
                            </li>
                            <li>
                                Giảm 10% tại Cộng cafe (15 Trúc Bạch, 101B1 Trần Huy Liệu, 101 Vạn Phúc, Cộng Mã Mây)
                            </li>
                            <li>
                                Giảm 10% du lịch VEO (<a style="color: #96d21f;"
                                                         href="http://www.volunteerforeducation.org" target="_blank">http://www.volunteerforeducation.org</a>)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse2"
                                aria-expanded="false" aria-controls="collapse2">
                            Làm sao tôi có thể vào văn phòng của Up để làm việc?
                        </button>
                    </h5>
                </div>
                <div id="collapse2" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Nếu bạn là thành viên của UP, bạn có thể vào văn phòng bằng thẻ thành viên. Nếu là khách, bạn có
                        thể bấm chuông và đăng ký tại lễ tân trước khi vào.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse3"
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
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse4"
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
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse5"
                                aria-expanded="false" aria-controls="collapse5">
                            Các khuyến mãi ở Up có áp dụng cho khách hàng thanh toán nhiều lần 1 dịch vụ không?
                        </button>
                    </h5>
                </div>
                <div id="collapse5" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Không, ưu đãi chỉ áp dụng cho khách hàng thanh toán cùng một lúc.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse6"
                                aria-expanded="false" aria-controls="collapse6">
                            Tôi muốn chuyển từ gói thành viên linh hoạt lên gói thành viên tháng thì cần thủ tục gì?
                        </button>
                    </h5>
                </div>
                <div id="collapse6" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Bạn chỉ cần đóng thêm 1,300,000VNĐ và gói thành viên tháng sẽ được tính kể từ ngày bạn đóng tiền và kích hoạt gói thành viên linh hoạt.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse7"
                                aria-expanded="false" aria-controls="collapse7">
                            Tôi muốn đăng ký sử dụng dịch vụ thì phải làm thế nào?
                        </button>
                    </h5>
                </div>
                <div id="collapse7" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Bạn đến trực tiếp quầy lễ tân của UP để đăng kí sử dụng dịch vụ và thanh toán hoặc gửi yêu cầu đăng kí tới địa chỉ email: <a style="color: #96d21f;"
                                                                                                                                                     href="#" target="_blank">info@up-co.vn</a>, chúng tôi sẽ liên hệ lại với bạn.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse8"
                                aria-expanded="false" aria-controls="collapse8">
                            Tôi có thể sử dụng phòng họp không? Chi phí cho phòng họp như thế nào?
                        </button>
                    </h5>
                </div>
                <div id="collapse8" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Bạn hoàn toàn được sử dụng phòng họp miễn phí khi là thành viên tháng của UP, ngoại trừ những giờ đã được đặt trước.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse9"
                                aria-expanded="false" aria-controls="collapse9">
                            Tôi có thể mời khách hàng tới làm việc tại Up không?
                        </button>
                    </h5>
                </div>
                <div id="collapse9" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, nếu là thành viên tháng, bạn có thể tiếp tối đa 4 khách một lần, mỗi lần không quá 2 tiếng và các lần không liên tiếp nhau. Nếu là thành viên linh hoạt, bạn có thể tiếp tối đa 2 khách một lần, mỗi lần không quá 1 tiếng và các lần không liên tiếp nhau.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse10"
                                aria-expanded="false" aria-controls="collapse10">
                            Up có không gian riêng để làm việc qua video call hay gọi điện thoại không?
                        </button>
                    </h5>
                </div>
                <div id="collapse10" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, UP trang bị 02 phòng điện thoại tuyệt đối yên tĩnh và riêng tư cho các cuộc gọi điện thoại hoặc họp nhóm qua Skype.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse11"
                                aria-expanded="false" aria-controls="collapse11">
                            Nếu là thành viên của Up, tôi có tủ để đựng đồ cá nhân không?
                        </button>
                    </h5>
                </div>
                <div id="collapse11" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, các thành viên ở UP sẽ được đặt tủ để đồ theo tháng và sẽ trả tủ sau khi gói thành viên hết hạn.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse12"
                                aria-expanded="false" aria-controls="collapse12">
                            Ở Up có hỗ trợ nhận và gửi chuyển phát không?
                        </button>
                    </h5>
                </div>
                <div id="collapse12" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, dịch vụ gửi và nhận bưu phẩm là một trong những dịch vụ trong gói văn phòng ảo ở UP.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse13"
                                aria-expanded="false" aria-controls="collapse13">
                            Up có hỗ trợ đặt số điện thoại cố định khi thuê văn phòng không?
                        </button>
                    </h5>
                </div>
                <div id="collapse13" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, dịch vụ đặt số điện thoại cố định là một trong những dịch vụ trong gói văn phòng ảo ở UP.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse14"
                                aria-expanded="false" aria-controls="collapse14">
                            Tôi có thể tìm được cảm hứng gì từ không gian mở của UP?
                        </button>
                    </h5>
                </div>
                <div id="collapse14" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Phong cách thiết kế của UP được truyền cảm hứng từ không gian làm việc của các tập đoàn nổi tiếng như Facebook, Google, mang tới một không gian thoáng đãng, trẻ trung, hiện đại và thân thiện.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse15"
                                aria-expanded="false" aria-controls="collapse15">
                            Tốc độ mạng internet ở Up như thế nào?
                        </button>
                    </h5>
                </div>
                <div id="collapse15" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Mạng Internet của UP rất nhanh, đáp ứng nhu cầu làm việc của tất cả các thành viên.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse16"
                                aria-expanded="false" aria-controls="collapse16">
                            Ở Up có những không gian riêng tư để thư giãn hoặc tìm kiếm ý tưởng mới không?
                        </button>
                    </h5>
                </div>
                <div id="collapse16" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, UP thiết kế những không gian riêng, yên tĩnh như khu vực cây xanh giúp các thành viên của UP tập trung làm việc.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse17"
                                aria-expanded="false" aria-controls="collapse17">
                            Ở Up có những sự kiện dành cho cộng đồng member không?
                        </button>
                    </h5>
                </div>
                <div id="collapse17" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        UP thường xuyên tổ chức các sự kiện kết nối và các chương trình hàng tháng nhằm kéo các thành viên trong UP khít lại gần nhau hơn.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse18"
                                aria-expanded="false" aria-controls="collapse18">
                            Tôi có thể xem thông tin về những sự kiện tổ chức tại Up ở đâu?
                        </button>
                    </h5>
                </div>
                <div id="collapse18" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Các thành viên sẽ nhận được vé mời và thông tin về các sự kiện và hoạt động diễn ra ở UP qua email và facebook group.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse19"
                                aria-expanded="false" aria-controls="collapse19">
                            UP thường tổ chức sự kiện với nội dung gì?
                        </button>
                    </h5>
                </div>
                <div id="collapse19" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        UP luôn cố gắng lựa chọn và tổ chức các sự kiện đáp ứng nhu cầu tăng cường kiến thức chuyên môn, mở rộng mạng lưới quan hệ và gặp gỡ đối tác của thành viên UP.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse20"
                                aria-expanded="false" aria-controls="collapse20">
                            Trong các sự kiện của Up,tôi có thể networking với các mentor được không?
                        </button>
                    </h5>
                </div>
                <div id="collapse20" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        Có, tất cả các sự kiện tổ chức tại UP đều bao gồm phần Networking để các thành viên có thể giao lưu với khách mời và giao lưu với nhau để tăng cường mạng lưới cá nhân, nâng cao kỹ năng chuyên môn và được truyền cảm hứng.
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse21"
                                aria-expanded="false" aria-controls="collapse21">
                            Các sự kiện của Up sẽ hỗ trợ gì cho tôi?
                        </button>
                    </h5>
                </div>
                <div id="collapse21" class="collapse" data-parent="#accordion">
                    <div class="card-body">
                        UP hỗ trợ sự phát triển của thành viên và doanh nghiệp thông qua việc tư vấn, định hướng và kết nối với các đối tác, nhà đầu tư tin cậy trong mạng lưới rộng và mạnh mẽ của UP.
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>

@endsection
