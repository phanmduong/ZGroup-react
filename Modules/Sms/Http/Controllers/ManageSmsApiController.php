<?php
/**
 * Created by PhpStorm.
 * User: batman
 * Date: 29/03/2018
 * Time: 11:59
 */

namespace Modules\Sms\Http\Controllers;


use App\Http\Controllers\ManageApiController;
use App\SmsList;
use Illuminate\Http\Request;

class ManageSmsApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function assignCampaignInfo($campaign, $request){
        $campaign->name = $request->name;
        $campaign->description = $request->description;
        $campaign->status = $request->status;
        $campaign->needed_quantity = $request->needed_quantity;

        $campaign->save();
    }

    public function getCampaignsList(Request $request)
    {
        $query = trim($request->search);
        $limit = $request->limit ? $request->limit : 20;
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

    public function createCampaign(Request $request){
        $campaign = new SmsList;
        $this->assignCampaignInfo($campaign, $request);

        return $this->respondSuccessWithStatus([
            'message' => 'Tạo chiến dịch thành công'
        ]);
    }

    public function getCampaignDetail($campaignId, Request $request)
    {
        $campaign = SmsList::find($campaignId);
        $limit = $request->limit ? $request->limit : 20;
        $query = trim($request->search);

        if ($campaign == null) {
            return $this->respondErrorWithStatus('Không có chiến dịch này');
        }
        $templates = $campaign->templates()->where('name', 'like', "%$query%")
            ->orWhere('content', 'like', "%$query%");

        if ($limit == -1) {
            $templates = $templates->orderBy('created_at', 'desc')->get();
        } else {
            $templates = $templates->orderBy('created_at', 'desc')->paginate($limit);
        }
        return $this->respondWithPagination($templates, [
            'templates' => $templates->map(function ($template) {
                return $template->transform();
            })]);
    }
}