@extends('nhatquangshop::layouts.master')

@section('content')
    {{--banner--}}
    <div style="margin-top:120px">
        <div class="row">
            <div class="col-md-12 shadow-banner">
                <div class="">
                    <div class="row">
                        <div class="ml-auto mr-auto">
                            <div class="card card-raised page-carousel">
                                <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                                    <ol class="carousel-indicators">
                                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class=""></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="1"
                                            class="active"></li>
                                        <li data-target="#carouselExampleIndicators" data-slide-to="2" class=""></li>
                                    </ol>
                                    <div class="carousel-inner" role="listbox">
                                        <div class="carousel-item">
                                            <img class="d-block img-fluid"
                                                 src="https://vcdn.tikicdn.com/ts/banner/34/57/e0/4cccc9504f0304db48f59e2a5d5578b9.jpg"
                                                 alt="First slide">
                                            <div class="carousel-caption d-none d-md-block">
                                                <p>Somewhere</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item active">
                                            <img class="d-block img-fluid"
                                                 src="https://vcdn.tikicdn.com/ts/banner/34/57/e0/4cccc9504f0304db48f59e2a5d5578b9.jpg"
                                                 alt="Second slide">
                                            <div class="carousel-caption d-none d-md-block">
                                                <p>Somewhere else</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block img-fluid"
                                                 src="https://vcdn.tikicdn.com/ts/banner/34/57/e0/4cccc9504f0304db48f59e2a5d5578b9.jpg"
                                                 alt="Third slide">
                                            <div class="carousel-caption d-none d-md-block">
                                                <p>Here it is</p>
                                            </div>
                                        </div>
                                    </div>

                                    <a class="left carousel-control carousel-control-prev"
                                       href="#carouselExampleIndicators" role="button" data-slide="prev">
                                        <span class="fa fa-angle-left"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                    <a class="right carousel-control carousel-control-next"
                                       href="#carouselExampleIndicators" role="button" data-slide="next">
                                        <span class="fa fa-angle-right"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container" id="bookinfo">
        <br>
        <div class="row">
            <!--thanh search-->
            <div class="col-md-12 row ">
                <div class="shadow" style="display: flex;justify-content: space-between;">
                    <div>
                        <img src="http://www.nhatquangshop.vn/themes/giaodienweb/images/lo-go.png" height="40px">
                    </div>
                    <div style="flex-grow:8 ">
                        <input placeholder="Tìm kiếm"
                               style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e"/>
                    </div>
                    <div>
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <span>
                            Đăng nhập & Đăng ký tài khoản
                        </span>
                        <i class="fa fa-caret-down" aria-hidden="true"></i>
                    </div>
                    <div>
                        <div>
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật
                            <br>
                        </h1>
                        <br>
                        <a href="/product/feature" class="btn btn-link btn-success"
                           style="padding:0!important; margin:0!important">Xem tất cả
                            <i class="fa fa-angle-right"></i>
                        </a>
                    </div>
                    <br>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="container">
                <div class="row" id="vuejs1">
                    @foreach ($highLightGoods as $good)
                        <div class="col-md-4">
                            <div class="card card-product card-plain">
                                <div class="card-image">
                                    <a href="/product/detail/{{$good['id']}}">
                                        <img style="width:100%;height:350px;" src="{{ $good['avatar_url'] }}"
                                             alt="Rounded Image" class="img-rounded img-responsive">
                                    </a>
                                    <div class="card-body" style="min-height: 150px">
                                        <div class="card-description">
                                            <h5 class="card-title">{{ $good['name'] }}</h5>
                                            <p class="card-description">{{ $good['description'] }}</p>
                                        </div>
                                        <div class="price">
                                            <strike>{{currency_vnd_format($good['price'])}}</strike>
                                            <span class="text-danger">{{currency_vnd_format($good['price'])}}</span>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div style="text-align:right">
                                            <a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-link"
                                               style="font-size: 12px;margin-bottom:5px;">
                                                Xem thêm
                                            </a>
                                            <button v-on:click="openModalBuy({{$good['id']}})"
                                                    class="btn btn-move-right btn-link btn-success"
                                                    style="font-size: 12px;margin-bottom:5px">
                                                Đặt mua ngay
                                                <i class="nc-icon nc-minimal-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <br>
        <br>
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
        <br>
        <br>
        <div class="row">
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm mới nhất
                            <br>
                        </h1>
                        <br>
                        <a href="/product/new" class="btn btn-link btn-success"
                           style="padding:0!important; margin:0!important">Xem tất cả
                            <i class="fa fa-angle-right"></i>
                        </a>
                        <br>
                        <br>
                    </div>
                    <br>
                </div>
            </div>
        </div>
        <div class="row" id="vuejs2">
            <div class="container">
                <div class="row">
                    @foreach ($newestGoods as $good)
                        <div class="col-md-4">
                            <div class="card card-product card-plain">
                                <div class="card-image">
                                    <a href="/product/detail/{{$good['id']}}">
                                        <img style="width:100%;height:350px;" src="{{ $good['avatar_url'] }}"
                                             alt="Rounded Image" class="img-rounded img-responsive">
                                    </a>
                                    <div class="card-body" style="min-height: 150px">
                                        <div class="card-description">
                                            <h5 class="card-title">{{ $good['name'] }}</h5>
                                            <p class="card-description">{{ $good['description'] }}</p>
                                        </div>
                                        <div class="price">
                                        <!-- <strike>{{currency_vnd_format($good['price'])}}</strike> -->
                                            <span class="text-danger">{{currency_vnd_format($good['price'])}}</span>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div style="text-align:right">
                                            <a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-link"
                                               style="font-size: 12px;margin-bottom:5px;">
                                                Xem thêm
                                            </a>
                                            <button v-on:click="openModalBuy({{$good['id']}})"
                                                    class="btn btn-move-right btn-link btn-success"
                                                    style="font-size: 12px;margin-bottom:5px">
                                                Đặt mua ngay
                                                <i class="nc-icon nc-minimal-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
        <br>
        <br>
    </div>
@endsection

<style>
    .carousel-item > img {
        width: 100%;
    }
</style>