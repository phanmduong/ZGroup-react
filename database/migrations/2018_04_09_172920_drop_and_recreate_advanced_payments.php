<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropAndRecreateAdvancedPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::drop('advance_payments');

        Schema::create('advanced_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->string('command_code');
            $table->integer('money_payment')->default(0);
            $table->integer('staff_id');
            $table->string('reason')->nullable();
            $table->integer('money_received')->default(0);
            $table->integer('money_used')->default(0);
            $table->string('type')->nullable();
            $table->integer('status')->default(0);
            $table->dateTime('date_complete')->nullable();
            $table->timestamps();
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
