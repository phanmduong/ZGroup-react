<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteTargetBoardId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropIndex(["target_board_id"]);
            $table->dropColumn("target_board_id");
        });
        Schema::table('board_tasks', function (Blueprint $table) {
            $table->dropForeign(["task_list_id"]);
            $table->dropColumn("task_list_id");
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
