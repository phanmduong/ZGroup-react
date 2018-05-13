@extends('filmzgroup::layouts.master')

@section('content')
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
                                                            {{--<span class="certificate">{{$favoriteFilm->film_rated}}</span>--}}
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

        <section style=" padding-top: 75px; padding-bottom: 75px; border-width: 0px 0px 0px 0px"
                 id="section_f3b614c41e478eb79170d1a9ef523af7" class="fw-main-row ">
            <div class="fw-container">
                <div class="fw-row">

                    <div style="padding: 0;" class="fw-col-xs-12 ">
                        <header>
                            <h2 style="color: #ec7532">
                                Phim đang chiếu </h2>
                        </header>

                        <div class="slick-slider" style="margin-left: -15px; margin-right: -15px">
                            <div id="current-film" class="owl-carousel slick-carousel slick-initialized">
                                @foreach($sessionsShowing as $session)
                                    <div class="slick-slide">
                                        <div class="movie-poster">
                                            <aside>
                                                <div>
                                                    <a href="{{$session->film->trailer_url}}" data-vbtype="video"
                                                       class="venobox play vbox-item" tabindex="-1">
                                                        <i class="fa fa-play"></i>
                                                    </a>
                                                    <a href="/{{$session->film->id}}"
                                                       title="It’s over" class="read-more" tabindex="-1">
                                                        Xem thêm </a>
                                                    <p class="date"> Ngày khởi
                                                        chiếu: {{$session->film->release_date}}</p>
                                                </div>
                                            </aside>
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png">
                                                <span style="background: url({{$session->film->avatar_url}}) center center / cover;"></span>
                                            </div>
                                        </div>
                                        <header>
                                            <h4 class="no-underline">It’s over</h4>
                                        </header>
                                        <div class="star-rating">
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star"></i>
                                            <i class="fa fa-star grey"></i>
                                            <i class="fa fa-star grey"></i>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section>


        <section style=" padding-top: 75px; padding-bottom: 75px; border-width: 0px 0px 0px 0px"
                 id="section_cb13ca722b641edebc99e432fd755e61" class="fw-main-row ">
            <div class="fw-container">
                <div class="fw-row">

                    <div style="padding: 0;" class="fw-col-xs-12 ">

                        <div class="fw-tabs movies ui-tabs ui-widget ui-widget-content ui-corner-all">
                            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                                role="tablist">
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="Mon"
                                    aria-labelledby="ui-id-1" aria-selected="false" aria-expanded="false">
                                    <a href="#Mon" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-1">
                                        Hôm nay </a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="Tue"
                                    aria-labelledby="ui-id-2" aria-selected="false" aria-expanded="false">
                                    <a href="#Tue" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-2">
                                        Ngày mai </a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="0" aria-controls="Wed"
                                    aria-labelledby="ui-id-3" aria-selected="true" aria-expanded="true">
                                    <a href="#Wed" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-3">
                                        <?php echo($day->addDays(2)->format('d-m'))?> </a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="Thu"
                                    aria-labelledby="ui-id-4" aria-selected="false" aria-expanded="false">
                                    <a href="#Thu" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-4">
                                        <?php echo($day->addDays(1)->format('d-m'))?> </a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="Fri"
                                    aria-labelledby="ui-id-5" aria-selected="false" aria-expanded="false">
                                    <a href="#Fri" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-5">
                                        <?php echo($day->addDays(1)->format('d-m'))?>     </a></li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="Sat"
                                    aria-labelledby="ui-id-6" aria-selected="false" aria-expanded="false">
                                    <a href="#Sat" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-6">
                                        <?php echo($day->addDays(1)->format('d-m'))?> </a></li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="Sun"
                                    aria-labelledby="ui-id-7" aria-selected="false" aria-expanded="false">
                                    <a href="#Sun" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-7">
                                        <?php echo($day->addDays(1)->format('d-m'))?> </a></li>
                            </ul>

                            <div id="Mon" aria-labelledby="ui-id-1"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($todaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach

                            </div>

                            <div id="Tue" aria-labelledby="ui-id-2"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">

                                @foreach($after1DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div id="Wed" aria-labelledby="ui-id-3"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true">

                                @foreach($after2DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div id="Thu" aria-labelledby="ui-id-4"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">

                                @foreach($after3DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div id="Fri" aria-labelledby="ui-id-5"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">

                                @foreach($after4DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div id="Sat" aria-labelledby="ui-id-6"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">

                                @foreach($after5DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div id="Sun" aria-labelledby="ui-id-7"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after6DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <div style="position: relative;">
                                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                                     alt="Hush">
                                                <a class="image" href="/{{$session->film->id}}"
                                                   title="Hush"
                                                   style="background: url({{$session->film->cover_url}}) center center / cover;"></a>
                                            </div>
                                        </div>
                                        <div class="col-md-10 col-sm-9">
                                            <span class="title">{{$session->film->film_genre}}</span>
                                            <header>
                                                <h3 class="no-underline">{{$session->film->name}}</h3>
                                            </header>
                                            <p>{{$session->film->summary}}</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/hush/"
                                                  class="arrow-button">
                                                    Chi tiết</a></p>
                                            <div class="row">
                                                <div class="col-md-8 col-sm-9">
                                                    <hr class="space-10">
                                                    <span class="viewing-times"><i class="fa fa-clock-o"></i>&#160;Viewing times</span>
                                                    <div class="time-wrap today" style="display: inline-block;">
                                                        @foreach($session->film->film_sessions as $subsession)
                                                            <span class="time ">{{substr($subsession->start_time,0,5)}}</span>
                                                        @endforeach
                                                    </div>
                                                </div>
                                                <div class="col-md-4 col-sm-3 running-time">
                                                    <hr class="space-10">
                                                    {{$session->film->running_time}} <span
                                                            class="certificate">{{$session->film_quality}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                        </div>

                        <script>
                            jQuery(function ($) {
                                $('.movies').tabs({
                                    active: 0
                                });
                                // $('.movies ul li.ui-tabs-active a').each(function(index, el) {
                                //     $(this).text('Today');
                                // });
                                $('.movies #Mon').find('.mon-time').css('display', 'inline-block');
                                $('.movies #Tue').find('.tue-time').css('display', 'inline-block');
                                $('.movies #Wed').find('.wed-time').css('display', 'inline-block');
                                $('.movies #Thu').find('.thu-time').css('display', 'inline-block');
                                $('.movies #Fri').find('.fri-time').css('display', 'inline-block');
                                $('.movies #Sat').find('.sat-time').css('display', 'inline-block');
                                $('.movies #Sun').find('.sun-time').css('display', 'inline-block');
                            });
                        </script>
                    </div>
                </div>

            </div>
        </section>


        <section style="background-color:#101010; padding-top: 0px; padding-bottom: 0px; border-width: 0px 0px 0px 0px"
                 id="section_148d52dc9b40bdc547bb644e06685a1e" class="fw-main-row ">
            <div class="fw-container-fluid">
                <div class="fw-row">

                    <div style="padding: 0px; " class="fw-col-xs-12 ">
                        <div class="container section remove-bottom-padding dark">
                            <div class="row comingSoon-slides">
                                <div class="col-sm-12">

                                    <header><h2>Phim sắp chiếu</h2></header>
                                    <?php $i = 0; $classes = array("1 demo");
                                    for ($j = 2; $j <= count($filmsComing); $j++) {
                                        array_push($classes, $j);
                                    }
                                    $limit_summary = 200;
                                    ?>
                                    <style>
                                        .row.single-slide.demo {
                                            padding-bottom: 40px;
                                            opacity: 1;
                                            height: auto;
                                        }
                                    </style>
                                    @foreach($filmsComing as $film)
                                        <div class="row single-slide {{$classes[$i++]}}">
                                            <div class="bg"
                                                 style="background-image: url({{$film->cover_url}});"></div>
                                            <div class="col-sm-5 col-xs-12 slide-content">
                                                <p class="title">{{$film->film_genre}}</p>
                                                <header>
                                                    <h3 class="no-underline">{{$film->name}}</h3>
                                                </header>
                                                <div class="star-rating">
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star"></i>
                                                    <i class="fa fa-star grey"></i>
                                                </div>
                                                <div class="date">
                                                    <i class="fa fa-calendar-o"></i> {{$film->release_date}}
                                                </div>
                                                <p/>
                                                <p style="text-align: justify;">{{substr($film->summary, 0, $limit_summary) . '...'}}</p>
                                                <p><a href="/{{$film->id}}"
                                                      class="arrow-button">
                                                        Thêm thông tin </a></p>
                                            </div>
                                            <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                                <a href="{{$film->trailer_url}}" data-vbtype="video"
                                                   class="venobox video vbox-item" style="position: relative;">
                                                    <span style="background: url({{$film->cover_url}}) center center / cover;"></span>
                                                    <i class="fa fa-play"></i>
                                                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1525743052pGjRzVKJERttHfW.png">
                                                </a>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container">
                        <div style="margin-right: -15px;margin-left: -15px" class="slick-slider">

                            <div id="comingSoon" class="owl-carousel slick-carousel slick-initialized">
                                <?php $i = 1;?>
                                @foreach($filmsComing as $film)
                                    <div data-dynamicclass="{{$i}}" class="slick-slide slick-cloned"
                                         data-slick-index="{{$i}}"
                                         aria-hidden="true" tabindex="-1">
                                        <div style="position: relative;">
                                            <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png">
                                            <span style="background: url({{$film->avatar_url}}) center center / cover;"></span>
                                        </div>
                                        <header><h5 class="left no-underline">{{$film->name}}</h5>
                                        </header>
                                        <p class="release-date">{{$film->release_date}}</p>
                                    </div>
                                    <?php $i++?>
                                @endforeach

                            </div>
                        </div>
                    </div>

                    <script>
                        jQuery(document).ready(function ($) {
                            jQuery('.slick-slide.slick-cloned').click(function () {
                                var currentClass = $(this).data("dynamicclass");
                                $("div." + currentClass).css({
                                    opacity: '1',
                                    height: 'auto',
                                    paddingBottom: '40px'
                                }).siblings('.single-slide').css({opacity: '0', height: '0', paddingBottom: '0'});
                                $(".slick-cloned").css('opacity', '.2');
                                $("[data-dynamicclass=" + currentClass + "]").css('opacity', '1');
                                return false;
                            });
                        });
                    </script>
                </div>

            </div>
        </section>


        <section style=" padding-top: 75px; padding-bottom: 75px; border-width: 0px 0px 0px 0px"
                 id="section_629a6e7822cb34310f76d9c72f4b6aa9" class="fw-main-row ">
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
        $('#current-film').owlCarousel({
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
                450: {
                    items: 2
                },
                900: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1500: {
                    items: 5
                },
            }
        });
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
        // console.log(Date.parse("2018-05-16 06:00:00"));
        @foreach($sessionsShowing as $session)
        {{--var date = {{$session->start_date}};--}}
        // console.log(date);/**/
        <!--        --><?php //echo($session->start_date);?>
        {{--                var time = {{$session->start_time}};--}}
        // console.log(Date.parse("" + date + " " + time));
        {{--if (Date.parse("" + {{$session->start_date}} + " " + {{$session->start_time}}) > Date.parse(today)) {--}}
        {{--$('.today .time').addClass('time-past')--}}
        {{--};--}}
        @endforeach
    </script>


    </body>
@endsection