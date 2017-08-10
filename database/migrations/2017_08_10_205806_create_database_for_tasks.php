<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDatabaseForTasks extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
            $table->string("title");
            $table->text("description");
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('boards', function (Blueprint $table) {
            $table->increments('id');
            $table->string("title");
            $table->integer('project_id')->unsigned();
            $table->integer("order")->unsigned();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('project_id')->references('id')->on('projects');
        });

        Schema::create('cards', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('board_id')->unsigned();
            $table->string('title');
            $table->text('description');
            $table->integer('assignee_id')->unsigned();
            $table->string('status');
            $table->softDeletes();
            $table->foreign('board_id')->references('id')->on('boards');
        });

        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('card_id')->unsigned();
            $table->string('title');
            $table->string('status');
            $table->text('description');
            $table->softDeletes();
            $table->foreign('card_id')->references('id')->on('cards');
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
