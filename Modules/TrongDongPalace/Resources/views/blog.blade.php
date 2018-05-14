@extends('trongdongpalace::layouts.master')

@section('content')
    <div id="gdlr-header-substitute"></div>
    <!-- is search -->
    <div class="gdlr-page-title-wrapper">
        <div class="gdlr-page-title-overlay"></div>
        <div class="gdlr-page-title-container container">
            <h1 class="gdlr-page-title">Cập nhật tin tức mới nhất</h1>
            <span class="gdlr-page-caption">Trống Đồng</span>
        </div>
    </div>
    <div class="content-wrapper">
        <div class="gdlr-content">

            <!-- Above Sidebar Section-->

            <!-- Sidebar With Content Section-->
            <div class="with-sidebar-wrapper">
                <div class="with-sidebar-container container">
                    <div class="with-sidebar-left eight columns">
                        <div class="with-sidebar-content twelve columns">
                            <section id="content-section-1">
                                <div class="section-container container">

                                    <div class="blog-item-wrapper">
                                        <div class="blog-item-holder">
                                            @foreach($blogs as $blog)
                                                <div class="gdlr-item gdlr-blog-full">
                                                    <div class="gdlr-ux gdlr-blog-full-ux">
                                                        <article id="post-859"
                                                                 class="post-859 post type-post status-publish format-standard has-post-thumbnail hentry category-blog category-fit-row">
                                                            <div class="gdlr-standard-style">
                                                                <div class="gdlr-blog-thumbnail">
                                                                    <a href="/blog/post/{{$blog['id']}}">
                                                                        <img src="{{generate_protocol_url($blog['url'])}}"
                                                                             alt="" width="750" height="330"></a>
                                                                    @if($blog['category_name'])
                                                                        <div class="gdlr-sticky-banner"><i
                                                                                    class="fa fa-bullhorn"></i>{{$blog['category_name']}}
                                                                        </div>
                                                                    @endif
                                                                </div>


                                                                <div class="blog-date-wrapper gdlr-title-font">
                                                                    <span class="blog-date-day">{{date('d',strtotime($blog['created_at']))}}</span>
                                                                    <span class="blog-date-month">{{date('m',strtotime($blog['created_at']))}}</span>
                                                                </div>

                                                                <div class="blog-content-wrapper">
                                                                    <header class="post-header">
                                                                        <h3 class="gdlr-blog-title"><a
                                                                                    href="http://demo.goodlayers.com/hotelmaster/dark/sedial-eiusmod-tempor/">{{$blog['title']}}</a>
                                                                        </h3>

                                                                        <div class="clear"></div>
                                                                    </header><!-- entry-header -->

                                                                    <div class="gdlr-blog-content">{{$blog['description']}}
                                                                        <div class="clear"></div>
                                                                        <a href="/blog/post/{{$blog['id']}}"
                                                                           class="excerpt-read-more">Đọc tiếp<i
                                                                                    class="fa fa-long-arrow-right icon-long-arrow-right"></i></a>
                                                                    </div>
                                                                </div> <!-- blog content wrapper -->
                                                            </div>
                                                        </article>
                                                    </div>
                                                </div>
                                            @endforeach
                                            <div class="gdlr-item gdlr-blog-full">
                                                <div class="gdlr-ux gdlr-blog-full-ux"
                                                     style="opacity: 1; padding-top: 0px; margin-bottom: 0px;">

                                                </div>
                                            </div>
                                        </div>
                                        <div id="pagination-blogs" class="gdlr-pagination">
                                            <a class="next page-numbers"
                                               href="/{{$link}}?page=1&search={{$search}}&tag={{$tag}}">Đầu
                                            </a>
                                            <a v-for="page in pages"
                                               v-bind:class="'page-numbers ' + (page=={{$current_page}} ? 'current' : '')"
                                               v-bind:href="'/{{$link}}?page='+page+'&search={{$search}}&tag={{$tag}}'"
                                            >
                                                @{{page}}
                                            </a>
                                            <a class="next page-numbers"
                                               href="/{{$link}}?page={{$total_pages}}&search={{$search}}&tag={{$tag}}">Cuối
                                            </a>
                                        </div>
                                    </div>

                                    <div class="clear"></div>
                                </div>
                            </section>
                        </div>

                        <div class="clear"></div>
                    </div>

                    <div class="gdlr-sidebar gdlr-right-sidebar four columns">
                        <div class="gdlr-item-start-content sidebar-right-item">


                            <div id="text-2" class="widget widget_text gdlr-item gdlr-widget"><h3
                                        class="gdlr-widget-title">TRỐNG ĐỒNG</h3>
                                <div class="clear"></div>
                                <div class="textwidget">Chúng tôi cung cấp cho bạn các thông tin, xu hướng mới nhất về
                                    lĩnh vực sự kiện/tiệc cưới.
                                </div>
                            </div>
                            <div id="gdlr-recent-portfolio-widget-2"
                                 class="widget widget_gdlr-recent-portfolio-widget gdlr-item gdlr-widget"><h3
                                        class="gdlr-widget-title">Bài viết mới nhất</h3>
                                <div class="clear"></div>
                                <div class="gdlr-recent-port-widget">
                                    @foreach($topNewBlogs as $blog)
                                        <div class="recent-post-widget">
                                            <div class="recent-post-widget-thumbnail"><a
                                                        href="/blog/post/{{$blog['id']}}"><img
                                                            src="{{generate_protocol_url($blog['url'])}}"
                                                            alt="" width="150" height="150"></a></div>
                                            <div class="recent-post-widget-content">
                                                <div class="recent-post-widget-title"><a
                                                            href="/blog/post/{{$blog['id']}}">{{$blog['title']}}</a>
                                                </div>
                                                <div class="recent-post-widget-info">
                                                    <div class="blog-info blog-date"><i class="fa fa-clock-o"></i><a
                                                        >{{timeCal(date($blog['created_at']))}}</a></div>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                    @endforeach
                                    <div class="clear"></div>
                                </div>
                            </div>
                            <div id="gdlr-recent-portfolio-widget-3"
                                 class="widget widget_gdlr-recent-portfolio-widget gdlr-item gdlr-widget"><h3
                                        class="gdlr-widget-title">Bài viết nổi bật</h3>
                                <div class="clear"></div>
                                <div class="gdlr-recent-port-widget">
                                    @foreach($topViewBlogs as $blog)
                                        <div class="recent-post-widget">
                                            <div class="recent-post-widget-thumbnail"><a
                                                        href="/blog/post/{{$blog['id']}}"><img
                                                            src="{{generate_protocol_url($blog['url'])}}"
                                                            alt="" width="150" height="150"></a></div>
                                            <div class="recent-post-widget-content">
                                                <div class="recent-post-widget-title"><a
                                                            href="/blog/post/{{$blog['id']}}">{{$blog['title']}}</a>
                                                </div>
                                                <div class="recent-post-widget-info">
                                                    <div class="blog-info blog-date"><i class="fa fa-clock-o"></i><a
                                                        >{{timeCal(date($blog['created_at']))}}</a></div>
                                                    <div class="clear"></div>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </div>
                                    @endforeach
                                    <div class="clear"></div>
                                </div>
                            </div>
                            <div id="tag_cloud-2" class="widget widget_tag_cloud gdlr-item gdlr-widget"><h3
                                        class="gdlr-widget-title">Tag Cloud</h3>
                                <div class="clear"></div>
                                <div class="tagcloud">
                                    @foreach($topTags as $tag)
                                        <a href="/{{$link}}?page=1&search=&tag={{$tag->tag}}"
                                           class="tag-cloud-link tag-link-11 tag-link-position-1"
                                           style="font-size: 8pt;" aria-label="{{$tag->tag}}">{{$tag->tag}}</a>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>


            <!-- Below Sidebar Section-->


        </div><!-- gdlr-content -->
        <div class="clear"></div>
    </div>
@endsection

@push('scripts')
    <script>
                {{--var search = new Vue({--}}
                {{--el: '#search-blog',--}}
                {{--data: {--}}
                {{--search: '{!! $search !!}'--}}
                {{--},--}}
                {{--methods: {--}}
                {{--searchBlog: function () {--}}
                {{--window.open('/blogs?page=1&search=' + this.search, '_self');--}}
                {{--}--}}
                {{--}--}}

                {{--})--}}

        var pagination = new Vue({
                el: '#pagination-blogs',
                data: {
                    pages: []
                },
            });

        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
@endpush