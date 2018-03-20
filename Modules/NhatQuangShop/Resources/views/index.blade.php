@extends('nhatquangshop::layouts.master')

@section('content')
<div class="container" id="bookinfo">
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="row">
        <div class="col-md-12 shadow-banner">
            <img src="https://vcdn.tikicdn.com/ts/banner/2c/a9/0b/0aafdcf86dc4a35b01e4ce4748b7db8a.jpg" width="100%" />
        </div>
    </div>
    <br>
    <br>
    <div class="row">
        <div class="col-md-12 ">
            <div class="shadow">
                <input placeholder="Tìm kiếm" style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e" />
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
                    <a href="/product/feature" class="btn btn-link btn-success" style="padding:0!important; margin:0!important">Xem tất cả
                        <i class="fa fa-angle-right"></i>
                    </a>
                </div>
                <br>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="container">
            <div class="row">
                @foreach ($highLightGoods as $good)
                <div class="col-md-4">
                    <div class="card card-product card-plain">
                        <div class="card-image">
                            <a href="/product/detail/{{$good['id']}}">
                                <img style="width:100%;height:350px;" src="{{ $good['avatar_url'] }}" alt="Rounded Image" class="img-rounded img-responsive">
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
                                    <a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-round" style="font-size: 10px;margin-bottom:5px;">
                                        Xem thêm
                                    </a>
                                    <button v-on:click="openModalBuy({{$good['id']}})" class="btn btn-move-right btn-round" style="font-size: 10px;margin-bottom:5px">
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
    {{--
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
                            <a href="#pablo" class="btn btn-danger" style="padding:3px;margin:3px;font-size:10px;">

                            </a>
                        </h6>
                        <br>
                    </div>

                </div>
                <div class="card-footer" style="border-top: 1px solid #dcdbdb!important;">
                    <div style="text-align:right">
                        <a href="/product/detail/{{$good['id']}}" class="btn btn-info btn-round" style="padding:3px;margin:3px;font-size:10px;">
                            Xem thêm
                        </a>
                        <button v-on:click="openModalBuy({{$good['id']}})" class="btn btn-move-right btn-round" style="padding:3px;margin:3px;font-size:10px;">
                            Đặt mua ngay
                            <i class="fa fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
    </div> --}}
    <br>
    <br>
</div>
<div class="container">
    <div class="row">
        <div class="col-md-12 shadow-banner">
            <img src="https://vcdn.tikicdn.com/ts/banner/34/57/e0/4cccc9504f0304db48f59e2a5d5578b9.jpg" width="100%" />
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
                    <a href="/product/new" class="btn btn-link btn-success" style="padding:0!important; margin:0!important">Xem tất cả
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
                                    <img style="width:100%;height:350px;" src="{{ $good['avatar_url'] }}" alt="Rounded Image" class="img-rounded img-responsive">
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
                                        <a href="/product/detail/{{$good['id']}}" class="btn btn-primary btn-round" style="font-size: 10px;margin-bottom:5px;">
                                            Xem thêm
                                        </a>
                                        <button v-on:click="openModalBuy({{$good['id']}})" class="btn btn-move-right btn-round" style="font-size: 10px;margin-bottom:5px">
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