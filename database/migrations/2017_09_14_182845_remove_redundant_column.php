<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveRedundantColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('teaching_lessons', function (Blueprint $table) {
            $table->dropColumn("teacher_checkin_id");
            $table->dropColumn("teacher_checkout_id");
            $table->dropColumn("teaching_assistant_checkin_id");
            $table->dropColumn("teaching_assistant_checkout_id");
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
