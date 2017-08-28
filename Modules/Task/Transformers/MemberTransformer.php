<?php

namespace Modules\Task\Transformers;

use App\Colorme\Transformers\Transformer;

class MemberTransformer extends Transformer
{
    protected $card;

    public function setCard($card)
    {
        $this->card = $card;
    }

    public function transform($member)
    {
        $data = [
            "id" => $member->id,
            "name" => $member->name,
            "avatar_url" => generate_protocol_url($member->avatar_url),
            "email" => $member->email,
            "added" => false
        ];
        if ($this->card) {
            $memberIds = $this->card->assignees()->pluck("id")->toArray();
            if (in_array($member->id, $memberIds)) {
                $data['added'] = true;
            }
        }

        return $data;
    }
}