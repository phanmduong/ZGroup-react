<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeBasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('bases', function (Blueprint $table) {
            $table->string('avatar_url')->nullable();
            $table->string('district_id')->nullable();
            $table->string('images_url')->nullable();
            $table->boolean('display_status');
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
