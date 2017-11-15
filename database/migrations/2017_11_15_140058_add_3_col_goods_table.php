<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Add3ColGoodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('goods', function (Blueprint $table) {
            $table->integer('sale_status')->unsigned()->index();
            $table->integer('display_status')->unsigned()->index();
            $table->integer( 'highlight_status')->unsigned()->index();
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
