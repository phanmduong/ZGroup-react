@extends('elight::layouts.master')

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
                        <h1 class="title"><b>Sổ tay tự học</b></h1>
                        <h5 class="description"> Học Tiếng Anh và chia sẻ kiến thức cùng Elight nhé </h5>
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
                                background-color: #138edc!important;
                                color: white;
                                border-color: #138edc!important;
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
                                @if($blog->category_name)
                                    <span class="label label-danger" style="background-color: #138edc">{{$blog->category_name}}</span>
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
    
    <div id="modalInfo" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Quan tâm đến sản phẩm của Elight?</h4>
                </div>
                <div class="modal-header" id="modal-buy-body">
                    <a style="text-align: center">Điền thông tin để Elight tư vấn sản phẩm học tiếng anh hiệu quả nhất với bạn !</a>
                </div>
                <div class="modal-body">
                    <form action="" method="GET">
                        <div class="card-block">
                            <div class="form-group label-floating">
                                <label class="control-label">Họ và tên</label>
                                <input id="name" type="text" name="name" class="form-control"
                                    placeholder="Họ tên người nhận">
                            </div>
                            <div class="form-group label-floating">
                                <label class="control-label">Số điện thoại</label>
                                <input id="phone" type="text" name="phone" class="form-control"
                                    placeholder="Số điện thoại người nhận">
                            </div>
                            <div class="form-group label-floating">
                                <label class="control-label">Email</label>
                                <input id="e-email" type="email" name="email" class="form-control"
                                    placeholder="Điền chính xác email nếu có">
                            </div>
                            <div class="pull-right">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
                                <button type="button" class="btn btn-primary" data-dismiss="modal" style="background-color:#138edc; border-color:#138edc ">Gửi</button>
                            </div>
                            <div class="clearfix"></div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
@endsection

@push('scripts')
    <script>            
        window.onload = function (e) {
            setTimeout(function () {
                $('#modalInfo').modal('show');
            }, 60000);
        };
    </script>

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