<?php
namespace App\Colorme\Transformers;
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 7/30/16
 * Time: 18:00
 */
abstract class Transformer
{
    public function transformCollection($items)
    {
        return $items->map(function ($item) {
            return $this->transform($item);
        });
    }

    public abstract function transform($item);
}