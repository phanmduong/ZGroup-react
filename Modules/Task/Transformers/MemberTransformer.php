<?php

namespace Modules\Task\Transformers;

use App\Colorme\Transformers\Transformer;

class MemberTransformer extends Transformer
{
    public function transform($member)
    {
        return [
            "id" => $member->id,
            "name" => $member->name,
            "avatar_url" => generate_protocol_url($member->avatar_url),
            "email" => $member->email,
            "added" => $member->added ? $member->added : false
        ];
    }
}