<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomServiceUserPackBenefitTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
//    protected $table = 'room_service_user_pack_benefit';
    public function up()
    {
        //
        Schema::create('room_service_user_pack_benefit', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('benefit_id')->unsigned();
            $table->integer('user_pack_id')->unsigned();
            $table->string('value');
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
