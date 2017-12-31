<?php
/**
 * Created by PhpStorm.
 * User=> caoanhquan
 * Date=> 7/30/16
 * Time=> 18=>17
 */

namespace App\Colorme\Transformers;


use App\Repositories\UserRepository;

class LandingPageTransformer extends Transformer
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function transform($landingPage)
    {

        $user = $landingPage->user;

        return [
            "id" => $landingPage->id,
            "name" => $landingPage->name,
            "path" => $landingPage->path,
            "created_at" => format_vn_short_datetime(strtotime($landingPage->created_at)),
            "updated_at" => format_vn_short_datetime(strtotime($landingPage->updated_at)),
            "user" => $this->userRepository->staff($user),
        ];
    }
}