<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRecordAndImagesUrlLessonSurvey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table("user_lesson_survey", function (Blueprint $table) {
            $table->integer("survey_id")->unsigned()->index()->nullable();
            $table->text("images_url")->nullable();
            $table->text("records_url")->nullable();
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
