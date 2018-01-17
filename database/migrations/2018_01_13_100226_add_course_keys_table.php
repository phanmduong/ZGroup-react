<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCourseKeysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_keys', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->string('code')->index();
            $table->longText('description');
            $table->integer('course_id')->index();
            $table->integer('limit');
            $table->integer('times');
            $table->integer('status')->index();
            $table->integer('email_campaign_id')->unsigned()->nullable();
            $table->foreign('email_campaign_id')->references('id')->on('email_campaigns');
            $table->dateTime('start_time')->nullable();
            $table->dateTime('end_time')->nullable();
            $table->softDeletes();
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
        Schema::drop('course_keys');
    }
}
