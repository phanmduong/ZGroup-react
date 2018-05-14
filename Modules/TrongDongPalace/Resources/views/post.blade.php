@extends('trongdongpalace::layouts.master')

{{--@section('meta')--}}
{{--<meta property="og:type" content="website"/>--}}
{{--<meta property="og:url" content="{{config('app.protocol').config('app.domain').'/blog/post/'.$post->id}}"/>--}}
{{--<meta property="og:title" content="{{$post->title}}"/>--}}
{{--<meta property="og:description"--}}
{{--content="{{$post->description}}"/>--}}
{{--<meta property="og:image" content="{{$post->url}}"/>--}}
{{--@endsection--}}

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
                            <div class="gdlr-item gdlr-blog-full gdlr-item-start-content">

                                <!-- get the content based on post format -->

                                <article id="post-859"
                                         class="post-859 post type-post status-publish format-standard has-post-thumbnail hentry category-blog category-fit-row">
                                    <div class="gdlr-standard-style">
                                        <div class="gdlr-blog-thumbnail">
                                            <a data-rel="fancybox" href="{{generate_protocol_url($post['url'])}}"><img
                                                        src="{{generate_protocol_url($post['url'])}}"
                                                        alt="" width="750" height="330"></a></div>


                                        <div class="blog-date-wrapper gdlr-title-font">
                                            <span class="blog-date-day">{{date('d',strtotime($post['created_at']))}}</span>
                                            <span class="blog-date-month">{{date('m',strtotime($post['created_at']))}}
                                                /{{date('y',strtotime($post['created_at']))}}</span>
                                        </div>

                                        <div class="blog-content-wrapper">
                                            <header class="post-header">
                                                <div class="gdlr-blog-info gdlr-info">
                                                    <div class="blog-info blog-author"><i class="fa fa-pencil"></i><a
                                                                title="Posts by John Doe"
                                                                rel="author">{{$post->author->name}}</a>
                                                    </div>
                                                    <div class="blog-info blog-comment"><i
                                                                class="fa fa-eye"></i><a
                                                        >{{$post->views}}</a>
                                                    </div>
                                                    <div class="blog-info blog-category"><i
                                                                class="fa fa-folder-open-o"></i><a
                                                                rel="category">{{$post->category->name}}</a>
                                                    </div>
                                                    <div class="clear"></div>
                                                </div>

                                                <h1 class="gdlr-blog-title">{{$post->title}}</h1>

                                                <div class="clear"></div>
                                            </header><!-- entry-header -->

                                            <div class="gdlr-blog-content" style="color: white!important">
                                                {!! $post->content !!}
                                            </div>
                                            <div class="gdlr-single-blog-tag">
                                            </div>
                                        </div> <!-- blog content wrapper -->
                                    </div>
                                </article><!-- #post -->
                            </div>
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
                                        class="gdlr-widget-title">Tags</h3>
                                <div class="clear"></div>
                                <div class="tagcloud">
                                    @foreach(explode(',',$post['tags']) as $tag)
                                        @if(!empty($tag))
                                            <a href="/{{$link}}?page=1&search=&tag={{$tag}}"
                                               class="tag-cloud-link tag-link-11 tag-link-position-1"
                                               style="font-size: 8pt;" aria-label="{{$tag}}">{{$tag}}</a>ơ
                                        @endif
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