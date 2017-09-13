<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeDoubleLength2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bases', function (Blueprint $table) {
            $table->double('longtitude', 15, 8);
            $table->double('latitude', 15, 8);
            $table->double('distance_allow', 15, 8);
        });
        Schema::table('checkin_checkout', function (Blueprint $table) {
            $table->double('longtitude', 15, 8);
            $table->double('latitude', 15, 8);
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
