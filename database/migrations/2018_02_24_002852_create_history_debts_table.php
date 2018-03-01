<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryDebtsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('history_debts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('company_id');
            $table->integer('value')->default(0);
            $table->integer('total_value')->default(0);
            $table->dateTime('date');
            $table->string('type');


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
