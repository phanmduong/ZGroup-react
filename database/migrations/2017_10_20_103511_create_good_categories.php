<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGoodCategories extends Migration
{
    public function up()
    {
        //
        Schema::create('good_categories', function(Blueprint $table){
            $table->increments('id');
            $table->string('name')->nullable();
            $table->integer('parent_id')->unsigned()->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

}
