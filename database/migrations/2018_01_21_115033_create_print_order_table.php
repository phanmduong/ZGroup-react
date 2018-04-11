<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePrintOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('print_orders', function (Blueprint $table){
            $table->increments('id');
            $table->string('command_code')->nullable();
            $table->integer('staff_id');
            $table->integer('status')->default(0);
            $table->integer('company_id');
            $table->integer('good_id');
            $table->integer('quantity')->default(0);
            $table->string('core1')->nullable();
            $table->string('core2')->nullable();
            $table->string('cover1')->nullable();
            $table->string('cover2')->nullable();
            $table->string('spare_part1')->nullable();
            $table->string('spare_part2')->nullable();
            $table->string('packing1')->nullable();
            $table->string('packing2')->nullable();
            $table->string('other')->nullable();
            $table->double('price')->default(0);
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
