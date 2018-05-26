<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeProjectDatabase extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->string("icon")->nullable();
            $table->string("color")->nullable();
            $table->dateTime("start")->nullable();
            $table->dateTime("end")->nullable();
        });

        Schema::create('project_user', function (Blueprint $table) {
            $table->timestamps();
            $table->integer("user_id")->unsigned()->index();
            $table->integer("project_id")->unsigned()->index();
            $table->integer("adder_id")->unsigned()->index();
            $table->integer("role");
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
