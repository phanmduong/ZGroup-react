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
                $tempsX = array_merge($tempsX, $tempsXX);
            }
            return $tempsX;
        } else {
            return array($id);
        }
    }
    ?>
    <?php
    $gen_ids = get_all_gens($id);
    ?>
    <div class="container">
        <div class="description" style="padding-top:100px">
            <h1 class="medium-title">
                <?php $goodCategory = \App\GoodCategory::find($id)?>
                {{{$goodCategory->name}}}
                <br>
            </h1>
            <br>
        </div>
    </div>

    <div>
        @foreach($gen_ids as $gen_id)
            <?php $goods = \App\Good::where("good_category_id", $gen_id)->get();?>
            @if(count($goods)>0)
                <div class="container" id="bookinfo1">
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
            @endif
        @endforeach
    </div>

@endsection

