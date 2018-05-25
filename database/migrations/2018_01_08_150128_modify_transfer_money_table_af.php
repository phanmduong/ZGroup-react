<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ModifyTransferMoneyTableAf extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('transfer_money', function (Blueprint $table) {
            $table->integer("user_id")->unsigned()->change();
            $table->integer("bank_account_id")->unsigned();
            $table->foreign("bank_account_id")->references("id")->on("bank_account");
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
