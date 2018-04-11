<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyAssignee extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->dropColumn("assignee_id");
        });
        Schema::create('card_user', function (Blueprint $table) {
            $table->integer("user_id")->unsigned();
            $table->integer("task_id")->unsigned();
            $table->foreign("user_id")->references('id')->on('users');
            $table->foreign("task_id")->references('id')->on('tasks');
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
