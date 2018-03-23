<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkShiftSessions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_shift_sessions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->time('start_time');
            $table->time('end_time');
            $table->integer('active');
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('work_shifts', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('work_shift_session_id')->unsigned();
            $table->foreign('work_shift_session_id')->references('id')->on('work_shift_sessions');
            $table->integer('base_id')->unsigned();
            $table->foreign('base_id')->references('id')->on('bases');
            $table->integer('gen_id')->unsigned()->nullable();
            $table->foreign('gen_id')->references('id')->on('gens');
            $table->integer('week')->nullable()->index();
            $table->integer('order')->nullable()->index();
            $table->date('date')->index();
            $table->timestamps();
        });
        Schema::create('work_shift_picks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('work_shift_id')->unsigned();
            $table->foreign('work_shift_id')->references('id')->on('work_shifts');
            $table->integer('status');
            $table->timestamps();
        });
        Schema::create('work_shift_user', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->integer('work_shift_id')->unsigned();
            $table->foreign('work_shift_id')->references('id')->on('work_shifts');
            $table->integer('checkin_id')->unsigned()->nullable();
            $table->integer('checkout_id')->unsigned()->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('work_shift_sessions');
    }
}
