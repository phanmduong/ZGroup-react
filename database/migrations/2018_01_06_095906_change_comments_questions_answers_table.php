<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeCommentsQuestionsAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign('fk_product_comments');
        });
        Schema::table('comments', function (Blueprint $table){
            $table->integer('product_id')->nullable()->change();
        });
        Schema::table('questions', function (Blueprint $table){
            $table->string('image_url')->nullable();
        });
        Schema::table('answers', function (Blueprint $table){
            $table->string('image_url')->nullable();
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
