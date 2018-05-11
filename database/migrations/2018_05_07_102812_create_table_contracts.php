<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableContracts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('contracts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('type')->nullable();
            $table->integer('company_a_id')->unsigned();
            $table->integer('company_b_id')->unsigned();
            $table->integer('staff_id')->unsigned();
            $table->integer('sign_staff_id')->unsigned();
            $table->dateTime('due_date')->nullable();
            $table->integer('value')->default(0);
            $table->integer('status')->default(0);
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
