<?php

namespace Modules\Lead\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Repositories\UserRepository;
use App\User;
use App\UserCarer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class ManageLeadApiController extends ManageApiController
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        parent::__construct();
        $this->userRepository = $userRepository;
    }

    public function createLeads(Request $request)
    {
        if ($request->leads == null) {
            return $this->respondErrorWithStatus("Not enough param leads");
        }

        foreach ($request->leads as $lead) {
            $user = User::where('email', '=', $lead['email'])->first();
            $phone = preg_replace('/[^0-9]+/', '', $lead['phone']);
            if ($user == null) {
                $user = new User();
                $user->name = $lead['name'];
                $user->email = $lead['email'];
                $user->username = $lead['email'];
                $user->phone = $phone;
                $user->how_know = $lead['how_know'];
                $user->rate = $lead['rate'];
                $user->role = -1;
            } else {
                $user->name = $user->name ? $user->name : $lead['name'];
                $user->email = $user->email ? $user->email : $lead['email'];
                $user->username = $user->username ? $user->username : $lead['email'];
                $user->phone = $user->phone ? $user->phone : $phone;
                $user->how_know = $user->how_know ? $user->how_know : $lead['how_know'];
                $user->rate = $user->rate > 1 ? $user->rate : 1;
            }
            $user->save();
        }
        return $this->respondSuccess("Create successful");
    }

    public function getLeads(Request $request)
    {

        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));

        $limit = $request->limit ? $request->limit : 20;

        $search = $request->search;

        $leads = User::query();

        if ($search != null) {
            $leads = $leads->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        if ($request->carer_id) {
            $leads = $leads->join("user_carer", "users.id", "=", "user_carer.user_id");
            if ($request->carer_id == 0) {
                $leads = $leads->whereNull("user_carer.carer_id");
            } else {
                if ($request->carer_id == -1) {
                    $leads = $leads->whereNotNull("user_carer.carer_id");
                } else {
                    $leads = $leads->where("user_carer.carer_id", $request->carer_id);
                }
            }
        }

        if ($startTime != null && $endTime != null) {
            $leads = $leads->whereBetween('created_at', array($startTime, $endTime));
        }

        if ($request->rate) {
            $leads = $leads->where('rate', $request->rate);
        }

        $leads = $leads->where('role', '<', 1)->orderBy('created_at', 'desc');

        if ($request->top) {
            $leads = $leads->simplePaginate($request->top);;
        } else {
            $leads = $leads->paginate($limit);
        }


        $data = [
            'leads' => $leads->map(function ($lead) {
                $user = $this->userRepository->student($lead);
                $userCarer = UserCarer::where('user_id', $lead->id)->first();
                if ($userCarer) {
                    $user['carer'] = $this->userRepository->staff($userCarer->carer);
                    $user['assigner'] = $this->userRepository->staff($userCarer->assigner);
                }
                return $user;
            })
        ];

        if ($request->top) {
            return $this->respondWithSimplePagination($leads, $data);

        } else {
            return $this->respondWithPagination($leads, $data);
        }
    }

    public function getAllLeadWithId(Request $request)
    {
        $startTime = $request->start_time;
        $endTime = date("Y-m-d", strtotime("+1 day", strtotime($request->end_time)));

        $limit = $request->limit ? $request->limit : 20;

        $search = $request->search;

        $leads = User::query();

        if ($search != null) {
            $leads = $leads->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        if ($request->carer_id) {
            $leads = $leads->join("user_carer", "users.id", "=", "user_carer.user_id");
            if ($request->carer_id == 0) {
                $leads = $leads->whereNull("user_carer.carer_id");
            } else {
                if ($request->carer_id == -1) {
                    $leads = $leads->whereNotNull("user_carer.carer_id");
                } else {
                    $leads = $leads->where("user_carer.carer_id", $request->carer_id);
                }
            }
        }

        if ($startTime != null && $endTime != null) {
            $leads = $leads->whereBetween('created_at', array($startTime, $endTime));
        }

        if ($request->rate) {
            $leads = $leads->where('rate', $request->rate);
        }

        $leads = $leads->where('role', '<', 1)->orderBy('created_at', 'desc');

        if ($request->top) {
            $leads = $leads->take($request->top);
        }

        $data = [
            'lead_ids' => $leads->get()->map(function ($lead) {
                return $lead->id;
            })
        ];

        return $this->respondSuccessWithStatus($data);
    }

    /**
     * @param Request $request
     */
    public function editInfo(Request $request)
    {
        $lead = User::find($request->id);

        if ($lead == null) {
            return $this->respondErrorWithStatus("Lead không tồn tại");
        }

        if ($lead->email == null || $lead->phone == null || $lead->name == null) {
            return $this->respondErrorWithStatus("Thiếu params");
        }

        $lead->email = $request->email;
        $lead->name = $request->name;
        $lead->phone = $request->phone;
        $lead->rate = $request->rate;

        $lead->save();

        return $this->respondSuccessWithStatus([
            'lead' => $this->userRepository->student($lead)
        ]);
    }

    public function distributionLeads(Request $request)
    {
        if ($request->lead_ids == null) {
            return $this->respondErrorWithStatus("Thiếu lead_ids");
        }

        if ($request->carer_id == null) {
            return $this->respondErrorWithStatus("Thiếu carer_id");
        }


        return $this->respondSuccess("success");
    }
}
