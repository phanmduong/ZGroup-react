<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Ledahlia Cinema</title>
    <link rel="shortcut icon" href="http://d1j8r0kxyu9tj8.cloudfront.net/files/1525764756TOI3CROQKmr7chO.ico"/>
    <link rel="stylesheet" id="fw-ext-builder-frontend-grid-css"
          href="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/builder/static/css/frontend-grid.css?ver=1.2.10"
          media="all">

    <link rel="stylesheet" id="specto_bootstrap-css-css"
          href="http://specto.klevermedia.co.uk/wp-content/themes/specto/css/bootstrap.min.css?ver=3.3.6" media="all">
    <link rel="stylesheet" id="specto_venobox-css-css"
          href="http://specto.klevermedia.co.uk/wp-content/themes/specto/css/venobox.css?ver=1.6.0" media="all">
    <link rel="stylesheet" id="specto_slick-css-css"
          href="http://specto.klevermedia.co.uk/wp-content/themes/specto/css/slick.css?ver=1.6.0" media="all">
    <link rel="stylesheet" id="specto_theme-style-css"
          href="http://specto.klevermedia.co.uk/wp-content/themes/specto/style.css?ver=1.0" media="all">
    <link rel="stylesheet" id="fw-shortcode-section-background-video-css"
          href="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/shortcodes/shortcodes/section/static/css/background.css?ver=4.9.4"
          media="all">
    <link rel="stylesheet" id="fw-shortcode-section-css"
          href="http://specto.klevermedia.co.uk/wp-content/plugins/unyson/framework/extensions/shortcodes/shortcodes/section/static/css/styles.css?ver=4.9.4"
          media="all">
    <link rel="stylesheet" id="fw-googleFonts-css"
          href="http://fonts.googleapis.com/css?family=Roboto+Condensed%3A300%2Cregular&amp;subset=latin-ext&amp;ver=4.9.4"
          media="all">
    <script src="http://specto.klevermedia.co.uk/wp-includes/js/jquery/jquery.js"></script>
    <script src="http://specto.klevermedia.co.uk/wp-includes/js/jquery/jquery-migrate.min.js?ver=1.4.1"></script>
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">

    <script src="https://cdn.jsdelivr.net/npm/vue"></script>

    <style>
        .owl-carousel {
            display: none;
            width: 100%;
            z-index: 1;
            -webkit-tap-highlight-color: transparent;
            position: relative
        }

        .owl-carousel .owl-stage-outer {
            overflow: hidden;
            -webkit-transform: translate3d(0, 0, 0)
        }

        .owl-carousel .owl-item {
            float: left
        }

        .owl-carousel .owl-item img {
        }

        .owl-carousel.owl-loaded {
            display: block
        }

        .owl-carousel.owl-loading {
            opacity: 0;
            display: block
        }

        .owl-carousel.owl-drag .owl-item {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none
        }

        .owl-carousel.owl-grab {
        }

        /*    .owl-carousel .owl-dots.disabled,.owl-carousel .owl-nav.disabled{display:none}
        */
        @-webkit-keyframes fadeOut {
            0% {
                opacity: 1
            }
            100% {
                opacity: 0
            }
        }

        @keyframes fadeOut {
            0% {
                opacity: 1
            }
            100% {
                opacity: 0
            }
        }

        @media only screen and (max-width: 850px) {
            owl-carousel .owl-dots, .owl-carousel .owl-nav {
                display: none
            }
        }

        @media only screen and (max-width: 1105px) and (min-width: 990px) {
            owl-carousel .owl-dots, .owl-carousel .owl-nav {
                display: none
            }
        }

        @media only screen and (max-width: 1305px) and (min-width: 1200px) {
            owl-carousel .owl-dots, .owl-carousel .owl-nav {
                display: none
            }
        }

        .owl-carousel .item {
            position: relative;
            z-index: 100;
            -webkit-backface-visibility: hidden;
        }

        /* end fix */
        .owl-nav > div {
            margin-top: -26px;
            position: absolute;
            top: 50%;
            color: #cdcbcd;
        }

        .owl-nav i {
            font-size: 52px;
        }

        .owl-nav .owl-prev {
            left: 0px;
        }

        .owl-nav .owl-next {
            right: 0px;
        }

        .figlio {
            box-shadow: none
        }

        #comingSoon:before {
            width: 100%
        }

        .time {
            cursor: pointer;
            padding: 8px 10px 7px 10px !important
        }

        .time-past {
            opacity: 0.5;
            cursor: not-allowed !important;
        }

        .today .time {
            background-color: #ec7532;
            color: white
        }

        .fw-tabs ul li {
            width: 90px
        }

        .fw-tabs ul li a {
            padding-right: 0px;
            padding-left: 0px;
            text-align: center
        }

        .fw-tabs ul li[aria-controls="Mon"] {
            width: 120px !important
        }

        .fw-tabs ul li[aria-controls="Tue"] {
            width: 110px !important
        }

        .slick-cloned {
            opacity: 0.2
        }

        /*
            #hero .container .blurb .certificate{
                height: 47px
            }*/
        .slick-slide {
            width: 100%;
            padding: 15px;
            margin: 0px
        }

        .fw-container {
            padding-left: 30px;
            padding-right: 30px;
        }

        ::-moz-selection {
            background-color: #ec7532;
        }

        ::selection {
            background-color: #ec7532;
        }

        a:active, a:visited, .btn-ghost, input[type="submit"], .btn-ghost i, a.arrow-button, .tabs ul li.ui-state-active a, .accordion h2.ui-state-active, .accordion h3.ui-state-active, .accordion h4.ui-state-active, .live-search i, .comingSoon-slides span.title, .news article .categories, .single-tags i, .single-tags a:hover, .social-share a, .pagination a:hover, .sidebar .widget .search-form label:before, .sidebar .widget h4, .sidebar .widget ul li a:hover, .sidebar .widget .tagcloud a:hover, .sidebar .movie-search-btn, ul.show-times li.today i, .icon-row span i, .icon-box i, .comments .date, .comment-respond #submit, .news-carousel .date, footer h6, footer .copyright a:hover, .single-post .leave-comment, .single-post .comments .comments-count, .site-name, .movie-tabs span.title {
            color: #ec7532;
        }

        #comingSoon .slick-slide img {
            width: 100%
        }

        .slick-slide .movie-poster aside .play {
            display: flex
        }

        .slick-slide .movie-poster aside .play i {
            margin: auto
        }

        .slick-slide {
            height: auto
        }

        .movie-tabs span.title {
            color:
        }

        blockquote:before, .error-search .search-submit, ul.social-profiles li a:hover, .btn-default:before, .btn-ghost:before, .btn-primary, input[type="submit"]:hover, ul.show-times li.today .time, .comment-respond #submit:hover, .fw-testimonials .fw-testimonials-pagination a:hover, .fw-testimonials .fw-testimonials-pagination a.selected, .edit-link:hover a {
            background-color: #ec7532;
        }

        h2:after, h3:after, h4:after, h5:after, .edit-link a, .nav li:after, .nav li.active a:after, .nav li.current_page_parent a:after, .nav .dropdown-menu, .btn-default, .slick-slider .slick-arrow, .tabs ul li a:after, .tabs.pill-style ul li.ui-state-active a, .movie-search .btn {
            background-image: linear-gradient(to right, #fbbd61, #ec7532);
        }

        .slick-slide .movie-poster:before, .accordion.pill-style h2.ui-state-active:before, .accordion.pill-style h3.ui-state-active:before, .accordion.pill-style h4.ui-state-active:before, .news article .img:before, .comments::-webkit-scrollbar-thumb {
            background-image: linear-gradient(to bottom, #fbbd61, #ec7532);
        }

        .btn-ghost, input[type="submit"], .comingSoon-slides .video i, .pagination a:hover, .pagination .current, .sidebar .widget .tagcloud a:hover, .comment-respond #submit {
            border-color: #ec7532;
        }

        span.title, .heading .search a:hover i, .navbar.banner--clone .nav li.active a, .navbar.banner--clone .nav li.current_page_parent a, .comingSoon-slides a.arrow-button:hover, .social-share a:hover, .social-share a:hover i, .sidebar .widget ul li.current-cat a, .share a:hover, footer ul li a:hover, footer ul li a:hover .fa, a:hover {
            color: #fbbd61;
        }

        input:focus, input:active, textarea:focus, textarea:active, select:focus, select:active, .share a:hover {
            border-color: #fbbd61;
        }

        .navbar-toggle .icon-bar, button.btn-default:hover, button.btn-primary:hover {
            background-color: #fbbd61;
        }

        html,
        body {
            font: Roboto Condensed latin-ext regular;
            color: #717171;
            font-size: 16px;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: Roboto Condensed, latin-ext;
            font-weight: 300;
        }

        footer {
            background: #101010;
        }

        @media (max-width: 767px) {
            .movie-tabs img {
                width: 100%
            }
        }

        .slick-slide.slick-cloned span {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }

        .slick-slide .movie-poster span {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }

        .movie-tabs .image {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }

        .single-slide span, .slide-video span {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }

        .single-slide {
            opacity: 0;
            height: 0px;
            padding-bottom: 0px;
            padding-right: 10px;
            padding-left: 10px
        }

        .comingSoon-slides .single-slide {
            padding-bottom: 0px
        }

        .slide-content .title {
            font-size: 14px;
            color: #ec7532;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 0px
        }

        .left.no-underline {
            color: white
        }

        .slide-content, .slide-video {
            padding: 5px
        }

        .search {
            display: none !important
        }

        .blurb-content p {
            text-align: justify;
        }

        ::-moz-selection {
            background-color: #ec7532;
        }

        ::selection {
            background-color: #ec7532;
        }

        a:active, a:visited, .btn-ghost, input[type="submit"], .btn-ghost i, a.arrow-button, .tabs ul li.ui-state-active a, .accordion h2.ui-state-active, .accordion h3.ui-state-active, .accordion h4.ui-state-active, .live-search i, .comingSoon-slides span.title, .news article .categories, .single-tags i, .single-tags a:hover, .social-share a, .pagination a:hover, .sidebar .widget .search-form label:before, .sidebar .widget h4, .sidebar .widget ul li a:hover, .sidebar .widget .tagcloud a:hover, .sidebar .movie-search-btn, ul.show-times li.today i, .icon-row span i, .icon-box i, .comments .date, .comment-respond #submit, .news-carousel .date, footer h6, footer .copyright a:hover, .single-post .leave-comment, .single-post .comments .comments-count, .site-name, .movie-tabs span.title {
            color: #ec7532;

        }

        .movie-tabs span.title {
            color:
        }

        blockquote:before, .error-search .search-submit, ul.social-profiles li a:hover, .btn-default:before, .btn-ghost:before, .btn-primary, input[type="submit"]:hover, ul.show-times li.today .time, .comment-respond #submit:hover, .fw-testimonials .fw-testimonials-pagination a:hover, .fw-testimonials .fw-testimonials-pagination a.selected, .edit-link:hover a {
            background-color: #ec7532;
        }

        h2:after, h3:after, h4:after, h5:after, .edit-link a, .nav li:after, .nav li.active a:after, .nav li.current_page_parent a:after, .nav .dropdown-menu, .btn-default, .slick-slider .slick-arrow, .tabs ul li a:after, .tabs.pill-style ul li.ui-state-active a, .movie-search .btn {
            background-image: linear-gradient(to right, #fbbd61, #ec7532);
        }

        .slick-slide .movie-poster:before, .accordion.pill-style h2.ui-state-active:before, .accordion.pill-style h3.ui-state-active:before, .accordion.pill-style h4.ui-state-active:before, .news article .img:before, .comments::-webkit-scrollbar-thumb {
            background-image: linear-gradient(to bottom, #fbbd61, #ec7532);
        }

        .btn-ghost, input[type="submit"], .comingSoon-slides .video i, .pagination a:hover, .pagination .current, .sidebar .widget .tagcloud a:hover, .comment-respond #submit {
            border-color: #ec7532;
        }

        span.title, .heading .search a:hover i, .navbar.banner--clone .nav li.active a, .navbar.banner--clone .nav li.current_page_parent a, .comingSoon-slides a.arrow-button:hover, .social-share a:hover, .social-share a:hover i, .sidebar .widget ul li.current-cat a, .share a:hover, footer ul li a:hover, footer ul li a:hover .fa, a:hover {
            color: #fbbd61;
        }

        input:focus, input:active, textarea:focus, textarea:active, select:focus, select:active, .share a:hover {
            border-color: #fbbd61;
        }

        .navbar-toggle .icon-bar, button.btn-default:hover, button.btn-primary:hover {
            background-color: #fbbd61;
        }

        html,
        body {
            font: Roboto Condensed latin-ext regular;
            color: #717171;
            font-size: 16px;
        }

        h1, h2, h3, h4, h5, h6 {
            font-family: Roboto Condensed, latin-ext;
            font-weight: 300;
        }

        footer {
            background: #101010;
        }

        .search {
            display: none !important
        }

        .movie-tabs .image {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }

        @media (max-width: 767px) {
            .movie-tabs img {
                width: 100%
            }

            .movie-tabs > div > div {
                margin-bottom: 40px
            }
        }
    </style>
</head>
<body>
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
</div>
<div class="movie-search">
    <form role="search" method="get" id="searchform" action="http://specto.klevermedia.co.uk/">
        <div>
            <input type="text" value="" name="s" id="search" placeholder="Tìm phim">
            <input type="submit" id="searchsubmit" class="btn btn-default" value="Tìm kiếm">
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
            <a href="Homepage.html" title="Ledahlia" class="logo">
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
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-194 current-menu-item curent_page_item active dropdown">
                    <a title="Movies" href="Movies.html" class="dropdown-toggle" aria-haspopup="false">Phim mới</a>
                    <ul role="menu" class="dropdown-menu">
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-246">
                            <a title="All movies" style="color: white!important" href="/film">Tất cả
                                phim</a>
                        </li>
                    </ul>
                </li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-229"><a title="News"
                                                                                                      href="News.html">Tin
                        tức</a></li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-254"><a title="Coffee"
                                                                                                      href="Coffee.html">Cà
                        phê</a></li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-254"><a title="Events"
                                                                                                      href="Events.thml">Sự
                        kiện</a></li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-210"><a
                            title="Contact us" href="Contact us.html">Liên hệ</a></li>
            </ul>
        </div>
    </div>
</div>
@yield('content')
<footer class="" style="margin-top: 10px">
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
<script>
    function paginator(currentPageData, totalPagesData) {
        var page = [];
        var currentPage = currentPageData;
        var totalPages = totalPagesData;

        var startPage = (currentPage - 2 > 0 ? currentPage - 2 : 1);
        for (var i = startPage; i <= currentPage; i++) {
            page.push(i);
        }

        var endPage = (5 - page.length + currentPage >= totalPages ? totalPages : 5 - page.length + currentPage);

        for (var i = currentPage + 1; i <= endPage; i++) {
            page.push(i);
        }

        if (page && page.length < 5) {
            var pageData = Object.assign(page);
            for (var i = page[0] - 1; i >= (page[0] - (5 - page.length) > 0 ? page[0] - (5 - page.length) : 1); i--) {
                pageData.unshift(i);
            }
            page = pageData;
        }

        return page;
    }
</script>
@stack('scripts')

</body>
</html>