@extends('nhatquangshop::layouts.master')

@section('content')


    {{--banner--}}
    <div style="margin-top:115px">
        {{--<div id="nav">--}}
        {{--<div id="nav1">--}}
        {{--nav1--}}
        {{--</div>--}}
        {{--<div id="nav2">--}}
        {{--nav2--}}
        {{--</div>--}}
        {{--</div>--}}
        {{--<div id="content">--}}
        {{--<div id="content1">--}}
        {{--cont1--}}
        {{--</div>--}}
        {{--<div id="content2">--}}
        {{--cont2--}}
        {{--</div>--}}
        {{--</div>--}}
        <div class="row">
            <div class="col-md-12 shadow-banner">
                <div class="">
                    <div class="row">
                        <div class="mr-auto ml-auto">
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
    {{--search--}}
    <div class="container">
        <div class="" style="display: flex;justify-content: space-between; align-items: stretch;">
            <div style="display:flex;flex-grow:12; align-items: stretch">
                <div class="flex-center search-icon" ; style="margin-top:0; margin-bottom:0">
                    <i class="fa fa-search" style="font-size: 20px" aria-hidden="true"></i>
                </div>
                <div style="flex-grow: 12" class="flex-center">
                    <form action="{{ url('search') }}" method="POST" role="search" class="flex-center"
                          style="margin:0; width:100%; ">
                        {{ csrf_field() }}

                        <input type="text" class="form-control" id="good_name" name="good_name" placeholder="Tìm kiếm"
                               style="border:none!important; font-size:20px;  color:#2e2e2e;padding:15px">


                    </form>
                    {{--<input placeholder="Tìm kiếm"--}}
                    {{--style="width:100%; border:none; font-size:20px; padding:15px; color:#2e2e2e"/>--}}
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
    <div class="container">
        <div class="row">
            {{--category--}}
            <div class="col-md-3" style="margin-top: 50px;">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">


                    <?php
                    use App\Good;function get_all_childs($parentId)
                    {
                        $results = array("-1");
                        $childs = \App\GoodCategory::where('parent_id', $parentId)->get();
                        foreach ($childs as $child) {
                            array_push($results, $child->id);
                        }

                        return $results;
                    }
                    ?>

                    @foreach($goodCategories as $goodCategory)
                        <div class="panel panel-default background-white">
                            <div class="panel-heading" style="margin-top:-30px" role="tab" id="headingOne">
                                <h4 class="panel-title">
                                    <a role="button" data-toggle="collapse" data-parent="#accordion"
                                       aria-expanded="true" aria-controls="collapseOne" style="padding:0">
                                        <a href="{{'/category/'.$goodCategory->id}}">
                                            {{$goodCategory->name}}
                                        </a>
                                    </a>
                                </h4>
                            </div>

                            <?php
                            $childsId = get_all_childs($goodCategory->id);

                            ?>

                            <div id="collapseOne" class="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingOne">
                                <div class="panel-body" style="display: flex; flex-direction: column">
                                    @foreach($childsId as $childId)
                                        @if($childId != "-1")
                                            <?php
                                            $child = \App\GoodCategory::find($childId);
                                            ?>
                                            <div>
                                                <a href="{{'/category/'.$childId}}">
                                                    <p style="padding-left:15px; font-size:16px">{{$child->name}}</p>
                                                </a>

                                            </div>
                                        @endif
                                    @endforeach
                                </div>
                            </div>

                        </div>
                    @endforeach

                </div>
            </div>

            {{--goods list--}}
            <div class="col-md-9">
                @if(!$results)
                    <div class="container" id="bookinfo">
                        <br>
                        <div class="row">
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
                        <div class="row" id="vuejs1" style="background-color: #ffffff;padding-top:8px">
                            <div class="container">
                                <div class="row">
                                    @include('nhatquangshop::common.products_show',['someGoods'=>$highLightGoods])
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
                        <div class="row" id="vuejs2" style="background-color: #ffffff;padding-top:8px">
                            <div class="container">
                                <div class="row">
                                    @include('nhatquangshop::common.products_show', ['someGoods'=>$newestGoods])
                                </div>
                            </div>
                        </div>
                        <br>
                        <br>
                    </div>
                    <!--                    --><?php //$numbers = array("first");?>
                    @foreach($goodCategories as $goodCategory)
                        <?php
                        //                        if ($goodCategory->id == $numbers[count($numbers) - 1]) {
                        //                            continue;
                        //                        }
                        //                        array_push($numbers, $goodCategory->id);
                        $relateGoods = Good::where("good_category_id", "=", $goodCategory->id)->take(6)->get(); ?>
                        @if(count($relateGoods)>0)
                            <div class="container">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div>
                                            <div class="description">
                                                <h1 class="medium-title">
                                                    {{$goodCategory->name}}
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
                                <div class="row" style="background-color: #ffffff;padding-top:8px">
                                    @include('nhatquangshop::common.products_show', ['someGoods' => $relateGoods])
                                </div>
                            </div>
                        @endif
                    @endforeach
                @else
                        <div class="container" style="margin-top: 40px">
                            <div style="padding:20px; ">
                                <p>
                                    <span style="font-weight: 500;font-size:32px">{{$good_name}}:</span>
                                <span style="font-weight: 400; padding-left:20px;">
                                    {{count($results)}}
                                </span>
                                    <span style="font-color: #888888">kết quả</span>
                                </p>
                            </div>
                            <div class="row" style="background-color: #ffffff;padding-top:8px">
                                @include('nhatquangshop::common.products_show', ['someGoods' => $results])
                            </div>
                        </div>
                @endif
            </div>
        </div>

    </div>
@endsection

<style>
    .background-white {
        background-color: white;
    }

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
        margin-bottom: 20px !important;
    }

    .padding-8 {
        padding: 8px !important;

    }

    .card.card-plain {
        margin-bottom: 0;
    }

    .col-md-3 {
        padding: 0 !important;
    }

    .card-title {
        font-size: 13px !important;
        min-height: 36px
    }

    .price {
        font-size: 15px !important;
        margin-bottom: 5px !important;
    }

    .badge {
        width: 40px;
        height: 40px;
        position: absolute;
        background: url(http://themusicianscircle.org/parts/circle.gif);
        background-size: contain;
        padding: 0;
        top: 16px;
        left: 20px;
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

    .display-none {
        display: none;
    }
</style>

@push('scripts')
    <script>
        $(".panel-heading").parent('.panel').hover(
            function () {
                $(this).children('.collapse').collapse('show');
            }, function () {
                $(this).children('.collapse').collapse('hide');
            }
        );
    </script>
@endpush