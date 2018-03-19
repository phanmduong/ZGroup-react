<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSendNotificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('send_notifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('description');
            $table->integer('creator_id')->unsigned();
            $table->foreign('creator_id')->references('id')->on('users');
            $table->integer('notification_type_id')->unsigned();
            $table->foreign('notification_type_id')->references('id')->on('notification_types');
            $table->timestamps();
        });

        Schema::table('notifications', function (Blueprint $table) {
            $table->integer('send_notification_id')->unsigned()->nullable();
            $table->foreign('send_notification_id')->references('id')->on('send_notifications');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('send_notifications');
    }
}
