<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableSalary extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('salaries', function (Blueprint $table) {
            $table->increments('id');
            $table->softDeletes();
            $table->dateTime("from");
            $table->dateTime("to")->nullable()->index();
            $table->integer("user_id")->unsigned();
            $table->integer("base")->unsigned()->default(0);
            $table->integer("revenue")->unsigned()->default(0);
            $table->integer("allowance")->unsigned()->default(0);
            $table->timestamps();
            $table->foreign("user_id")->references('id')->on('users');
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
