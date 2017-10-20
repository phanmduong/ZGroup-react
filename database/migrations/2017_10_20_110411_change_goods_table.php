<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeGoodsTable extends Migration
{
    public function up()
    {
        Schema::table('goods', function(Blueprint $table){
            $table->string('name')->nullable()->change();
            $table->string('description')->nullable()->change();
            $table->integer('good_category_id')->unsigned()->index();
        });
    }

}
