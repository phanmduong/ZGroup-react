<?php

use App\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FashionManufactureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fashionProject = Project::where("status", "fashion")->first();

        if (is_null($fashionProject)) {
            DB::table('projects')->insert([
                "title" => "Sản xuất thời trang",
                "description" => "Quản lý sản xuất thời trang",
                "color" => "#009688",
                "can_drag_board" => false,
                "can_drag_card" => true,
                "status" => "fashion"
            ]);
        }
    }
}
