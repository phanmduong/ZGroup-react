@extends('filmzgroup::layouts.master')
@section('content')
    <body class="archive post-type-archive post-type-archive-movie masthead-fixed list-view full-width">

    <div id="content_hero"
         style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/hero-search-1.png);">
        <img src="http://specto.klevermedia.co.uk/wp-content/themes/specto/images/scroll-arrow.svg" alt="Scroll down"
             class="scroll">
        <div class="container">
            <div class="row blurb">
                <div class="col-md-9">
                    <span class="title">Tất cả</span>
                    <header>
                        <h1>Phim</h1>
                    </header>
                </div>
            </div>
        </div>
    </div>

    <div class="container section news">
        <div class="row">
            <div class="col-sm-7">


                @foreach($films as $film)
                    <div class="row movie-tabs">
                        <div class="col-md-3 col-sm-3">
                            <div style="position: relative;">
                                <img src="http://d1j8r0kxyu9tj8.cloudfront.net/files/152570604628wPS68D5wXSjPv.png"
                                     alt="Hush">
                                <a class="image" href="/{{$film->id}}" title="Hush"
                                   style="background: url({{$film->avatar_url}}) center center / cover;"></a>
                            </div>
                        </div>
                        <div class="col-md-9 col-sm-9">
                            <span class="title">{{$film->genre}}</span>
                            <h3 class="no-underline">{{$film->name}}</h3>
                            <p style="text-align: justify;">{{$film->summary}}</p>
                            <div class="row">
                                <div class="col-md-8 col-sm-9">
                                    <hr class="space-10">
                                    <p>
                                        <a href="One-Film.html" class="arrow-button">Chi tiết</a>
                                    </p>
                                </div>
                                <div class="col-md-4 col-sm-3 running-time">
                                    <hr class="space-10">{{$film->runningtime}}
                                    {{--<span class="certificate"></span>--}}
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach

                {{--<nav class="navigation pagination" role="navigation">--}}
                    {{--<h2 class="screen-reader-text">Posts navigation</h2>--}}
                    {{--<div class="nav-links"><span aria-current="page" class="page-numbers current">1</span>--}}
                        {{--<a class="page-numbers" href="http://specto.klevermedia.co.uk/movies/page/2/">2</a>--}}
                        {{--<a class="page-numbers" href="http://specto.klevermedia.co.uk/movies/page/3/">3</a>--}}
                        {{--<a class="next page-numbers" href="http://specto.klevermedia.co.uk/movies/page/2/">Next page</a>--}}
                    {{--</div>--}}
                {{--</nav>--}}
                    <div id="pagination-films">
                        <div class="pagination-area">
                            <ul class="pagination pagination-primary justify-content-center">
                                <li class="page-item">
                                    <a href="/film?page=1&search={{$search}}" class="page-link">
                                        <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li v-for="page in pages"
                                    v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                                    <a v-bind:href="'/film?page='+page+'&search={{$search}}'" class="page-link">
                                        @{{page}}
                                    </a>
                                </li>
                                <li class="page-item">
                                    <a href="/film?page={{$total_pages}}&search={{$search}}" class="page-link">
                                        <i class="fa fa-angle-double-right" aria-hidden="true">
                                        </i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
            </div>
            <aside class="col-sm-3 col-sm-push-1 sidebar">
                <div class="widget" style="display: none">
                    <form role="search" method="get" id="searchformArchive" action="http://specto.klevermedia.co.uk/">
                        <div>
                            <input type="text" value="" name="s" id="searchInput" placeholder="Search movies …">
                            <button type="submit" id="searchsubmit" class="movie-search-btn"><i
                                        class="fa fa-search"></i></button>
                            <input type="hidden" name="post_type" value="movie">
                        </div>
                    </form>
                </div>
                <div class="widget">
                    <h4>Phân loại</h4>
                    <ul>
                        <li><a href="Current movies.html">Phim đang chiếu</a></li>
                        <li><a href="Coming soon.html">Phim sắp chiếu</a></li>
                    </ul>
                </div>
            </aside>
        </div>
    </div>


    </body>
@endsection

    <script>
        var pagination = new Vue({
            el: '#pagination-events',
            data: {
                pages: []
            },
        });

        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
    <script src="http://specto.klevermedia.co.uk/wp-content/themes/specto/js/bootstrap.min.js?ver=3.3.6"></script>
