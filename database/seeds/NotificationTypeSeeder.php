<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\NotificationType;

class NotificationTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = NotificationType::all();

        foreach ($types as $type) {
            $type->delete();
        }

        DB::table('notification_types')->insert([
            [
                'name' => "like",
                'color' => "#c50000",
                'id' => 0,
                "template" => "[[ACTOR]] đã thích bài viết [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "new_comment",
                'color' => "#c50000",
                'id' => 1,
                "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "also_comment",
                'color' => "#c50000",
                'id' => 2,
                "template" => "[[ACTOR]] cũng đã bình luận bài viết [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "money_transferring",
                'color' => "#c50000",
                'id' => 3,
                "template" => "[[ACTOR]] đang chuyển [[AMOUNT]] cho [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "money_transferred",
                'color' => "#c50000",
                'id' => 4,
                "template" => "[[ACTOR]] đã chuyển [[AMOUNT]] cho [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "new_topic",
                'color' => "#c50000",
                'id' => 5,
                "template" => "[[ACTOR]] đã tạo topic [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "feature",
                'color' => "#c50000",
                'id' => 6,
                "template" => "[[ACTOR]] đã đánh dấu nổi bật bài viết [[TARGET]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "assign_member_to_card",
                'color' => "#c50000",
                'id' => 7,
                "template" => "[[ACTOR]] vừa thêm bạn vào thẻ [[CARD]] trong dự án [[PROJECT]]",
                "icon" => "<i class=\"material-icons\">thumb_up</i>"
            ]
        ]);
    }
}
