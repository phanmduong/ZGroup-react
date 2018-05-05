@extends('filmzgroup::layouts.master')

@section('content')

    <body class="home page-template page-template-page-templates page-template-page-builder page-template-page-templatespage-builder-php page page-id-35 masthead-fixed full-width grid">
    <div class="navbar banner--clone" role="navigation">
        <!-- Heading -->
        <div class="heading">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="search">
                            <a href="#">
                                <i class="fa fa-search"></i>
                            </a>
                        </div>
                        <div class="tel">
                            <a href="tel:123456789">
                                <i class="fa fa-phone"></i> 123 456 789 </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="navbar-header">
                <a href="http://specto.klevermedia.co.uk/" title="Specto" class="logo">
                    <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2018/02/logo.svg" alt="Specto">
                </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only"></span>
                    <span class="icon-bar top-bar"></span>
                    <span class="icon-bar middle-bar"></span>
                    <span class="icon-bar bottom-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse ">
                <ul id="menu-main-navigation" class="nav navbar-nav">
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-35 current_page_item menu-item-40 active">
                        <a title="Home" href="http://specto.klevermedia.co.uk/">Home</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-194 dropdown">
                        <a title="What's on" href="http://specto.klevermedia.co.uk/whats-on/" class="dropdown-toggle"
                           aria-haspopup="false">What’s on</a>
                        <ul role="menu" class="dropdown-menu">
                            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-246"><a
                                        title="All movies" href="http://specto.klevermedia.co.uk/movies/">All movies</a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-229"><a title="News"
                                                                                                          href="http://specto.klevermedia.co.uk/news/">News</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-254"><a
                                title="Shortcodes" href="http://specto.klevermedia.co.uk/shortcodes/">Shortcodes</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-210"><a
                                title="Contact us" href="http://specto.klevermedia.co.uk/contact-us/">Contact us</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>


    <div class="movie-search">
        <form role="search" method="get" id="searchform" action="http://specto.klevermedia.co.uk/">
            <div>
                <input type="text" value="" name="s" id="search" placeholder="Search movies">
                <input type="submit" id="searchsubmit" class="btn btn-default" value="Search">
                <input type="hidden" name="post_type" value="movie">
            </div>
        </form>
    </div>

    <!-- Navigation -->
    <div class="navbar" role="navigation">
        <!-- Heading -->
        <div class="heading">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="search">
                            <a href="#">
                                <i class="fa fa-search"></i>
                            </a>
                        </div>
                        <div class="tel">
                            <a href="tel:123456789">
                                <i class="fa fa-phone"></i> 123 456 789 </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="navbar-header">
                <a href="http://specto.klevermedia.co.uk/" title="Ledahlia" class="logo">
                    <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/1525421236EE6Two3Gmcm7zec.png" alt="Ledahlia"
                         style="margin-top: -20px; margin-left: 15px; width: 178px">
                </a>
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only"></span>
                    <span class="icon-bar top-bar"></span>
                    <span class="icon-bar middle-bar"></span>
                    <span class="icon-bar bottom-bar"></span>
                </button>
            </div>
            <div class="navbar-collapse collapse ">
                <ul id="menu-main-navigation" class="nav navbar-nav">
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-35 current_page_item menu-item-40 active">
                        <a title="Home" href="http://specto.klevermedia.co.uk/">Home</a></li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-194 dropdown">
                        <a title="What's on" href="http://specto.klevermedia.co.uk/whats-on/" class="dropdown-toggle"
                           aria-haspopup="false">What’s on</a>
                        <ul role="menu" class="dropdown-menu">
                            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-246"><a
                                        title="All movies" href="http://specto.klevermedia.co.uk/movies/">All movies</a>
                            </li>
                        </ul>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-229"><a title="News"
                                                                                                          href="http://specto.klevermedia.co.uk/news/">News</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-254"><a
                                title="Shortcodes" href="http://specto.klevermedia.co.uk/shortcodes/">Shortcodes</a>
                    </li>
                    <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-210"><a
                                title="Contact us" href="http://specto.klevermedia.co.uk/contact-us/">Contact us</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>


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

                                <!-- Indicators -->
                                <div class="container">
                                    <ol class="carousel-indicators">
                                        <li data-target="#carousel" data-slide-to="0" class=""></li>
                                        <li data-target="#carousel" data-slide-to="1" class="active"></li>
                                        <li data-target="#carousel" data-slide-to="2" class=""></li>
                                    </ol>
                                </div>

                                <!-- Wrapper for slides -->
                                <div class="carousel-inner" role="listbox">
                                    <!-- Slides -->
                                    @foreach($sessionsShowing->take(3) as $session)
                                    <div class="item"
                                         style="background-image: url(&quot;http://specto.klevermedia.co.uk/wp-content/uploads/2018/03/hero.jpg&quot;); padding-top: 0px;">

                                        <div class="container">
                                            <div class="row blurb">
                                                <div class="col-md-8 col-sm-12 blurb-content">
                                                    <span class="title">{{$session->film->film_genre}}</span>
                                                    <header>
                                                        <h1>{{$session->film->name}}</h1>
                                                    </header>
                                                    <p>{{$session->film->summary}}</p>

                                                    <div class="buttons">
										<span class="certificate">
											PG										</span>
                                                        <a href="{{$session->film->trailer_url}}" data-vbtype="video"
                                                           class="venobox btn btn-default vbox-item">

                                                            <i class="fa fa-play"></i>

                                                            <span>Play trailer</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    @endforeach

                                    {{--<div class="item active"--}}
                                         {{--style="background-image: url(&quot;http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-2-1.jpg&quot;); padding-top: 0px;">--}}

                                        {{--<div class="container">--}}
                                            {{--<div class="row blurb">--}}
                                                {{--<div class="col-md-8 col-sm-12 blurb-content">--}}
                                                    {{--<span class="title">Action, Adventure, Sci-Fi</span>--}}
                                                    {{--<header>--}}
                                                        {{--<h1>Fight club: Round 2</h1>--}}
                                                    {{--</header>--}}
                                                    {{--<p>Claritas est etiam processus dynamicus, qui sequitur mutationem--}}
                                                        {{--consuetudium lectorum. Mirum est notare quam littera gothica,--}}
                                                        {{--quam nunc putamus parum claram, anteposuerit litterarum formas--}}
                                                        {{--humanitatis per seacula quarta decima et quinta decima.</p>--}}

                                                    {{--<div class="buttons">--}}
										{{--<span class="certificate">--}}
											{{--12A										</span>--}}
                                                        {{--<a href="https://youtu.be/RhFMIRuHAL4" data-vbtype="video"--}}
                                                           {{--class="venobox btn btn-default vbox-item">--}}

                                                            {{--<i class="fa fa-play"></i>--}}

                                                            {{--<span>Play trailer</span>--}}
                                                        {{--</a>--}}
                                                    {{--</div>--}}
                                                {{--</div>--}}
                                            {{--</div>--}}
                                        {{--</div>--}}
                                    {{--</div>--}}

                                    {{--<div class="item"--}}
                                         {{--style="background-image: url(&quot;http://specto.klevermedia.co.uk/wp-content/uploads/2018/03/hero-2.jpg&quot;); padding-top: 0px;">--}}

                                        {{--<div class="container">--}}
                                            {{--<div class="row blurb">--}}
                                                {{--<div class="col-md-8 col-sm-12 blurb-content">--}}
                                                    {{--<span class="title">Action, Adventure, Comedy</span>--}}
                                                    {{--<header>--}}
                                                        {{--<h1>Behind enemy lines</h1>--}}
                                                    {{--</header>--}}
                                                    {{--<p>Claritas est etiam processus dynamicus, qui sequitur mutationem--}}
                                                        {{--consuetudium lectorum. Mirum est notare quam littera gothica,--}}
                                                        {{--quam nunc putamus parum claram, anteposuerit litterarum formas--}}
                                                        {{--humanitatis per seacula quarta decima et quinta decima.</p>--}}

                                                    {{--<div class="buttons">--}}
										{{--<span class="certificate">--}}
											{{--PG-13										</span>--}}
                                                        {{--<a href="https://youtu.be/RhFMIRuHAL4" data-vbtype="video"--}}
                                                           {{--class="venobox btn btn-default vbox-item">--}}

                                                            {{--<i class="fa fa-play"></i>--}}

                                                            {{--<span>Play trailer</span>--}}
                                                        {{--</a>--}}
                                                    {{--</div>--}}
                                                {{--</div>--}}
                                            {{--</div>--}}
                                        {{--</div>--}}
                                    {{--</div>--}}
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
                                PHIM ĐANG CHIẾU </h2>
                        </header>
                        <br>
                        <!.................................................................................>


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
                                                    <a href="http://specto.klevermedia.co.uk/movies/its-over/"
                                                       title="It’s over" class="read-more" tabindex="-1">
                                                        Read more </a>
                                                    <span class="date">{{$session->film->release_date}}</span>
                                                </div>
                                            </aside>
                                            <a href="http://specto.klevermedia.co.uk/movies/its-over/" title="It’s over"
                                               tabindex="-1">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="{{$session->film->name}}">
                                            </a>
                                        </div>
                                        <header>
                                            <h4 class="no-underline">{{$session->film->name}}</h4>
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
                                {{--<div class="slick-slide">--}}
                                {{--<div class="movie-poster">--}}
                                {{--<aside>--}}
                                {{--<div>--}}
                                {{--<a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"--}}
                                {{--class="venobox play vbox-item" tabindex="-1">--}}
                                {{--<i class="fa fa-play"></i>--}}
                                {{--</a>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/locked-in/"--}}
                                {{--title="Locked in" class="read-more" tabindex="-1">--}}
                                {{--Read more </a>--}}
                                {{--<span class="date">--}}
                                {{--Released:                                   10 August, 2017                                 </span>--}}
                                {{--</div>--}}
                                {{--</aside>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/locked-in/" title="Locked in"--}}
                                {{--tabindex="-1">--}}
                                {{--<img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/thumb2-270x340.jpg"--}}
                                {{--alt="Locked in">--}}
                                {{--</a>--}}
                                {{--</div>--}}
                                {{--<header>--}}
                                {{--<h4 class="no-underline">It’s over</h4>--}}
                                {{--</header>--}}
                                {{--<div class="star-rating">--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--</div>--}}
                                {{--</div>--}}

                                {{--<div class="slick-slide">--}}
                                {{--<div class="movie-poster">--}}
                                {{--<aside>--}}
                                {{--<div>--}}
                                {{--<a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"--}}
                                {{--class="venobox play vbox-item" tabindex="-1">--}}
                                {{--<i class="fa fa-play"></i>--}}
                                {{--</a>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush"--}}
                                {{--class="read-more" tabindex="-1">--}}
                                {{--Read more </a>--}}
                                {{--<span class="date">--}}
                                {{--Released:                                   7 March, 2018                               </span>--}}
                                {{--</div>--}}
                                {{--</aside>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush"--}}
                                {{--tabindex="-1">--}}
                                {{--<img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-4-270x340.jpg"--}}
                                {{--alt="Hush">--}}
                                {{--</a>--}}
                                {{--</div>--}}
                                {{--<header>--}}
                                {{--<h4 class="no-underline">It’s over</h4>--}}
                                {{--</header>--}}
                                {{--<div class="star-rating">--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--</div>--}}
                                {{--</div>--}}

                                {{--<div class="slick-slide">--}}
                                {{--<div class="movie-poster">--}}
                                {{--<aside>--}}
                                {{--<div>--}}
                                {{--<a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"--}}
                                {{--class="venobox play vbox-item" tabindex="-1">--}}
                                {{--<i class="fa fa-play"></i>--}}
                                {{--</a>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush"--}}
                                {{--class="read-more" tabindex="-1">--}}
                                {{--Read more </a>--}}
                                {{--<span class="date">--}}
                                {{--Released:                                   7 March, 2018                               </span>--}}
                                {{--</div>--}}
                                {{--</aside>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush"--}}
                                {{--tabindex="-1">--}}
                                {{--<img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-4-270x340.jpg"--}}
                                {{--alt="Hush">--}}
                                {{--</a>--}}
                                {{--</div>--}}
                                {{--<header>--}}
                                {{--<h4 class="no-underline">It’s over</h4>--}}
                                {{--</header>--}}
                                {{--<div class="star-rating">--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--</div>--}}
                                {{--</div>--}}


                                {{--<div class="slick-slide">--}}
                                {{--<div class="movie-poster">--}}
                                {{--<aside>--}}
                                {{--<div>--}}
                                {{--<a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"--}}
                                {{--class="venobox play vbox-item" tabindex="-1">--}}
                                {{--<i class="fa fa-play"></i>--}}
                                {{--</a>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/locked-in/"--}}
                                {{--title="Locked in" class="read-more" tabindex="-1">--}}
                                {{--Read more </a>--}}
                                {{--<span class="date">--}}
                                {{--Released:                                   10 August, 2017                                 </span>--}}
                                {{--</div>--}}
                                {{--</aside>--}}
                                {{--<a href="http://specto.klevermedia.co.uk/movies/locked-in/" title="Locked in"--}}
                                {{--tabindex="-1">--}}
                                {{--<img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/thumb2-270x340.jpg"--}}
                                {{--alt="Locked in">--}}
                                {{--</a>--}}
                                {{--</div>--}}
                                {{--<header>--}}
                                {{--<h4 class="no-underline">It’s over</h4>--}}
                                {{--</header>--}}
                                {{--<div class="star-rating">--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--<i class="fa fa-star grey"></i>--}}
                                {{--</div>--}}
                                {{--</div>--}}


                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </section>
        <!.........................................................................................>


        <section style=" padding-top: 75px; padding-bottom: 75px; border-width: 0px 0px 0px 0px"
                 id="section_cb13ca722b641edebc99e432fd755e61" class="fw-main-row ">
            <div class="fw-container">
                <div class="fw-row">

                    <div style="padding: 0;" class="fw-col-xs-12 ">

                        <div class="fw-tabs movies ui-tabs ui-widget ui-widget-content ui-corner-all">
                            <ul class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                                role="tablist">
                                <li class="ui-state-default ui-corner-top ui-tabs-active ui-state-active" role="tab" tabindex="0" aria-controls="Today"
                                    aria-labelledby="ui-id-1" aria-selected="true" aria-expanded="true">
                                    <a href="#Today" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-1">
                                        TODAY </a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="after-1-day"
                                    aria-labelledby="ui-id-2" aria-selected="false" aria-expanded="false">
                                    <a href="#after-1-day" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-2"></a>
                                </li>
                                <li class="ui-state-default ui-corner-top " role="tab" tabindex="-1" aria-controls="after-2-day"
                                    aria-labelledby="ui-id-3" aria-selected="false" aria-expanded="false">
                                    <a href="#after-2-day" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-3"></a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="after-3-day"
                                    aria-labelledby="ui-id-4" aria-selected="false" aria-expanded="false">
                                    <a href="#after-3-day" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-4"></a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="0" aria-controls="after-4-day"
                                    aria-labelledby="ui-id-5" aria-selected="false" aria-expanded="false">
                                    <a href="#after-4-day" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-5"></a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="after-5-day"
                                    aria-labelledby="ui-id-6" aria-selected="false" aria-expanded="false">
                                    <a href="#after-5-day" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-6"></a>
                                </li>
                                <li class="ui-state-default ui-corner-top" role="tab" tabindex="-1" aria-controls="after-6-day"
                                    aria-labelledby="ui-id-7" aria-selected="false" aria-expanded="false">
                                    <a href="#after-6-day" class="ui-tabs-anchor" role="presentation" tabindex="-1"
                                       id="ui-id-7"></a>
                                </li>
                            </ul>


                            <div id="Today" aria-labelledby="ui-id-1"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($todaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                            <div id="after-1-day" aria-labelledby="ui-id-2"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after1DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                            <div id="after-2-day" aria-labelledby="ui-id-3"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after2DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                            <div id="after-3-day" aria-labelledby="ui-id-4"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after3DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                            <div id="after-4-day" aria-labelledby="ui-id-5"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after4DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                            <div id="after-5-day" aria-labelledby="ui-id-6"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after5DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                            <div id="after-6-day" aria-labelledby="ui-id-7"
                                 class="ui-tabs-panel ui-widget-content ui-corner-bottom" role="tabpanel"
                                 aria-hidden="true" style="display: none;">
                                @foreach($after6DaySessions as $session)
                                    <div class="row movie-tabs">
                                        <div class="col-md-2 col-sm-3">
                                            <a href="http://specto.klevermedia.co.uk/movies/hush/" title="Hush">
                                                <img src="{{$session->film->avatar_url}}"
                                                     alt="Hush">
                                            </a>
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
                                                    <div class="time-wrap" style="display: inline-block;">
                                                        @if($session->film->sessions)
                                                            @foreach($session->film->sessions as $subsession)
                                                                <span class="time">{{$subsession->start_time}}</span>
                                                            @endforeach
                                                        @else
                                                            <span class="time ">11:30</span>
                                                            <span class="time ">13:00</span>
                                                        @endif

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

                                // $('.movies ul li.ui-tabs-active a').each(function (index, el) {
                                //     $(this).text('Today');
                                // });

                                $('.movies #Today').find('.mon-time').css('display', 'inline-block');
                                $('.movies #after-1-day').find('.tue-time').css('display', 'inline-block');
                                $('.movies #after-2-day').find('.wed-time').css('display', 'inline-block');
                                $('.movies #after-3-day').find('.thu-time').css('display', 'inline-block');
                                $('.movies #after-4-day').find('.fri-time').css('display', 'inline-block');
                                $('.movies #after-5-day').find('.sat-time').css('display', 'inline-block');
                                $('.movies #after-6-day').find('.sun-time').css('display', 'inline-block');

                            });
                            var d1 = new Date();
                            var d2 = new Date();
                            var d3 = new Date();
                            var d4 = new Date();
                            var d5 = new Date();
                            var d6 = new Date();
                            d1.setDate(d1.getDate() + 1);
                            d2.setDate(d2.getDate() + 2);
                            d3.setDate(d3.getDate() + 3);
                            d4.setDate(d4.getDate() + 4);
                            d5.setDate(d5.getDate() + 5);
                            d6.setDate(d6.getDate() + 6);
                            console.log(d2.getDay());
                            var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
                            document.getElementById("ui-id-1").innerHTML = days[d1.getDay()];
                            document.getElementById("ui-id-2").innerHTML = days[d2.getDay()];
                            document.getElementById("ui-id-3").innerHTML = days[d3.getDay()];
                            document.getElementById("ui-id-4").innerHTML = days[d4.getDay()];
                            document.getElementById("ui-id-5").innerHTML = days[d5.getDay()];
                            document.getElementById("ui-id-6").innerHTML = days[d6.getDay()];
                        </script>
                    </div>
                </div>

            </div>
        </section>




        <!.........................................................................................>

        <section style="background-color:#101010; padding-top: 0px; padding-bottom: 0px; border-width: 0px 0px 0px 0px"
                 id="section_148d52dc9b40bdc547bb644e06685a1e" class="fw-main-row ">
            <div class="fw-container-fluid">
                <div class="fw-row">

                    <div style="padding: 0px; " class="fw-col-xs-12 ">
                        <div class="container section remove-bottom-padding dark">
                            <div class="row comingSoon-slides">
                                <div class="col-sm-12">

                                    <header><h2> Coming soon</h2></header>

                                    <div class="row single-slide 0"
                                         style="opacity: 1; height: auto; padding-bottom: 40px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-news.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">Fantasy, Sci-fi, Action</span>
                                            <header>
                                                <h3 class="no-underline">Colliding plantes</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 2 October, 2019
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/colliding-plantes/"
                                                  class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/trailer-1-555x335.png"
                                                     alt="Colliding plantes">
                                            </a>
                                        </div>
                                    </div>


                                    <div class="row single-slide 1"
                                         style="opacity: 0; height: 0px; padding-bottom: 0px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-single-movie.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">Thriller, Horror</span>
                                            <header>
                                                <h3 class="no-underline">Infinite Vengeance</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star grey"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 17 August, 2017
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/infinite-vengeance/"
                                                  class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/slide-1-video-555x335.png"
                                                     alt="Infinite Vengeance">
                                            </a>
                                        </div>
                                    </div>


                                    <div class="row single-slide 2"
                                         style="opacity: 0; height: 0px; padding-bottom: 0px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-whats-on.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">Thriller, Horror</span>
                                            <header>
                                                <h3 class="no-underline">Lurking in the dark</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 11 August, 2018
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/lurking-in-the-dark/"
                                                  class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/slide-2-video-555x335.png"
                                                     alt="Lurking in the dark">
                                            </a>
                                        </div>
                                    </div>


                                    <div class="row single-slide 3"
                                         style="opacity: 0; height: 0px; padding-bottom: 0px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-1-1.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">War, Thriller</span>
                                            <header>
                                                <h3 class="no-underline">The lone soldier: Behind enemy lines</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star grey"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 30 July, 2020
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p>
                                                <a href="http://specto.klevermedia.co.uk/movies/the-lone-soldier-behind-enemy-lines/"
                                                   class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/trailer-2-555x335.png"
                                                     alt="The lone soldier: Behind enemy lines">
                                            </a>
                                        </div>
                                    </div>


                                    <div class="row single-slide 4"
                                         style="opacity: 0; height: 0px; padding-bottom: 0px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-whats-on.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">Action, Fantasy</span>
                                            <header>
                                                <h3 class="no-underline">The vendetta</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 14 April, 2019
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/the-vendetta/"
                                                  class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/trailer-3-555x335.png"
                                                     alt="The vendetta">
                                            </a>
                                        </div>
                                    </div>


                                    <div class="row single-slide 5"
                                         style="opacity: 0; height: 0px; padding-bottom: 0px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-2-1.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">Action, Adventure</span>
                                            <header>
                                                <h3 class="no-underline">The executioner</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star grey"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 26 May, 2019
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/the-executioner/"
                                                  class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/trailer-4-555x335.png"
                                                     alt="The executioner">
                                            </a>
                                        </div>
                                    </div>


                                    <div class="row single-slide 6"
                                         style="opacity: 0; height: 0px; padding-bottom: 0px;">
                                        <div class="bg"
                                             style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/hero-whats-on.jpg);"></div>
                                        <div class="col-sm-5 col-xs-12 slide-content">
                                            <span class="title">Thriller, Horror</span>
                                            <header>
                                                <h3 class="no-underline">Sudden death</h3>
                                            </header>
                                            <div class="star-rating">
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                                <i class="fa fa-star"></i>
                                            </div>
                                            <div class="date">
                                                <i class="fa fa-calendar-o"></i> 8 March, 2019
                                            </div>
                                            <p>Claritas est etiam processus dynamicus, qui sequitur mutationem
                                                consuetudium lectorum. Mirum est notare quam littera gothica, quam nunc
                                                putamus parum claram, anteposuerit litterarum formas humanitatis per
                                                seacula quarta decima et quinta decima.</p>
                                            <p><a href="http://specto.klevermedia.co.uk/movies/sudden-death/"
                                                  class="arrow-button">
                                                    More info </a></p>
                                        </div>
                                        <div class="col-xs-12 col-sm-6 col-sm-push-1 slide-video">
                                            <a href="https://youtu.be/d96cjJhvlMA" data-vbtype="video"
                                               class="venobox video vbox-item">
                                                <i class="fa fa-play"></i>
                                                <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/trailer-5-555x335.png"
                                                     alt="Sudden death">
                                            </a>
                                        </div>
                                    </div>


                                    <!............................................................>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div style="margin-right: -15px;margin-left: -15px" class="slick-slider">

                            <div id="comingSoon" class="owl-carousel slick-carousel slick-initialized">

                                <div data-dynamicclass="1" class="slick-slide slick-cloned" data-slick-index="1"
                                     aria-hidden="true" tabindex="-1" style="opacity: 1">
                                    <a href="http://specto.klevermedia.co.uk/movies/lurking-in-the-dark/" tabindex="-1">
                                        <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-16.jpg"
                                             alt="Lurking in the dark">
                                    </a>
                                    <header><h5 class="left no-underline">Lurking in the dark</h5></header>
                                    <span class="release-date">11 August, 2018</span>
                                </div>

                                <div data-dynamicclass="2" class="slick-slide slick-cloned" data-slick-index="2"
                                     aria-hidden="true" tabindex="-1">
                                    <a href="http://specto.klevermedia.co.uk/movies/the-lone-soldier-behind-enemy-lines/"
                                       tabindex="-1">
                                        <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-13.jpg"
                                             alt="The lone soldier: Behind enemy lines">
                                    </a>
                                    <header><h5 class="left no-underline">The lone soldier: Behind enemy lines</h5>
                                    </header>
                                    <span class="release-date">30 July, 2020</span>
                                </div>

                                <div data-dynamicclass="3" class="slick-slide slick-cloned" data-slick-index="3"
                                     aria-hidden="true" tabindex="-1">
                                    <a href="http://specto.klevermedia.co.uk/movies/the-vendetta/" tabindex="-1">
                                        <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-3.jpg"
                                             alt="The vendetta">
                                    </a>
                                    <header><h5 class="left no-underline"> The vendetta </h5></header>
                                    <span class="release-date">14 April, 2019</span>
                                </div>

                                <div data-dynamicclass="4" class="slick-slide slick-cloned" data-slick-index="4"
                                     aria-hidden="true" tabindex="-1">
                                    <a href="http://specto.klevermedia.co.uk/movies/the-executioner/" tabindex="-1">
                                        <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-15.jpg"
                                             alt="The executioner">
                                    </a>
                                    <header><h5 class="left no-underline">The executioner</h5></header>
                                    <span class="release-date">26 May, 2019</span>
                                </div>

                                <div data-dynamicclass="5" class="slick-slide slick-cloned" data-slick-index="5"
                                     aria-hidden="true" tabindex="-1">
                                    <a href="http://specto.klevermedia.co.uk/movies/sudden-death/" tabindex="-1">
                                        <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-10.jpg"
                                             alt="Sudden death">
                                    </a>
                                    <header><h5 class="left no-underline">Sudden death</h5></header>
                                    <span class="release-date">8 March, 2019</span>
                                </div>

                                <div data-dynamicclass="6" class="slick-slide slick-cloned" data-slick-index="6"
                                     aria-hidden="true" tabindex="-1">
                                    <a href="http://specto.klevermedia.co.uk/movies/the-vendetta/" tabindex="-1">
                                        <img src="http://specto.klevermedia.co.uk/wp-content/uploads/2017/07/movie-14.jpg"
                                             alt="The vendetta">
                                    </a>
                                    <header><h5 class="left no-underline"> The vendetta </h5></header>
                                    <span class="release-date">14 April, 2019</span>
                                </div>

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
                                if (currentClass == 1) {
                                    $("[data-dynamicclass='1']").css('opacity', '1')
                                }
                                ;
                                if (currentClass == 2) {
                                    $("[data-dynamicclass='2']").css('opacity', '1')
                                }
                                ;
                                if (currentClass == 3) {
                                    $("[data-dynamicclass='3']").css('opacity', '1')
                                }
                                ;
                                if (currentClass == 4) {
                                    $("[data-dynamicclass='4']").css('opacity', '1')
                                }
                                ;
                                if (currentClass == 5) {
                                    $("[data-dynamicclass='5']").css('opacity', '1')
                                }
                                ;
                                if (currentClass == 6) {
                                    $("[data-dynamicclass='6']").css('opacity', '1')
                                }
                                ;
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
                                Need help? Contact our support team on </h3>
                        </header>
                        <aside style="color: #ec7532; font-size: 46px">
                            <p style="text-align: center;">0330 123 4567</p></aside>
                    </div>
                </div>

            </div>
        </section>
    </div>


    <footer>
        <div class="container">
            <div class="row">


                <div class="col-sm-3">
                    <h6>Get in touch</h6>
                    <div class="menu-footer-1-container">
                        <ul id="menu-footer-1" class="menu">
                            <li id="menu-item-48"
                                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-48"><a
                                        href="#">FAQs</a></li>
                            <li id="menu-item-49"
                                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-49"><a
                                        href="#">Give us feedback</a></li>
                            <li id="menu-item-50"
                                class="menu-item menu-item-type-custom menu-item-object-custom menu-item-50"><a
                                        href="#">Contact us</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3">
                    <h6>About movie star</h6>
                    <div class="menu-footer-1-container">
                        <ul id="menu-footer-2" class="menu">
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-48"><a
                                        href="#">FAQs</a></li>
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-49"><a
                                        href="#">Give us feedback</a></li>
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-50"><a
                                        href="#">Contact us</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3">
                    <h6>Legal stuff</h6>
                    <div class="menu-footer-1-container">
                        <ul id="menu-footer-3" class="menu">
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-48"><a
                                        href="#">FAQs</a></li>
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-49"><a
                                        href="#">Give us feedback</a></li>
                            <li class="menu-item menu-item-type-custom menu-item-object-custom menu-item-50"><a
                                        href="#">Contact us</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-sm-3">
                    <h6>Connect with us</h6>


                </div>


            </div>
            <div class="copyright">
                <p>2018 © Specto / <a href="http://www.klevermedia.co.uk">Web design by Klever media</a></p></div>
        </div>
    </footer>
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
        })

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
    </body>
@endsection
