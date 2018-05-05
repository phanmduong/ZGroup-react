<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Product;
use App\Room;
use App\RoomServiceBenefit;
use App\RoomType;
use Faker\Provider\DateTime;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Base;
use App\RoomServiceUserPack;
use Illuminate\Support\Facades\DB;


class UpCoworkingSpaceController extends Controller
{
    public $lang;


    public function __construct(Request $request)
    {
        // dd(1);
        $this->lang = \Request::get('lang');
        // dd($this->lang);
        // dd(\Request::get('myAttribute'));
    }

    public function index(Request $request)
    {
        $newestBlogs = Product::where('type', 2)->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        $data = [];
        $data['newestBlogs'] = $newestBlogs;

        
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.index', $data);
            case 'en': return view('upcoworkingspace::en.index', $data);
            default: return view('upcoworkingspace::en.index', $data);
        }
//        dd($newestBlogs);

    }

    public function memberRegister($userId = null, $campaignId = null)
    {
        $userPacks = RoomServiceUserPack::orderBy('id')->get();
        $userBenefits = RoomServiceBenefit::orderBy('id')->get();

        $this->data['userPacks'] = $userPacks;
        $this->data['campaignId'] = $campaignId;
        $this->data['userId'] = $userId;
        $this->data['userBenefits'] =$userBenefits;
        
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.member_register', $this->data);
            case 'en': return view('upcoworkingspace::en.member_register', $this->data);
            default: return view('upcoworkingspace::en.member_register',$this->data);
        }
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

        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.blogs', $this->data);
            case 'en': return view('upcoworkingspace::en.blogs', $this->data);
            default: return view('upcoworkingspace::en.blogs', $this->data);
        }
    }

    private function getPostData($post)
    {
        $post->author;
        $post->category;
        $post->url = config('app.protocol') . $post->url;
        if (trim($post->author->avatar_url) === '') {
            $post->author->avatar_url = config('app.protocol') . 'd2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png';
        } else {
            $post->author->avatar_url = config('app.protocol') . $post->author->avatar_url;
        }
        $posts_related = Product::where('id', '<>', $post->id)->inRandomOrder()->limit(3)->get();
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
        return $this->data;
    }

    public function post($post_id)
    {
        $post = Product::find($post_id);
        if ($post == null) {
            return 'Bài viết không tồn tại';
        }
        $data = $this->getPostData($post);
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.post', $data);
            case 'en': return view('upcoworkingspace::en.post', $data);
            default: return view('upcoworkingspace::en.post', $data);
        }
    }

    public function postBySlug($slug)
    {
        $post = Product::where('slug', $slug)->first();
        if ($post == null) {
            return 'Bài viết không tồn tại';
        }
        $data = $this->getPostData($post);


        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.post', $data); break;
            case 'en': return view('upcoworkingspace::en.post', $data); break;
            default: return view('upcoworkingspace::en.post', $data);
        }
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

        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.conference_room', $this->data);
            case 'en': return view('upcoworkingspace::en.conference_room', $this->data);
            default: return view('upcoworkingspace::en.conference_room', $this->data);
        }
    }

    //Su kien
    public function event(Request $request)
    {
        $events = DB::table('events');
//        dd($events);
        $search = $request->search;
        if ($search) {
            $events = $events->where('name', 'like', '%' . $search . '%');
        }

        $events = $events->orderBy('start_date', 'desc')->paginate(6);
        $display = '';
        if ($request->page == null) {
            $page_id = 2;
        } else {
            $page_id = $request->page + 1;
        }
        if ($events->lastPage() == $page_id - 1) {
            $display = 'display:none';
        }
        $mytime = date('Y-m-d H:i:s');
        $this->data['events'] = $events;
        $this->data['page_id'] = $page_id;
        $this->data['display'] = $events;
        $this->data['search'] = $search;
        $this->data['total_pages'] = ceil($events->total() / $events->perPage());
        $this->data['current_page'] = $events->currentPage();

        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.events', $this->data);
            case 'en': return view('upcoworkingspace::en.events', $this->data);
            default: return view('upcoworkingspace::en.events', $this->data);
        }
    }

    public function getEventOfCurrentMonth(Request $request)
    {
        $events = DB::table('events');
        $events = $events
            ->whereRaw('year(start_date) = ' . $request->year)
            ->whereRaw('month(start_date) = ' . $request->month)->get();
        return [
            'events' => $events,
        ];
    }
    
    public function eventDetail($slug)
    {
        $event = DB::table('events')->where('slug', $slug)->first();
        $this->data['event'] = $event;

        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.event_detail', $this->data);
            case 'en': return view('upcoworkingspace::en.event_detail', $this->data);
            default: return view('upcoworkingspace::en.event_detail', $this->data);
        }
    }

    // dang ky event
    
    public function eventSignUpForm($slug,\Illuminate\Http\Request $request)
    {
        $validator = \Illuminate\Support\Facades\Validator::make($request->all(), [
            'name' => 'required|max:255',
        ]);

        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.sign_up_form');
            case 'en': return view('upcoworkingspace::en.sign_up_form');
            default: return view('upcoworkingspace::en.sign_up_form');
        }
    }

    public function missionAndVision()
    {
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.mission_vision');
            case 'en': return view('upcoworkingspace::en.mission_vision');
            default: return view('upcoworkingspace::en.mission_vision');
        }
    }

    public function partner()
    {
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.partner');
            case 'en': return view('upcoworkingspace::en.partner');
            default: return view('upcoworkingspace::en.partner');
        }
        
    }

    public function media()
    {
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.media');
            case 'en': return view('upcoworkingspace::en.media');
            default: return view('upcoworkingspace::en.media');
        }
    }

    public function faqs()
    {
        
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.faqs');
            case 'en': return view('upcoworkingspace::en.faqs');
            default: return view('upcoworkingspace::en.faqs');
        }
    }

    public function talentAcquisition()
    {
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.talent-acquisition');
            case 'en': return view('upcoworkingspace::en.talent-acquisition');
            default: return view('upcoworkingspace::en.talent-acquisition');
        }
    }

    public function contact_us()
    {
        
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.contact-us');
            case 'en': return view('upcoworkingspace::en.contact-us');
            default: return view('upcoworkingspace::en.contact-us');
        }
    }

    public function founders()
    {
        
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.founders');
            case 'en': return view('upcoworkingspace::en.founders');
            default: return view('upcoworkingspace::en.founders');
        }
    }

    public function mentors()
    {
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.mentors');
            case 'en': return view('upcoworkingspace::en.mentors');
            default: return view('upcoworkingspace::en.mentors');
        }
    }

    public function tour()
    {
        switch($this->lang){
            case 'vi': return view('upcoworkingspace::vi.tour');
            case 'en': return view('upcoworkingspace::en.tour');
            default: return view('upcoworkingspace::en.tour');
        }
    }
}
