<?php

namespace Modules\MarketingCampaign\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\MarketingCampaign;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

class MarketingCampaignController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getAll(Request $request)
    {

        if (!$request->limit)
            $limit = 2;
        else
            $limit = $request->limit;

        $marketingCampaigns = MarketingCampaign::orderBy('created_at')->paginate($limit);

        $data = $marketingCampaigns->map(function ($marketingCampaign) {
            return [
                'id' => $marketingCampaign->id,
                'name' => $marketingCampaign->name,
            ];
        });

        return $this->respondWithPagination($marketingCampaigns, [
            'marketing_campaigns' => $data
        ]);

    }

}
