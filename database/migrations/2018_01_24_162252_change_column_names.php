<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeColumnNames extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('room_service_registers', function (Blueprint $table){
            $table->renameColumn('subcription_id', 'subscription_id');
        });
        Schema::table('room_service_subcriptions', function (Blueprint $table){
            $table->renameColumn('subcription_kind_id', 'subscription_kind_id');
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
