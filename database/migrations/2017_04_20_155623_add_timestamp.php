<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTimestamp extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('study_sessions', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('schedules', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('schedule_study_session', function (Blueprint $table) {
            $table->timestamps();
        });
        Schema::table('schedule_class', function (Blueprint $table) {
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
