<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrderPaidMoneyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('order_paid_money', function(Blueprint $table){
            $table->increments('id');
            $table->integer('order_id')->unsigned()->index();
            $table->integer('money')->unsigned()->index();
            $table->integer('staff_id')->unsigned()->index();
            $table->string('note');
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
