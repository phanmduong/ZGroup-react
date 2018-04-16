@extends('beeschool::layouts.master')

@section('content')
    <main id="primary">
        <div class="content-area">
            <div class="container">
                    <div class=" row">
                        <div class="col-md-9">
                            <h1 class="entry-title">{{$post->title}}</h1>
                                <div class="content">
                                        {!!$post->content !!}
                                <div class="related"><h4 class="entry-title">Bài viết liên quan</h4>
                                    <ul class="list-related-1 row">
                                        <li class="col-md-4">
                                            <a href="http://beeschool.vn/ban-tin-beeschool/thong-bao-nghi-tet-duong-lich-2018/" class="thumb"><img
                                                        src="http://beeschool.vn/wp-content/uploads/bfi_thumb/27657244_2014434112130209_5139671154490366348_n-nnfhdl0ms2yqcofj56m1uvayzuya8un9ynmugo9c2q.jpg"
                                                        alt="Thông báo nghỉ tết Mậu Tuất 2018"></a>
                                            <p><a href="http://beeschool.vn/ban-tin-beeschool/thong-bao-nghi-tet-duong-lich-2018/" class="title">Thông
                                                    báo nghỉ tết Mậu Tuất 2018</a></p></li>
                                        <li class="col-md-4">
                                            <a href="http://beeschool.vn/ban-tin-beeschool/ha-long-qua-tang-cho-ong-gia-noel/" class="thumb"><img
                                                        src="http://beeschool.vn/wp-content/uploads/bfi_thumb/25594334_1646355752054661_2722009919120175228_n-1-nnfhdl0ms2yqcofj56m1uvayzuya8un9ynmugo9c2q.jpg"
                                                        alt="[Hạ Long] Quà tặng cho Ông già Noel"></a>
                                            <p><a href="http://beeschool.vn/ban-tin-beeschool/ha-long-qua-tang-cho-ong-gia-noel/" class="title">[Hạ
                                                    Long] Quà tặng cho Ông già Noel</a></p></li>
                                        <li class="col-md-4">
                                            <a href="http://beeschool.vn/ban-tin-beeschool/ket-qua-cuoc-thi-beespelling-2017/" class="thumb"><img
                                                        src="http://beeschool.vn/wp-content/uploads/bfi_thumb/25323976_10156103438298678_177166209_n-nnfhdl0ms2yqcofj56m1uvayzuya8un9ynmugo9c2q.png"
                                                        alt="KẾT QUẢ CUỘC THI BEESPELLING 2017"></a>
                                            <p><a href="http://beeschool.vn/ban-tin-beeschool/ket-qua-cuoc-thi-beespelling-2017/" class="title">KẾT
                                                    QUẢ CUỘC THI BEESPELLING 2017</a></p></li>
                                    </ul>
                                    <ul class="list-related-2">
                                        <li class="title">
                                            <a href="http://beeschool.vn/blog/lam-sao-de-tre-hung-thu-voi-tieng-anh/">Làm sao để trẻ hứng thú với
                                                Tiếng Anh?</a></li>
                                        <li class="title">
                                            <a href="http://beeschool.vn/ban-tin-beeschool/danh-sach-thi-sinh-vao-chung-ket-beespelling-2017/">Danh
                                                sách thí sinh vào Chung Kết BeeSpelling 2017</a></li>
                                        <li class="title">
                                            <a href="http://beeschool.vn/ban-tin-beeschool/danh-sach-hoc-sinh-vao-ban-ket-beespelling-2017/">Danh
                                                sách học sinh vào bán kết BeeSpelling 2017</a></li>
                                        <li class="title">
                                            <a href="http://beeschool.vn/ban-tin-beeschool/long-bien-bees-discovery-2-trai-nghiem-thu-vi/">Bee’s
                                                Discovery 2, một trải nghiệm thú vị đầu năm học mới</a></li>
                                        <li class="title">
                                            <a href="http://beeschool.vn/blog/lam-sao-de-tap-trung-hoc/">Làm sao để bé tập trung học ???</a></li>
                                        <li class="title">
                                            <a href="http://beeschool.vn/blog/loi-ich-tu-viec-cho-tre-hoc-tieng-anh-tu-som/">Lợi ích từ việc cho trẻ
                                                học Tiếng Anh từ sớm</a></li>
                                    </ul>
                                </div>
                                <div class="fb-comments fb_iframe_widget"
                                     data-href="http://beeschool.vn/blog/lam-sao-de-tre-hung-thu-voi-tieng-anh/" data-numposts="5" data-width="889"
                                     fb-xfbml-state="rendered"><span style="height: 178px; width: 889px;"><iframe id="f242fa8b23be858"
                                                                                                                  name="f3fe8d7765b3f84"
                                                                                                                  scrolling="no"
                                                                                                                  title="Facebook Social Plugin"
                                                                                                                  class="fb_ltr"
                                                                                                                  src="https://www.facebook.com/plugins/comments.php?api_key=588898951212012&amp;channel_url=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FFdM1l_dpErI.js%3Fversion%3D42%23cb%3Df3d6bed4486136c%26domain%3Dbeeschool.vn%26origin%3Dhttp%253A%252F%252Fbeeschool.vn%252Ff2245c9d7f3da4%26relation%3Dparent.parent&amp;href=http%3A%2F%2Fbeeschool.vn%2Fblog%2Flam-sao-de-tre-hung-thu-voi-tieng-anh%2F&amp;locale=vi_VN&amp;numposts=5&amp;sdk=joey&amp;version=v2.9&amp;width=889"
                                                                                                                  style="border: none; overflow: hidden; height: 178px; width: 889px;"></iframe></span>
                                </div>
                            </div>
                            ewfwef

                        </div>
                        <div class="col-md-3">
                            <aside id="secondary" class="widget-area sidebar" role="complementary">
                                <section id="custom_html-2" class="widget_text widget widget_custom_html">
                                    <div class="textwidget custom-html-widget">
                                        <iframe width="100%" height="260"
                                                src="https://www.youtube.com/embed/TLNbsNTlQK8"
                                                frameborder="0" allowfullscreen=""></iframe>
                                    </div>
                                </section>
                                <section id="custom_html-3" class="widget_text widget widget_custom_html">
                                    <div class="textwidget custom-html-widget"><h2><a
                                                    href="http://beeschool.vn/su-kien-beeshools/">Sự kiện mới nhất </a>
                                        </h2>
                                        <div class="list-post">
                                            <div class="content_post">
                                                <div class="entry-right">
                                                    <small>14:30 -16:30</small>
                                                    <strong>01</strong><span>28/01/2018</span></div>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/event_beeshools/long-bien-beemarket-2018-tet-xua-tet-nay/">[Long
                                                            Biên] BeeMarket 2018 “Tết xưa – Tết nay”</a></h4>
                                                    <p class="excerpt">Một mùa xuân nữa lại đến, một năm mới đang...</p>
                                                </div>
                                            </div>
                                            <div class="content_post">
                                                <div class="entry-right">
                                                    <small>15:00 - 17:00</small>
                                                    <strong>12</strong><span>24/12/2017</span></div>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/event_beeshools/ha-long-cuoc-thi-anh-noel-2017-trang-phuc-noel-tai-che-cua-con/">[Hạ
                                                            Long] Quà tặng cho Ông già Noel</a></h4>
                                                    <p class="excerpt">Santa Claus is coming to BeeSchool!!!????????????
                                                        Hello Hello!!! Cùng chờ...</p></div>
                                            </div>
                                            <div class="content_post">
                                                <div class="entry-right">
                                                    <small>18:00 - 20:00</small>
                                                    <strong>10</strong><span>29/10/2017</span></div>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/event_beeshools/thai-binh-le-hoi-halloween/">[Thái
                                                            Bình] Lễ hội Halloween</a></h4>
                                                    <p class="excerpt">BeeSchool Thái Bình tổ chức chương trình "Lễ hội
                                                        Halloween"...</p></div>
                                            </div>
                                            <div class="content_post">
                                                <div class="entry-right">
                                                    <small>15:00 - 17:00</small>
                                                    <strong>12</strong><span>10/12/2017</span></div>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/event_beeshools/long-bien-beespelling-contest-2017/">[Long
                                                            Biên] BeeSpelling Contest 2017</a></h4>
                                                    <p class="excerpt">✓GIỚI THIỆU BeeSpelling là cuộc thi đánh vần dựa
                                                        trên...</p></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section id="text-7" class="widget widget_text">
                                    <div class="textwidget"><h2><a href="http://beeschool.vn/tuyen-dung/">Tin tuyển
                                                dụng</a></h2>
                                        <p></p>
                                        <div class="list-notification">
                                            <div class="content_post">
                                                <a class="thumb"
                                                   href="http://beeschool.vn/tin-tuyen-dung/ha-long-tuyen-giao-vien-tai-bai-chay/"
                                                   title="[Ha Long] Tuyển giáo viên tại Bãi Cháy">
                                                    <img src="http://beeschool.vn/wp-content/uploads/bfi_thumb/beeschool_tytoay19-nnfhdlyfmocfal5pbjxzcpsqrxvfime819wswf8q20.jpg"
                                                         alt="[Ha Long] Tuyển giáo viên tại Bãi Cháy">
                                                </a>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/tin-tuyen-dung/ha-long-tuyen-giao-vien-tai-bai-chay/">[Ha
                                                            Long] Tuyển giáo viên tại Bãi Cháy</a></h4>
                                                    <p class="excerpt">[Hạ Long] BEESCHOOL Bãi Cháy Tuyển giáo viên ★
                                                        Số...</p></div>
                                            </div>
                                            <div class="content_post">
                                                <a class="thumb"
                                                   href="http://beeschool.vn/tin-tuyen-dung/ha-noi-tuyen-dung-thang-7/"
                                                   title="[Hà Nội] Tuyển dụng tháng 7">
                                                    <img src="http://beeschool.vn/wp-content/uploads/bfi_thumb/19260673_1471764159513822_2394976339054109829_n-nnfhdlyfmocfal5pbjxzcpsqrxvfime819wswf8q20.jpg"
                                                         alt="[Hà Nội] Tuyển dụng tháng 7">
                                                </a>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/tin-tuyen-dung/ha-noi-tuyen-dung-thang-7/">[Hà
                                                            Nội] Tuyển dụng tháng 7</a></h4>
                                                    <p class="excerpt">BEESCHOOL LONG BIÊN TUYỂN DỤNG Để đáp ứng nhu
                                                        cầu...</p></div>
                                            </div>
                                            <div class="content_post">
                                                <a class="thumb"
                                                   href="http://beeschool.vn/tin-tuyen-dung/tuyen-dung-ke-toan/"
                                                   title="TUYỂN DỤNG KẾ TOÁN">
                                                    <img src="http://beeschool.vn/wp-content/uploads/bfi_thumb/tuyển-dụng-2-nnfhdlyfmocfal5pbjxzcpsqrxvfime819wswf8q20.jpg"
                                                         alt="TUYỂN DỤNG KẾ TOÁN">
                                                </a>
                                                <div class="content-new"><h4><a
                                                                href="http://beeschool.vn/tin-tuyen-dung/tuyen-dung-ke-toan/">TUYỂN
                                                            DỤNG KẾ TOÁN</a></h4>
                                                    <p class="excerpt">&nbsp; - Số lượng: 02 Kế toán tổng hợp (ưu...</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p></p></div>
                                </section>
                                <section id="text-11" class="widget widget_text">
                                    <div class="textwidget">
                                        <div class="ads-img"><p><a href="http://beeschool.vn/danh-muc/blog/#"><img
                                                            src="http://beeschool.vn/wp-content/uploads/2017/07/QC-BSmart2.png"
                                                            alt=""></a></p>
                                            <p><a href="http://beeschool.vn/danh-muc/blog/#"><img
                                                            src="http://beeschool.vn/wp-content/uploads/2017/07/QC-Bwords2.png"
                                                            alt=""></a></p></div>
                                    </div>
                                </section>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
@endsection