<?php

use App\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookManufactureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $bookProject = Project::where("status", "book_manufacture")->first();

        if (is_null($bookProject)) {
            DB::table('projects')->insert([
                "title" => "Sản xuất",
                "description" => "Quản lý sản xuất",
                "color" => "#009688",
                "can_drag_board" => false,
                "can_drag_card" => true,
                "status" => "book_manufacture"
            ]);
        }
    }
}
