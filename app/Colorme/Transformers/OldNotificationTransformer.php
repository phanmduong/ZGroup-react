<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class OldNotificationTransformer extends Transformer
{
    public function transform($notification)
    {
        $data = [
            'id' => $notification->id,
            'created_at' => time_elapsed_string(strtotime($notification->created_at)),
            'seen' => $notification->seen == 1
        ];
        if ($notification->receiver) {
            $data['receiver'] = [
                'id' => $notification->receiver->id,
                'avatar_url' => ($notification->receiver->avatar_url == null) ? url('img/user.png') : generate_protocol_url($notification->receiver->avatar_url),
                'name' => $notification->receiver->name,
                'username' => $notification->receiver->username
            ];
        }
        if ($notification->actor) {
            $data['actor'] = [
                'id' => $notification->actor->id,
                'avatar_url' => ($notification->actor->avatar_url == null) ? url('img/user.png') : generate_protocol_url($notification->actor->avatar_url),
                'name' => $notification->actor->name,
                'username' => $notification->actor->username
            ];
        }

        if ($notification->type <= 2 && $notification->type >= 0) {
//            if ($notification->product == null) {
//                $notification->delete();
//            }
            $data['product'] = [
                'id' => $notification->product->id,
                'linkId' => $notification->product->name ?
                    convert_vi_to_en($notification->product->name) . "-" . $notification->product->id :
                    "bai-tap-colorme-" . $notification->product->id
            ];
        } else if ($notification->type == 3 || $notification->type == 4) {
            $data['transaction'] = [
                'id' => $notification->transaction->id,
                'status' => $notification->transaction->status,
                'money' => currency_vnd_format($notification->transaction->money)
            ];
            if ($notification->transaction->status != 0 && $notification->type == 3) {
                $notification->type = 4;
                $notification->save();
            }
        } else if ($notification->type == 5) {
            $data['topic'] = [
                'id' => $notification->topic->id
            ];
        }
        $data['type'] = notification_type($notification->type);

        return $data;
    }
}