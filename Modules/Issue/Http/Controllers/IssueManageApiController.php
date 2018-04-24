<?php

namespace Modules\Issue\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\User;
use Illuminate\Http\Request;

class IssueManageApiController extends ManageApiController
{
    public function createIssue(Request $request)
    {
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
                'domain' => 'zgroup.vn',
            ]
        ]);
        $issue = json_decode($response->getBody()->getContents())->data->issue;
        $user = User::where('email', $issue->email)->first();
        $res = [
            'name' => $user->name,
            'avatar_url' => $user->avatar_url,
            'email' => $user->email,
            'phone' => $user->phone,
            'color' => $user->color,
            'title' => $issue->title,
            'description' => $issue->description,
            'content' => $issue->content,
            'status' => $issue->status,
        ];
        return $this->respondSuccessWithStatus([
            'issue' => $res
        ]);
    }

    public function getAllIssue(Request $request)
    {
        $httpClient = new \GuzzleHttp\Client();
        $url = 'https://api.keetool.com/get-all-issues?domain=' . 'zgroup.vn' . '&search='
            . $request->search . '&status=' . $request->status;
        $response = $httpClient->get($url);
        $res = json_decode($response->getBody()->getContents());

        $res->issues = collect($res->issues)->map(function ($issue) {
            $user = User::where('email', $issue->email)->first();
            return [
                'name' => $user->name,
                'avatar_url' => $user->avatar_url,
                'email' => $user->email,
                'phone' => $user->phone,
                'color' => $user->color,
                'title' => $issue->title,
                'description' => $issue->description,
                'content' => $issue->content,
                'status' => $issue->status,
            ];
        });
        return $this->respond($res);
    }


}
