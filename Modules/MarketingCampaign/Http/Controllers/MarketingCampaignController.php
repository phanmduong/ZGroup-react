<?php

namespace Modules\MarketingCampaign\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\MarketingCampaign;
use App\Register;
use App\StudyClass;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class MarketingCampaignController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll(Request $request)
    {

        if (!$request->limit)
            $limit = 20;
        else
            $limit = $request->limit;

        $marketingCampaigns = MarketingCampaign::orderBy('created_at')->paginate($limit);

        $data = $marketingCampaigns->map(function ($marketingCampaign) {
            return [
                'id' => $marketingCampaign->id,
                'name' => $marketingCampaign->name,
                'color' => $marketingCampaign->color,
            ];
        });

        return $this->respondWithPagination($marketingCampaigns, [
            'marketing_campaigns' => $data
        ]);
    }

    public function summaryMarketingCampaign(Request $request)
    {
        $summary = Register::select(DB::raw('count(*) as total_registers, campaign_id, saler_id'))
            ->whereNotNull('campaign_id')->whereNotNull('saler_id')->where('money', '>', 0)->where('saler_id', '>', 0)->where('campaign_id', '>', 0)
            ->groupBy('campaign_id', 'saler_id');

        if ($request->gen_id && $request->gen_id != 0) {
            $summary->where('gen_id', $request->gen_id);
        }

        if ($request->base_id && $request->base_id != 0) {
            $class_ids = StudyClass::where('base_id', $request->base_id)->pluck('id')->toArray();
            $summary->whereIn('class_id', $class_ids);
        }

        $summary = $summary->get()->map(function ($item) {

            $data = [
                'total_registers' => $item->total_registers,
                'campaign' => [
                    'id' => $item->marketing_campaign->id,
                    'name' => $item->marketing_campaign->name,
                    'color' => $item->marketing_campaign->color,
                ]
            ];

            if ($item->saler) {
                $data['saler'] = [
                    'id' => $item->saler->id,
                    'name' => $item->saler->name,
                    'color' => $item->saler->color,
                ];
            }

            return $data;
        });

        return $this->respondSuccessWithStatus([
            'summary_marketing_campaign' => $summary
        ]);
    }

}
