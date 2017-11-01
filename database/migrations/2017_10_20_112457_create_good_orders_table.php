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
        Schema::table('good_order', function (Blueprint $table) {
            $table->integer('import_price')->unsigned()->index();
            $table->integer('coupon_id')->unsigned()->index();
            $table->integer('discount_percent')->unsigned()->index();
            $table->integer('discount_money')->unsigned()->index();
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
