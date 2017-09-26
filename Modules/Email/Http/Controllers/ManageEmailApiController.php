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
            $subscribers_lists = SubscribersList::where('name', 'like', '%' . $query . '%')
                ->orderBy('created_at', 'desc')->paginate($limit);
        } else {
            $subscribers_lists = SubscribersList::orderBy('created_at', 'desc')->paginate($limit);
        }
        $data = [
            'subscribers_list' => $this->emailRepository->subscribers_list($subscribers_lists)
        ];

        return $this->respondWithPagination($subscribers_lists, $data);
    }

    public function delete_subscribers_list($subscribers_list_id)
    {
        $subscribers_list = SubscribersList::find($subscribers_list_id);
        $subscribers_list->delete();

        return $this->respondSuccess("Xóa subscribers list thành công");
    }

    public function store_subscribers_list(Request $request)
    {
        if ($request->id) {
            $sub_list = SubscribersList::find($request->id);
        } else {
            $sub_list = new SubscribersList();
        }

        $sub_list->name = $request->name;
        $sub_list->save();

        return $this->respondSuccessWithStatus([
            'subscribers_list' => $this->emailRepository->subscribers_list_item($sub_list)
        ]);

    }

    public function subscribers(Request $request)
    {
        $list_id = $request->list_id;
        $search = $request->search;

        $limit = 20;
        if ($search != null) {
            $subscribers = SubscribersList::find($list_id)->subscribers()->where('email', 'like', '%' . $search . '%');
        } else {
            $subscribers = SubscribersList::find($list_id)->subscribers();
        }

        $subscribers = $subscribers->orderBy('created_at', 'desc')->paginate($limit);

        $data = [
            'subscribers' => $subscribers->map(function ($subscriber){
                return $this->emailRepository->subscriber($subscriber);
            }),
        ];

        return $this->respondWithPagination($subscribers, $data);

    }
}
