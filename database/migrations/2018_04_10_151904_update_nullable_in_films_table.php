<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateNullableInFilmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('films', function (Blueprint $table) {
            $table->string('trailer_url')->nullabe()->change();
            $table->integer('rate')->unsigned()->nullable()->change();
            $table->string('release_date')->nullable()->change();
            $table->string('film_rated');
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
        $table->string('trailer_url');
        $table->string('release_date');
        $table->integer('rate');
    }
}
