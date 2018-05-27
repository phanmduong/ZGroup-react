<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTaskList extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_lists', function (Blueprint $table) {
            $table->increments("id");
            $table->string("title");
            $table->integer("card_id")->unsigned();
            $table->timestamps();
            $table->foreign("card_id")->references('id')->on('cards');
        });

        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['card_id']);
            $table->renameColumn('card_id', 'task_list_id');
            $table->dropColumn("status");
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
