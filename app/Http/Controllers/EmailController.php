<?php

namespace App\Http\Controllers;

use App\Subscriber;
use App\SubscribersList;
use App\Test;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Session;
use Maatwebsite\Excel\Facades\Excel;

class EmailController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 28;
    }

    public function subscribers_list()
    {
        $subscribersLists = SubscribersList::orderBy('created_at', 'desc')->paginate(15);

        $lastPage = $subscribersLists->lastPage();
        $currentPage = $subscribersLists->currentPage();

        $this->data['lastPage'] = $lastPage;
        $this->data['currentPage'] = $currentPage;
        $this->data['subscribersLists'] = $subscribersLists;
        return view('manage.email.subscribers_list', $this->data);
    }

//    public function merge()
//    {
//
//    }

    public function new_subscribers_list()
    {
        return view('manage.email.new_subscribers_list', $this->data);
    }

    public function store_subscribers_list(Request $request)
    {
        $name = str_replace(",", " và", $request->name);

        $sub_list = new SubscribersList();
        $sub_list->name = $name;
        $sub_list->save();

        return redirect('manage/subscribers_list');
    }

    public function subscribers(Request $request)
    {
        $list_id = $request->list_id;
        $q = $request->q;
        if ($q != null) {
            $subscribers = SubscribersList::find($list_id)->subscribers()->where('email', 'like', '%' . $q . '%')->orderBy('created_at', 'desc')->take(50)->get();
            $this->data['subscribers'] = $subscribers;
        } else {
            $subscribers = SubscribersList::find($list_id)->subscribers()->orderBy('created_at', 'desc')->take(50)->get();
            $this->data['subscribers'] = $subscribers;
        }


        $this->data['list'] = SubscribersList::find($list_id);
        $this->data['num_subscribers'] = $subscribers = SubscribersList::find($list_id)->subscribers()->count();
        return view('manage.email.subscribers', $this->data);
    }

    public function upload_subscribers_csv(Request $request)
    {
        $list_id = $request->list_id;
        $this->data['list_id'] = $list_id;
        return view('manage.email.upload_subscribers_csv', $this->data);
    }

    public function new_subscriber(Request $request)
    {
        $list_id = $request->list_id;
        $this->data['list_id'] = $list_id;
        return view('manage.email.new_subscriber', $this->data);
    }

    public function store_subscriber(Request $request)
    {
        $list_id = $request->list_id;
        $duplicated = array();
        $imported = array();
        $text = $request->emails;
        $matches = array(); //create array
        $pattern = '/[A-Za-z0-9_-]+@[A-Za-z0-9_-]+\.([A-Za-z0-9_-][A-Za-z0-9_]+)/'; //regex for pattern of e-mail address
//        preg_match_all($pattern, $text, $matches); //find matching pattern
        $emails = explode(",", $text);

        foreach ($emails as $email) {
            $subscriber = Subscriber::where('email', $email)->first();
            if ($subscriber == null) {
                if ($email != null) {
                    $subscriber = new Subscriber();
                    $subscriber->email = $email;
                    $subscriber->save();
                    $subscriber->subscribers_lists()->attach($list_id);
                    $imported[] = $email;
                }
            } else {
                $count = $subscriber->subscribers_lists()->where('id', $list_id)->count();
                if ($count > 0) {
                    $duplicated[] = $email;
                } else {
                    $subscriber->subscribers_lists()->attach($list_id);
                    $imported[] = $email;
                }
                $subscriber->save();
            }

        }
        Session::flash('imported', $imported);
        Session::flash('duplicated', $duplicated);
        return redirect('manage/new_subscriber?list_id=' . $list_id);
    }

    public function handle_file_upload(Request $request)
    {
        $file = $request->file('csv');
        $duplicated = 0;
        $imported = 0;
        $list_id = $request->list_id;

        Excel::load($file->getRealPath(), function ($reader) use (&$duplicated, &$imported, $list_id) {
            // Getting all results
            $results = $reader->all();
            foreach ($results as $i) {
                $new_email = extract_email_from_str($i->email);
                $subscriber = Subscriber::where('email', $new_email)->first();
                if ($subscriber == null) {
                    if ($new_email != null) {
                        $subscriber = new Subscriber();
                        $subscriber->email = $new_email;
                        $subscriber->name = $i->name;
                        $subscriber->save();
                        $subscriber->subscribers_lists()->attach($list_id);
                        $imported += 1;
                    }
                } else {
                    $count = $subscriber->subscribers_lists()->where('id', $list_id)->count();
                    if ($count > 0) {
                        $duplicated += 1;
                    } else {
                        $subscriber->subscribers_lists()->attach($list_id);
                        $imported += 1;
                    }
                    $subscriber->name = $i->name;
                    $subscriber->save();
                }

            }
            Session::flash('imported', $imported);
            Session::flash('duplicated', $duplicated);
        })->get();
        return redirect('manage/upload_subscribers_csv?list_id=' . $list_id);
    }

}
