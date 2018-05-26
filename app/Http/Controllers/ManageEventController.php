<?php

namespace App\Http\Controllers;

use App\Event;
use App\Organization;
use App\Schedule;
use App\StudySession;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageEventController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function create_event()
    {
        $this->data['current_tab'] = 54;
        $this->data['organizations'] = Organization::orderBy('created_at')->get();

        return view('manage.event.edit_event', $this->data);
    }

    public function store_event(Request $request)
    {
        if ($request->id) {
            $event = Event::find($request->id);
        } else {
            $event = new Event();
        }
        $this->validate($request, [
            'name' => 'required',
            'organization_id' => 'required',
        ]);
        $event->organization_id = $request->organization_id;
        $event->name = $request->name;
        $event->save();

        return redirect('/manage/eventslist');
    }

    public function edit_event($id)
    {
        $this->data['event'] = Event::find($id);
        $this->data['current_tab'] = 54;
        $this->data['organizations'] = Organization::orderBy('created_at')->get();
        return view('manage.event.edit_event', $this->data);
    }

    public function store_organization(Request $request)
    {
        if ($request->id) {
            $organization = Organization::find($request->id);
        } else {
            $organization = new Organization();
        }

        $this->validate($request, [
            'name' => 'required'
        ]);

        $organization->name = $request->name;
        $organization->save();
        return redirect('/manage/organizations');
    }

    public function eventsList()
    {
        $events = Event::orderBy('created_at')->paginate(20);

        $this->data['current_tab'] = 54;
        $this->data['events'] = $events;
        return view('manage.event.event_list', $this->data);
    }

    public function organizations()
    {
        $organizations = Organization::orderBy('created_at')->paginate(20);

        $this->data['current_tab'] = 56;
        $this->data['organizations'] = $organizations;
        return view('manage.event.organization_list', $this->data);
    }

    public function create_organization()
    {
        $this->data['current_tab'] = 56;

        return view('manage.event.edit_organization', $this->data);
    }

    public function edit_organization($id)
    {
        $organization = Organization::find($id);

        $this->data['current_tab'] = 56;
        $this->data['organization'] = $organization;
        return view('manage.event.edit_organization', $this->data);
    }

    public function delete_organization($id)
    {
        Organization::find($id)->delete();
        return redirect('/manage/organizations');
    }
}
