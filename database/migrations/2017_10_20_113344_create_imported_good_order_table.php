<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImportedGoodOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('imported_good_oder', function (Blueprint $table){
            $table->increments('id');
            $table->integer('quantity')->unsigned()->index();
            $table->integer('imported_good_id')->unsigned()->index();
            $table->integer('good_order_table')->unsigned()->index();
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
