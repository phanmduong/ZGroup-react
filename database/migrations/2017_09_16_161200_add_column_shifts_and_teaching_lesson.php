<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnShiftsAndTeachingLesson extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('shifts', function (Blueprint $table) {
            $table->integer("checkin_id")->unsigned()->index();
            $table->integer("checkout_id")->unsigned()->index();
        });
        Schema::table('teaching_lessons', function (Blueprint $table) {
            $table->integer("teacher_checkin_id")->unsigned()->index();
            $table->integer("teacher_checkout_id")->unsigned()->index();
            $table->integer("ta_checkin_id")->unsigned()->index();
            $table->integer("ta_checkout_id")->unsigned()->index();
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
