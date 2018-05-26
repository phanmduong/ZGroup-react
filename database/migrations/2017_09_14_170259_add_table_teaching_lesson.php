<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTableTeachingLesson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('teaching_lessons', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("class_lesson_id")->unsigned()->index()->nullable();
            $table->integer("teacher_id")->unsigned()->index()->nullable();
            $table->integer("teaching_assistant_id")->unsigned()->index()->nullable();
            $table->integer("teacher_checkin_id")->unsigned()->index()->nullable();
            $table->integer("teacher_checkout_id")->unsigned()->index()->nullable();
            $table->integer("teaching_assistant_checkin_id")->unsigned()->index()->nullable();
            $table->integer("teaching_assistant_checkout_id")->unsigned()->index()->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::create('teaching_lesson_change', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("class_lesson_id")->unsigned()->index();
            $table->integer("role");
            $table->integer("old_user_id")->unsigned()->index();
            $table->integer("new_user_id")->unsigned()->index();
            $table->integer("actor_id")->unsigned()->index();
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
