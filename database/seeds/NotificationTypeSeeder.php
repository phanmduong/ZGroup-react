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
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "new_comment",
                'color' => "#c50000",
                'id' => 1,
                "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "also_comment",
                'color' => "#c50000",
                'id' => 2,
                "template" => "[[ACTOR]] cũng đã bình luận bài viết [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "money_transferring",
                'color' => "#c50000",
                'id' => 3,
                "template" => "[[ACTOR]] đang chuyển [[AMOUNT]] cho [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "money_transferred",
                'color' => "#c50000",
                'id' => 4,
                "template" => "[[ACTOR]] đã chuyển [[AMOUNT]] cho [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "new_topic",
                'color' => "#c50000",
                'id' => 5,
                "template" => "[[ACTOR]] đã tạo topic [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "feature",
                'color' => "#c50000",
                'id' => 6,
                "template" => "[[ACTOR]] đã đánh dấu nổi bật bài viết [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "assign_member_to_card",
                'color' => "#2196F3",
                'id' => 7,
                "template" => "[[ACTOR]] vừa thêm bạn vào thẻ [[CARD]] trong dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment_ind</i>"
            ], [
                'name' => "set_card_deadline",
                'color' => "#B71C1C",
                'id' => 8,
                "template" => "[[ACTOR]] vừa bổ sung hạn chót vào thẻ [[CARD]] trong dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#B71C1C\" class=\"material-icons\">alarm_add</i>"
            ], [
                'name' => "notify_saler_student_paid",
                'color' => "#4CAF50",
                'id' => 9,
                "template" => "Chúc mừng bạn, học viên của bạn, [[SALER]], vừa thanh toán thành công [[MONEY]] cho khoá học [[COURSE]]",
                "icon" => "<i style=\"color:#4CAF50\" class=\"material-icons\">account_circle</i>"
            ]
        ]);
    }
}
