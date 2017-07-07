<?php

use Illuminate\Database\Seeder;

use Laracasts\TestDummy\Factory as TestDummy;

class BasesTableSeeder extends Seeder
{
    public function run()
    {
         TestDummy::times(8)->create('App\Base');
    }
}
