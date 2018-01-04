<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EditCourseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_types', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('color');
            $table->string('image_url');
            $table->string('icon_url');
            $table->string('cover_url');
            $table->string('short_description');
            $table->longText('description');
            $table->softDeletes();
            $table->timestamps();
        });
        Schema::table('courses', function (Blueprint $table) {
            $table->integer('type_id')->unsigned()->nullable();
            $table->foreign('type_id')->references('id')->on('course_types');
            $table->integer('status');
        });
        Schema::table('course_categories', function (Blueprint $table) {
            $table->string('image_url');
            $table->string('color');
            $table->string('icon_url');
            $table->string('cover_url');
            $table->string('short_description');
            $table->longText('description');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('courses', function (Blueprint $table) {
            //
        });
    }
}
