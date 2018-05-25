<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MakeAllowNullUsersCollumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('code')->nullable()->change();
            $table->string('avatar_url')->nullable()->change();
            $table->string('cover_url')->nullable()->change();
            $table->string('description')->nullable()->change();
            $table->integer('role_id')->nullable()->change();
            $table->integer('is_request_cv')->nullable()->change();
            $table->string('cv_url')->nullable()->change();
            $table->string('cv_id')->nullable()->change();
            $table->string('base_id')->nullable()->change();
            $table->string('homeland')->nullable()->change();
            $table->string('literacy')->default(0)->change();
            $table->dateTime('start_company')->useCurrent()->change();
            $table->integer('age')->nullable()->change();
            $table->integer('department_id')->nullable()->change();
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
