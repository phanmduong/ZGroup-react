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
        $types = NotificationType::where('status', 0)->get();

        foreach ($types as $type) {
            $type->forceDelete();
        }

        DB::table('notification_types')->insert([
            [
                'name' => "new_comment",
                'color' => "#c50000",
                'id' => 1,
                "type" => "social",
                "template" => "[[ACTOR]] đã bình luận bài viết [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "also_comment",
                'color' => "#c50000",
                'id' => 2,
                "type" => "social",
                "template" => "[[ACTOR]] cũng đã bình luận bài viết [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "money_transferring",
                'color' => "#c50000",
                'id' => 3,
                "type" => "manage",
                "template" => "[[ACTOR]] đang chuyển [[AMOUNT]] cho [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "money_transferred",
                'color' => "#c50000",
                'id' => 4,
                "type" => "manage",
                "template" => "[[ACTOR]] đã chuyển [[AMOUNT]] cho [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "new_topic",
                'color' => "#c50000",
                'id' => 5,
                "type" => "social",
                "template" => "[[ACTOR]] đã tạo topic [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "feature",
                'color' => "#c50000",
                'id' => 6,
                "type" => "social",
                "template" => "Bài viết của bạn [[TARGET]] đã được [[ACTOR]] đánh dấu nổi bật",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ], [
                'name' => "assign_member_to_card",
                'color' => "#2196F3",
                'id' => 7,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa thêm bạn vào thẻ [[CARD]] trong dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment_ind</i>"
            ], [
                'name' => "set_card_deadline",
                'color' => "#B71C1C",
                'id' => 8,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa bổ sung hạn chót vào thẻ [[CARD]] trong dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#B71C1C\" class=\"material-icons\">alarm_add</i>"
            ], [
                'name' => "notify_saler_student_paid",
                'color' => "#4CAF50",
                'id' => 9,
                "type" => "manage",
                "template" => "Chúc mừng bạn, học viên của bạn, [[SALER]], vừa thanh toán thành công [[MONEY]] cho khoá học [[COURSE]]",
                "icon" => "<i style=\"color:#4CAF50\" class=\"material-icons\">account_circle</i>"
            ], [
                'name' => "remind_calendar_event",
                'color' => "#B71C1C",
                'id' => 10,
                "type" => "manage",
                "template" => "Còn 1 tiếng nữa, sự kiện [[EVENT]] sẽ diễn ra",
                "icon" => "<i style=\"color:#B71C1C\" class=\"material-icons\">hourglass_empty</i>"
            ], [
                'name' => "update_card_description",
                'color' => "#2196F3",
                'id' => 11,
                "type" => "manage",
                "template" => "[[USER]] vừa thay đổi mô tả của thẻ [[CARD]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "rename_card",
                'color' => "#2196F3",
                'id' => 12,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa thay đổi tên của thẻ [[CARD]] thành [[NAME]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "submit_homework",
                'color' => "#2196F3",
                'id' => 13,
                "type" => "social",
                "template" => "[[TEACHER]] ơi! Học viên của bạn, [[STUDENT]] vừa nộp bài vào topic [[TOPIC]] của lớp [[CLASS]]. Bạn nhớ dành thời gian vào comment nhé!",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">bookmark</i>"
            ], [
                'name' => "assign_to_project",
                'color' => "#2196F3",
                'id' => 14,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa thêm bạn vào dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "remove_from_project",
                'color' => "#2196F3",
                'id' => 15,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa xoá bạn khỏi dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "edit_title_project",
                'color' => "#2196F3",
                'id' => 16,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa thay đổi tên của dự án [[PROJECT]] thành [[NEW_NAME]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "edit_description_project",
                'color' => "#2196F3",
                'id' => 17,
                "type" => "manage",
                "template" => "[[ACTOR]] vừa thay đổi mô tả của dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "comment_card",
                'color' => "#2196F3",
                'id' => 18,
                "type" => "manage",
                "template" => "[[ACTOR]] bình luận vào thẻ [[CARD]] trong dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">comment</i>"
            ], [
                'name' => "add_member_to_task",
                'color' => "#2196F3",
                'id' => 19,
                "type" => "manage",
                "template" => "[[ACTOR]] giao công việc cho bạn [[TASK]] trong thẻ [[CARD]] dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "add_task_deadline",
                'color' => "#2196F3",
                'id' => 20,
                "type" => "manage",
                "template" => "[[ACTOR]] thay đổi hạn chót thành [[DEADLINE]] cho công việc [[TASK]] trong thẻ [[CARD]] dự án [[PROJECT]]",
                "icon" => "<i style=\"color:#2196F3\" class=\"material-icons\">assignment</i>"
            ], [
                'name' => "timer_sended_email_campaign",
                'color' => "#4CAF50",
                'id' => 21,
                "type" => "manage",
                "template" => "Chiến dịch của bạn, [[NAME_CAMPAIGN]] đã bắt đầu được gửi",
                "icon" => "<i style=\"color:#4CAF50\" class=\"material-icons\">mail</i>"
            ], [
                'name' => "confirm_student_attendance",
                'color' => "#4CAF50",
                'id' => 22,
                "type" => "social",
                "template" => "Bạn đã được điểm danh buổi [[LESSON_ORDER]] lớp [[CLASS_NAME]]",
                "icon" => "<i class=\"material-icons\">playlist_add_check</i>"
            ],
            [
                'name' => "remind_check_in_teach",
                'color' => "#4CAF50",
                'id' => 23,
                "type" => "social",
                "template" => "Bạn nhớ check in lớp [[CLASS_NAME]] lúc [[TIME]] nhé",
                "icon" => "<i class=\"material-icons\">radio_button_checked</i>"
            ],
            [
                'name' => "remind_check_out_teach",
                'color' => "#4CAF50",
                'id' => 24,
                "type" => "social",
                "template" => "Bạn nhớ check out lớp [[CLASS_NAME]] lúc [[TIME]] nhé",
                "icon" => "<i class=\"material-icons\">radio_button_unchecked</i>"
            ],
            [
                'name' => "remind_check_in_sm",
                'color' => "#4CAF50",
                'id' => 25,
                "type" => "manage",
                "template" => "Bạn nhớ check in [[SHIFT]] lúc [[TIME]] nhé",
                "icon" => "<i class=\"material-icons\">radio_button_checked</i>"
            ],
            [
                'name' => "remind_check_out_sm",
                'color' => "#4CAF50",
                'id' => 26,
                "type" => "manage",
                "template" => "Bạn nhớ check out [[SHIFT]] lúc [[TIME]] nhé",
                "icon" => "<i class=\"material-icons\">radio_button_unchecked</i>"
            ], [
                'name' => "check_in_teach_success",
                'color' => "#4CAF50",
                'id' => 27,
                "type" => "social",
                "template" => "Bạn đã check in lớp [[CLASS_NAME]] thành công",
                "icon" => "<i class=\"material-icons\">radio_button_checked</i>"
            ], [
                'name' => "check_out_teach_success",
                'color' => "#4CAF50",
                'id' => 28,
                "type" => "social",
                "template" => "Bạn đã check out lớp [[CLASS_NAME]] thành công",
                "icon" => "<i class=\"material-icons\">radio_button_unchecked</i>"
            ], [
                'name' => "check_in_sm_success",
                'color' => "#4CAF50",
                'id' => 29,
                "type" => "manage",
                "template" => "Bạn đã check in [[SHIFT]] thành công",
                "icon" => "<i class=\"material-icons\">radio_button_checked</i>"
            ], [
                'name' => "check_out_sm_success",
                'color' => "#4CAF50",
                'id' => 30,
                "type" => "manage",
                "template" => "Bạn đã check out [[SHIFT]] thành công",
                "icon" => "<i class=\"material-icons\">radio_button_unchecked</i>"
            ], [
                'name' => "check_in_work_shift_success",
                'color' => "#4CAF50",
                'id' => 31,
                "type" => "manage",
                "template" => "Bạn đã check in ca làm việc [[WORK_SHIFT]] thành công",
                "icon" => "<i class=\"material-icons\">radio_button_checked</i>"
            ], [
                'name' => "check_out_work_shift_success",
                'color' => "#4CAF50",
                'id' => 32,
                "type" => "manage",
                "template" => "Bạn đã check out ca làm việc [[WORK_SHIFT]] thành công",
                "icon" => "<i class=\"material-icons\">radio_button_unchecked</i>"
            ],
            [
                'name' => "remind_check_in_work_shift",
                'color' => "#4CAF50",
                'id' => 33,
                "type" => "manage",
                "template" => "Bạn nhớ check in ca làm việc [[WORK_SHIFT]] lúc [[TIME]] nhé",
                "icon" => "<i class=\"material-icons\">radio_button_checked</i>"
            ],
            [
                'name' => "remind_check_out_sm",
                'color' => "#4CAF50",
                'id' => 34,
                "type" => "manage",
                "template" => "Bạn nhớ check out ca làm việc [[WORK_SHIFT]] lúc [[TIME]] nhé",
                "icon" => "<i class=\"material-icons\">radio_button_unchecked</i>"
            ],
            [
                'name' => "like",
                'color' => "#c50000",
                'id' => 35,
                "type" => "social",
                "template" => "[[ACTOR]] đã thích bài viết [[TARGET]]",
                "icon" => "<i style=\"color:#c50000\" class=\"material-icons\">thumb_up</i>"
            ],
        ]);
    }
}
