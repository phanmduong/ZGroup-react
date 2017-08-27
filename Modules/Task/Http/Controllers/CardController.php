<?php

namespace Modules\Task\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Modules\Task\Repositories\UserCardRepository;

class CardController extends ManageApiController
{
    protected $userCardRepository;

    public function __construct(UserCardRepository $userCardRepository)
    {
        parent::__construct();
        $this->userCardRepository = $userCardRepository;
    }

    public function assignMember($cardId, $userId)
    {
        $this->userCardRepository->assign($cardId, $userId);
        return $this->respond(["status" => 1]);
    }

}
