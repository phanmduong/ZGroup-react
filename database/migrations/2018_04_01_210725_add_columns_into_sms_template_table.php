<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnsIntoSmsTemplateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('sms_template', function (Blueprint $table) {
            $table->integer('sms_template_type_id')->unsigned();
            $table->integer('order')->unsigned();
            $table->time('send_time')->nullable();
            $table->integer('sms_list_type_id')->unsigned();
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
