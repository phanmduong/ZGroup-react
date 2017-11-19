<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('coupons', function (Blueprint $table) {
            $table->string('coupon');
            $table->string('discount_type');
            $table->integer('discount_value');
            $table->string('used_for');
            $table->integer('order_value');
            $table->integer('category_id')->unsigned()->index();
            $table->integer('good_id')->unsigned()->index();
            $table->integer('customer_id')->unsigned()->index();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
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
