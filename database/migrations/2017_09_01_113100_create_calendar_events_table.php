<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCalendarEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->increments("id");
            $table->integer("user_id")->unsigned()->index();
            $table->integer("card_id")->unsigned()->index();
            $table->boolean("status");
            $table->boolean("all_day");
            $table->timestamp("start")->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp("end")->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->string("title");
            $table->string("type");
            $table->string("url");
            $table->string("color");
            $table->string("textColor")->default("white");
            $table->timestamps();
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
