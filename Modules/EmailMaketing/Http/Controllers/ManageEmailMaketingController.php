<?php

namespace Modules\EmailMaketing\Http\Controllers;

use App\EmailTemplate;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\EmailMaketing\Entities\EmailForms;

class ManageEmailMaketingController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param Request $request
     */
    public function store_email_form(Request $request)
    {

        if ($request->id) {
            $email_form = EmailForms::find($request->id);
        } else {
            $email_form = new EmailForms();
            $email_form->creator = $this->user->id;
        }

        $email_form->name = $request->name;
        $email_form->title = $request->title;
        $email_form->subtitle = $request->subtitle;
        $email_form->logo_url = trim_url($request->logo_url);
        $email_form->template_id = $request->template_id;
        $email_form->content = $request->content;
        $email_form->footer = $request->footer;
        if ($request->status)
            $email_form->status = $request->status;

        $email_form->save();

        return $this->respondSuccessWithStatus([
            'email_form'=>[
                'id' => $email_form->id,
                'name' =>$email_form->name,
                'title' =>$email_form->title,
                'subtitle' =>$email_form->subtitle,
            ]
        ]);
    }

    public function email_forms(Request $request)
    {
        $query = $request->search;

        $limit = 20;

        if ($query) {
            $email_forms = EmailForms::where('status', 1)
                ->where(function ($q) use ($query) {
                    $q->where('name', 'like', '%' . $query . '%')
                        ->orWhere('title', 'like', '%' . $query . '%');
                })->orderBy('created_at')->paginate($limit);

        } else {
            $email_forms = EmailForms::where('status', 1)->orderBy('created_at')->paginate($limit);
        }

        $data = [
            "email_forms" => $email_forms->map(function ($email_form) {
                return [
                    'id' => $email_form->id,
                    'name' => $email_form->name,
                    'title' => $email_form->title,
                    'subtitle' => $email_form->subtitle,
                    'logo_url' => config('app.protocol') . $email_form->logo_url,
                    'creator' => $email_form->creator()->first()
                ];
            })
        ];

        return $this->respondWithPagination($email_forms, $data);
    }

    public function store_email_template(Request $request)
    {
        if ($request->id) {
            $email_template = EmailTemplate::find($request->id);
        } else {
            $email_template = new EmailTemplate();
            $email_template->owner_id = $this->user->id;
        }

        $email_template->name = $request->name;
        $email_template->content = $request->content;
        $email_template->thumbnail_url = trim_url($request->thumbnail_url);

        $email_template->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Lưu Email Template thành công'
        ]);
    }

    public function email_templates(Request $request)
    {
        $query = $request->search;

        $limit = 1;

        if ($query) {
            $email_templates = EmailTemplate::where('name', 'like', '%' . $query . '%')
                ->orderBy('created_at')->paginate($limit);
        } else {
            $email_templates = EmailTemplate::orderBy('created_at')->paginate($limit);
        }

        $data = [
            "email_templates" => $email_templates->map(function ($email_template) {
                return [
                    'id' => $email_template->id,
                    'name' => $email_template->name,
                    'thumbnail_url' => config('app.protocol') . $email_template->thumbnail_url,
                    'owner' => $email_template->owner()->first()
                ];
            })
        ];

        return $this->respondWithPagination($email_templates, $data);
    }
}
