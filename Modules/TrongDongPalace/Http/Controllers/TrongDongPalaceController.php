<?php

namespace Modules\TrongDongPalace\Http\Controllers;

use App\Base;
use App\Product;
use App\Room;
use App\RoomType;
use App\User;
use App\RoomServiceRegister;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class TrongDongPalaceController extends Controller
{
    public function __construct()
    {

        $this->data['bases'] = Base::orderBy('created_at', 'asc')->get();
    }

    public function index()
    {
        $newestBlogs = Product::where('type', 2)->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        $this->data['newestBlogs'] = $newestBlogs;
        return view('trongdongpalace::index', $this->data);
    }

    public function room($roomId, $salerId = 0, $campaignId = 0)
    {
        $room = Room::find($roomId);
        if ($room == null) {
            return 'Phòng không tồn tại';
        }
        $images = json_decode($room->images_url);
        array_unshift($images, $room->avatar_url);
        $this->data['room'] = $room;
        $this->data['images'] = $images;
        $this->data['saler_id'] = $salerId;
        $this->data['campaign_id'] = $campaignId;

        return view('trongdongpalace::room', $this->data);
    }

    public function blogs(Request $request)
    {
        $limit = $request->limit ? $request->limit : 6;
        $search = $request->search;
        $tag = $request->tag;
        $category = $request->category;
        $kind = 'blog';

        $blogsData = Product::where('kind', $kind)->where('status', 1)
            ->where('title', 'like', "%$search%")->orderBy('created_at', 'desc');

        if ($tag) {
            $blogsData = $blogsData->where('tags', 'like', "%$tag%");
        }

        if ($category) {
            $blogsData = $blogsData->where('category_id', $category);
        }

        $blogs = $blogsData;

        $topTags = DB::select("SELECT
                                   SUBSTRING_INDEX(SUBSTRING_INDEX(products.tags, ',', tag_numbers.id), ',', -1) tag,
                                  count(SUBSTRING_INDEX(SUBSTRING_INDEX(products.tags, ',', tag_numbers.id), ',', -1)) sum_tag
                                FROM
                                  tag_numbers INNER JOIN products
                                  ON products.kind='$kind' AND CHAR_LENGTH(products.tags) AND products.deleted_at = NULL
                                     -CHAR_LENGTH(REPLACE(products.tags, ',', ''))>=tag_numbers.id-1 
                                WHERE (SUBSTRING_INDEX(SUBSTRING_INDEX(products.tags, ',', tag_numbers.id), ',', -1) <> '' || SUBSTRING_INDEX(SUBSTRING_INDEX(products.tags, ',', tag_numbers.id), ',', -1) <> NULL)
                                GROUP BY tag 
                                ORDER BY sum_tag DESC
                                LIMIT 20");

        $blogs = $blogs->paginate($limit);

        $this->data['total_pages'] = ceil($blogs->total() / $blogs->perPage());
        $this->data['current_page'] = $blogs->currentPage();

        $blogs = $blogs->map(function ($blog) {
            $data = $blog->blogTransform();
            return $data;
        });

        $topNewBlogs = Product::where('kind', $kind)->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        $topViewBlogs = Product::where('kind', $kind)->where('status', 1)->orderBy('views', 'desc')->limit(3)->get();

//        $categories = Product::where('kind', $kind)->where('status', 1)
//            ->join('category_products', 'category_products.id', '=', 'products.category_id')
//            ->select('category_products.name', 'category_products.id', DB::raw('count(*) as total_blogs'))
//            ->orderBy('total_blogs', 'desc')
//            ->groupBy('products.category_id')
//            ->get();
        $this->data['blogs'] = $blogs;
        $this->data['search'] = $search;
        $this->data['tag'] = $tag;
        $this->data['topTags'] = $topTags;
        $this->data['topViewBlogs'] = $topViewBlogs;
        $this->data['topNewBlogs'] = $topNewBlogs;
//        $this->data['categories'] = $categories;
        $this->data['link'] = 'blogs';

        return view('trongdongpalace::blog', $this->data);
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
        return view('trongdongpalace::post', $this->data);
    }

    public function test()
    {
        return view('trongdongpalace::test');
    }

    public function contactUs()
    {
        return view('trongdongpalace::contact_us', $this->data);
    }

    public function contactInfo(Request $request)
    {
        $data = ['email' => $request->email, 'phone' => $request->phone, 'name' => $request->name, 'message_str' => $request->message];

        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = Hash::make($phone);
        }
        $user->name = $request->name;
        $user->phone = $phone;
        $user->email = $request->email;
        $user->username = $request->email;
        $user->address = $request->address;
        $user->save();

        Mail::send('emails.contact_us_trong_dong', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Trống Đồng Palace');
            $subject = 'Xác nhận thông tin';
            $m->to($request->email, $request->name)->subject($subject);
        });
        return 'OK';
    }

    public function bookingApi(Request $request)
    {
        $room = Room::find($request->room_id);
        $data = [
            'email' => $request->email, 'phone' => $request->phone, 'name' => $request->name, 'message_str' => $request->message,
            'room_name' => $room ? $room->name : "", 'base_name' => $room ? $room->base->name : ""
        ];

        $user = User::where('email', '=', $request->email)->first();
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        if ($user == null) {
            $user = new User;
            $user->password = Hash::make($phone);
        }
        $user->name = $request->name;
        $user->phone = $phone;
        $user->email = $request->email;
        $user->username = $request->email;
        $user->address = $request->address;
        $user->save();

        $register = new RoomServiceRegister();
        $register->user_id = $user->id;
        $register->campaign_id = $request->campaign_id ? $request->campaign_id : 0;
        $register->saler_id = $request->saler_id ? $request->saler_id : 0;
        $register->base_id = $room ? $room->base->id : 0;
        $register->type = 'room';
        $register->save();

        Mail::send('emails.trong_dong_register_confirm', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Trống Đồng Palace');
            $subject = 'Xác nhận thông tin';
            $m->to($request->email, $request->name)->subject($subject);
        });
        return 'OK';
    }

    public function booking(Request $request, $salerId = 0, $campaignId = 0)
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

        $rooms = $rooms->where('name', '<>', 'contactus')->orderBy('created_at', 'desc')->paginate(50);

        if ($request->page == null) {
            $page_id = 2;
        } else {
            $page_id = $request->page + 1;
        }
        if ($rooms->lastPage() == $page_id - 1) {
            $display = 'display:none';
        }
        //
        $this->data['rooms'] = $rooms;
        $this->data['page_id'] = $page_id;
        $this->data['display'] = $rooms;
        $this->data['bases'] = Base::orderBy('created_at', 'asc')->get();
        $this->data['room_types'] = RoomType::orderBy('created_at', 'asc')->get();
        $this->data['base_id'] = $base_id;
        $this->data['room_type_id'] = $room_type_id;
        $this->data['saler_id'] = $salerId;
        $this->data['campaign_id'] = $campaignId;
        $this->data['total_pages'] = ceil($rooms->total() / $rooms->perPage());
        $this->data['current_page'] = $rooms->currentPage();
        // dd($rooms);
        $lastPart = '';
        if ($salerId) {
            $lastPart .= '/' . $salerId;
            if ($campaignId) {
                $lastPart .= '/' . $campaignId;
            }
        } else {
            if ($campaignId) {
                $lastPart .= '/0/' . $campaignId;
            }
        }

        $this->data['last_part'] = $lastPart;

        return view('trongdongpalace::booking', $this->data);
    }

    public function register($roomId, $salerId = 0, $campaignId = 0)
    {
        $this->data['room_id'] = $roomId;
        $this->data['room'] = Room::find($roomId);
        $this->data['saler_id'] = $salerId;
        $this->data['campaign_id'] = $campaignId;
        return view('trongdongpalace::register', $this->data);
    }

    public function album()
    {
        return view('trongdongpalace::album', $this->data);
    }
}
