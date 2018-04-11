@extends('nhatquangshop::layouts.master')

@section('content')
    <?php
    function get_all_childs($parentId)
    {
        $results = array("-1");
        $childs = \App\GoodCategory::where('parent_id', $parentId)->get();
        foreach ($childs as $child) {
            array_push($results, $child->id);
        }

        return $results;
    }
    //check last gen
    function check($id)
    {
        return (count(get_all_childs($id)) > 1) ? false : true;
    }

    function get_all_gens($id)
    {
        if (check($id) == false) {
            $temps = get_all_childs($id);
            $tempsX = array($id);
            for ($i = 1; $i < count($temps); $i++) {
                $tempsXX = array();
                $tempsXX = get_all_gens($temps[$i]);
                $tempsX = array_merge($tempsX,$tempsXX);
            }
            return $tempsX;
        }
        else {
            return array($id);
        }
    }
    ?>
    <?php
        $gen_ids = get_all_childs(12);
        dd($gen_ids);
    ?>
    @foreach($gen_ids as $gen_id)
        <?php $goods = \App\Good::where("good_category_id", $gen_id)->get();?>
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
                        @include('nhatquangshop::common.products_show', ['someGoods'=>$goods])
                    </div>
                </div>
            </div>
            <br>
            <br>
        </div>
    @endforeach
@endsection