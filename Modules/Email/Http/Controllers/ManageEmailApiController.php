<?php

namespace Modules\Email\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Repositories\EmailRepository;
use App\SubscribersList;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ManageEmailApiController extends ManageApiController
{
    protected $emailRepository;

    public function __construct(EmailRepository $emailRepository)
    {
        parent::__construct();
        $this->emailRepository = $emailRepository;
    }

    public function subscribers_list(Request $request)
    {

        $query = $request->search;
        $limit = 20;
        if ($query) {
            $subscribers_list = SubscribersList::where('name', 'like', '%' . $query . '%')
                ->orderBy('created_at', 'desc')->paginate($limit);
        } else {
            $subscribers_list = SubscribersList::orderBy('created_at', 'desc')->paginate($limit);
        }
        $data = [
            'subscribers_list' => $this->emailRepository->subscribers_list($subscribers_list)
        ];

        return $this->respondWithPagination($subscribers_list, $data);
    }
}
