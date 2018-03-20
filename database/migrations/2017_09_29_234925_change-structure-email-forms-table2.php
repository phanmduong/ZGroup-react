<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ChangeStructureEmailFormsTable2 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('email_forms', function (Blueprint $table) {
            $table->string('title_button')->nullable()->change();
            $table->string('link_button')->nullable()->change();
            $table->string('avatar_url')->nullable()->change();
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
