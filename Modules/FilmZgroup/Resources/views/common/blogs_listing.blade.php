<body class="archive post-type-archive post-type-archive-movie masthead-fixed list-view full-width">

<div id="content_hero"
     style="background-image: url(http://specto.klevermedia.co.uk/wp-content/uploads/2017/11/hero-search-1.png);">
    <img src="http://specto.klevermedia.co.uk/wp-content/themes/specto/images/scroll-arrow.svg" alt="Scroll down"
         class="scroll">
    <div class="container">
        <div class="row blurb">
            <div class="col-md-9">
                <span class="title">{{$sm_title}}</span>
                <header>
                    <h1>{{$title}}</h1>
                </header>
            </div>
        </div>
    </div>
</div>

<div class="container section news">
    <div class="row">
        <div class="col-sm-7">
            <?php $limit_summary = 500;?>
            @if(count($blogs) > 0)
                @foreach($blogs as $blog)
                    <article
                            class="post post-239 type-post status-publish format-standard has-post-thumbnail hentry category-awards category-whats-hot tag-tag-1 tag-tag-2">
                        <a href="/blog/{{$blog['id']}}" class="img" title="Marine corp 2 picks up BAFTA">
                            <aside>
                                <div>
                                    <i class="fa fa-link"></i>
                                    <span class="date">{{$blog['time']}} by {{$blog['author']['name']}}</span>
                                </div>
                            </aside>
                            <img width="750" height="350" src="{{$blog['url']}}"
                                 class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                 srcset="{{$blog['url']}} 750w, {{$blog['thumb_url']}} 300w"
                                 sizes="(max-width: 750px) 100vw, 750px"> </a>
                        @if($blog['category_name'])
                            <span class="categories"><a href="/blog/category/{{$blog['category_name']}}"
                                                        rel="category tag">{{$blog['categrory_name']}}</a></span>
                        @endif
                        <h2>{{$blog['title']}}</h2>
                        <p>{{substr($blog['content'],0,$limit_summary) . '...'}}</p>
                        <a href="/blog/{{$blog['id']}}" class="btn btn-ghost" title="Marine corp 2 picks up BAFTA">
                            <span>Xem thêm</span>
                        </a>
                    </article>
                @endforeach
                <div id="pagination-films" style="margin-top: 40px">

                    <nav class="navigation pagination" role="navigation">
                        <div class="nav-links">
                            <a href="/film?page=1&search={{$search}}" class=" page-numbers">
                                Đầu
                            </a>
                            <a v-for="page in pages" v-bind:href="'/blog?page='+page+'&search={{$search}}'"
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

            <div class="widget">
                <form role="search" method="get" class="search-form" action="http://specto.klevermedia.co.uk/">
                    <label>
                        <span class="screen-reader-text">Search for:</span>
                        <input type="search" class="search-field" placeholder="Search …" value="" name="s">
                    </label>
                    <input type="submit" class="search-submit" value="Search">
                </form>
            </div>
            <div class="widget"><h4>Categories</h4>
                <ul>
                    <li class="cat-item cat-item-16"><a
                                href="http://specto.klevermedia.co.uk/category/awards/">Awards</a>
                    </li>
                    <li class="cat-item cat-item-12"><a href="http://specto.klevermedia.co.uk/category/coming-soon/">Coming
                            soon</a>
                    </li>
                    <li class="cat-item cat-item-10"><a href="http://specto.klevermedia.co.uk/category/new-releases/">New
                            releases</a>
                    </li>
                    <li class="cat-item cat-item-9"><a href="http://specto.klevermedia.co.uk/category/whats-hot/">Whats
                            hot</a>
                    </li>
                </ul>
            </div>
            <div class="widget"><h4>Archives</h4>
                <ul>
                    {{--@foreach($archive_times as $arc_time)--}}
                    {{--<li><a href="http://specto.klevermedia.co.uk/2017/11/">{{$arc_time}}</a></li>--}}
                    {{--@endforeach--}}
                    <li><a href="http://specto.klevermedia.co.uk/2017/11/">November 2017</a></li>
                </ul>
            </div>
            <div class="widget"><h4>Tags</h4>
                <div class="tagcloud">
                    <?php $i = 1;    ?>
                    @foreach($blog['tags'] as $tag)
                        @if($tag != '')
                            <a href="http://specto.klevermedia.co.uk/tag/tag-1/"
                               class="tag-cloud-link tag-link-11 tag-link-position-{{$i++}}" style="font-size: 22pt;"
                               aria-label="{{$tag}} (2 items)">{{$tag}}</a>
                        @endif
                    @endforeach
                </div>
        </aside>
    </div>
</div>
</body>
<style>
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
</style>
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