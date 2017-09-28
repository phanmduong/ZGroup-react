<?php

namespace Modules\Email\Http\Controllers;

use App\EmailCampaign;
use App\Http\Controllers\ManageApiController;
use App\Repositories\EmailRepository;
use App\Subscriber;
use App\SubscribersList;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Maatwebsite\Excel\Facades\Excel;

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
            'subscribers' => $subscribers->map(function ($subscriber) {
                return $this->emailRepository->subscriber($subscriber);
            }),
        ];

        return $this->respondWithPagination($subscribers, $data);

    }

    public function add_subscribers(Request $request)
    {
        $list_id = $request->list_id;
        $textEmails = $request->emails;
        $emails = explode(",", $textEmails);
        foreach ($emails as $email) {
            $this->emailRepository->add_subscriber($list_id, $email);
        }

        return $this->respondSuccess("Thêm thành công");
    }

    public function upfile_add_subscribers(Request $request)
    {
        $list_id = $request->list_id;
        $file = $request->file('csv');

        Excel::load($file->getRealPath(), function ($reader) use (&$duplicated, &$imported, $list_id) {
            // Getting all results
            $results = $reader->all();
            foreach ($results as $i) {
                $new_email = extract_email_from_str($i->email);
                $this->emailRepository->add_subscriber($list_id, $new_email, $i->name);
            }
        })->get();

        return $this->respondSuccess("Thêm thành công");
    }

    public function delete_subscriber(Request $request)
    {
        $list_id = $request->list_id;
        $subscriber = SubscribersList::find($list_id)->subscribers()->where('id', $request->subscriber_id)->first();

        if ($subscriber) {
            $subscriber->subscribers_lists()->detach($list_id);
            return $this->respondSuccessWithStatus([
                'message' => "Xóa email thành công"
            ]);
        }

        return $this->respondErrorWithStatus("Subscriber không tồn tại");
    }

    public function get_campaigns(Request $request)
    {
        $query = $request->search;
        $limit = 20;

        if ($request->owner_id) {
            $campaigns = EmailCampaign::where('name', 'like', '%' . $query . '%')
                ->where('owner_id', $request->owner_id)->orderBy('created_at', 'desc')->paginate($limit);
        } else {
            if ($query) {
                $campaigns = EmailCampaign::where('name', 'like', '%' . $query . '%')
                    ->orderBy('created_at', 'desc')->paginate($limit);
            } else {
                $campaigns = EmailCampaign::orderBy('created_at', 'desc')->paginate($limit);
            }
        }

        $data = [
            'campaigns' => $this->emailRepository->campaingns($campaigns)
        ];

        return $this->respondWithPagination($campaigns, $data);
    }
}
