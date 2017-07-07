@extends('layouts.crawl_layout')

@section('head')
    <title>SÁCH THIẾT KẾ CHO NGƯỜI MỚI BẮT ĐẦU - CUỐN SÁCH GỐI ĐẦU GIƯỜNG CHO NHỮNG NGƯỜI MỚI BẮT ĐẦU CON ĐƯỜNG THIẾT
        KẾ</title>
    <meta property="fb:app_id" content="1787695151450379"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="http://colorme.vn/mua-sach"/>
    <meta property="og:description"
          content="CUỐN SÁCH GỐI ĐẦU GIƯỜNG CHO NHỮNG NGƯỜI MỚI BẮT ĐẦU CON ĐƯỜNG THIẾT KẾ"/>
    <meta property="og:title" content="SÁCH THIẾT KẾ CHO NGƯỜI MỚI BẮT ĐẦU - COLORME"/>
    <meta property="og:image" content="http://d1j8r0kxyu9tj8.cloudfront.net/webs/1section.png"/>
@endsection

<body>
@section('body')
    <div class="page-wrap">
        <div class="container-fluid">
            <div class="row book-landing-section first right-image">
                <div class="col-sm-6">
                    <div class="red line"></div>
                    <h1 class="bl-title"><!-- react-text: 1144 -->THIẾT KẾ<!-- /react-text --><br>
                        <!-- react-text: 1146 -->
                        CHO NGƯỜI MỚI BẮT ĐẦU<!-- /react-text --></h1>
                    <p><!-- react-text: 1148 -->CUỐN SÁCH GỐI ĐẦU GIƯỜNG<!-- /react-text --><br>
                        <!-- react-text: 1150 -->CHO
                        NHỮNG NGƯỜI MỚI BẮT ĐẦU CON ĐƯỜNG THIẾT KẾ<!-- /react-text --></p>
                    <div class="bl-btn-wrapper"><a class="btn-upload bl-btn" href="#form-buy-book">Đặt sách ngay</a>
                    </div>
                    <div><img src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/arrow.png" alt="{{seo_keywords()}}"
                              style="float: left; width: 120px; margin-left: -120px; padding-top: 48px;">
                        <div><h1 class="bl-title"
                                 style="font-size: 6em; font-family: Bebasbook; padding: 20px 0px 0px;">
                                <span id="lines">{{$num_orders}}</span><!-- react-text: 1158 -->+<!-- /react-text -->
                            </h1>
                            <div>SÁCH ĐÃ ĐƯỢC ĐẶT</div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6 bl-image-container">
                    <img alt="{{seo_keywords()}}"
                         src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/1section.png">
                </div>
            </div>
            <div class="row" id="bl-routing-wrapper">
                <div style="width: 100%; text-align: center; background-color: white; height: 50px!important; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.388235) 0px 10px 10px -12px;">
                    <a class="routing-bar-item" href="#first-after-nav"
                       style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">Giới
                        thiệu</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#content"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">Nội
                        dung</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#value"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">Giá
                        trị</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#info"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">Thông
                        tin</a><span
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">|</span><a
                            class="routing-bar-item" href="#form-buy-book"
                            style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: bold; opacity: 0.6;">Đặt
                        sách</a></div>
            </div>
            <div class="row book-landing-section odd right-image" id="first-after-nav">
                <div class="col-sm-6 left-container"><h2 class="bl-sub-title">ĐẶT SÁCH</h2>
                    <div class="red line"></div>
                    <h1 class="bl-title"><!-- react-text: 1178 -->THIẾT KẾ<!-- /react-text --><br>
                        <!-- react-text: 1180 -->
                        CHO NGƯỜI MỚI BẮT ĐẦU<!-- /react-text --></h1>
                    <p>Nếu bạn đang bắt đầu tìm hiểu về thiết kế, nếu bạn muốn hiểu rõ những luật căn bản, những ví dụ
                        điển
                        hình, thì đây chính là cuốn sách dành cho bạn.</p>
                    <p>Thiết kế cho người mới bắt đầu là cuốn sách đầu tiên trong tủ sách học thuật của colorME</p>
                    <p>Phát hành vào tháng 10 năm 2016, cuốn sách đang làm giáo trình chính thống giảng dạy cho hơn 5000
                        học
                        viên từng học tại colorME.</p>
                    <div class="bl-btn-wrapper"><a class="btn-upload bl-btn" href="#form-buy-book">Đặt sách ngay</a>
                    </div>
                </div>
                <div class="col-sm-6 bl-image-container"><img alt="{{seo_keywords()}}"
                                                              src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/4new.png"
                                                              style="width: 90%; float: right;"></div>
            </div>
            <div class="row book-landing-section even left-image" id="content">
                <div class="col-sm-6 bl-image-container"><img alt="{{seo_keywords()}}"
                                                              src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/2.png">
                </div>
                <div class="col-sm-6 bl-right-container"><h2 class="bl-sub-title">CÓ GÌ TRONG</h2>
                    <div class="black line"></div>
                    <h1 class="bl-title"><!-- react-text: 1195 -->CUỐN SÁCH<!-- /react-text --><br>
                        <!-- react-text: 1197 -->
                        DÀNH CHO MỌI NGƯỜI<!-- /react-text --></h1>
                    <ul class="dashed">
                        <li>Kiến thức cơ bản về thiết kế kĩ thuật số</li>
                        <li>Những luật căn bản trong thiết kế: Màu sắc, Typography, bố cục...</li>
                        <li>Hơn 40 ví dụ minh hoạ được colorME thiết kế</li>
                        <li>Các bài phân tích được viết kĩ lưỡng</li>
                        <li>Những lỗi thường gặp trong thiết kế</li>
                    </ul>
                    <div class="bl-btn-wrapper"><a class="btn-upload bl-btn" href="#form-buy-book">Đặt sách ngay</a>
                    </div>
                </div>
            </div>
            <div class="row book-landing-section odd right-image" id="value">
                <div class="col-sm-6 left-container"><h2 class="bl-sub-title">BẠN SẼ</h2>
                    <div class="red line"></div>
                    <h1 class="bl-title"><!-- react-text: 1211 -->NHẬN ĐƯỢC GÌ<!-- /react-text --><br>
                        <!-- react-text: 1213 -->TỪ CUỐN SÁCH NÀY?<!-- /react-text --></h1>
                    <p>Thiết kế không phải là một con đường trải đầy hoa hồng, càng không phải là 1 con đường ngắn.</p>
                    <p>Để có những khởi đầu thật tốt, bạn sẽ cần 1 người chỉ dẫn, từng li từng tí một, quan những kiến
                        thức
                        quan trọng sẽ được truyền tải đến bạn trong cuốn sách này.</p>
                    <div class="bl-btn-wrapper"><a class="btn-upload bl-btn" href="#form-buy-book">Đặt sách ngay</a>
                    </div>
                </div>
                <div class="col-sm-6 bl-image-container"><img
                            alt="{{seo_keywords()}}"
                            src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/3section.png">
                </div>
            </div>
            <div class="row book-landing-section even left-image" id="info">
                <div class="col-sm-6 bl-image-container"><img alt="{{seo_keywords()}}"
                                                              src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/5.png">
                </div>
                <div class="col-sm-6 bl-right-container"><h2 class="bl-sub-title">THÔNG TIN VỀ SÁCH</h2>
                    <div class="black line"></div>
                    <h1 class="bl-title">TÁC GIẢ</h1>
                    <p>Nguyễn Việt Hùng - Founder/CEO trung tâm đào tạo thiết kế đồ hoạ colorME</p>
                    <h1 class="bl-title">100% IN MÀU</h1>
                    <p>200 trang sách in màu, kích thước 16cm x 24cm, thuận tiện để bạn đem theo mọi lúc mọi nơi.</p>
                    <h1 class="bl-title">GIÁ SÁCH</h1>
                    <p>Giá bìa 156.000 vnđ</p>
                    <div class="bl-btn-wrapper"><a class="btn-upload bl-btn" href="#form-buy-book">Đặt sách ngay</a>
                    </div>
                </div>
            </div>
            <div class="row book-landing-section odd" id="form-buy-book" style="padding: 100px;">
                <div class="col-sm-6 left-container"><h2 class="bl-sub-title">ĐẶT MUA</h2>
                    <div class="red line"></div>
                    <h1 class="bl-title"><!-- react-text: 1239 -->SÁCH THIẾT KẾ<!-- /react-text --><br>
                        <!-- react-text: 1241 -->CHO NGƯỜI MỚI BẮT ĐẦU<!-- /react-text --></h1>
                    <div>
                        <img alt="{{seo_keywords()}}"
                             src="http://d1j8r0kxyu9tj8.cloudfront.net/webs/arrow.png"
                             style="float: left; width: 120px; padding-top: 10px; margin-left: -120px;">
                        <div><h1 style="font-weight: 200; font-size: 3.5em; font-family: Bebasbook;">156.000 Đ</h1>
                        </div>
                    </div>
                    <h2 class="bl-sub-title"><i class="fa fa-play red-text" aria-hidden="true"
                                                style="margin-right: 5px;"></i><!-- react-text: 1248 --> MIỄN PHÍ SHIP
                        NỘI
                        THÀNH<!-- /react-text --></h2>
                    <p>Miễn phí ship với các bạn ở nội thành Hà Nội. Các bạn ở tỉnh thành khác vui lòng cộng thêm
                        25.000đ
                        tiền ship.</p>
                    <h2 class="bl-sub-title"><i class="fa fa-play red-text" aria-hidden="true"
                                                style="margin-right: 5px;"></i><!-- react-text: 1252 --> GIẢM 10% KHI
                        MUA
                        TẠI VĂN PHÒNG COLORME<!-- /react-text --></h2>
                    <p>Giá sách chỉ còn 140.000đ khi bạn mua sách trực tiếp tại văn phòng colorME - Tầng 2, số 175 Chùa
                        Láng, Đống Đa, Hà Nội.</p>
                    <h2 class="bl-sub-title"><i class="fa fa-play red-text" aria-hidden="true"
                                                style="margin-right: 5px;"></i><!-- react-text: 1256 --> HÌNH THỨC THANH
                        TOÁN<!-- /react-text --></h2>
                    <p>Ngay sau khi đăng kí, bạn vui lòng kiểm tra email để kiểm tra đơn hàng. Trong vòng 24h colorME sẽ
                        liên hệ với bạn để hướng dẫn bạn thủ tục thanh toán và giao hàng cho bạn trong thời gian sớm
                        nhất!</p></div>
                <div class="col-sm-6"><h2 class="bl-title"><!-- react-text: 1260 -->VUI LÒNG ĐIỀN<!-- /react-text -->
                        <br>
                        <!-- react-text: 1262 -->THÔNG TIN CỦA BẠN<!-- /react-text --></h2>
                    <p>Trong vòng 24h chúng tôi sẽ liên lạc với bạn để xác nhận đăng kí và bắt đầu vận chuyển sách.</p>
                    <div class="red line"></div>
                    <form method="post" style="padding-top: 30px;">
                        <div class="form-group"><label for="name"><!-- react-text: 1268 -->Tên của bạn
                                <!-- /react-text -->
                                <!-- react-text: 1269 --> <!-- /react-text --><span style="color: red;">*</span></label>
                            <div class="field"><input type="text" name="name" class="form-control"
                                                      placeholder="Tên của bạn"></div>
                        </div>
                        <div class="form-group"><label for="email"><!-- react-text: 1275 -->Email của bạn
                                <!-- /react-text --><!-- react-text: 1276 --> <!-- /react-text --><span
                                        style="color: red;">*</span></label>
                            <div class="field"><input type="email" name="email" class="form-control"
                                                      placeholder="Tên của bạn"></div>
                        </div>
                        <div class="form-group"><label for="phone"><!-- react-text: 1282 -->Số điện thoại của bạn
                                <!-- /react-text --><!-- react-text: 1283 --> <!-- /react-text --><span
                                        style="color: red;">*</span></label>
                            <div class="field"><input type="text" name="phone" class="form-control"
                                                      placeholder="Số điện thoại của bạn"></div>
                        </div>
                        <div class="form-group"><label for="address"><!-- react-text: 1289 -->Địa chỉ giao hàng
                                <!-- /react-text --><!-- react-text: 1290 --> <!-- /react-text --><span
                                        style="color: red;">*</span></label>
                            <div class="field"><input type="text" name="address" class="form-control"
                                                      placeholder="Địa chỉ giao hàng"></div>
                        </div>
                        <div class="form-group"><label for="amount"><!-- react-text: 1296 -->Số lượng sách
                                <!-- /react-text --><!-- react-text: 1297 --> <!-- /react-text --><span
                                        style="color: red;">*</span></label>
                            <div class="field"><input type="number" name="amount" class="form-control"
                                                      placeholder="Số lượng sách"></div>
                        </div>
                        <div class="form-group"><label for="note"><!-- react-text: 1303 -->Ghi chú<!-- /react-text -->
                                <!-- react-text: 1304 --> <!-- /react-text --><!-- react-text: 1305 -->
                                <!-- /react-text --></label>
                            <div class="field"><input type="text" name="note" class="form-control"
                                                      placeholder="Ghi chú">
                            </div>
                        </div><!-- react-text: 1308 --><!-- /react-text -->
                        <div class="bl-btn-wrapper">
                            <button class="btn-upload bl-btn">Đặt sách ngay</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

@endsection

</body>