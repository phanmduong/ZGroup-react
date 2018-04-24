@extends('colorme_new.layouts.master') @section('content')
    <div class="container-fluid">
        <div class="row au-first right-image"
             style="height: 300px; background-image: url(http://d1j8r0kxyu9tj8.cloudfront.net/files/1514696969d51Vuy09mwuZ47r.png);">
        </div>
        <div class="row" id="bl-routing-wrapper">
            <div style="width: 100%; text-align: center; background-color: white; height: 50px; margin-bottom: 1px; box-shadow: rgba(0, 0, 0, 0.39) 0px 10px 10px -12px;">
                <a class="routing-bar-item" href="#first-after-nav"
                   style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Khoá
                    học
                </a>
                <span style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">|</span>
                <a class="routing-bar-item" href="/posts/7"
                   style="color: black; height: 100%; line-height: 50px; display: inline-block; margin: 0px 8px; font-weight: 600; opacity: 0.6;">Học
                    viên
                </a>
            </div>
        </div>
        <!--  -->

    </div>
    <div style="margin-top: 50px">
        <div>
            <div data-reactroot="" style="height: 100%;">
                <div class="page-wrap">
                    <div>
                        <div>
                            <div>
                                <div class="container">
                                    <div class="row">
                                        <style>
                                            .zoom {
                                                transition: transform .2s; /* Animation */
                                                box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.2);
                                            }

                                            .zoom:hover {
                                                transform: scale(1.02); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
                                                box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.1);
                                            }
                                            .blog-title {
                                                text-align: center; font-size: 36px; padding: 15px; font-weight: 600;
                                            }
                                            @media only screen and (max-width: 600px) {
                                                .blog-title {
                                                    text-align: center; font-size: 20px; padding: 15px 0; font-weight: 600;
                                                }

                                            }
                                        </style>
                                        @foreach($blogs as $blog)
                                            <div class="col-md-8 col-md-offset-2">
                                                <a href="/profile/{{$blog['author']['username']}}">
                                                    <div style="background: url({{$blog['author']['avatar_url']}}) center center / cover; width: 80px; height: 80px; border-radius: 40px; margin: auto;"></div>
                                                    <div style="text-align: center; padding: 15px 0px; color: rgb(68, 68, 68); font-size: 16px;">
                                                        {{$blog['author']['name']}}
                                                    </div>
                                                </a>
                                                @if($blog['category_name'])
                                                    <div class="product-category" style="text-align: center;"><span
                                                                style="padding: 5px 10px; background-color: rgb(197, 0, 0); color: white; text-transform: uppercase; font-size: 10px; border-radius: 3px;">{{$blog['category_name']}}</span>
                                                    </div>
                                                @endif
                                                <a href="/blog/{{$blog['slug']}}" style="color:black">
                                                    <div class="blog-title" >
                                                        {{$blog['title']}}
                                                    </div>

                                                    <div style="text-align: center; padding-bottom: 25px; color: rgb(137, 137, 137);">{{$blog['time']}}</div>
                                                </a>
                                                <div style="text-align: center; margin-bottom: 30px;">
                                                    <div class="product-tool"><span
                                                                class="glyphicon glyphicon-eye-open"></span><span>{{$blog['views']}}</span><span></span><span></span>
                                                    </div>
                                                </div>

                                                <a href="/blog/{{$blog['slug']}}">
                                                    <img class="zoom" src="{{$blog['url']}}" style="width: 100%;height:auto;margin-bottom:100px;"/>
                                                </a>


                                                {{--<div >--}}
                                                {{--<div class="colorme-img">--}}
                                                {{--<div class="colorme-link" onclick="location.href='/blog/{{$blog['slug']}}'" style="background-image: url({{$blog['url']}}); background-size: cover; background-position: center center;"></div>--}}
                                                {{--</div>--}}
                                                {{--<div >--}}
                                                {{--<div style="font-size: 16px; border-bottom: 1px solid rgb(217, 217, 217); padding: 10px; display: flex; justify-content: space-between;">--}}
                                                {{--<a href="/blog/{{$blog['slug']}}" style="color: rgb(85, 85, 85); font-size: 14px; font-weight: 600;" data-toggle="tooltip"--}}
                                                {{--title="{{$blog['title']}}">--}}
                                                {{--{{strlen($blog['title']) > 25 ? mb_substr($blog['title'],0,22, 'utf-8') . '...' : $blog['title']}}--}}
                                                {{--</a>--}}
                                                {{--</div>--}}
                                                {{--<div class="media" style="font-size: 12px; margin-top: 10px; padding: 5px 10px;">--}}
                                                {{--<div class="media-left" style="padding-right: 3px;">--}}
                                                {{--<a href="/profile/{{$blog['author']['username']}}">--}}
                                                {{--<div style="background: url({{$blog['author']['avatar_url']}}) center center / cover; width: 40px; height: 40px; margin-right: 5px; margin-top: -3px; border-radius: 3px;"></div>--}}
                                                {{--</a>--}}
                                                {{--</div>--}}
                                                {{--<div class="media-body">--}}
                                                {{--<a href="/profile/{{$blog['author']['username']}}">--}}
                                                {{--<div style="font-weight: 600;">{{$blog['author']['name']}}</div>--}}
                                                {{--<div class="timestamp" style="font-size: 12px;">{{$blog['time']}}</div>--}}
                                                {{--</a>--}}
                                                {{--</div>--}}
                                                {{--</div>--}}
                                                {{--<br>--}}
                                                {{--<div style="border-bottom: 1px solid rgb(217, 217, 217); position: absolute; bottom: 40px; width: 100%;"></div>--}}
                                                {{--<div style="position: absolute; bottom: 5px;">--}}
                                                {{--<div class="product-tool">--}}
                                                {{--<span class="glyphicon glyphicon-eye-open"></span>--}}
                                                {{--<span>{{$blog['views']}}</span>--}}
                                                {{--</div>--}}
                                                {{--</div>--}}
                                                {{--<div style="position: absolute; bottom: 10px; right: 5px;">--}}
                                                {{--<div data-toggle="tooltip" title="" style="cursor: pointer; width: 11px; height: 11px; border-radius: 10px; margin-right: 3px; display: inline-block;"--}}
                                                {{--data-original-title="#"></div>--}}
                                                {{--@if($blog['category_name'])--}}
                                                {{--<span style="padding: 5px 10px; background-color: rgb(197, 0, 0); color: white; text-transform: uppercase; font-size: 10px; border-radius: 3px;">{{$blog['category_name']}}</span>--}}
                                                {{--@endif--}}
                                                {{--</div>--}}
                                                {{--</div>--}}
                                                {{--</div>--}}
                                            </div>
                                        @endforeach

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="pagination-blogs">
        <div class="pagination-area">
            <ul class="pagination pagination-primary">
                <li class="page-item">
                    <a href="/blogs?page=1&search={{$search}}" class="page-link">
                        <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                    </a>
                </li>
                <li v-for="page in pages" v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                    <a v-bind:href="'/blogs?page='+page+'&search={{$search}}'" class="page-link">
                        @{{page}}
                    </a>
                </li>
                <li class="page-item">
                    <a href="/blogs?page={{$total_pages}}&search={{$search}}" class="page-link">
                        <i class="fa fa-angle-double-right" aria-hidden="true">
                        </i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <br>
    <!--  -->
@endsection
@push('scripts')
    <script>
        var search = new Vue({
            el: '#search-blog',
            data: {
                search: '{!! $search !!}'
            },
            methods: {
                searchBlog: function () {
                    window.open('/blog?page=1&search=' + this.search, '_self');
                }
            }

        })

        var pagination = new Vue({
            el: '#pagination-blogs',
            data: {
                pages: []
            },
        });

        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
@endpush