<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGoodProperties extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('goods', function (Blueprint $table) {
            $table->string("avatar_url")->nullable();
            $table->string("cover_url")->nullable();
            $table->string("code")->nullable();
            $table->string("type")->nullable();
        });

        Schema::create('good_properties', function (Blueprint $table) {
            $table->timestamps();
            $table->increments("id");
            $table->softDeletes();
            $table->string("name");
            $table->string("value");
            $table->integer("good_id")->unsigned()->index();
            $table->integer("creator_id")->unsigned()->index();
            $table->integer("editor_id")->unsigned()->index();
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
