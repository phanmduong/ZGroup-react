<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnCheckInCheckOut extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('checkin_checkout', function (Blueprint $table) {
            $table->integer("teacher_teaching_lesson_id")->unsigned()->index()->nullable();
            $table->integer("teaching_assistant_teaching_lesson_id")->unsigned()->index()->nullable();
            $table->integer("shift_id")->unsigned()->index()->nullable();
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
