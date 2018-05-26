<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateExportOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('export_orders', function (Blueprint $table){
            $table->increments('id');
            $table->integer('good_id');
            $table->integer('warehouse_id');
            $table->integer('company_id');
            $table->integer('price');
            $table->integer('quantity');
            $table->integer('total_price');
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
