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

    <div class="blog-4" style="margin-top:150px" id="books">
        <!-- <div class="container">
            <div class="description">
            <div style="display: flex; flex-direction: row; align-items: center" id="search-blog">
                <input autocomplete="off" placeholder="Tìm kiếm" id="search-category"
                       style="width:100%; padding:20px; margin:15px 0 15px 0; border:none; font-size:15px"
                       type="text" value=""/>
                <div class="dropdown">
                    <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                            style="height: 62px;
                                background-color: #138edc!important;
                                color: white;
                                border-color: #138edc!important;
                                text-align: right;
                                border-radius: 0px;
                        ">
                        Test
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-right"
                        style="background: white; overflow: scroll; box-shadow: 0 6px 10px -4px rgba(0, 0, 0, 0.15);border-radius: 0px!important;">
                        <a class="dropdown-item"
                           style="padding: 10px 15px!important; border-radius: 0px!important;">
                            {{--@if($type)--}}
                                {{--{!! $type_name !!}--}}
                            {{--@else--}}
                                {{--Tất cả--}}
                            {{--@endif--}}
                            Tất cả
                        </a>
                        @foreach($course_categories as $category)
                        <a href="'/all-books?search='+search+'&type={{$category->id}}'" class="dropdown-item"
                           style="padding: 10px 15px!important; border-radius: 0px!important;">
                            {{$category->name}}
                        </a>
                        @endforeach
                    </ul>
                </div>
            </div>
        </div> -->
            <div class="description">
                <h1 class="medium-title">
                    Giáo trình<br>
                </h1>
            </div>
            <div class="row" id="category">
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
            <br>
            <br>
        </div>
    </div>
@endsection


@push('scripts')
    <script type="text/javascript">
        $('#search-category').on('keyup', function(){
            $value = $(this).val();
            console.log($value);
            $.ajax({
                type: 'get',
                url: '{{ url('category/search') }}',
                data: {'searchCategory': $value},
                success: function(data){
                    console.log(data);
                    $('#category').html(data);
                    // if($value === '') $('#category').remove();
                },
            });
        });
    </script>
    <script type="text/javascript">
        $.ajaxSetup({ headers: { 'csrftoken' : '{{ csrf_token() }}' } });
    </script>
@endpush