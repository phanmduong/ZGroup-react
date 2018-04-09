<?php
namespace Modules\User\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ManageApiController;
use App\Gen;
use App\MarketingCampaign;
use Illuminate\Support\Facades\DB;

class UserManageApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getDetailProfile(Request $request)
    {
        $gen_id = $request->gen_id ? $request->gen_id : Gen::getCurrentGen()->id;
        $user = $this->user;
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'username' => $user->username,
            'avatar_url' => generate_protocol_url($user->avatar_url),
            'color' => $user->color,
            'marital' => $user->marital,
            'homeland' => $user->homeland,
            'literacy' => $user->literacy,
            'money' => $user->money,
            'start_company' => $user->start_company,
            'start_company_vi' => format_date($user->start_company),
            'address' => $user->address,
            'age' => $user->age,
            'color' => $user->color,
            'current_role' => [
                'id' => $user->current_role->id,
                'role_title' => $user->current_role->role_title
            ]
        ];

        $registers = $user->sale_registers()->where('gen_id', $gen_id);

        $cloneRegisters = clone $registers;
        
        $data['total_registers_count'] = $cloneRegisters->count();

        $data['paid_registers_count'] = $cloneRegisters->select(DB::raw('sum(status) as paid_registers_count'))->first()->paid_registers_count;

        $data['total_money'] = $cloneRegisters->select(DB::raw('sum(money) as total_money'))->first()->total_money;

        $data['registers'] = $registers->orderBy('created_at', 'desc')->get();
        
        $data['campaigns'] = MarketingCampaign::join('registers', 'marketing_campaign.id', '=', 'registers.campaign_id')
            ->where('registers.gen_id', $gen_id)
            ->where('registers.saler_id', $user->id)
            ->select('marketing_campaign.*', DB::raw('count(*) as register_count'), DB::raw('sum(registers.status) as paid_register_count'), DB::raw('sum(money) as total_money'))
            ->groupBy('marketing_campaign.id')->get();
            
        return $this->respondSuccessWithStatus(['user' => $data]);
    }
}