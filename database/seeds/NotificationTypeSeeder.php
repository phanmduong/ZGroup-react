<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NotificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => "like",
            'color' => "#c50000",
            'id' => 0,
            "template" => "[[ACTOR]] đã thích bài viết [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "new_comment",
            'color' => "#c50000",
            'id' => 1,
            "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "also_comment",
            'color' => "#c50000",
            'id' => 2,
            "template" => "[[ACTOR]] cũng đã bình luận bài viết [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "money_transferring",
            'color' => "#c50000",
            'id' => 3,
            "template" => "[[ACTOR]] đang chuyển [[AMOUNT]] cho [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "money_transferred",
            'color' => "#c50000",
            'id' => 4,
            "template" => "[[ACTOR]] đã chuyển [[AMOUNT]] cho [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "new_comment",
            'color' => "#c50000",
            'id' => 1,
            "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "new_comment",
            'color' => "#c50000",
            'id' => 1,
            "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ],[
            'name' => "new_comment",
            'color' => "#c50000",
            'id' => 1,
            "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
            "icon" => "<i class=\"material-icons\">thumb_up</i>"
        ]);
    }
}
