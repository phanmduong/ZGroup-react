<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('good_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('quantity')->unsigned()->index();
            $table->integer('price')->unsigned()->index();
            $table->integer('import_price')->unsigned()->index();
            $table->integer('good_id')->unsigned()->index();
            $table->integer('order_id')->unsigned()->index();
            $table->integer('coupon_id')->unsigned()->index();
            $table->integer('discount_percent')->unsigned()->index();
            $table->integer('discount_money')->unsigned()->index();
            $table->timestamps();
            $table->softDeletes();
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
