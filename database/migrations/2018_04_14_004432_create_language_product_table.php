<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLanguageProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('language_product', function (Blueprint $table) {

            $table->increments('id');
            $table->integer('product_id')->default(0);
            $table->integer('language_id')->default(0);
            $table->string('link')->nulable();

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
