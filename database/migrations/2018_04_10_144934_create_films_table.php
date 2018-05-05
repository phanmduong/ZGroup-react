<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFilmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('films', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('avatar_url');
            $table->string('trailer_url');
            $table->string('director');
            $table->string('cast');
            $table->string('running_time');
            $table->string('release_date');
            $table->string('country');
            $table->string('language');
            $table->string('film_genre');
            $table->integer('rate')->unsigned();
            $table->string('summary');
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
        Schema::drop('films');
    }
}
