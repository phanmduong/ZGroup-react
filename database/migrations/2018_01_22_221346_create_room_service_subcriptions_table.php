<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomServiceSubcriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('room_service_subcriptions', function(Blueprint $table) {
            $table->increments('id');
            $table->text('description');
            $table->integer('user_pack_id')->default(0)->index();
            $table->integer('price')->default(0);
            $table->integer('subcription_kind_id')->default(0)->index();
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
