@extends('elight::layouts.master')

@section('content')
    <div class="page-header page-header-xs"
         style="background-image: url('http://d1j8r0kxyu9tj8.cloudfront.net/files/1519817144ZS7Ub5VFjAwHNEC.png');">
        <div class="filter"></div>
        <div class="content-center">
            <div class="container">
                <br><br>
                <br><br>
                <div class="row">
                    <div class="col-md-8 offset-md-2 text-center">
                        <h1 class="title"><b>Thư viện điện tử</b></h1>
                        <h5 class=description">Dành cho độc giả đã mua sách</h5>
                        <br>
                        <a href="/#buyBooks" class="btn btn-success btn-round" style="color:white">Mua
                            sách</a>
                        <a href="#books" class="btn btn-success btn-round" style="color:white"> Đã có
                            sách </a>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="blog-4" style="margin-top:15px" id="books">
        <div class="container">
            <div class="description">
                <div style="display: flex; flex-direction: row; align-items: center" id="search-books">
                    <input placeholder="Tìm kiếm" id="search-book"
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
                                {{\App\CourseCategory::find($category_id)->name}}
                            @else
                                Loại
                            @endif
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-right"
                            style="background: white; overflow: scroll; height: 200px; box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);border-radius: 0px!important;">
                            <a class="dropdown-item"
                                href="{{'/all-books?page=1&search=' . $search}}"
                               style="padding: 10px 15px!important; border-radius: 0px!important;">
                                Tất cả
                            </a>
                            @foreach($categories as $category)
                                <a class="dropdown-item"
                                   href="{{'/all-books?page=1&search=' . $search . '&category_id=' . $category->id}}"
                                   style="padding: 10px 15px!important; border-radius: 0px!important;">
                                    {{$category->name}}
                                </a>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row" id="books-list">
                @foreach($books as $book)
                    <div class="col-md-3">
                        <div class="card card-profile" style="border-radius: 0px;">
                            <a href="/book/{{$book->id}}" style="padding: 3%;">
                                <div style="background-image: url('{{$book->icon_url}}'); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>
                            </a>
                            <div>
                                <div class="container text-left" style="min-height: 130px;"><br>
                                    <a href="/book/{{$book->id}}" style="font-weight: 600;">{{$book->name}}</a>
                                    <p>{{shortString($book->description,15)}}</p>
                                </div>
                            </div>
                            <div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">
                                <div style="text-align: right;">
                                    <a class="btn btn-success" href="/book/{{$book->id}}"
                                       style="padding: 3px; margin: 3px; font-size: 10px;">
                                        Nghe online <i class="fa fa-headphones" aria-hidden="true"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
            <hr>            
            <div id="pagination-books">
                <div class="pagination-area">
                    <ul class="pagination pagination-primary justify-content-center">
                        <li class="page-item"><a href="/all-books?page=1&search={{$search}}&category_id={{$category_id}}"
                                                 class="page-link"><i class="fa fa-angle-double-left"
                                                                      aria-hidden="true"></i></a>
                        </li>
                        <li v-for="page in pages"
                            v-bind:class="'page-item ' + (page=={{$current_page}} ? 'active' : '')">
                            <a v-bind:href="'/all-books?page='+page+'&search={{$search}}&category_id={{$category_id}}'"
                               class="page-link">@{{page}}</a>
                        </li>
                        <li class="page-item"><a
                                    href="/all-books?page={{$total_pages}}&search={{$search}}&category_id={{$category_id}}"
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
            el: '#search-book',
            data: {
                search: '{!! $search !!}'
            },
            methods: {
                searchBlog: function () {
                    window.open('/all-books?page=1&search=' + this.search + '&category_id={!!$category_id!!}', '_self');
                }
            }
        })

        var pagination = new Vue({
            el: '#pagination-books',
            data: {
                pages: []
            },
        });

        pagination.pages = paginator({{$current_page}},{{$total_pages}})
    </script>
@endpush