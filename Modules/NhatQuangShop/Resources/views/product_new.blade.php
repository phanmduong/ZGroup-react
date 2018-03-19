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
                            Sản phẩm mới<br>
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
                <div class="col-md-3">
                    <div class="card card-profile" style="border-radius: 0px;">
                        <div style="padding: 3%;">
                            <div style="background-image: url({{$product->avatar_url}}); background-size: cover; padding-bottom: 120%; width: 100%; background-position: center center;"></div>
                        </div>
                        <div>
                            <div class="container text-left" style="min-height: 130px;"><br>
                                <p style="font-weight: 600;">{{$product->name}}</p> <h6><b
                                            style="text-decoration: line-through;">{{$product->price}}</b>
                                    <i class="fa fa-angle-right"></i>{{$product->price}}
                                    <a href="#pablo" class="btn btn-danger"
                                       style="padding: 3px; margin: 3px; font-size: 10px;"></a></h6><br></div>
                        </div>
                        <div class="card-footer" style="border-top: 1px solid rgb(220, 219, 219) !important;">
                            <div style="text-align: right;">
                                <a href="detail/{{$product->id}}"
                                   class="btn btn-link btn-success"
                                   style="padding: 3px; margin: 3px; font-size: 10px;">
                                    Xem thêm
                                </a>
                                <button v-on:click="openModalBuy({{$product->id}})" class="btn btn-success"
                                        style="padding: 3px; margin: 3px; font-size: 10px;">
                                    Đặt mua ngay <i class="fa fa-angle-right"></i></button>
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