<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

class CreateAdvancePaymentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('advance_payments', function (Blueprint $table) {
            $table->integer('id');
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
