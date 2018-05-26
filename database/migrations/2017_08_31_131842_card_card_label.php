<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CardCardLabel extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_card_labels', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("card_id")->unsigned()->index();
            $table->integer("card_label_id")->unsigned()->index();
            $table->integer("labeler_id")->unsigned()->index();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::table('card_labels', function (Blueprint $table) {
            $table->integer("editor_id")->unsigned()->index();
            $table->integer("creator_id")->unsigned()->index();
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
