<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoursePixelTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_pixels', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('course_id')->unsigned()->index();
            $table->string('name');
            $table->text('code');
            $table->integer('staff_id')->unsigned()->index();
            $table->timestamps();
        });
    }

    public function down()
    {
        //
    }
}
