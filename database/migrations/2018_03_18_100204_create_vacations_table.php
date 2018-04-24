<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVacationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('request_vacations', function (Blueprint $table) {
             $table->integer('id');
             $table->string('command_code');
             $table->integer('staff_id')->default(0);
             $table->dateTime('request_date');
             $table->dateTime('start_time');
             $table->dateTime('end_time');
             $table->string('type')->nullable();
             $table->integer('status')->default(0);
             $table->string('reason')->nullable();
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
