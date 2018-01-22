@extends('nhatquangshop::layouts.master')
@section('content')
    <div class="container" id="bookinfo">
        <br><br><br><br><br>
        <div class="row">
            <div class="col-md-12 shadow-banner">
                <img src="https://vcdn.tikicdn.com/ts/banner/2c/a9/0b/0aafdcf86dc4a35b01e4ce4748b7db8a.jpg"
                     width="100%"/>
            </div>
        </div>
        <br><br>
        <div class="row">
            <div class="col-md-12 ">
                <div class="shadow">
                    <input placeholder="Tìm kiếm"
                           style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e"/>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật<br>
                        </h1>
                        <br><a href="/product/feature" class="btn btn-link btn-success"
                               style="padding:0!important; margin:0!important">Xem tất cả <i
                                    class="fa fa-angle-right"></i></a>
                    </div>
                    <br>
                </div>
            </div>
        </div>
        <div class="row" id="vuejs1">
            @foreach($highLightGoods as $good)
                <div class="col-md-3">
                    <div class="card card-profile" style="border-radius:0;">
                        <div style="padding:3%">
                            <div style="background-image: url({{$good['avatar_url']}});
                                    background-size:cover; padding-bottom: 120%; width: 100%;
                                    background-position: center center;">
                            </div>
                        </div>
                        <div>
                            <div class="container text-left" style="min-height:130px">
                                <br>
                                <p style="font-weight:600">{{$good['name']}}</p>
                                <h6>
                                    <b style="text-decoration: line-through;">{{currency_vnd_format($good['price'])}}</b>
                                    <i class="fa fa-angle-right"></i>{{currency_vnd_format($good['price'])}}
                                    <a href="#pablo" class="btn btn-danger"
                                       style="padding:3px;margin:3px;font-size:10px;">

                                    </a>
                                </h6><br>
                            </div>

                        </div>
                        <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                            <div style="text-align:right">
                                <a href="http://graphics.vn/book/{{$good['id']}}" class="btn btn-link btn-success"
                                   style="padding:3px;margin:3px;font-size:10px;">
                                    Xem thêm
                                </a>
                                <button v-on:click="openModalBuy({{$good['id']}})"
                                        class="btn btn-success" style="padding:3px;margin:3px;font-size:10px;">
                                    Đặt mua ngay <i class="fa fa-angle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <br><br>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12 shadow-banner">
                <img src="https://vcdn.tikicdn.com/ts/banner/34/57/e0/4cccc9504f0304db48f59e2a5d5578b9.jpg"
                     width="100%"/>
            </div>
        </div>
    </div>
    <div class="container" id="bookinfo1">
        <br><br>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm mới nhất<br>
                        </h1>
                        <br><a href="/product/new" class="btn btn-link btn-success"
                               style="padding:0!important; margin:0!important">Xem tất cả <i
                                    class="fa fa-angle-right"></i></a><br><br>
                    </div>
                    <br>
                </div>

            </div>

        </div>
        <div class="row" id="vuejs2">
            @foreach($newestGoods as $good)
                <div class="col-md-6 book-item">
                    <div class="card card-profile" style="border-radius:0; height: 90%">
                        <div class="flex flex-col flex-justify-content-space-between" style="height: 100%">
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="card card-profile card-plain">
                                            <img class="card-book-image" src="{{$good['avatar_url']}}">
                                        </div>
                                    </div>
                                    <div class="col-md-8 text-left">
                                        <br>
                                        <h5 style="font-weight:600">{{$good['name']}}</h5>
                                        {{--                                        <h6>{{$good['short_description']}}</h6><br>--}}
                                        <p>{{$good['description']}}</p>
                                        <h5>{{currency_vnd_format($good['price'])}}</h5><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                            <div style="display:flex;flex-direction:row-reverse;justify-content:space-between;">
                                <div>
                                    <a href="http://graphics.vn/book/{{$good['id']}}" class="btn btn-link btn-success">
                                        Xem thêm</a>
                                    <button v-on:click="openModalBuy({{$good['id']}})"
                                            class="btn btn-sm btn-success">
                                        Đặt mua ngay <i class="fa fa-angle-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <br><br>
    </div>


@endsection
