@extends('nhatquangshop::layouts.manage')
@section('content')
    <div class="container" id="bookinfo">
        <br><br><br><br><br>
        <br><br>
        <div class="row">
            <div class="col-md-12 ">
                <div class="shadow">
                    <form action="/product/new/" method="get">
                        <input placeholder="Tìm kiếm" name="search"
                               style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e">
                    </form>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <div class="description">
                        <h1 class="medium-title">
                            Sản phẩm nổi bật<br>
                        </h1>
                    </div>
                    <br>
                </div>
            </div>
        </div>
        <div id="vuejs1" class="row">
            @if(count($products) == 0)
                <div class="col-md-12 text-center">
                    <h4 class="title"><strong>Tìm kiếm không có kết quả</strong></h4>
                    <h5>Xin lỗi, chúng tôi không thể tìm được kết quả hợp với tìm kiếm của bạn</h5>
                </div>
            @endif
            @foreach($products as $product)
                    <div class="col-md-4">
                        <div class="card card-product card-plain">
                            <div class="card-image">
                                <a href="/product/detail/{{$product['id']}}">
                                    <img style="width:100%;height:350px;" src="{{ $product['avatar_url'] }}" alt="Rounded Image" class="img-rounded img-responsive">
                                </a>
                                <div class="card-body" style="min-height: 150px">
                                    <div class="card-description">
                                        <h5 class="card-title">{{ $product['name'] }}</h5>
                                        <p class="card-description">{{ $product['description'] }}</p>
                                    </div>
                                    <div class="price">
                                        <strike>{{currency_vnd_format($product['price'])}}</strike>
                                        <span class="text-danger">{{currency_vnd_format($product['price'])}}</span>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <div style="text-align:right">
                                        <a href="/product/detail/{{$product['id']}}" class="btn btn-primary btn-link" style="font-size: 12px;margin-bottom:5px;">
                                            Xem thêm
                                        </a>
                                        <button v-on:click="openModalBuy({{$product['id']}})" class="btn btn-move-right btn-link btn-success" style="font-size: 12px;margin-bottom:5px">
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

        <br>
        <div class="col-md-12">
            {{$products->links()}}
        </div>
        <br><br>

        <style>
            .pagination {
                justify-content: center
            }
        </style>
    </div>
@endsection