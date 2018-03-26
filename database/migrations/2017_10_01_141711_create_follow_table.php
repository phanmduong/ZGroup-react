<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFollowTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('followings', function(Blueprint $following) {
            $following->increments('id');
            $following->integer('following_id')->unsigned()->index();
            $following->integer('followed_id')->unsigned()->index();
            $following->timestamps();
            $following->softDeletes();
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
