<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeTransferMoneyTable1 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transfer_money', function(Blueprint $table){
            $table->dropForeign('transfer_money_bank_account_id_foreign');            
        });
        Schema::table('transfer_money', function(Blueprint $table){
            $table->string('img_proof')->nullable()->change();
            $table->string('wallet_kind')->nullable();
            $table->integer('bank_account_id')->unsigned()->default(0)->change();
        });
        
        Schema::table('transfer_money', function(Blueprint $table){
            $table->foreign('bank_account_id')->references('id')->on('bank_account');
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
