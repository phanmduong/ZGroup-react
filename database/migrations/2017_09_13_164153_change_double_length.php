<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeDoubleLength extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bases', function (Blueprint $table) {
            $table->dropColumn('longtitude');
            $table->dropColumn('latitude');
            $table->dropColumn('distance_allow');
        });
        Schema::table('checkin_checkout', function (Blueprint $table) {
            $table->dropColumn('longtitude');
            $table->dropColumn('latitude');
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
