<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class ChangeBases1Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::unprepared("
            ALTER TABLE bases CHANGE longtitude longtitude double(15,8) DEFAULT NULL;
            ALTER TABLE bases CHANGE latitude latitude double(15,8) DEFAULT NULL;
            ALTER TABLE bases CHANGE distance_allow distance_allow double(15,8) DEFAULT NULL;
            ");

        Schema::table('bases', function (Blueprint $table) {
            $table->string('description')->nullable()->change();
            $table->boolean('display_status')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bases', function (Blueprint $table) {
            //
        });
    }
}
