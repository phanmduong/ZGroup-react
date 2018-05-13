<body class="archive post-type-archive post-type-archive-movie masthead-fixed list-view full-width">

<div id="content_hero"
     style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/hero-search-1.png);">
    <img src="http://specto.klevermedia.co.uk/wp-content/themes/specto/images/scroll-arrow.svg" alt="Scroll down"
         class="scroll">
    <div class="container">
        <div class="row blurb">
            <div class="col-md-9">
                <?php if (!$title) {
                    $title = "Tất cả";
                }?>
                <span class="title">{{$title}}</span>
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

            @if(count($films) > 0)

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
                                        <a href="/{{$film->id}}" class="arrow-button">Chi tiết</a>
                                    </p>
                                </div>
                                <div class="col-md-4 col-sm-3 running-time">
                                    <hr class="space-10">{{$film->running_time}}
                                    <span class="certificate">{{$film->film_rated}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach


                <div id="pagination-films">

                    <nav class="navigation pagination" role="navigation">
                        <div class="nav-links">
                            <a href="/film?page=1&search={{$search}}" class=" page-numbers">
                                Đầu
                            </a>
                            <a v-for="page in pages" v-bind:href="'/film?page='+page+'&search={{$search}}'"
                               v-bind:class="'page-numbers ' + (page=={{$current_page}} ? 'current' : '')">
                                @{{page}}
                            </a>
                            <a href="/film?page={{$total_pages}}&search={{$search}}" class=" next page-numbers">
                                Cuối
                            </a>
                        </div>
                    </nav>

                </div>
            @else
                <div>Nothing</div>
            @endif
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
                    <li><a href="/film-categories/showing">Phim đang chiếu</a></li>
                    <li><a href="/film-categories/coming-soon">Phim sắp chiếu</a></li>
                </ul>
            </div>
        </aside>
    </div>
</div>


</body>

@push('scripts')
    <script>
        var pagination = new Vue({
            el: '#pagination-films',
            data: {
                pages: []
            },
        });

        pagination.pages = paginator({{$current_page}},{{$total_pages}});
    </script>
@endpush

