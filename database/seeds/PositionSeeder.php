<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $positions = \App\Position::where('type', "=", "system")->get();

        foreach ($positions as $pos) {
            $pos->forceDelete();
        }

        DB::table('positions')->insert([
            [
                'name' => "Giảng viên",
                'id' => 1,
                "type" => "system",
            ], [
                'name' => "Trợ giảng",
                'id' => 2,
                "type" => "system",
            ], [
                'name' => "Chăm sóc học viên",
                'id' => 3,
                "type" => "system",
            ]]);
    }
}
