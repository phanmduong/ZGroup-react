<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDatabaseCheckInCheckOut extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('bases', function (Blueprint $table) {
            $table->float('longtitude')->nullable();
            $table->float('latitude')->nullable();
            $table->float('distance_allow')->nullable();
        });
        Schema::create('devices', function (Blueprint $table) {
            $table->increments("id");
            $table->string("name");
            $table->string("os");
            $table->integer("user_id")->unsigned()->index();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('wifis', function (Blueprint $table) {
            $table->increments("id");
            $table->string("name");
            $table->string("IP")->nullable();
            $table->integer("base_id")->unsigned()->index();
            $table->integer("creator_id")->unsigned()->index();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('checkin_checkout', function (Blueprint $table) {

            $table->increments("id");
            $table->integer("kind");
            $table->integer("status")->nullable();
            $table->integer("base_id")->unsigned()->index();
            $table->integer("device_id")->unsigned()->index();
            $table->integer("user_id")->unsigned()->index();
            $table->float('longtitude')->nullable();
            $table->float('latitude')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::create('AppSession', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("device_id")->unsigned()->index();
            $table->integer("user_id")->unsigned()->index();
            $table->timestamps();
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
