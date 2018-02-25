<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Product;
use App\Room;
use App\RoomType;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Base;
use App\RoomServiceUserPack;

class UpCoworkingSpaceController extends Controller
{
    public function index()
    {
        $newestBlogs = Product::where('type', 2)->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        $this->data['newestBlogs'] = $newestBlogs;
        return view('upcoworkingspace::index', $this->data);
    }

    public function memberRegister($campaignId = null, $userId = null)
    {
        $userPacks = RoomServiceUserPack::orderBy('name')->where('status', 1)->get();

        $this->data['userPacks'] = $userPacks;
        $this->data['campaignId'] = $campaignId;
        $this->data['userId'] = $userId;

        return view('upcoworkingspace::member_register', $this->data);
    }

    public function blog(Request $request)
    {
        $blogs = Product::where('type', 2)->where('status', 1);

        $search = $request->search;

        if ($search) {
            $blogs = $blogs->where('title', 'like', '%' . $search . '%');
        }

        $blogs = $blogs->orderBy('created_at', 'desc')->paginate(6);

        $display = '';
        if ($request->page == null) {
            $page_id = 2;
        } else {
            $page_id = $request->page + 1;
        }
        if ($blogs->lastPage() == $page_id - 1) {
            $display = 'display:none';
        }

        $this->data['blogs'] = $blogs;
        $this->data['page_id'] = $page_id;
        $this->data['display'] = $blogs;
        $this->data['search'] = $search;

        $this->data['total_pages'] = ceil($blogs->total() / $blogs->perPage());
        $this->data['current_page'] = $blogs->currentPage();

        return view('upcoworkingspace::blogs', $this->data);
    }

    public function post($post_id)
    {
        $post = Product::find($post_id);
        $post->author;
        $post->category;
        $post->url = config('app.protocol') . $post->url;
        if (trim($post->author->avatar_url) === '') {
            $post->author->avatar_url = config('app.protocol') . 'd2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png';
        } else {
            $post->author->avatar_url = config('app.protocol') . $post->author->avatar_url;
        }
        $posts_related = Product::where('id', '<>', $post_id)->inRandomOrder()->limit(3)->get();
        $posts_related = $posts_related->map(function ($p) {
            $p->url = config('app.protocol') . $p->url;
            return $p;
        });
        $post->comments = $post->comments->map(function ($comment) {
            $comment->commenter->avatar_url = config('app.protocol') . $comment->commenter->avatar_url;

            return $comment;
        });
        $this->data['post'] = $post;
        $this->data['posts_related'] = $posts_related;
        return view('upcoworkingspace::post', $this->data);
    }

    public function conferenceRoom(Request $request)
    {
        $rooms = Room::query();
        $room_type_id = $request->room_type_id;
        $base_id = $request->base_id;

        if ($request->base_id) {
            $rooms->where('base_id', $request->base_id);
        }
        if ($request->room_type_id) {
            $rooms->where('room_type_id', $request->room_type_id);
        }

        $rooms = $rooms->orderBy('created_at', 'desc')->paginate(6);

        if ($request->page == null) {
            $page_id = 2;
        } else {
            $page_id = $request->page + 1;
        }
        if ($rooms->lastPage() == $page_id - 1) {
            $display = 'display:none';
        }

        $this->data['rooms'] = $rooms;
        $this->data['page_id'] = $page_id;
        $this->data['display'] = $rooms;
        $this->data['bases'] = Base::orderBy('created_at', 'asc')->get();
        $this->data['room_types'] = RoomType::orderBy('created_at', 'asc')->get();
        $this->data['base_id'] = $base_id;
        $this->data['room_type_id'] = $room_type_id;

        $this->data['total_pages'] = ceil($rooms->total() / $rooms->perPage());
        $this->data['current_page'] = $rooms->currentPage();

        return view('upcoworkingspace::conference_room', $this->data);
    }
}
