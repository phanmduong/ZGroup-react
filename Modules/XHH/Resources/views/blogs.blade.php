@extends('xhh::layouts.master')

@section('content')
    <div class="page-header page-header-xs"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/15132416649MjXr1VTKC53cHy.png');">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h1 class="title"><b>Blogs</b></h1>
                        <h5 class=description">Các bài viết chia sẻ kiến thức và thông tin</h5>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:20px">
        <div class="container">
            <div class="description">
                <div style="display: flex; flex-direction: row; align-items: center" id="search-blog">
                    <input placeholder="Tìm kiếm" id="search-blog"
                           style="width:100%; padding:20px; margin:15px 0 15px 0; border:none; font-size:15px"
                           type="text" v-on:keyup.enter="searchBlog" v-model="search" value="{{$search}}"/>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                                style="height: 62px;
                                background-color: #C50000;
                                color: white;
                                border-color: #C50000;
                                text-align: right;
                                border-radius: 0px;
                        ">@if($type)
                                {!! $type_name !!}
                            @else
                                Thể loại
                            @endif
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right"
                            style="background: white; overflow: scroll; height: 300px; box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);border-radius: 0px!important;">
                            <a class="dropdown-item"
                               v-bind:href="'/blog?page=1&search='+search"
                               style="padding: 10px 15px!important; border-radius: 0px!important;">
                                Tất cả
                            </a>
                            @foreach($categories as $category)
                                <a class="dropdown-item"
                                   v-bind:href="'/blog?page=1&search='+search+'&type={{$category->id}}'"
                                   style="padding: 10px 15px!important; border-radius: 0px!important;">
                                    {{$category->name}}
                                </a>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row">
                @foreach($blogs as $blog)
                    <div class="col-md-4">
                        <div class="card card-plain card-blog">
                            <div class="card-image">
                                <a href="{{'/blog/post/'.$blog->id}}">
                                    <div
                                            style="width: 100%;
                                                    border-radius: 15px;
                                                    background: url({{generate_protocol_url($blog->url)}});
                                                    background-size: cover;
                                                    background-position: center;
                                                    padding-bottom: 70%;"

                                    ></div>
                                </a>
                            </div>

                            <div class="card-block">
                                @if($blog->category)
                                    <span class="label label-danger">{{$blog->category->name}}</span>
                                @endif
                                <h3 class="card-title">
                                    <a href="{{'/blog/post/'.$blog->id}}">{{$blog->title}}</a>
                                </h3>
                                <p class="card-description">
                                    {{shortString($blog->description, 15)}}
                                </p>
                                <br>
                                <a href="{{'/blog/post/'.$blog->id}}" style="color:#c50000!important"><b>Xem
                                        thêm</b></a>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>

            <hr>
            <div id="pagination-blogs">
                <div class="pagination-area">
                    <ul class="pagination pagination-primary justify-content-center">
                        <li class="page-item"><a href="/blog?page=1&search={{$search}}&type={{$type}}"
                                                 class="page-link"><i class="fa fa-angle-double-left"
                                                                      aria-hidden="true"></i></a>
                        </li>
                        <li v-for="page in pages"
                            v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                            <a v-bind:href="'/blog?page='+page+'&search={{$search}}&type={{$type}}'"
                               class="page-link">@{{page}}</a>
                        </li>
                        <li class="page-item"><a
                                    href="/blog?page={{$total_pages}}&search={{$search}}&type={{$type}}"
                                    class="page-link"><i class="fa fa-angle-double-right"
                                                         aria-hidden="true"></i></a></li>
                    </ul>
                </div>
            </div>
            <br>
            <br>
        </div>
    </div>
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
                    window.open('/blog?page=1&search=' + this.search + '&type={!! $type !!}', '_self');
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