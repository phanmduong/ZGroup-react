@extends('filmzgroup::layouts.master')
@section('content')
    <script>(function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.0&appId=216500585606896&autoLogAppEvents=1';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
    <script type="text/javascript">
        jQuery(document).ready(function ($) {
            var width = $('.poster').width();
            var height = width * 3 / 2;
            $('.poster').css('height', height);
        })
    </script>
    <style type="text/css">
        .fb-comments iframe {
            height: 500px !important;
            left: 0px !important
        }

        .fb-comments, .fb-comments span, .fb-comments span iframe {
            width: 100% !important
        }

        .poster {
            display: block;
            width: 100%;
            margin-bottom: 25px;
            border-radius: 10px;
        }

        /*.share a {*/
        /*padding: 11px*/
        /*}*/

        .share a:hover {
            cursor: pointer;
            color: #fbbd61;
            border-color: #fbbd61;
        }

        @media (max-width: 991px) {
            .share a {
                /*padding: 7px;*/
                font-size: 12px;
                line-height: 28px;
                width: 30px;
                height: 30px;
            }
        }
    </style>
    <body class="home page-template page-template-page-templates page-template-page-builder page-template-page-templatespage-builder-php page page-id-35 masthead-fixed full-width grid">
    <div class="fw-page-builder-content">
        <section style=" padding-top: 0px; padding-bottom: 0px; border-width: 0px 0px 0px 0px"
                 id="section_e81e6b53dc8f4b725a6b5710b892282e" class="fw-main-row ">
            <div class="fw-container-fluid">
                <div class="fw-row">

                    <div style="padding: 0;" class="fw-col-xs-12 ">

                        <div id="hero" class="carousel slide carousel-fade" data-ride="carousel" style="height: 772px;">

                            <img src="http://specto.klevermedia.co.uk/wp-content/themes/specto/images/scroll-arrow.svg"
                                 alt="Scroll down" class="scroll">

                            <!-- Hero content -->

                            <div id="carousel" class="carousel slide" data-ride="carousel">
                                <!--film yeu thich-->
                                <!-- Indicators -->
                                <div class="container">
                                    <ol class="carousel-indicators">
                                        <?php $i = 0;?>
                                        @foreach($favoriteFilms as $favoriteFilm)
                                            <?php if ($i == 2) {
                                                $class = "active";
                                            } else {
                                                $class = "";
                                            }?>
                                            <li data-target="#carousel" data-slide-to="{{$i}}" class="{{$class}}"></li>
                                            <?php $i++;?>
                                        @endforeach
                                    </ol>
                                </div>

                                <!-- Wrapper for slides -->
                                <div class="carousel-inner" role="listbox">
                                    <!-- Slides -->
                                    <?php $i = 0; $class = "";?>
                                    @foreach($favoriteFilms as $favoriteFilm)
                                        <?php if ($i == 1) {
                                            $class = "active";
                                        } else {
                                            $class = "";
                                        }?>
                                        <div class="item {{$class}}"
                                             style="background-image: url({{$favoriteFilm->cover_url}}); padding-top: 0px;">

                                            <div class="container">
                                                <div class="row blurb">
                                                    <div class="col-md-8 col-sm-12 blurb-content">
                                                        <span class="title">{{$favoriteFilm->film_genre}}</span>
                                                        <header>
                                                            <h1>{{$favoriteFilm->name}}</h1>
                                                        </header>
                                                        <p>{{$favoriteFilm->summary}}</p>

                                                        <div class="buttons">
                                                            {{--<span class="certificate">{{$film->film_quality}}</span>--}}
                                                            <a href="{{$favoriteFilm->trailer_url}}"
                                                               data-vbtype="video"
                                                               class="venobox btn btn-default vbox-item">

                                                                <i class="fa fa-play"></i>

                                                                <span>Xem trailer</span>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <?php $i++; ?>
                                @endforeach


                                <!-- Slides end -->
                                </div>
                            </div>
                            <script>
                                jQuery(document).ready(function ($) {
                                    // Hero slider
                                    $('.carousel').carousel({
                                        interval: 8000,
                                        keyboard: true,
                                        pause: "hover"
                                    });
                                });
                            </script>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <div class="fw-page-builder-content">
            <section style=" padding-top: 75px; padding-bottom: 75px; border-width: 0px 0px 0px 0px"
                     id="section_2ee403a9f987da2bf6e5041fee20223d" class="fw-main-row ">
                <div class="fw-container">
                    <div class="fw-row">

                        <div style="padding: 0 15px 0 15px;" class="fw-col-xs-12 fw-col-sm-8 ">
                            <header>
                                <h2 class="left " style="color: #ec7532">
                                    Nội dung </h2>
                            </header>
                            <div class="row">
                                <div class="col-sm-5">
                                    <div class="slick-slide" style="display: block; padding: 0px">
                                        <div class="movie-poster">
                                            <aside>
                                                <div>

                                                    <a href="{{$film->trailer_url}}" data-vbtype="video"
                                                       class="venobox play vbox-item" tabindex="-1">
                                                        <i class="fa fa-play"></i>
                                                    </a>
                                                    <a href="/{{$film->id}}" title="Locked in" class="read-more"
                                                       tabindex="-1">
                                                        Xem Trailer </a>

                                                </div>
                                            </aside>
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png">
                                                <span style="background: url({{$film->cover_url}}) center center / cover;"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="share">
                                        <a href="https://www.facebook.com/sharer.php?u=http://filmzgroup.test/">
                                            <i class="fa fa-facebook" aria-hidden="true"></i>
                                        </a>
                                        <a href="https://twitter.com/intent/tweet?url=http://filmzgroup.test/{{$film->id}}&amp;text={{$film->name}}">
                                            <i class="fa fa-twitter" aria-hidden="true"></i>
                                        </a>
                                        <a href="http://pinterest.com/pin/create/button/?url=http://filmzgroup.test/{{$film->id}}&amp;description={{$film->name}}">
                                            <i class="fa fa-pinterest" aria-hidden="true"></i>
                                        </a>
                                        <a href="https://plus.google.com/share?url=http://filmzgroup.test/{{$film->id}}">
                                            <i class="fa fa-google-plus" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div class="share">

                                    </div>
                                </div>
                                <div class="col-sm-7 plot">
                                    <header>
                                        <h3 class="no-underline">{{$film->name}}</h3>
                                    </header>
                                    <p>{{$film->summary}}</p>
                                    <ul class="movie-info">
                                        <li><i>Director</i>{{$film->director}}</li>
                                        <li><i>Starring</i>{{$film->cast}}</li>
                                        <li><i>Released</i> {{$film->release_date}}</li>
                                        <li><i>Running time</i>{{$film->running_time}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div style="padding: 0 15px 0 15px;" class="fw-col-xs-12 fw-col-sm-4 ">
                            <header>
                                <h2 class="left " style="color: #ec7532">
                                    Lịch chiếu </h2>
                            </header>
                            <ul class="show-times">
                                <li class="today">
                                    <i>Hôm nay</i>
                                    @foreach($todaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                                <li>
                                    <i>Ngày mai</i>
                                    @foreach($after1DaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                                <li>
                                    <i><?php echo($day->addDays(2)->format('d/m'))?></i>
                                    @foreach($after2DaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                                <li>
                                    <i><?php echo($day->addDays(1)->format('d/m'))?></i>
                                    @foreach($after3DaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                                <li>
                                    <i><?php echo($day->addDays(1)->format('d/m'))?></i>
                                    @foreach($after4DaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                                <li>
                                    <i><?php echo($day->addDays(1)->format('d/m'))?></i>
                                    @foreach($after5DaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                                <li>
                                    <i><?php echo($day->addDays(1)->format('d/m'))?></i>
                                    @foreach($after6DaySessions as $subsession)
                                        <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                    @endforeach
                                </li>
                            </ul>

                            <script type="text/javascript">
                                jQuery(function ($) {
                                    $('.show-times li.today i').each(function (index, el) {
                                        $(this).text('Hôm nay');
                                    });
                                });
                            </script>
                        </div>
                    </div>

                </div>
            </section>


            <section
                    style="background-color:#101010; padding-top: 0px; padding-bottom: 0px; border-width: 0px 0px 0px 0px"
                    id="section_0e534527ae8dc0fc87035fc25bd01926" class="fw-main-row ">
                <div class="fw-container-fluid">
                    <div class="fw-row">

                        <div style="padding: 0px 15px;" class="fw-col-xs-12 ">
                            <div class="container section remove-bottom-padding dark">
                                <div class="row comingSoon-slides singleGallery">
                                    <div class="col-sm-12">
                                        <?php $i = 1; ?>
                                        <style>
                                            .row.single-slide.demo {
                                                padding-bottom: 40px;
                                                opacity: 1;
                                                height: auto;
                                            }
                                        </style>
                                        @foreach($images_url as $img_url)
                                            <?php if ($i == 1) {
                                                $class = "1 demo";
                                            } else {
                                                $class = $i;
                                            }?>
                                            <div class="row single-slide {{$class}}">
                                                <div class="bg"
                                                     style="background-image: url({{$img_url}})"></div>
                                                <div class="col-sm-12" style="position: relative;">
                                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1525706673lrH2FkcVfz09aIy.png">
                                                    <span style="background: url({{$img_url}}) center center / cover;"></span>
                                                </div>
                                            </div>
                                            <?php $i++;?>
                                        @endforeach
                                            {{--<style>--}}
                                                {{--.slick-slide.active {--}}
                                                    {{--opacity: 1;--}}
                                                {{--}--}}
                                            {{--</style>--}}
                                        <div class="">
                                            <div style="margin-right: -15px;margin-left: -15px" class="slick-slider">

                                                <div id="comingSoon"
                                                     class="owl-carousel slick-carousel slick-initialized">
                                                    <?php $i = 1;?>
                                                    @foreach($images_url as $img_url)
<!--                                                            --><?php //if ($i == 1) {
//                                                                $class = "demo1";
//                                                            } else {
//                                                                $class = "";
//                                                            }?>

                                                        <div data-dynamicclass="{{$i}}" class="slick-slide slick-cloned {{$class}}"
                                                             data-slick-index="{{$i}}" aria-hidden="true" tabindex="-1">
                                                            <div style="position: relative;">
                                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1525704861664R7GDczBKLAk9.png"
                                                                     alt="Hush">
                                                                <span style="background: url({{$img_url}}) center center / cover;"></span>
                                                            </div>
                                                        </div>
                                                        <?php $i++;?>
                                                    @endforeach

                                                </div>
                                            </div>
                                        </div>

                                        <script>
                                            jQuery(document).ready(function ($) {
                                                jQuery('.slick-slide').click(function () {
                                                    var currentClass = $(this).data("dynamicclass");
                                                    $("div." + currentClass).css({
                                                        opacity: '1',
                                                        height: 'auto',
                                                        paddingBottom: '40px'
                                                    }).siblings('.single-slide').css({
                                                        opacity: '0',
                                                        height: '0',
                                                        paddingBottom: '0'
                                                    });
                                                    $(".slick-cloned").css('opacity', '.2');
                                                    $("[data-dynamicclass=" + currentClass + "]").css('opacity', '1');
                                                    return false;
                                                });

                                            });
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
            </section>


            <section style=" padding-top: 75px; border-width: 0px 0px 0px 0px"
                     id="section_312eba41b09e473dfdd68ba2ad8b2568" class="fw-main-row ">
                <div class="fw-container">
                    <div class="fw-row">
                        <div style="padding: 0 15px 0 15px;">
                            <header>
                                <h2 class="left " style="color: #ec7532">
                                    Comments </h2>
                            </header>
                            <div class="fb-comments" data-href="comment.html" data-numposts="3"></div>

                        </div>

                    </div>

                </div>
            </section>


            <section style=" padding-top: 75px; padding-bottom: 75px; border-width: 1px 0px 0px 0px"
                     id="section_b8ac59bb701c67a825f0bd748bd4618b" class="fw-main-row ">
                <div class="fw-container">
                    <div class="fw-row">

                        <div style="padding: 0 15px 0 15px;" class="fw-col-xs-12 ">
                            <header>
                                <h3 class="center  no-underline " style="color: #4a4a4a">
                                    Cần giúp đỡ ? Hãy liên hệ với chúng tôi </h3>
                            </header>
                            <aside style="color: #ec7532; font-size: 46px">
                                <p style="text-align: center;">0123 456 789</p></aside>
                        </div>
                    </div>

                </div>
            </section>
        </div>

        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/bootstrap.min.js?ver=3.3.6"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/headhesive.min.js?ver=1.2.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/matchHeight.min.js?ver=0.7.0"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/slick.min.js?ver=1.6.0"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/venobox.min.js?ver=1.6.0"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/doubletaptogo.js?ver=3.0.2"></script>
        <script src="http://specto.klevermedia.co.uk/wp-includes/js/jquery/ui/core.min.js?ver=1.11.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-includes/js/jquery/ui/widget.min.js?ver=1.11.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-includes/js/jquery/ui/accordion.min.js?ver=1.11.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-includes/js/jquery/ui/tabs.min.js?ver=1.11.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/custom.js?ver=1.0"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/shortcodes/shortcodes/section/static/js/core.js?ver=4.9.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/shortcodes/shortcodes/section/static/js/transition.js?ver=4.9.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/shortcodes/shortcodes/section/static/js/background.js?ver=4.9.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/shortcodes/shortcodes/section/static/js/background.init.js?ver=4.9.4"></script>
        <script src="http://specto.klevermedia.co.uk/wp-includes/js/wp-embed.min.js?ver=4.9.4"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/owl.carousel.min.js"></script>
        <script>
            $('#comingSoon').owlCarousel({
                loop: true,
                nav: true,
                navText: [
                    "<i class='fa fa-angle-left left left-1 slick-arrow'></i>",
                    "<i class='fa fa-angle-right right right-1 slick-arrow'></i>"
                ],
                autoplay: true,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    300: {
                        items: 2
                    },
                    500: {
                        items: 3
                    },
                    700: {
                        items: 4
                    },
                    900: {
                        items: 5
                    },
                }
            })
        </script>
        <script type="text/javascript">
            var today = new Date();
            // var time = today.getHours() + ":" + today.getMinutes();
            // console.log(today);
            if (Date.parse('09/05/2018 01:00') > Date.parse(today)) {
                $('.today .time').addClass('time-past')
            }
            ;
        </script>
    </body>
@endsection