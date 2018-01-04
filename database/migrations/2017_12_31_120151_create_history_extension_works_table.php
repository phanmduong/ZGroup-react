<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryExtensionWorksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('history_extension_works', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('staff_id')->unsigned();
            $table->foreign('staff_id')->references('id')->on('users');
            $table->integer('work_id')->unsigned();
            $table->foreign('work_id')->references('id')->on('works');
            $table->integer('penalty')->default(0);
            $table->string('reason')->nullable();
            $table->dateTime('new_deadline')->nullable();
            $table->string('status')->nullable();
            $table->timestamps();
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
