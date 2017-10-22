<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
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

    public function warehouses()
    {
        return $this->belongsToMany(Warehouse::class, 'good_warehouse','good_id','warehouse_id');
    }

    public function properties()
    {
        return $this->hasMany(GoodProperty::class, 'good_id');
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'file_good', 'good_id', 'file_id');
    }

    public function coupons()
    {
        return $this->belongsToMany(Coupon::class, 'coupon_good', 'good_id', 'coupon_id');
    }

    public function manufacture()
    {
        return $this->belongsTo(Manufacture::class, 'manufacture_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    public function transform()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'created_at' => format_vn_short_datetime(strtotime($this->created_at)),
            'updated_at' => format_vn_short_datetime(strtotime($this->updated_at)),
            'price' => $this->price,
            'description' => $this->description,
            'type' => $this->type,
            'avatar_url' => $this->avatar_url,
            'cover_url' => $this->cover_url,
            'code' => $this->code,
            'files' => $this->files->map(function ($file) {
                return $file->transform();
            }),
            'properties' => $this->properties->map(function ($property) {
                return $property->transform();
            })
        ];
    }

    public function GoodTransform()
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'avatar_url' => $this->avatar_url ? $this->avatar_url : 'data:image/png;base64,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',
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
        if($this->manufacture)
            $data['manufacture'] = [
                'id' => $this->manufacture->id,
                'name' => $this->manufacture->name,
            ];
        if($this->category)
            $data['category'] = [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ];
        return $data;
    }
}

