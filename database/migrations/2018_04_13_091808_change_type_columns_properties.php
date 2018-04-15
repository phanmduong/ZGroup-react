<?php

use Illuminate\Database\Migrations\Migration;

class ChangeTypeColumnsProperties extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('good_property_items', function ($table) {
            $table->text("prevalue")->change();
            $table->text("preunit")->change();
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
