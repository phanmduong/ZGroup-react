<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddForeignKeySurvey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("surveys", function (Blueprint $table) {
            $table->softDeletes();
        });
        Schema::table("user_lesson_survey", function (Blueprint $table) {
            $table->foreign("survey_id")->references("id")->on("surveys");
            $table->foreign("user_id")->references("id")->on("users");
            $table->softDeletes();
        });

        Schema::table("user_lesson_survey_question", function (Blueprint $table) {
            $table->integer("user_lesson_survey_id")->unsigned()->change();
            $table->foreign("user_lesson_survey_id")->references("id")->on("user_lesson_survey");
            $table->foreign("question_id")->references("id")->on("questions");
            $table->softDeletes();
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
