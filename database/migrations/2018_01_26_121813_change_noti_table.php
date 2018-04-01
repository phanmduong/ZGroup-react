<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeNotiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobile_notification_types', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('name');
            $table->string('image_url');
            $table->string('url')->nullable();
            $table->timestamps();
        });
        Schema::table('notifications', function (Blueprint $table) {
            $table->longText('content')->nullable();
            $table->string('color')->nullable()->change();
            $table->string('icon')->nullable()->change();
            $table->string('mobile_url')->nullable();
        });
        Schema::table('notification_types', function (Blueprint $table) {
            $table->longText('content_template')->nullable();
            $table->integer('status');
            $table->integer('mobile_notification_type_id')->unsigned()->nullable();
            $table->foreign('mobile_notification_type_id')->references('id')->on('mobile_notification_types');
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
        Schema::table('notifications', function (Blueprint $table) {
            //
        });
    }
}
