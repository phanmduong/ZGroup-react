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
        Schema::table("user_lesson_survey", function (Blueprint $table) {
            $table->softDeletes();
        });

        Schema::table("user_lesson_survey_question", function (Blueprint $table) {
            $table->index("user_lesson_survey_id");
            $table->index("question_id");
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
