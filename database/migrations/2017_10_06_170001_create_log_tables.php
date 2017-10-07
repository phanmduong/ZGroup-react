<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLogTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_logs', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("project_id")->unsigned()->index()->nullable();
            $table->integer("card_id")->unsigned()->index()->nullable();
            $table->string("message");
            $table->integer("actor_id")->unsigned()->index();
            $table->softDeletes();
            $table->timestamps();
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
