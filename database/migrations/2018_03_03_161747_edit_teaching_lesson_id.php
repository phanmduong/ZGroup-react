<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditTeachingLessonId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teaching_lessons', function (Blueprint $table) {
            $table->integer('class_position_id')->unsigned()->nullable();
            $table->integer('teaching_id')->unsigned()->nullable();
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
        Schema::table('teaching_lessons', function (Blueprint $table) {
            //
        });
    }
}
