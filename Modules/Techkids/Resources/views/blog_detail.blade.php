@extends('techkids::layouts.master')

@section('content')
    <div class="wrapper">


        <div class="container">
            <div class="row single-page-wrapper">
                <div class="col-sm-8 col-xs-12">
                    <article>

                        <p>
                            <a href="{{'/'}}">Trang chủ</a>
                            / <a href="/category/{{$post->category->id}}">{{$post->category->name}}</a>
                            / <a href="{{$post->url}}">{{$post->title}}</a>
                        </p>
                        <!-- TODO Single Content -->
                        <h1><a href="{{$post->url}}">{{$post->title}}</a></h1>
                        <div>
                            <p>
                                <a href="/category/{{$post->category->id}}">
                                    {{$post->category->name}}                    </a>&nbsp;|&nbsp;{{format_date($post->created_at)}}
                            </p>
                            <div class="row social-info">
                                <div class="col-xs-12 author-detail">
                                    <span><img alt="" src="{{$post->author->avatar_url}}"
                                               srcset="http://2.gravatar.com/avatar/8c4861359a8dbfd2cb476300571f4eb8?s=100&amp;d=mm&amp;r=g 2x"
                                               class="avatar avatar-50 photo" height="50" width="50"></span>
                                    {{$post->author->name}}        </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-12 article-content">
                                    {!!$post->content !!}
                                </div>
                            </div>
                            <p></p>


                        </div>

                        <div class="row">
                            <div class="col-xs-12 fb-widget">
                                <div class="fb-like fb_iframe_widget" data-href="http://techkids.vn/blog/appsudungreactnative/" data-layout="button_count" data-action="like" fb-xfbml-state="rendered" fb-iframe-plugin-query="action=like&amp;app_id=1379373805458037&amp;container_width=0&amp;href=http%3A%2F%2Ftechkids.vn%2Fblog%2Fappsudungreactnative%2F&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey"><span style="vertical-align: bottom; width: 61px; height: 20px;"><iframe name="fc2be834dcf4" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media" title="fb:like Facebook Social Plugin" src="https://www.facebook.com/v2.8/plugins/like.php?action=like&amp;app_id=1379373805458037&amp;channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FFdM1l_dpErI.js%3Fversion%3D42%23cb%3Df1fc024fa70fc4%26domain%3Dtechkids.vn%26origin%3Dhttp%253A%252F%252Ftechkids.vn%252Ff14ca3d66507f0c%26relation%3Dparent.parent&amp;container_width=0&amp;href=http%3A%2F%2Ftechkids.vn%2Fblog%2Fappsudungreactnative%2F&amp;layout=button_count&amp;locale=en_US&amp;sdk=joey" style="border: none; visibility: visible; width: 61px; height: 20px;" class=""></iframe></span></div>
                                <div class="fb-share">
                                    <span><a href="https://www.facebook.com/sharer/sharer.php?u=http://techkids.vn/blog/appsudungreactnative/" target="_blank"><i class="fa fa-facebook-square" aria-hidden="true"></i> Chia sẻ</a></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-xs-12">
                                <div class="fb-comments fb_iframe_widget fb_iframe_widget_fluid" data-href="http://techkids.vn/blog/appsudungreactnative/" data-width="100%" data-numposts="5" fb-xfbml-state="rendered"><span style="height: 178px;"><iframe id="f20ad20834c2518" name="f3224291e9510c4" scrolling="no" title="Facebook Social Plugin" class="fb_ltr" src="https://www.facebook.com/plugins/comments.php?api_key=1379373805458037&amp;channel_url=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2FFdM1l_dpErI.js%3Fversion%3D42%23cb%3Df1260b764eea348%26domain%3Dtechkids.vn%26origin%3Dhttp%253A%252F%252Ftechkids.vn%252Ff14ca3d66507f0c%26relation%3Dparent.parent&amp;href=http%3A%2F%2Ftechkids.vn%2Fblog%2Fappsudungreactnative%2F&amp;locale=en_US&amp;numposts=5&amp;sdk=joey&amp;version=v2.8&amp;width=100%25" style="border: none; overflow: hidden; height: 178px; width: 100%;"></iframe></span></div>
                            </div>
                        </div>

                    </article>
                </div>
                <!-- sidebar -->
                <aside class="sidebar col-sm-4" role="complementary">
                    <div class="sidebar-title-group">
                        <div class="sidebar-title">
                            <h4>CHUYÊN MỤC</h4>
                        </div>
                    </div>
                    <div class="sidebar-category-list">
                        <ul>
                            <li><h5>
                                    <a href="http://techkids.vn/blog/category/phat-trien-phan-mem/phat-trien-ung-dung-ios/">Phát
                                        triển ứng dụng iOS</a></h5><h5></h5></li>
                            <li><h5>
                                    <a href="http://techkids.vn/blog/category/phat-trien-phan-mem/phat-trien-ung-dung-android/">Phát
                                        triển ứng dụng Android</a></h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/tin-tuc-cong-nghe/">Tin tức công nghệ</a>
                                </h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/uiux/">UI/UX</a></h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/phat-trien-ban-than/">Phát triển bản
                                        thân</a></h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/kinh-nghiem-tuyen-dung/">Kinh nghiệm tuyển
                                        dụng</a></h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/phat-trien-phan-mem/phat-trien-game/">Phát
                                        triển Game</a></h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/tai-lieu-hoc-tap/">Tài liệu học tập</a>
                                </h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/phat-trien-phan-mem/phat-trien-web/">Phát
                                        triển web</a></h5><h5></h5></li>
                            <li><h5><a href="http://techkids.vn/blog/category/phat-trien-phan-mem/">Phát triển phần
                                        mềm</a></h5><h5></h5></li>
                        </ul>
                    </div>
                    <div class="sidebar-widget-form">
                        <div class="sidebar-widget-title">
                            <h4>Muốn đọc nhiều hơn nhưng bài viết hay từ Techkids?</h4>
                            <h3>Đăng ký theo dõi nhé!</h3>
                        </div>
                        <form class="sidebar-form" id="subcriberForm">
                            <input type="text" name="Email" placeholder="Email" id="subcriberEmail" required="">
                            <button type="submit" class="btn btn-default" id="submit-button">Đăng kí</button>
                        </form>
                        <p id="notification" class="notification"></p>
                        <div id="form-loader" class="uil-rolling-css">
                            <div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar-widget-block">
                        <div id="shortcode-widget-2" class="shortcode_widget">
                            <div class="textwidget"><a
                                        href="http://techkids.vn/khoa-hoc-lap-trinh/android?utm_source=Web&amp;utm_medium=None&amp;utm&amp;utm_campaign=AnhBlog"
                                        class="sidebar_img"><img
                                            src="http://techkids.vn/blog/wp-content/uploads/2017/03/iosTechkids-6.png&#10;"></a>
                            </div>
                        </div>
                    </div>
                </aside>

                <script type="text/javascript">
                    $('#subcriberForm').on('submit', function (e) {
                        e.preventDefault();
                        $('#subcriberEmail').css('display', 'none')
                        $('#submit-button').css('display', 'none');
                        $('#form-loader').css('display', 'block');

                        var url = 'https://script.google.com/macros/s/AKfycbw2ddfGDYZXYzWkJG0Yi1xH91M4TKbf1J_VNh9eAsl-5KVGZA/exec'
                        var jqxhr = $.post(url, $('#subcriberForm').serialize(), function (data) {
                            $('#form-loader').css('display', 'none');
                            $('#notification').css('display', 'block');
                            $('#notification').html('Đăng kí theo dõi thành công!');
                            console.log("Success! Data: " + data.statusText);
                        });
                    });
                </script>
                <!-- /sidebar -->
            </div>
        </div>
        <div class="container newest-post-container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="group-title-wrapper">
                        <div class="group-title">
                            <h4>BÀI VIẾT MỚI NHẤT</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row newest-post-row slick-initialized slick-slider" id="newest-post">
                <div aria-live="polite" class="slick-list draggable">
                    <div class="slick-track" role="listbox"
                         style="opacity: 1; width: 1170px; transform: translate3d(0px, 0px, 0px);">
                        <div class="col-sm-4 newest-post-item slick-slide slick-current slick-active"
                             data-slick-index="0" aria-hidden="false" tabindex="-1" role="option"
                             aria-describedby="slick-slide00" style="width: 390px;">
                            <a href="http://techkids.vn/blog/tuduy-nhu-laptrinhvien-java/"
                               title="Làm thế nào để tư duy như một lập trình viên" tabindex="0">
                                <img src="http://techkids.vn/blog/wp-content/uploads/2017/12/voi1-384x246.jpg"
                                     class="attachment-thumbnail size-thumbnail wp-post-image" alt="voi1"> </a>
                            <h4>
                                <a href="http://techkids.vn/blog/tuduy-nhu-laptrinhvien-java/"
                                   title="Làm thế nào để tư duy như một lập trình viên" tabindex="0">Làm thế nào để tư
                                    duy như một lập trình viên</a>
                            </h4>
                            <p></p>
                            <p>JAVASCRIPT “Tôi không thực sự kiểm soát được Javascript. Tôi không thể bắt đầu làm việc
                                với các thành phần từ đầu. Đầu óc tôi như trống rỗng khi bắt... <a class="view-article"
                                                                                                   href="http://techkids.vn/blog/tuduy-nhu-laptrinhvien-java/"
                                                                                                   tabindex="0">Xem
                                    thêm</a></p>
                            <p></p>
                        </div>
                        <div class="col-sm-4 newest-post-item slick-slide slick-active" data-slick-index="1"
                             aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide01"
                             style="width: 390px;">
                            <a href="http://techkids.vn/blog/appsudungreactnative/"
                               title="9 APP NỔI TIẾNG TRÊN THẾ GIỚI SỬ DỤNG REACT NATIVE" tabindex="0">
                                <img src="http://techkids.vn/blog/wp-content/uploads/2017/11/23116834_889997271175206_6860229091341215107_o-470x246.png"
                                     class="attachment-thumbnail size-thumbnail wp-post-image"
                                     alt="23116834_889997271175206_6860229091341215107_o"> </a>
                            <h4>
                                <a href="http://techkids.vn/blog/appsudungreactnative/"
                                   title="9 APP NỔI TIẾNG TRÊN THẾ GIỚI SỬ DỤNG REACT NATIVE" tabindex="0">9 APP NỔI
                                    TIẾNG TRÊN THẾ GIỚI SỬ DỤNG REACT NATIVE</a>
                            </h4>
                            <p></p>
                            <p>9 APP NỔI TIẾNG TRÊN THẾ GIỚI SỬ DỤNG REACT NATIVE React Native là 1 framework đang lên
                                và có vẻ mới mẻ ở Việt Nam, nhưng trên thế giới... <a class="view-article"
                                                                                      href="http://techkids.vn/blog/appsudungreactnative/"
                                                                                      tabindex="0">Xem thêm</a></p>
                            <p></p>
                        </div>
                        <div class="col-sm-4 newest-post-item slick-slide slick-active" data-slick-index="2"
                             aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide02"
                             style="width: 390px;">
                            <a href="http://techkids.vn/blog/thanchucualinux_sudo/" title="Sudo – Thần chú của Linux"
                               tabindex="0">
                                <img src="http://techkids.vn/blog/wp-content/uploads/2017/11/xl-2017-computer-code-1-470x246.jpg"
                                     class="attachment-thumbnail size-thumbnail wp-post-image"
                                     alt="xl-2017-computer-code-1"> </a>
                            <h4>
                                <a href="http://techkids.vn/blog/thanchucualinux_sudo/"
                                   title="Sudo – Thần chú của Linux" tabindex="0">Sudo – Thần chú của Linux</a>
                            </h4>
                            <p></p>
                            <p>Thần chú của Linux Sudo Nếu bạn đã từng sử dụng Linux để khắc phục sự cố thì chắc hẳn bạn
                                đã biết đến thần chú của Linux: “sudo”. Một... <a class="view-article"
                                                                                  href="http://techkids.vn/blog/thanchucualinux_sudo/"
                                                                                  tabindex="0">Xem thêm</a></p>
                            <p></p>
                        </div>
                    </div>
                </div>


            </div>
        </div>

    </div>
@endsection