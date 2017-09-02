<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//         $this->call(BasesTableSeeder::class);
//         $this->call(RoomsTableSeeder::class);
        $this->call(NotificationTypeSeeder::class);
    }
}
