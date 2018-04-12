<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompaniesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('companies', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('registered_business_address')->nullable();
            $table->string('office_address')->nullable();
            $table->string('phone_company')->nullable();
            $table->string('tax_code')->nullable();
            $table->string('info_account')->nullable();
            $table->integer('field_id');
            $table->string('user_contact')->nullable();
            $table->string('user_contact_phone')->nullable();
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
