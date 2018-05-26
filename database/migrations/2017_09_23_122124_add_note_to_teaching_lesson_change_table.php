<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNoteToTeachingLessonChangeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teaching_lesson_change', function (Blueprint $table) {
            $table->string("note")->nullable();
        });
        Schema::table('class_lesson_change', function (Blueprint $table) {
            $table->string("note")->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('teaching_lesson_change', function (Blueprint $table) {
            //
        });
    }
}
