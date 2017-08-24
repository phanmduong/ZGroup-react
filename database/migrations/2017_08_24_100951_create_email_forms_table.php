<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEmailFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_forms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('logo_url');
            $table->string('title');
            $table->string('subtitle');
            $table->integer('template_id')->unsigned();
            $table->foreign('template_id')->references('id')->on('email_templates');
            $table->longText('content');
            $table->longText('footer');
            $table->integer('creator')->unsigned();
            $table->foreign('creator')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('email_forms');
    }
}
