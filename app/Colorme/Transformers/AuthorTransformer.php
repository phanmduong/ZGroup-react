<?php
/**
 * Created by PhpStorm.
 * User: caoanhquan
 * Date: 8/2/16
 * Time: 11:50
 */

namespace App\Colorme\Transformers;


class AuthorTransformer extends Transformer
{
    public function __construct()
    {
    }

    public function transform($author)
    {
        return [
            'id' => $author->id,
            'username' => $author->username,
            "name" => $author->name,
            "email" => $author->email,
            'phone' => $author->phone,
            'avatar_url' => $author->avatar_url ? $author->avatar_url : url('img/user.png'),
            'url' => "http://colorme.vn/profile/" . get_first_part_of_email($author->email)
        ];
    }
}