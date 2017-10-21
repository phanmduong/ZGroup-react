<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Modules\Good\Entities\GoodProperty;

class Good extends Model
{
    public static $GOOD_TYPE = [
        "book" => "Sách",
        "fashion" => "Thời trang",
        "" => "Không xác định"
    ];

    protected $table = "goods";

    use SoftDeletes;

    public function orders()
    {
        return $this->hasMany('App\Order', 'good_id');
    }

    public function importedGoods()
    {
        return $this->hasMany('App\ImportedGoods', 'good_id');
    }

    public function goodWarehouse()
    {
        return $this->hasMany('App\GoodWarehouse', 'good_id');
    }
    public function Warehouses()
    {
        return $this->hasMany('App\Warehouse', 'good_id');
    }
    public function properties()
    {
        return $this->hasMany(GoodProperty::class, "good_id");
    }

    public function files()
    {
        return $this->belongsToMany(File::class, "file_good", "good_id", "file_id");
    }

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'coupon_good', 'good_id','coupon_id');
    }

    public function transform()
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "created_at" => format_vn_short_datetime(strtotime($this->created_at)),
            "updated_at" => format_vn_short_datetime(strtotime($this->updated_at)),
            "price" => $this->price,
            "description" => $this->description,
            'type' => $this->type,
            "avatar_url" => $this->avatar_url,
            "cover_url" => $this->cover_url,
            "code" => $this->code,
            "files" => $this->files->map(function ($file) {
                return $file->transform();
            }),
            "properties" => $this->properties->map(function ($property) {
                return $property->transform();
            })
        ];
    }
    public function GoodTransform(){
        $manufacture = Manufacture::find($this->manufacture_id);
        $category = GoodCategory::find($this->good_category_id);
        $total= $this->id;
        return[
            "id" => $this->id,
            "name" => $this->name,
            "code" => $this->code,
            "price" => $this->price,
            'quantity' => $this->importedGoods->reduce(function ($total, $importedGood){
                return $total +  $importedGood->quantity;
            }, $total),
            "manufacture" => [
                "id" => $manufacture ? $manufacture->id :null ,
                "name" => $manufacture ? $manufacture->name :null ,
            ],
            "category" => [
                "id" => $category ? $category->id :null ,
                "name" => $category ? $category->name :null ,
            ],
            "warehouses" =>$this->Warehouse ? $this->Warehouse->map(function ($warehouse) {
                    return $warehouse->Transform();
            }) : null,

        ];
    }
    public function editTranform(){
        $manufacture = Manufacture::find($this->manufacture_id);
        $category = GoodCategory::find($this->good_category_id);
        $total= $this->id;
        return[
            "id" => $this->id,
            "name" => $this->name,
            "code" => $this->code,
            "price" => $this->price,
            'quantity' => $this->importedGoods->reduce(function ($total, $importedGood){
                return $total +  $importedGood->quantity;
            }, $total),
            "manufacture" => [
                "id" => $manufacture ? $manufacture->id :null ,
                "name" => $manufacture ? $manufacture->name :null ,
            ],
            "category" => [
                "id" => $category ? $category->id :null ,
                "name" => $category ? $category->name :null ,
            ],


        ];
    }
}

