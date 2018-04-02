@extends('nhatquangshop::layouts.master')

@section('content')
    <style>
        .dropdown-item:hover{
            background: #138edc!important;
            border-color: #138edc!important;
        }
        input[type=text]{
            box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);
        }
    </style>
    <div class="page-header page-header-xs"
         style="background-image: url('http://trongdongpalace.com/ckfinder/userfiles/images/hannah-and-matt-1401(1).jpg'); height: 350px">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h4 style="font-weight: 500">BÀI VIẾT MỚI NHẤT</h4>
                        <h2>CHIA SẺ TỪ NHẬT QUANG SHOP</h2><br>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:20px">
        <div class="container">
            <div class="description">
                <div style="display: flex; flex-direction: row; align-items: center" id="search-blogs">
                    <input placeholder="Tìm kiếm" id="search-blog"
                           style="width:100%; padding:20px; margin:15px 0 15px 0; border:none; font-size:15px"
                           type="text" v-on:keyup.enter="searchBlog" v-model="search" value="{{$search}}"/>
                    <div class="dropdown">
                        <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                                style="height: 62px;
                                background-color: #138edc!important;
                                color: white;
                                border-color: #138edc!important;
                                text-align: right;
                                border-radius: 0px;
                            ">
                            @if($category_id)
                                {{\App\CategoryProduct::find($category_id)->name}}
                            @else
                                Loại
                            @endif
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right"
                            style="background: white; overflow: scroll; height: 200px; box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);border-radius: 0px!important;">
                            <a class="dropdown-item"
                               href="/blog"
                               style="padding: 10px 15px!important; border-radius: 0px!important;">
                                Tất cả
                            </a>
                            @foreach($categories as $category)
                                <a class="dropdown-item"
                                   href="{{'/blog?page=1&search=' . $search . '&category_id=' . $category->id}}"
                                   style="padding: 10px 15px!important; border-radius: 0px!important;">
                                    {{$category->name}}
                                </a>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>

            <br>
            <br>
            <div class="row">
                @foreach($blogs as $blog)
                    <div class="col-md-4">
                        <div class="card card-plain card-blog">
                            <div class="card-image">
                                <a href="{{'/blog/post/'.$blog->id}}">
                                    <img class="img img-raised" src="{{generate_protocol_url($blog->url)}}">
                                </a>
                            </div>
                            <div class="card-block">
                                <h3 class="card-title">
                                    <a href="{{'/blog/post/'.$blog->id}}">{{$blog->title}}</a>
                                </h3>
                                <p class="card-description">
                                    {{shortString($blog->description, 15)}}                                </p>
                                <br>
                                <a href="{{'/blog/post/'.$blog->id}}" style="color:#7bc043!important"><b>Xem
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
                        <li class="page-item">
                            <a href="/blog?page=1&search={{$search}}" class="page-link">
                                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li v-for="page in pages"
                            v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                            <a v-bind:href="'/blog?page='+page+'&search={{$search}}'" class="page-link">
                                @{{page}}
                            </a>
                        </li>
                        <li class="page-item">
                            <a href="/blog?page={{$total_pages}}&search={{$search}}" class="page-link">
                                <i class="fa fa-angle-double-right" aria-hidden="true">
                                </i>
                            </a>
                        </li>
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
                    window.open('/blog?page=1&search=' + this.search + '&type={!! $category_id !!}', '_self');
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

