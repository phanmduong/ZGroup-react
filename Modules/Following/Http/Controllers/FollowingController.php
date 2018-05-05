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

    public function followers($user_id, Request $request)
    {
        $user = User::find($user_id);
        $users = $user->followers()->get();
        return $this->respondSuccessWithStatus([
            'users' => $users
        ]);
    }

    public function followings($user_id, Request $request)
    {
        $user = User::find($user_id);
        $users = $user->followings()->get();
        return $this->respondSuccessWithStatus([
            'users' => $users
        ]);
    }

    function compare($product1, $product2)
    {
        return $product1->created_at < $product2->created_at;
    }

    public function followingsProducts($page_id, Request $request)
    {
        $user = $this->user;
        $users = $user->followings()->get();
        $followingProducts = [];
        foreach ($users as $usaaa) {
            $products = $usaaa->products()->get();
            foreach ($products as $product) {
                array_push($followingProducts, $product);
            }
        }
        usort($followingProducts, function ($product_1, $product_2) {
            return $product_1->created_at <= $product_2->created_at;
        });
        return $this->respondSuccessWithStatus([
            'products' => $followingProducts
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
