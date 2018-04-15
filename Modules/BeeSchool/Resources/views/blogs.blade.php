@extends('beeschool::layouts.master')

@section('content')
<style>
    .bee-img{height:250px;width:auto}
</style>
<main id="primary">
    <div class="content-area">
        <div class="container">
            <div id="main" class="site-main" role="main"><h1 class="entry-title">Blog</h1>
                <div class=" row">
                    <div class="col-md-9">
                        <div class="row">
                                @foreach($blogs as $blog)
                                <article id="post-1766" class="col-md-4 post">
                                        <header class="entry-header">
                                            <a class="images"
                                               href="{{'/blog/post/'.$blog->id}}"
                                               title="Làm sao để trẻ hứng thú với Tiếng Anh?">
                                                <img class="bee-img" src="{{generate_protocol_url($blog->url)}}"
                                                     alt="Làm sao để trẻ hứng thú với Tiếng Anh?">
                                            </a>
                                        </header>
                                        <a class="category-title" href="#">{{$blog->title}}</a><h4
                                                class="entry-title"><a
                                                    href="{{'/blog/post/' . $blog->id}}"
                                                    rel="bookmark">{{$blog->title}}</a></h4>
                                        <div class="entry-content">
                                            <div class="entry-meta">
                                                <span class="posted-on fa fa-calendar" aria-hidden="true"><a
                                                            href="http://beeschool.vn/blog/lam-sao-de-tre-hung-thu-voi-tieng-anh/"
                                                            rel="bookmark"><time class="updated"
                                                                                 datetime="2017-12-05T18:42:30+00:00">05/12/2017</time></a></span>
                                            </div>
                                            <div class="comment-number"></div>
                                            <p class="excerpt">{{shortString($blog->description, 15)}}</p></div>
                                    </article>
                                @endforeach
                        </div>
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