<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNullEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('events',function (Blueprint $table){
            $table->string('detail')->nullable()->change();
            $table->string('address')->nullable()->change();
            $table->dateTime('start_time')->nullable()->change();
            $table->dateTime('end_time')->nullable()->change();
            $table->dateTime('start_date')->nullable()->change();
            $table->dateTime('end_date')->nullable()->change();
            $table->string('status')->nullable()->change();
            $table->string('cover_url')->nullable()->change();
            $table->string('slug')->nullable()->change();
            $table->string('meta_title')->nullable()->change();
            $table->text('keyword')->nullable()->change();
            $table->text('meta_description')->nullable()->change();
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
