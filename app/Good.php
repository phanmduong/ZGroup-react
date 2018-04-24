<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Book\Entities\Barcode;
use Modules\Good\Entities\GoodProperty;

class Good extends Model
{
    public static $GOOD_TYPE = [
        'book' => 'Sách',
        'fashion' => 'Thời trang',
        '' => 'Không xác định'
    ];

    protected $table = 'goods';

    use SoftDeletes;

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'good_order', 'good_id', 'order_id');
    }

    public function importedGoods()
    {
        return $this->hasMany('App\ImportedGoods', 'good_id');
    }

    public function history()
    {
        return $this->hasMany(HistoryGood::class, 'good_id');
    }

    public function goodWarehouse()
    {
        return $this->hasMany('App\GoodWarehouse', 'good_id');
    }

    public function barcode()
    {
        return $this->hasOne(Barcode::class, "good_id");
    }

    public function warehouses()
    {
        return $this->belongsToMany(Warehouse::class, 'good_warehouse', 'good_id', 'warehouse_id');
    }
    public function zHistoryGood(){
        return $this->hasMany(ZHistoryGood::class,'good_id');
    }
    public function properties()
    {
        return $this->hasMany(GoodProperty::class, 'good_id')
            ->where('name', '<>', 'images_url')
            ->where('name', '<>', 'child_images_url');
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'file_good', 'good_id', 'file_id');
    }

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'coupon_good', 'good_id', 'coupon_id');
    }

    public function goodCategory()
    {
        return $this->belongsTo(GoodCategory::class, 'good_category_id');
    }

    public function manufacture()
    {
        return $this->belongsTo(Manufacture::class, 'manufacture_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function cards()
    {
        return $this->hasMany(Card::class, "good_id");
    }

    public function parentGood()
    {
        return $this->belongsTo(Good::class, "parent_id");
    }

    public function getData()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'updated_at' => format_vn_short_datetime(strtotime($this->updated_at)),
            'price' => $this->price,
            'sale_status' => $this->sale_status,
            'display_status' => $this->display_status,
            'highlight_status' => $this->highlight_status,
            'good_category_id' => $this->good_category_id,
            'manufacture_id' => $this->manufacture_id,
            'description' => $this->description,
            'download' => $this->download,
            'type' => $this->type,
            'avatar_url' => $this->avatar_url,
            'cover_url' => $this->cover_url,
            'code' => $this->code,
            'barcode' => $this->barcode,
        ];

        if ($this->goodCategory)
            $data['category'] = [
                'id' => $this->goodCategory->id,
                'name' => $this->goodCategory->name,
            ];
        if ($this->manufacture)
            $data['manufacture'] = [
                'id' => $this->manufacture->id,
                'name' => $this->manufacture->name,
            ];

        return $data;
    }

    public function transform()
    {
        $data = $this->getData();
        $data['quantity'] = $this->importedGoods()->where('status', '<>', 'uncompleted')->get()->reduce(function ($total, $importedGood) {
            return $total + $importedGood->quantity;
        }, 0);
        $data['files'] = $this->files->map(function ($file) {
            return $file->transform();
        });
        $data['properties'] = $this->properties->map(function ($property) {
            return $property->transform();
        });
        return $data;
    }

    public function goodProcessTransform()
    {
        $data = $this->getData();
        $data['files'] = $this->files->map(function ($file) {
            return $file->transform();
        });


        $goodProperties = [];
        foreach ($this->properties as $property) {
            $goodProperties[$property->name] = $property->value;
        }

        $cards = [];
        foreach ($this->cards as $card) {
            $cardData = [
                "id" => $card->id,
                "title" => $card->title
            ];
            $taskLists = $card->taskLists;
            $taskListsData = [];
            foreach ($taskLists as $taskList) {
                if ($taskList) {
                    $taskListData = [
                        "id" => $taskList->id,
                        "title" => $taskList->title
                    ];
                    $tasks = [];
                    foreach ($taskList->tasks()->orderBy("order")->get() as $task) {
                        $taskData = [
                            "id" => $task->id,
                            "title" => $task->title
                        ];
                        $properties = [];
                        foreach ($task->goodPropertyItems as $property) {
                            if (array_key_exists($property->name, $goodProperties)) {
                                $properties[] = [
                                    "name" => $property->name,
                                    "value" => $goodProperties[$property->name]
                                ];
                            } else {
                                $properties[] = [
                                    "name" => $property->name,
                                    "value" => ""
                                ];
                            }
                        }
                        $taskData["properties"] = $properties;
                        $tasks[] = $taskData;
                    }
                    $taskListData["tasks"] = $tasks;
                    $taskListsData[] = $taskListData;
                }
            }
            $cardData["taskLists"] = $taskListsData;
            $cards[] = $cardData;
        }
        $data["cards"] = $cards;
        $data['properties'] = $this->properties->map(function ($property) {
            return $property->transform();
        });
        return $data;
    }

    public function GoodTransform()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'avatar_url' => $this->avatar_url ? $this->avatar_url : 'http://d1j8r0kxyu9tj8.cloudfront.net/files/1508648234aLyIi5Rfl4fVn6o.png',
            'price' => $this->price,
            'quantity' => $this->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity;
            }, 0),
        ];
        if ($this->warehouses)
            $data['warehouses'] = $this->warehouses->map(function ($warehouse) {
                return $warehouse->Transform();
            });
        if ($this->manufacture)
            $data['manufacture'] = [
                'id' => $this->manufacture->id,
                'name' => $this->manufacture->name,
            ];
        if ($this->category)
            $data['category'] = [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ];
        return $data;
    }

    public function editTranform()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'price' => $this->price,
            'quantity' => $this->importedGoods->reduce(function ($total, $importedGood) {
                return $total + $importedGood->quantity;
            }, 0),
        ];
        if ($this->manufacture)
            $data['manufacture'] = [
                'id' => $this->manufacture->id,
                'name' => $this->manufacture->name,
            ];
        if ($this->category)
            $data['category'] = [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ];
        return $data;
    }

    public function transformAllProperties() {
        $properties = GoodProperty::where('good_id', $this->id)->get();
        $goodData = [
            'id' => $this->id,
            'cover' => $this->cover_url,
            'avatar' => $this->avatar_url,
            'type' => $this->type,
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price
        ];
        foreach ($properties as $property) {
            $goodData[$property->name] = $property->value;
        }
        return $goodData;
    }
}

