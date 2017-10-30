<?php
/**
 * Created by PhpStorm.
 * User: caoquan
 * Date: 10/11/17
 * Time: 2:43 PM
 */

namespace Modules\Good\Repositories;


use App\Project;
use Modules\Good\Entities\GoodProperty;
use Modules\Good\Entities\GoodPropertyItem;

class GoodRepository
{
    public function getPropertyItems($type)
    {
        $goodPropertyItems = GoodPropertyItem::where("type", $type)->orderBy("name")->get()->map(function ($item) {
            return [
                "label" => $item->name,
                "value" => $item->name,
                "id" => $item->id
            ];
        });
        return $goodPropertyItems;
    }

    public function getProjectBoards($type)
    {
        $project = Project::where("status", $type)->first();
        return $project->boards()->where("status", "open")->get()->map(function ($board) {
            return [
                "id" => $board->id,
                "title" => $board->title,
                "label" => $board->title,
                "value" => $board->id
            ];
        });
    }

    public function saveGoodProperties($goodProperties, $goodId)
    {


        foreach ($goodProperties as $property) {
            GoodProperty::where("good_id", $goodId)->where("name", $property->name)->delete();
            $goodProperty = new GoodProperty();
            $goodProperty->name = $property->name;
            $goodProperty->value = $property->value;
            $goodProperty->good_id = $goodId;
            $goodProperty->save();
        }
    }
}