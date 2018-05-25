<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodPropertyItemTask extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('good_property_item_task', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('good_property_item_id')->unsigned()->index();
            $table->integer('creator_id')->unsigned()->index();
            $table->integer('editor_id')->unsigned()->index();
            $table->integer('task_id')->unsigned()->index();
            $table->timestamps();
            $table->softDeletes();
        });
        Schema::table('good_property_items', function (Blueprint $table) {
            $table->string('preunit');
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
