<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColorCoordinateToSeat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('seats', function (Blueprint $table) {
            $table->integer("x")->unsigned()->nullable();
            $table->integer("y")->unsigned()->nullable();
            $table->integer("r")->unsigned()->nullable();
            $table->string("color")->nullable();
            $table->string("name")->nullable()->change();
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
