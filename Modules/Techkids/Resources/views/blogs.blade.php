@extends('techkids::layouts.master')

@section('content')
    <div class="wrapper">

        <div class="container">
            <div class="row single-page-wrapper banner">
                <h1>LẬP TRÌNH GIỎI LÀ CHƯA ĐỦ</h1>
                <h2>HÃY ĐỌC NHIỀU HƠN</h2>
            </div>
        </div>
        <div class="container newest-post-container">
            <div class="row">
                <div class="col-xs-12">
                    <div class="group-title-wrapper">
                        <div class="group-title">
                            <h4>BÀI VIẾT TIÊU BIỂU</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row newest-post-row slick-initialized slick-slider" id="newest-post">
                <div aria-live="polite" class=" slick-list draggable">

                    <div class="slick-track row " role="listbox"
                         style="opacity: 1; width: auto; transform: translate3d(0px, 0px, 0px);">

                        @foreach($blogs->take(3) as $blog)
                            <div class="col-sm-4 col-md-4 newest-post-item slick-slide slick-current slick-active"
                                 data-slick-index="0" aria-hidden="false" tabindex="-1" role="option"
                                 aria-describedby="slick-slide00" style="min-width: 300px;">
                                <a href="{{'/' . $blog->slug}}"
                                   title={{$blog->title}} tabindex="0">
                                    <img src="{{generate_protocol_url($blog->url)}}"
                                         class="attachment-thumbnail size-thumbnail wp-post-image"
                                         alt="23116834_889997271175206_6860229091341215107_o"> </a>
                                <h4>
                                    <a href="{{'/blog/post/'.$blog->id}}"
                                       title={{$blog->title}} tabindex="0">{{$blog->title}}</a>
                                </h4>
                                <p></p>
                                <p>{{shortString($blog->description, 19)}}<a class="view-article"
                                                                             href="{{'/' . $blog->slug}}"
                                                                             tabindex="0">Xem thêm</a></p>
                                <p></p>
                            </div>
                        @endforeach
                    </div>


                    {{--<div class="col-sm-4 newest-post-item slick-slide slick-active" data-slick-index="1"--}}
                    {{--aria-hidden="false" tabindex="-1" role="option" aria-describedby="slick-slide01"--}}
                    {{--style="width: 324px;">--}}
                    {{--<a href="http://techkids.vn/blog/thanchucualinux_sudo/" title="Sudo – Thần chú của Linux"--}}
                    {{--tabindex="0">--}}
                    {{--<img src="http://techkids.vn/blog/wp-content/uploads/2017/11/xl-2017-computer-code-1-470x246.jpg"--}}
                    {{--class="attachment-thumbnail size-thumbnail wp-post-image"--}}
                    {{--alt="xl-2017-computer-code-1"> </a>--}}
                    {{--<h4>--}}
                    {{--<a href="http://techkids.vn/blog/thanchucualinux_sudo/"--}}
                    {{--title="Sudo – Thần chú của Linux" tabindex="0">Sudo – Thần chú của Linux</a>--}}
                    {{--</h4>--}}
                    {{--<p></p>--}}
                    {{--<p>Thần chú của Linux Sudo Nếu bạn đã từng sử dụng Linux để khắc phục sự cố thì chắc hẳn bạn--}}
                    {{--đã biết đến thần chú của Linux: “sudo”. Một... <a class="view-article"--}}
                    {{--href="http://techkids.vn/blog/thanchucualinux_sudo/"--}}
                    {{--tabindex="0">Xem thêm</a></p>--}}
                    {{--<p></p>--}}
                    {{--</div>--}}


                </div>


            </div>
        </div>
        <div class="container">
            <section class="row single-page-wrapper">
                <div class="col-sm-8 col-xs-12 category-list-wrapper">
                    <div class="group-title-wrapper">
                        <div class="group-title">
                            <h4>BÀI VIẾT MỚI NHẤT</h4>
                        </div>
                    </div>

                    <div class=" row category-list" id="newest-posts">
                        @foreach($blogs->take(4) as $blog)
                            <div class="col-sm-6 col-xs-12 category-article-item">
                                <article id={{$blog->id}}
                                        class="post-988 post type-post status-publish format-standard has-post-thumbnail
                                         hentry category-phat-trien-ban-than category-uncategorized
                                ">
                                <a href="{{'/' . $blog->slug}}"
                                   title={{$blog->title}}>
                                    <img src="{{generate_protocol_url($blog->url)}}"
                                         class="attachment-thumbnail size-thumbnail wp-post-image" alt="voi1"> </a>
                                <h4>
                                    <a href="{{'/' . $blog->slug}}"
                                       title={{$blog->title}}>{{$blog->title}}</a>
                                </h4>
                                <p>{{shortString($blog->description, 19)}} <a
                                            class="view-article"
                                            href="{{'/' . $blog->slug}}">Xem thêm</a></p>
                                </article>
                            </div>
                        @endforeach
                        <div class="clearfix"></div>
                        <a href="http://techkids.vn/blog/latest" class="btn btn-default btn-more">Xem thêm</a>
                    </div>

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
                            @foreach($goodCategories as $goodCategory)
                                <li><h5>
                                        <a href="{{'/category/'.$goodCategory->id}}">{{$goodCategory->name}}</a></h5>
                                    <h5></h5></li>
                            @endforeach
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
            </section>
        </div>

        <script type="text/javascript">
            var offset = 0
            $('body').on('click', '.navigation-button', function (e) {
                e.preventDefault();
                if (offset + parseInt($(this).attr('data-offset')) >= 0
                    &&
                    offset + parseInt($(this).attr('data-offset')) <= 5) {
                    offset += parseInt($(this).attr('data-offset'))
                    console.log(offset)

                    $.ajax({
                        url: "http://techkids.vn/blog/wp-content/themes/html5blank-stable/ajax-get-newest-posts.php",
                        type: "POST",
                        data: {"offset": offset}
                    })
                        .done(function (res) {
                            $items = $(res)
                            $('#newest-posts').html($items);
                        })
                }

            })

        </script>


    </div>

@endsection
