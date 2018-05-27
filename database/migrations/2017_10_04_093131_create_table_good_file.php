<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTableGoodFile extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('files', function (Blueprint $table) {
            $table->integer("card_id")->nullable()->change();
        });
        Schema::create('file_good', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("file_id")->unsigned()->index();
            $table->integer("good_id")->unsigned()->index();
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
