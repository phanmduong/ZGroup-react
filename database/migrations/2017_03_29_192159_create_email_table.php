<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmailTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sms', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('purpose');
            $table->string("status");
            $table->text("content");
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');

        });
        Schema::table('registers', function (Blueprint $table) {
            $table->integer('sms_confirm_id')->unsigned();
            $table->integer('sms_remind_id')->unsigned();
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
