@extends('trongdongpalace::layouts.master')

@section('content')
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
                        <h2>CHIA SẺ TỪ TRỐNG ĐỒNG PALACE</h2><br>
                        <br>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:20px">
        <div class="container">
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

