<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('note')->nullable()->change();
            $table->integer('warehouse_import_id')->unsigned()->index();
            $table->integer('warehouse_export_id')->unsigned()->index();
            $table->integer('user_id')->unsigned()->index();
            $table->integer('type')->unsigned()->index();
            $table->integer('discount_percent')->nullable()->unsigned()->index();
            $table->integer('discount_money')->nullable()->unsigned()->index();
            $table->integer('coupon_id')->unsigned()->index();
            $table->string('code');
            $table->softDeletes();
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
