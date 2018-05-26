<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColLandingTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('landing', function(Blueprint $table) {
            $table->string("subtitle1")->nullable();
            $table->string('title1')->nullable();
            $table->string('content1')->nullable();
            $table->string('image1')->nullable();
            $table->string('background1')->nullable();

            $table->string("subtitle2")->nullable();
            $table->string('title2')->nullable();
            $table->string('content2')->nullable();
            $table->string('image2')->nullable();
            $table->string('background2')->nullable();

            $table->string("subtitle3")->nullable();
            $table->string('title3')->nullable();
            $table->string('content3')->nullable();
            $table->string('image3')->nullable();
            $table->string('background3')->nullable();

            $table->string('title4')->nullable();
            $table->string('content4')->nullable();
            $table->string('icon1')->nullable();
            $table->string('reason1')->nullable();
            $table->string('explain1')->nullable();
            $table->string('icon2')->nullable();
            $table->string('reason2')->nullable();
            $table->string('explain2')->nullable();
            $table->string('icon3')->nullable();
            $table->string('reason3')->nullable();
            $table->string('explain3')->nullable();
            $table->string('background4')->nullable();
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
