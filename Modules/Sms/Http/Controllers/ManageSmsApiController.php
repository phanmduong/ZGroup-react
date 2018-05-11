<?php

/**
 * Created by PhpStorm.
 * User: batman
 * Date: 29/03/2018
 * Time: 11:59
 */

namespace Modules\Sms\Http\Controllers;


use App\GroupUser;
use App\Http\Controllers\ManageApiController;
use App\SmsList;
use App\SmsTemplate;
use App\SmsTemplateType;
use App\Group;
use App\StudyClass;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Sms;

class ManageSmsApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function assignCampaignInfo($campaign, $request, $user_id)
    {
        $campaign->name = $request->name;
        $campaign->description = $request->description;
        $campaign->status = $request->status;
        $campaign->needed_quantity = $request->needed_quantity;
        $campaign->user_id = $user_id;
        $campaign->save();
    }

    public function assignTemplateInfo($template, $request, $user_id, $campaignId)
    {
        $template->name = $request->name;
        $template->content = $request->content;
        $template->user_id = $user_id;
        $template->sms_template_type_id = $request->sms_template_type_id;
        $template->send_time = $request->send_time;
        $template->sms_list_id = $campaignId;
    }

    public function getCampaignsList(Request $request)
    {
        $query = trim($request->search);
        $limit = $request->limit ? intval($request->limit) : 20;
        $campaigns = SmsList::query();
        if ($query) {
            $campaigns = $campaigns->where('name', 'like', "%$query%");
        }
        if ($limit == -1) {
            $campaigns = $campaigns->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'campaigns' => $campaigns->map(function ($campaign) {
                    return $campaign->getData();
                })
            ]);
        }
        $campaigns = $campaigns->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($campaigns, [
            'campaigns' => $campaigns->map(function ($campaign) {
                return $campaign->getData();
            })
        ]);
    }

    public function getTemplateTypes(Request $request)
    {
        $query = trim($request->search);
        $limit = $request->limit ? intval($request->limit) : 20;
        $templateTypes = SmsTemplateType::query();
        if ($query) {
            $templateTypes = $templateTypes->where('name', 'like', "%$query%");
        }
        if ($limit == -1) {
            $templateTypes = $templateTypes->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'template_types' => $templateTypes->map(function ($templateType) {
                    return $templateType->getData();
                })
            ]);
        }
        $templateTypes = $templateTypes->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($templateTypes, [
            'template_types' => $templateTypes->map(function ($templateType) {
                return $templateType->getData();
            })
        ]);
    }

    public function createCampaign(Request $request)
    {
        $campaign = new SmsList;
        $group = new Group;
        $group->save();
        $campaign->group_id = $group->id;
        $this->assignCampaignInfo($campaign, $request, $this->user->id);
        return $this->respondSuccessWithStatus([
            'message' => 'Tạo chiến dịch thành công'
        ]);
    }

    public function editCampaign($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        if ($campaign == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại chiến dịch này'
            ]);
        }
        $this->assignCampaignInfo($campaign, $request, $campaign->user_id);
        return $this->respondSuccessWithStatus([
            'message' => 'Sửa chiến dịch thành công'
        ]);
    }

    public function changeCampaignStatus($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        if ($campaign == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại chiến dịch này'
            ]);
        }
        $campaign->status = $request->status;
        $campaign->save();
        return $this->respondSuccessWithStatus([
            'message' => 'Thay đổi trạng thái thành công'
        ]);
    }

    public function createTemplate($campaignId, Request $request)
    {
        $template = new SmsTemplate;
        $this->assignTemplateInfo($template, $request, $this->user->id, $campaignId);
        $template->sent_quantity = 0;
        $template->save();

        return $this->respondSuccessWithStatus([
            'message' => 'Tạo tin nhắn thành công'
        ]);
    }

    public function editTemplate($templateId, Request $request)
    {
        $template = SmsTemplate::find($templateId);
        if ($template == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại tin nhắn này'
            ]);
        }
        $this->assignTemplateInfo($template, $request, $template->user_id, $template->sms_list_id);
        $template->save();
        return $this->respondSuccessWithStatus([
            'message' => 'Sửa tin nhắn thành công'
        ]);
    }

    public function getCampaignTemplates($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        $limit = $request->limit ? intval($request->limit) : 20;
        $search = trim($request->search);

        if ($campaign == null) {
            return $this->respondErrorWithStatus('Không có chiến dịch này');
        }
        $templates = $campaign->templates()->where(function ($query) use ($search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('content', 'like', "%$search%");
        });

        if ($limit == -1) {
            $templates = $templates->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                "campaign" => $campaign->getData(),
                'templates' => $templates->map(function ($template) {
                    return $template->transform();
                })
            ]);
        }
        $templates = $templates->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($templates, [
            "campaign" => $campaign->getData(),
            'templates' => $templates->map(function ($template) {
                return $template->transform();
            })
        ]);
    }

    public function getCampaignReceivers($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        $limit = $request->limit ? intval($request->limit) : 20;
        $search = trim($request->search);
        if ($campaign == null) {
            return $this->respondErrorWithStatus('Không có chiến dịch này');
        }
        $users = $campaign->group->user()->where(function ($query) use ($search) {
            $query->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")->orWhere('phone', 'like', "%$search%");
        });
        if ($limit == -1) {
            $users = $users->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'users' => $users->map(function ($user) {
                    return $user->getReceivers();
                })
            ]);
        }
        $users = $users->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($users, [
            'receivers' => $users->map(function ($user) {
                return $user->getReceivers();
            })
        ]);

    }

    public function createTemplateType(Request $request)
    {
        $template_type = new SmsTemplateType;
        $check = SmsTemplateType::where('name', trim($request->name))->get();
        if (count($check) > 0)
            return $this->respondErrorWithStatus([
                'message' => 'Đã tồn tại loại tin nhăn này'
            ]);
        $template_type->name = $request->name;
        $template_type->color = $request->color;
        $template_type->save();
        return $this->respondSuccessWithStatus([
            'message' => 'Tạo loại tin nhắn thành công'
        ]);
    }

    public function editTemplateType($templateTypeId, Request $request)
    {
        $template_type = SmsTemplateType::find($templateTypeId);
        $check = SmsTemplateType::where('name', trim($request->name))->get();
        if (count($check) > 0 && $template_type->name !== $request->name)
            return $this->respondErrorWithStatus([
                'message' => 'Không thể chỉnh sửa vì bị trùng tên'
            ]);
        $template_type->name = $request->name;
        $template_type->color = $request->color;
        $template_type->save();
        return $this->respondSuccessWithStatus([
            'message' => 'Sửa loại tin nhắn thành công'
        ]);
    }

    public function addUsersIntoCampaign($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        if ($campaign == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại chiến dịch này'
            ]);
        }
        $group = $campaign->group;
        $users = json_decode($request->users);
        foreach ($users as $user) {
            $groups_users = new GroupUser;
            $groups_users->group_id = $group->id;
            $groups_users->user_id = $user->id;
            $groups_users->save();
        }
        return $this->respondSuccessWithStatus([
            'message' => 'Thêm người nhận vào chiến dịch thành công'
        ]);
    }

    public function getReceiversChoice($campaignId, Request $request)
    {
        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));
        $gens = json_decode($request->gens);
        $classes = json_decode($request->classes);
        $limit = $request->limit ? intval($request->limit) : 20;
        if ($request->carer_id) {
            $users = User::find($request->carer_id)->getCaredUsers();
        } else $users = User::query();


        if ($startTime != null && $endTime != null) {
            $users = $users->whereBetween('users.created_at', array($startTime, $endTime));
        }

        if ($request->rate) {
            $users = $users->where("rate", $request->rate);
        }

        if ($gens) {
            $classes_gens = StudyClass::join("gens", "gens.id", "=", "classes.gen_id")->select("classes.*")
                ->where(function ($query) use ($gens) {
                    for ($index = 0; $index < count($gens); ++$index) {
                        $gen_id = $gens[$index]->value;
                        if ($index == 0)
                            $query->where('gens.id', '=', $gen_id);
                        else
                            $query->orWhere('gens.id', '=', $gen_id);
                    }
                })->get()->toArray();
        } else $classes_gens = null;

        if ($classes_gens != null || $classes != null || $request->paid_course_quantity) {
            $users = $users->join('registers', 'registers.user_id', '=', 'users.id')
                ->where(function ($query) use ($classes_gens) {
                    if ($classes_gens) {
                        for ($index = 0; $index < count($classes_gens); ++$index) {
                            $class_id = $classes_gens[$index]['id'];
                            if ($index == 0)
                                $query->where('registers.class_id', '=', $class_id);
                            else
                                $query->orWhere('registers.class_id', '=', $class_id);
                        }
                    }
                })->where(function ($query) use ($classes) {
                    if ($classes) {
                        for ($index = 0; $index < count($classes); ++$index) {
                            $class_id = $classes[$index]->value;
                            if ($index == 0)
                                $query->where('registers.class_id', '=', $class_id);
                            else
                                $query->orWhere('registers.class_id', '=', $class_id);
                        }
                    }
                })->select('users.*')->groupBy('users.id');
            if ($request->paid_course_quantity) {
                $users = $users->where('registers.money', '>', 0)->havingRaw('count(*) = ' . $request->paid_course_quantity);
            }
        }

        $campaign = SmsList::find($campaignId);
        $group_id = $campaign->group->id;

        $users = $users->whereNotExists(function ($query) use ($group_id) {
            $query->select(DB::raw(1))
                ->from('groups_users')
                ->whereRaw('groups_users.user_id = users.id and groups_users.group_id=' . $group_id);
        });

        if ($request->top) {
            $users = $users->simplePaginate(intval($request->top));
        } else {
            if ($limit == -1) {
                $users = $users->orderBy('created_at', 'desc')->get();
                return $this->respondSuccessWithStatus([
                    'users' => $users->map(function ($user) {
                        return $user->getReceivers();
                    })
                ]);
            }
            $users = $users->paginate($limit);
        }

        if ($request->top) {
            return $this->respondWithSimplePagination($users, [
                'users' => $users->map(function ($user) {
                    return $user->getReceivers();
                })
            ]);
        }
        return $this->respondWithPagination($users, [
            'users' => $users->map(function ($user) {
                return $user->getReceivers();
            })
        ]);
    }

    public function getHistory($campaignId, Request $request)
    {
        $histories = Sms::join('sms_template', 'sms_template.id', '=', 'sms.sms_template_id')
            ->where('sms_template.sms_list_id', '=', $campaignId);
        $limit = $request->limit ? intval($request->limit) : 20;
        $search = trim($request->search);
        $histories = $histories->join('users', 'users.id', '=', 'sms.user_id')
            ->where(function ($query) use ($search) {
                if ($search) {
                    $query->where('users.name', 'like', "%$search%")->orWhere('users.phone', 'like', "%$search%");
                }
            })->select('sms.*');

        if ($limit == -1) {
            $histories = $histories->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'histories' => $histories->map(function ($history) {
                    return $history->getHistories();
                })
            ]);
        }
        $histories = $histories->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($histories, [
            'histories' => $histories->map(function ($history) {
                return $history->getHistories();
            })
        ]);
    }

    public function getHistoryUser($campaignId, Request $request)
    {
        $histories = Sms::join('sms_template', 'sms_template.id', '=', 'sms.sms_template_id')
            ->where('sms_template.sms_list_id', '=', $campaignId)->where('sms.user_id', '=', $request->user_id);
        $limit = $request->limit ? intval($request->limit) : 15;
        $search = trim($request->search);
        if ($search) {
            $histories = $histories->where('sms.content', 'like', "%$search%");
        }
        if ($limit == -1) {
            $histories = $histories->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'histories' => $histories->map(function ($history) {
                    return $history->getHistories();
                })
            ]);
        }
        $histories = $histories->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination($histories, [
            'histories' => $histories->map(function ($history) {
                return $history->getHistories();
            })
        ]);
    }

    public function removeUserFromCampaign($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        if ($campaign == null) {
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại chiến dịch này'
            ]);
        }
        if ($request->user_id == null)
            return $this->respondErrorWithStatus([
                'message' => 'Bạn chưa chọn người dùng'
            ]);
        $group = $campaign->group;
        $group_user = GroupUser::where('group_id', $group->id)->where('user_id', $request->user_id)->first();
        $group_user->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'Đã xóa người nhận khỏi chiến dịch'
        ]);
    }
}