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
        $this->call(NotificationTypeSeeder::class);
        $this->call(BookManufactureSeeder::class);
        $this->call(FashionManufactureSeeder::class);
        $this->call(PropertiesPrintOrderSeeder::class);
        $this->call(PositionSeeder::class);
        $this->call(TagNumbersSeeder::class);
    }
}
