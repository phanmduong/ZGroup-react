<?php

namespace Modules\EmailMaketing\Http\Controllers;

use App\EmailForm;
use App\EmailTemplate;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;
use App\Services\EmailService;

class ManageEmailMaketingController extends ManageApiController
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        parent::__construct();
        $this->emailService = $emailService;
    }

    /**
     * @param Request $request
     */
    public function store_email_form(Request $request)
    {

        if ($request->id) {
            $email_form = EmailForm::find($request->id);
        } else {
            $email_form = new EmailForm();
            $email_form->creator = $this->user->id;
        }

        $email_form->name = $request->name;
        $email_form->title = $request->title;
        $email_form->subtitle = $request->subtitle;
        $email_form->logo_url = trim_url($request->logo_url);
        $email_form->avatar_url = trim_url($request->avatar_url);
        $email_form->title_button = $request->title_button;
        $email_form->link_button = $request->link_button;
        $email_form->template_id = $request->template_id;
        $email_form->content = $request->content;
        $email_form->footer = $request->footer;
        if ($request->status)
            $email_form->status = $request->status;

        $email_form->save();

        return $this->respondSuccessWithStatus([
            'email_form' => [
                'id' => $email_form->id,
                'name' => $email_form->name,
                'title' => $email_form->title,
                'subtitle' => $email_form->subtitle,
            ]
        ]);
    }

    public function email_forms(Request $request)
    {
        $query = $request->search;

        $limit = 18;

        $email_forms = EmailForm::where('hide', 0)->orWhere(function ($q) {
            $q->where('hide', 1)->where('creator', $this->user->id);
        });

        if ($query != null) {
            $email_forms = $email_forms->where(function ($q) use ($query) {
                $q->where('name', 'like', '%' . $query . '%')
                    ->orWhere('title', 'like', '%' . $query . '%');
            })->orderBy('created_at')->paginate($limit);
        } else {
            $email_forms = $email_forms->orderBy('created_at')->paginate($limit);
        }

        $data = [
            "email_forms" => $email_forms->map(function ($email_form) {
                return [
                    'id' => $email_form->id,
                    'name' => $email_form->name,
                    'title' => $email_form->title,
                    'subtitle' => $email_form->subtitle,
                    'logo_url' => config('app.protocol') . trim_url($email_form->logo_url),
                    'creator' => $email_form->creator()->first(),
                    'avatar_url' => config('app.protocol') . trim_url($email_form->avatar_url),
                    'title_button' => $email_form->title_button,
                    'link_button' => $email_form->link_button,
                    'status' => $email_form->status,
                    'hide' => $email_form->hide,
                    'can_delete' => $email_form->type != "system",
                ];
            })
        ];

        return $this->respondWithPagination($email_forms, $data);
    }

    public function all_email_forms()
    {


        $email_forms = EmailForm::where('hide', 0)->orWhere(function ($q) {
            $q->where('hide', 1)->where('creator', $this->user->id);
        })->orderBy('created_at')->get();

        $data = [
            "email_forms" => $email_forms->map(function ($email_form) {
                return [
                    'id' => $email_form->id,
                    'name' => $email_form->name,
                    'title' => $email_form->title,
                    'subtitle' => $email_form->subtitle,
                    'logo_url' => config('app.protocol') . trim_url($email_form->logo_url),
                    'creator' => $email_form->creator()->first(),
                    'avatar_url' => config('app.protocol') . trim_url($email_form->avatar_url),
                    'title_button' => $email_form->title_button,
                    'link_button' => $email_form->link_button,
                    'status' => $email_form->status,
                    'hide' => $email_form->hide
                ];
            })
        ];

        return $this->respondSuccessWithStatus($data);
    }

    public function get_email_form($email_form_id)
    {
        $email_form = EmailForm::where('id', $email_form_id)->first();
        $email_template = $email_form->template()->first();
        if ($email_template) {
            $email_form->template = [
                'id' => $email_template->id,
                'name' => $email_template->name,
                'thumbnail_url' => config('app.protocol') . trim_url($email_template->thumbnail_url),
            ];
        } else {
            $email_form->template = [];
        }
        $email_form->logo_url = config('app.protocol') . trim_url($email_form->logo_url);
        $email_form->avatar_url = config('app.protocol') . trim_url($email_form->avatar_url);

        return $this->respondSuccessWithStatus([
            'email_form' => $email_form
        ]);
    }

    public function delete_email_form($email_form_id)
    {
        $email_form = EmailForm::where('id', $email_form_id)->first();

        if ($email_form->type == "system") {
            return $this->respondErrorWithStatus("Không thể xóa email form này");
        }

        $email_form->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Xóa Email form thành công'
        ]);
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

        if ($request->limit) {
            $limit = $request->limit;
        } else
            $limit = 12;

        if ($query) {
            $email_templates = EmailTemplate::where('name', 'like', '%' . $query . '%')
                ->orderBy('created_at')->paginate($limit);
        } else {
            $email_templates = EmailTemplate::orderBy('created_at')->paginate($limit);
        }

        $data = [
            "email_templates" => $email_templates->map(function ($email_template) {
                $owner = $email_template->owner()->first();
                return [
                    'id' => $email_template->id,
                    'name' => $email_template->name,
                    'thumbnail_url' => config('app.protocol') . trim_url($email_template->thumbnail_url),
                    'owner' => [
                        'id' => $owner->id,
                        'name' => $owner->name
                    ]
                ];
            })
        ];

        return $this->respondWithPagination($email_templates, $data);
    }

    public function get_email_template($email_template_id)
    {
        $email_template = EmailTemplate::where('id', $email_template_id)->first();

        return $this->respondSuccessWithStatus([
            'email_template' => [
                'id' => $email_template->id,
                'name' => $email_template->name,
                'thumbnail_url' => config('app.protocol') . trim_url($email_template->thumbnail_url),
                'content' => $email_template->content
            ]
        ]);
    }

    public function delete_email_template($email_template_id)
    {
        $email_template = EmailTemplate::where('id', $email_template_id)->first();
        $email_template->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Xóa Email form thành công'
        ]);
    }

    public function send_email_test($email_form_id, Request $request)
    {
        $email_form = EmailForm::find($email_form_id);

        if ($email_form) {
            if ($request->email) {
                $user = [
                    'email' => $request->email,
                    'name' => "Tester"
                ];

                $email_form->template = $email_form->template()->first();
                $data = convert_email_form($email_form);

//                dd($data);

                $this->emailService->send_mail_query($user, 'emails.view_email', ['data' => $data], $email_form->name);
                return $this->respondSuccessWithStatus(['message' => "Gửi mail thành công"]);

            }
            return $this->respondErrorWithStatus("Thiếu email");
        }

        return $this->respondErrorWithStatus("Email form không tồn tại");
    }

    public function change_hide_email_form(Request $request)
    {

        if ($request->id == null) {
            return $this->respondErrorWithStatus("Thiếu id");
        }

        $email_form = EmailForm::find($request->id);

        if ($email_form) {
            $email_form->hide = $request->hide;
            $email_form->save();
            return $this->respondSuccessWithStatus([
                'message' => "Thay đổi thành công"
            ]);
        }

        return $this->respondErrorWithStatus("Email form không tồn tại");
    }
}
