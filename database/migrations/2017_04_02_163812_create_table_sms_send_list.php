<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableSmsSendList extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms_template', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('content');
            $table->timestamps();
        });

        Schema::create('sms_list', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('status');
            $table->timestamps();
        });

        Schema::create('sms_send', function (Blueprint $table) {
            $table->integer('template_id')->unsigned();
            $table->integer('sms_list_id')->unsigned();
            $table->foreign('template_id')->references('id')->on('sms_template');
            $table->foreign('sms_list_id')->references('id')->on('sms_list');
            $table->timestamps();
        });



        Schema::create('sms_list_class', function (Blueprint $table) {
            $table->integer('sms_list_id')->unsigned();
            $table->integer('class_id')->unsigned();
            $table->foreign('sms_list_id')->references('id')->on('sms_list');
            $table->foreign('class_id')->references('id')->on('classes');
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
        //
    }
}
