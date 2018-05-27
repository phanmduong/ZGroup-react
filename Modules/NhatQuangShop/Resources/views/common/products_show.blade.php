<!--                    --><?php //$i = 0;$classes = array('col-md-6 padding-8', 'col-md-6 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8', 'col-md-3 padding-8');?>

    @foreach ($someGoods as $good)
        <!--                        --><?php // $class = $classes[$i++ % 6]?>
        {{--<div class="{{$class}}">--}}
        <div class="col-md-3 col-xs-12 col-sm-4">
            <div class="card card-product card-plain">
                <div class="card-image">

                    <a href="/product/detail/{{$good['id']}}">
                        {{--<img src="{{ $good['avatar_url'] }}"--}}
                        {{--alt="Rounded Image" class="img-rounded img-responsive good-img">--}}
                        <div class="badge"><!-- react-text: 121 -->-<!-- /react-text --><!-- react-text: 122 -->50
                            <!-- /react-text --><!-- react-text: 123 -->%<!-- /react-text --></div>
                        <div style="background: url({{ $good['avatar_url'] }});
                                background-repeat: no-repeat;background-position: center;background-size: auto   250px; width: 100%;
                                min-height: 250px;
                                max-height: 260px;" class=" img-responsive good-img">

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
                    <div class="progress" style="height:3px">
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0"
                             aria-valuemax="100"
                             style="width:70%;background-color:#DDDDDD!important;">
                            <span class="sr-only">70% Complete</span>
                        </div>
                    </div>
                    <div class="card-description" style="font-size:9px; color:#333333">
                        <span style="padding-right:30px">Deal còn lại: 70%</span>
                        <span>
                                            Kết thúc sau: <span
                                    style="box-sizing:border-box; color:#51cbce; font-weight:600"> 1 ngày 05:24:35 </span>
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

<style>
    .good-img {

    }
</style>