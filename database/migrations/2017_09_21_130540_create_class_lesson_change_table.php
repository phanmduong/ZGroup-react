<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClassLessonChangeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('class_lesson_change', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("class_lesson_id")->unsigned()->index();
            $table->date("old_time");
            $table->date("new_time");
            $table->string("note");
            $table->integer("actor_id")->unsigned()->index();
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
        Schema::drop('class_lesson_change');
    }
}
