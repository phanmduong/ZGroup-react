<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCreatorId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('projects', function (Blueprint $table) {
            $table->integer("creator_id")->unsigned();
            $table->integer("editor_id")->unsigned();
            $table->foreign('creator_id')->references('id')->on('users');
            $table->foreign('editor_id')->references('id')->on('users');
        });

        Schema::table('boards', function (Blueprint $table) {
            $table->integer("creator_id")->unsigned();
            $table->integer("editor_id")->unsigned();
            $table->foreign('creator_id')->references('id')->on('users');
            $table->foreign('editor_id')->references('id')->on('users');
        });

        Schema::table('cards', function (Blueprint $table) {
            $table->integer("creator_id")->unsigned();
            $table->integer("editor_id")->unsigned();
            $table->foreign('creator_id')->references('id')->on('users');
            $table->foreign('editor_id')->references('id')->on('users');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->integer("creator_id")->unsigned();
            $table->integer("editor_id")->unsigned();
            $table->foreign('creator_id')->references('id')->on('users');
            $table->foreign('editor_id')->references('id')->on('users');
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
