<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeImportedGoodsTable extends Migration
{
    public function up()
    {
        Schema::table('imported_goods', function(Blueprint $table){
            $table->integer('import_price')->unsigned()->index();
            $table->integer('import_quantity')->unsigned()->index();
            $table->integer('order_import_id')->unsigned()->index();
            $table->dateTime('expired_date')->nullable();
            $table->softDeletes();
        });
    }
}
