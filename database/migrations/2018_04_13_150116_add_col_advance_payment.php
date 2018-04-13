<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColAdvancePayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        //Schema::dropIfExists('advance_payments');

        Schema::table('advanced_payments', function (Blueprint $table) {
            
            $table->integer('company_pay_id')->nullable();
            $table->integer('company_receive_id')->nullable();
            

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
