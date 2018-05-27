<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('courses', function (Blueprint $table){
            $table->string('description')->nullable()->change();
            $table->integer('duration')->nullable()->change();
            $table->integer('price')->nullale()->change();
            $table->integer('sale_bonus')->nullale()->change();
            $table->string('image_url')->nullable()->change();
            $table->string('icon_url')->nullable()->change();
            $table->string('color')->nullable()->change();
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
