<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeStructureEmailFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('email_forms', function (Blueprint $table) {
            $table->string('name')->nullable()->change();
            $table->string('logo_url')->nullable()->change();
            $table->string('title')->nullable()->change();
            $table->string('subtitle')->nullable()->change();
            $table->integer('template_id')->unsigned()->nullable()->change();
            $table->longText('content')->nullable()->change();
            $table->longText('footer')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('email_forms', function (Blueprint $table) {
            //
        });
    }
}
