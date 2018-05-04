<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagNumbersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::delete('delete from tag_numbers');
        for ($i = 1; $i < 100; $i++) {
            DB::table('tag_numbers')->insert([['id' => $i]]);
        }
    }
}
