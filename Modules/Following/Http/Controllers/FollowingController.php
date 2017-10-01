<?php

namespace Modules\Following\Http\Controllers;

use App\Following;
use App\Http\Controllers\ApiController;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class FollowingController extends ApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Display a listing of the resource.
     * @return string
     */

    public function followUnfollow($user_id, Request $request)
    {
        $user = $this->user;
        $following = Following::where("following_id", $user->id)->where("followed_id", $user_id)->first();//$user->following()->where("followed_id", $user_id)->first();
        if ($following == null) {
            $following = new Following();
            $following->following_id = $user->id;
            $following->followed_id = $user_id;
            $following->save();
            return $this->respondSuccessWithStatus([
                'message' => "Theo dõi thành công"
            ]);
        } else {
            $following->delete();
            return $this->respondSuccessWithStatus([
                'message' => "Bỏ theo dõi thành công"
            ]);
        }
    }

    public function followCount($user_id, Request $request)
    {
        $user = User::find($user_id);
        $followCount = $user->followings()->count();
        return $this->respondSuccessWithStatus([
            'followCount' => $followCount
        ]);
    }

    public function index()
    {
        return view('following::index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function create()
    {
        return view('following::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('following::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('following::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
