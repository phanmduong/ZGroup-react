<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AjaxDatabase1 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('ajax_database1', function (Blueprint $table) {
            $table->string('name');
            $table->integer('age');
            $table->char('sex');
            $table->integer('wpm');
            $table->primary('name');
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
