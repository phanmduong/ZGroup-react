<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodPropertyItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('good_property_items', function (Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('prevalue');
            $table->timestamps();
            $table->integer('creator_id')->unsigned()->index();
            $table->integer('editor_id')->unsigned()->index();
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
