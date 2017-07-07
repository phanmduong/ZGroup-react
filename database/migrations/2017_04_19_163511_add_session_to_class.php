<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddSessionToClass extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('study_sessions', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('weekday');
        });
        Schema::create('schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
        });
        Schema::create('schedule_study_session', function (Blueprint $table) {
            $table->integer('schedule_id')->unsigned();
            $table->integer('study_session_id')->unsigned();
            $table->primary(['schedule_id', 'study_session_id']);
        });
        Schema::create('schedule_class', function (Blueprint $table) {
            $table->integer('schedule_id')->unsigned();
            $table->integer('class_id')->unsigned();
            $table->primary(['schedule_id', 'class_id']);
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule_class');
        Schema::dropIfExists('schedule_study_session');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('study_sessions');
    }
}
