<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateFilmSessionsTableAsNullableForStartDateAndTime extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('film_sessions', function (Blueprint $table) {
            $table->date('start_date')->nullable()->change();
            $table->time('start_time')->nullable()->change();
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
        Schema::table('film_sessions', function (Blueprint $table) {
            $table->date('start_date');
            $table->time('start_time');
        });
    }
}
