<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


use App\Good;
use App\ImportedGoods;
use App\Warehouse;
use Illuminate\Support\Facades\DB;

class GoodImportTransformer extends Transformer
{
    public function __construct()
    {
    }

    public function transform($good)
    {
        $goods_count = Good::where('code', $good->code)->count();
        $data = $good->transform();
        $import_price = ImportedGoods::where('good_id', $good->id)->orderBy('created_at', 'desc')->first();
        $import_price = $import_price ? $import_price->import_price : 0;
        $warehouses_count = ImportedGoods::where('good_id', $good->id)
            ->where('quantity', '>', 0)->select(DB::raw('count(DISTINCT warehouse_id) as count'))->first();
        $data['warehouses_count'] = $warehouses_count->count;
        $data['goods_count'] = $goods_count;
        $data['import_price'] = $import_price;

        if ($goods_count > 1) {
            $data['name'] .= ' ';
            foreach ($good->properties as $property) {
                $data['name'] = $data['name'] . "- " . $property->name . " " . $property->value;
            };
        }
        return $data;
    }
}