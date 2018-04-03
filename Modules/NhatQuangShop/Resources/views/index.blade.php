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
            <div class="col-md-12">
                <div class="" style="display: flex;justify-content: space-between; align-items: stretch;">
                    <div style="display:flex;flex-grow:12; align-items: stretch">
                        <div class="flex-center search-icon">
                            <i class="fa fa-search" style="font-size: 32px" aria-hidden="true"></i>
                        </div>
                        <div style="flex-grow: 12" class="flex-center">
                            <input placeholder="Tìm kiếm"
                                   style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e"/>
                        </div>

                    </div>
                    {{--<div class="flex-center cursor-pointer" style="flex-wrap: wrap">--}}
                    {{--<div class="flex-center">--}}
                    {{--<div style="padding:20px">--}}
                    {{--<i class="fa fa-user-circle-o" style="font-size:32px" aria-hidden="true"></i>--}}
                    {{--</div>--}}
                    {{--<div>--}}
                    {{--Đăng nhập & Đăng ký tài khoản--}}
                    {{--</div>--}}
                    {{--<div >--}}
                    {{--<i class="fa fa-caret-down" aria-hidden="true"></i>--}}
                    {{--</div>--}}

                    {{--</div>--}}

                    {{--</div>--}}
                    {{--<div class="flex-center cursor-pointer">--}}
                    {{--<div style="padding-left:80px;">--}}
                    {{--<i class="fa fa-shopping-cart" style="font-size:32px" aria-hidden="true"></i>--}}
                    {{--</div>--}}
                    {{--</div>--}}
                </div>
            </div>
            <!--san pham noi bat-->
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
        <div class="row" style="background-color: #ffffff;">
            <div class="container">
                <div class="row" id="vuejs1">

        <?php use App\Good;$i = 0;$classes = array('col-md-6 padding-8', 'col-md-6 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8');?>
                    @foreach ($highLightGoods as $good)
<!--                        --><?php // $class = $classes[$i++ % 6]?>
                        {{--<div class="{{$class}}">--}}<div class="col-md-3">
        <div class="card card-product card-plain">
            <div class="card-image">

                <a href="/product/detail/{{$good['id']}}">
                    {{--<img src="{{ $good['avatar_url'] }}"--}}
                    {{--alt="Rounded Image" class="img-rounded img-responsive good-img">--}}
                    <div class="badge"><!-- react-text: 121 -->-<!-- /react-text --><!-- react-text: 122 -->50<!-- /react-text --><!-- react-text: 123 -->%<!-- /react-text --></div>
                    <div style="background: url({{ $good['avatar_url'] }});
                            background-repeat: no-repeat;background-position: center;background-size: auto 250px;
                            " class=" img-responsive good-img">

                    </div>
                </a>
                <div class="card-body" style="min-height: 0px">
                    <div class="card-description">
                        <h5 class="card-title">{{ $good['name'] }}</h5>
                        <p class="card-description">{{ $good['description'] }}</p>
                    </div>
                    <div class="price">
                        <strike>{{currency_vnd_format($good['price'])}}</strike>
                        <span class="text-danger">{{currency_vnd_format($good['price'])}}</span>
                    </div>
                </div>
                <div class="review" style="padding-top: 8px; padding-bottom:8px">
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center">
                        <div style="display: flex;font-size: 11px">
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p style="font-size: 11px">
                                (<span>2</span> nhận xét)
                            </p>
                        </div>
                    </div>



                </div>
                <div class="progress" style="height:5px">
                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
                        <span class="sr-only">70% Complete</span>
                    </div>
                </div>
                <div class="card-description" style="font-size:9px; color:#333333">
                    <span style="padding-right:30px">Deal còn lại: 70%</span>
                    <span>
                                            Kết thúc sau: <span style="box-sizing:border-box; color:#51cbce; font-weight:600"> 1 ngày 05:24:35 </span>
                                        </span>
                </div>

                {{--<div class="card-footer"--}}
                {{--style="display: flex; align-items: stretch; flex-direction: row-reverse">--}}
                {{--<div style="text-align:right">--}}
                {{--<a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-link"--}}
                {{--style="font-size: 12px;margin-bottom:5px;padding-left:0; padding-right:5px">--}}
                {{--Xem thêm--}}
                {{--</a>--}}
                {{--<button v-on:click="openModalBuy({{$good['id']}})"--}}
                {{--class="btn btn-move-right btn-link btn-success"--}}
                {{--style="font-size: 12px;margin-bottom:5px; padding-right:0; padding-left:5px">--}}
                {{--Đặt mua ngay--}}
                {{--<i class="nc-icon nc-minimal-right"></i>--}}
                {{--</button>--}}
                {{--</div>--}}
                {{--</div>--}}
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
                <div class="row" style="background-color: #ffffff;padding:8px 8px">

<!--                    --><?php //$i = 0;$classes = array('col-md-6 padding-8', 'col-md-6 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8');?>
                    @foreach ($newestGoods as $good)
<!--                        --><?php // $class = $classes[$i++ % 6]?>
                        {{--<div class="{{$class}}">--}}<div class="col-md-3">
        <div class="card card-product card-plain">
            <div class="card-image">

                <a href="/product/detail/{{$good['id']}}">
                    {{--<img src="{{ $good['avatar_url'] }}"--}}
                    {{--alt="Rounded Image" class="img-rounded img-responsive good-img">--}}
                    <div class="badge"><!-- react-text: 121 -->-<!-- /react-text --><!-- react-text: 122 -->50<!-- /react-text --><!-- react-text: 123 -->%<!-- /react-text --></div>
                    <div style="background: url({{ $good['avatar_url'] }});
                            background-repeat: no-repeat;background-position: center;background-size: auto 250px;
                            " class=" img-responsive good-img">

                    </div>
                </a>
                <div class="card-body" style="min-height: 0px">
                    <div class="card-description">
                        <h5 class="card-title">{{ $good['name'] }}</h5>
                        <p class="card-description">{{ $good['description'] }}</p>
                    </div>
                    <div class="price">
                        <strike>{{currency_vnd_format($good['price'])}}</strike>
                        <span class="text-danger">{{currency_vnd_format($good['price'])}}</span>
                    </div>
                </div>
                <div class="review" style="padding-top: 8px; padding-bottom:8px">
                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center">
                        <div style="display: flex;font-size: 11px">
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                            <i class="fa fa-star-o" aria-hidden="true"></i>
                        </div>
                        <div>
                            <p style="font-size: 11px">
                                (<span>2</span> nhận xét)
                            </p>
                        </div>
                    </div>



                </div>
                <div class="progress" style="height:5px">
                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
                        <span class="sr-only">70% Complete</span>
                    </div>
                </div>
                <div class="card-description" style="font-size:9px; color:#333333">
                    <span style="padding-right:30px">Deal còn lại: 70%</span>
                    <span>
                                            Kết thúc sau: <span style="box-sizing:border-box; color:#51cbce; font-weight:600"> 1 ngày 05:24:35 </span>
                                        </span>
                </div>

                {{--<div class="card-footer"--}}
                {{--style="display: flex; align-items: stretch; flex-direction: row-reverse">--}}
                {{--<div style="text-align:right">--}}
                {{--<a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-link"--}}
                {{--style="font-size: 12px;margin-bottom:5px;padding-left:0; padding-right:5px">--}}
                {{--Xem thêm--}}
                {{--</a>--}}
                {{--<button v-on:click="openModalBuy({{$good['id']}})"--}}
                {{--class="btn btn-move-right btn-link btn-success"--}}
                {{--style="font-size: 12px;margin-bottom:5px; padding-right:0; padding-left:5px">--}}
                {{--Đặt mua ngay--}}
                {{--<i class="nc-icon nc-minimal-right"></i>--}}
                {{--</button>--}}
                {{--</div>--}}
                {{--</div>--}}
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
    <?php $numbers = array("first");?>
    @foreach($categoryGoods as $categoryGood)
        <?php
        if ($categoryGood == $numbers[count($numbers) - 1]) {
            continue;
        }
        array_push($numbers, $categoryGood);
        echo count($numbers);
        $relateGoods = Good::where("good_category_id", "=", $categoryGood)->take(6)->get(); ?>
        <?php $categoryName = \App\GoodCategory::find($categoryGood)->name?>
        <div class="container">
            <div class="row" >
                <div class="col-md-6">
                    <div>
                        <div class="description">
                            <h1 class="medium-title">
                                {{$categoryName}}
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
        </div>

        <div class="container">
            <div class="row" style="background-color: #ffffff;padding:8px 8px">
<!--                --><?php //$i = 0;$classes = array('col-md-6 padding-8', 'col-md-6 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8');?>
                @foreach($relateGoods as $good)
<!--                    --><?php // $class = $classes[$i++ % 6]?>
{{--                    <div class="{{$class}}">--}}<div class="col-md-3">
                        <div class="card card-product card-plain">
                            <div class="card-image">

                                <a href="/product/detail/{{$good['id']}}">
                                    {{--<img src="{{ $good['avatar_url'] }}"--}}
                                    {{--alt="Rounded Image" class="img-rounded img-responsive good-img">--}}
                                    <div class="badge"><!-- react-text: 121 -->-<!-- /react-text --><!-- react-text: 122 -->50<!-- /react-text --><!-- react-text: 123 -->%<!-- /react-text --></div>
                                    <div style="background: url({{ $good['avatar_url'] }});
                                            background-repeat: no-repeat;background-position: center;background-size: auto 250px;
                                            " class=" img-responsive good-img">

                                    </div>
                                </a>
                                <div class="card-body" style="min-height: 0px">
                                    <div class="card-description">
                                        <h5 class="card-title">{{ $good['name'] }}</h5>
                                        <p class="card-description">{{ $good['description'] }}</p>
                                    </div>
                                    <div class="price">
                                        <strike>{{currency_vnd_format($good['price'])}}</strike>
                                        <span class="text-danger">{{currency_vnd_format($good['price'])}}</span>
                                    </div>
                                </div>
                                <div class="review" style="padding-top: 8px; padding-bottom:8px">
                                    <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center">
                                        <div style="display: flex;font-size: 11px">
                                            <i class="fa fa-star-o" aria-hidden="true"></i>
                                            <i class="fa fa-star-o" aria-hidden="true"></i>
                                            <i class="fa fa-star-o" aria-hidden="true"></i>
                                            <i class="fa fa-star-o" aria-hidden="true"></i>
                                            <i class="fa fa-star-o" aria-hidden="true"></i>
                                            <i class="fa fa-star-o" aria-hidden="true"></i>
                                        </div>
                                        <div>
                                            <p style="font-size: 11px">
                                                (<span>2</span> nhận xét)
                                            </p>
                                        </div>
                                    </div>



                                </div>
                                <div class="progress" style="height:5px">
                                    <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:70%">
                                        <span class="sr-only">70% Complete</span>
                                    </div>
                                </div>
                                <div class="card-description" style="font-size:9px; color:#333333">
                                    <span style="padding-right:30px">Deal còn lại: 70%</span>
                                    <span>
                                            Kết thúc sau: <span style="box-sizing:border-box; color:#51cbce; font-weight:600"> 1 ngày 05:24:35 </span>
                                        </span>
                                </div>

                                {{--<div class="card-footer"--}}
                                {{--style="display: flex; align-items: stretch; flex-direction: row-reverse">--}}
                                {{--<div style="text-align:right">--}}
                                {{--<a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-link"--}}
                                {{--style="font-size: 12px;margin-bottom:5px;padding-left:0; padding-right:5px">--}}
                                {{--Xem thêm--}}
                                {{--</a>--}}
                                {{--<button v-on:click="openModalBuy({{$good['id']}})"--}}
                                {{--class="btn btn-move-right btn-link btn-success"--}}
                                {{--style="font-size: 12px;margin-bottom:5px; padding-right:0; padding-left:5px">--}}
                                {{--Đặt mua ngay--}}
                                {{--<i class="nc-icon nc-minimal-right"></i>--}}
                                {{--</button>--}}
                                {{--</div>--}}
                                {{--</div>--}}
                            </div>
                        </div>
                    </div>

                @endforeach
            </div>
        </div>

    @endforeach
@endsection

<style>
    .carousel-item > img {
        width: 100%;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .search-icon {
        cursor: pointer;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        background-color: #dddddd;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .good-img {
        width: 100%;
        min-height: 250px;
        max-height: 260px;

    }

    .card-image {
        padding: 16px 20px !important;
        margin-bottom:20px !important;
    }

    .padding-8 {
        padding:8px !important;

    }
    .card.card-plain{
        margin-bottom:0;
    }
    .col-md-3{
        padding:0 !important;
    }
    .card-title {
        font-size: 13px !important;
    }
    .price {
        font-size:15px !important;
        margin-bottom:5px !important;
    }
    .badge {
        width: 40px;
        height: 40px;
        position: absolute;
        background: url(http://themusicianscircle.org/parts/circle.gif);
        background-size: contain;
        padding: 0;
        top:16px;
        left:20px;
        line-height: 30px !important;
        font-weight: 300;
        font-style: italic;
        z-index: 1;
        display: inline-block;
        min-width: 10px;
        color: #fff;
        vertical-align: middle;
        border-radius: 10px;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;

    }
</style>