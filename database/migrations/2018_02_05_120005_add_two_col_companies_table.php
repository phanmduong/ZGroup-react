<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTwoColCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('companies',function (Blueprint $table){
            $table->integer('discount_comic')->default(0);
            $table->integer('discount_text')->default(0);
            $table->string('user_contact1')->nullable();
            $table->string('user_contact_phone1')->nullable();
            $table->string('user_contact2')->nullable();
            $table->string('user_contact_phone2')->nullable();
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
