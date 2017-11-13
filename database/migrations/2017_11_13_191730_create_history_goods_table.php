<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('history_goods', function(Blueprint $table) {
            $table->increments('id');
            $table->integer('order_id')->index()->unsigned()->nullable();
            $table->integer('imported_good_id')->index()->unsigned()->nullable();
            $table->integer('good_id')->index()->unsigned()->nullable();
            $table->string('type');
            $table->string('note');
            $table->integer('remain');
            $table->integer('quantity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
