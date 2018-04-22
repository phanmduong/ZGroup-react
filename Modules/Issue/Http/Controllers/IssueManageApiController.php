<?php

namespace Modules\Issue\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class IssueManageApiController extends ManageApiController
{
    public function createIssue(Request $request){
        $httpClient = new \GuzzleHttp\Client();
        $url = 'https://api.keetool.com/create-issue';
        $response = $httpClient->post($url, [
            'form_params' => [
                'email' => $this->user->email,
                'name' => $this->user->name,
                'phone' => $this->user->phone,
                'avatar_url' => $this->user->avatar_url,
                'title' => $request->title,
                'description' => $request->description,
                'content' => $request->content,
                'domain' => config('app.domain'),
            ]
        ]);
        $res = json_decode($response->getBody()->getContents());
        return $this->respond($res);
    }


}
