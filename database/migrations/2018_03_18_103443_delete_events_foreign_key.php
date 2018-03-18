<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DeleteEventsForeignKey extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('events', function (Blueprint $table) {
            $table->dropForeign(['organization_id']);
            $table->text('detail');
            $table->string('address');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('status')->default('UNPUBLISHED');
            $table->string('avatar_url')->nullable();
            $table->string('cover_url')->nullable();
            $table->string('avatar_name')->nullable();
            $table->string('cover_name')->nullable();

            $table->string('slug')->nullable()->index();
            $table->string('meta_title')->nullable();
            $table->text('keyword')->nullable();
            $table->text('meta_description')->nullable();
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
