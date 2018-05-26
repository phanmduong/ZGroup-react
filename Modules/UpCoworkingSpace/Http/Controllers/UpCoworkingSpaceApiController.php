<?php

namespace Modules\UpCoworkingSpace\Http\Controllers;

use App\Base;
use App\District;
use App\Http\Controllers\ApiPublicController;
use App\Province;
use App\RoomServiceRegister;
use App\RoomServiceSubscription;
use App\RoomServiceUserPack;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Mail;
use App\Product;
use App\Event;

class UpCoworkingSpaceApiController extends ApiPublicController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function allUserPacks()
    {
        $user_packs = RoomServiceUserPack::join('room_service_subscriptions', 'room_service_subscriptions.user_pack_id', '=', 'room_service_user_packs.id')
            ->select('room_service_user_packs.*', DB::raw('count(room_service_subscriptions.id) as subscription_count'))
            ->groupBy('user_pack_id')->having('subscription_count', '>', 0)
            ->orderBy('room_service_user_packs.created_at', 'desc')->get();
        $user_packs = $user_packs->map(function ($user_pack) {
            $data = $user_pack->getData();
            $data['subscriptions'] = $user_pack->subscriptions->map(function ($subscription) {
                return $subscription->getData();
            });
            return $data;
        });
        return $this->respondSuccessWithStatus([
            'user_packs' => $user_packs
        ]);
    }

    public function userPack($userPackId)
    {
        $userPack = RoomServiceUserPack::find($userPackId);
        $data = $userPack->getData();
        $ok = true;
        $data['subscriptions'] = $userPack->subscriptions->map(function ($subscription) use (&$ok) {
            $data = $subscription->getData();
            $data['vnd_price'] = currency_vnd_format($subscription->price);
            $data['is_active'] = $ok;
            if ($ok === true)
                $ok = false;
            return $data;
        });
        return ["user_pack" => $data];
    }

    public function register(Request $request)
    {
        if ($request->email == null) {
            return $this->respondErrorWithStatus("Thiếu email");
        }
        if ($request->phone == null) {
            return $this->respondErrorWithStatus("Thiếu phone");
        }
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
        $register->base_id = $request->base_id;
        $register->campaign_id = $request->campaign_id ? $request->campaign_id : 0;
        $register->saler_id = $request->saler_id ? $request->saler_id : 0;
        $register->type = 'member';
        $register->save();
        $subject = "Xác nhận đăng ký thành công";

        $data = ["user" => $user];
        $emailcc = ["graphics@colorme.vn"];
        Mail::send('emails.confirm_register_up', $data, function ($m) use ($request, $subject, $emailcc) {
            $m->from('no-reply@colorme.vn', 'Up Coworking Space');
            $m->to($request->email, $request->name)->bcc($emailcc)->subject($subject);
        });

        return $this->respondSuccessWithStatus([
            'message' => "Đăng kí thành công"
        ]);
    }

    public function province()
    {
        $provinceIds = Base::join("district", DB::raw("CONVERT(district.districtid USING utf32)"), "=", DB::raw("CONVERT(bases.district_id USING utf32)"))
            ->select("district.provinceid as province_id")->pluck("province_id")->toArray();
        $provinceIds = collect(array_unique($provinceIds));
        return [
            "provinces" => $provinceIds->map(function ($provinceId) {
                $province = Province::find($provinceId);
                return $province->transform();
            })->values()
        ];
    }

    public function allBases(Request $request)
    {
        $bases = Base::query();
        $bases = $bases->where('name', 'like', '%' . trim($request->search) . '%');
        $bases = $bases->get();
        return [
            "bases" => $bases->map(function ($base) {
                return $base->transform();
            })
        ];
    }

    public function basesInProvince($provinceId, Request $request)
    {
        $districtIds = District::join("province", "province.provinceid", "=", "district.provinceid")
            ->where("province.provinceid", $provinceId)->select("district.*")->pluck("districtid");
        $bases = Base::whereIn("district_id", $districtIds);
        $bases = $bases->where('name', 'like', '%' . trim($request->search) . '%');
        $bases = $bases->get();
        return [
            "bases" => $bases->map(function ($base) {
                return $base->transform();
            })
        ];
    }

    public function get_snippet($str, $wordCount = 10)
    {
        return implode(
            '',
            array_slice(
                preg_split(
                    '/([\s,\.;\?\!]+)/',
                    $str,
                    $wordCount * 2 + 1,
                    PREG_SPLIT_DELIM_CAPTURE
                ),
                0,
                $wordCount * 2 - 1
            )
        );
    }

    public function extract()
    {
        $posts = DB::table('wp_posts')->where('post_type', 'post')->where('post_status', 'publish')->orderBy('post_date', 'desc')->get();
        $arr = [];
        foreach ($posts as $post) {
            $product = new Product;
            $product->type = 2;
            $product->author_id = 1;
            $product->content = $post->post_content;
            $product->created_at = $post->post_date;
            $product->title = $post->post_title;
            $product->slug = $post->post_name;
            $product->meta_title = $post->post_name;
            $product->status = 1;
            $product->category_id = 3;
            $product->url = "d1j8r0kxyu9tj8.cloudfront.net/images/1500137080dAlPJYo8BVlQiiD.jpg";
            $product->description = $this->get_snippet(str_replace("\n", "", strip_tags($product->content)), 19) . "...";
            $thumb_id = DB::table('wp_postmeta')->where('post_id', $post->ID)->where('meta_key', '_thumbnail_id')->first();
            $url = '';
            if ($thumb_id)
                $url = DB::table('wp_posts')->where('ID', $thumb_id->meta_value)->first()
                ? DB::table('wp_posts')->where('ID', $thumb_id->meta_value)->first()->guid : '';
            $product->url = $url;
            if ($product->url == '') {
                $pattern = '/(src=")(.+?)(")/';
                preg_match($pattern, $product->content, $matches);
                if ($matches)
                    $product->url = $matches[2];
            }
            $product->url = str_replace('http://up-co.vn/wp-content/uploads/', 'http://d2xbg5ewmrmfml.cloudfront.net/up/images/', $product->url);
            foreach (preg_split("/((\r?\n)|(\r\n?))/", $post->post_content) as $line) {
                $product->content = str_replace($line, '<p>' . $line . '</p>', $product->content);
                $product->content = str_replace('<strong>', '<p><h6>', $product->content);
                $product->content = str_replace('</strong>', '</h6></p>', $product->content);

                if (strpos($line, '.jpg')) {
                    $pattern = '/(gpj\.)([0-9]{2,4})x([0-9]{2,4})(-)/';
                    preg_match($pattern, strrev($line), $matches);
                    $product->content = str_replace(strrev(reset($matches)), '.jpg', $product->content);
                }
                if (strpos($line, '.png')) {
                    $pattern = '/(gnp\.)([0-9]{2,4})x([0-9]{2,4})(-)/';
                    preg_match($pattern, strrev($line), $matches);
                    $product->content = str_replace(strrev(reset($matches)), '.png', $product->content);
                }
                if (strpos($line, '.jpeg')) {
                    $pattern = '/(gepj\.)([0-9]{2,4})x([0-9]{2,4})(-)/';
                    preg_match($pattern, strrev($line), $matches);
                    $product->content = str_replace(strrev(reset($matches)), '.jpeg', $product->content);
                }
                $product->content = str_replace('http://up-co.vn/wp-content/uploads/', 'http://d2xbg5ewmrmfml.cloudfront.net/up/images/', $product->content);
                $pattern = '/width="([0-9]{3,4})" height="([0-9]{3,4})"/';
                preg_match($pattern, $line, $matches);
                if (reset($matches))
                    $product->content = str_replace(reset($matches), reset($matches) . ' style="display:block; height:auto; width:100%"', $product->content);
            }
            $product->save();
        }
        dd($arr);
    }

    public function extractEvents()
    {
        $events = DB::table('wp_em_events')->where('event_status', 1)->orderBy('event_date_created')->get();
        $arr = [];
        foreach ($events as $event) {
            if ($event->event_name == null)
                continue;
            $myEvent = new Event;
            $myEvent->created_at = $event->event_date_created;
            $myEvent->name = $event->event_name;
            $myEvent->slug = $event->event_slug;
            $myEvent->user_id = 1;
            $myEvent->status = 'PUBLISH';
            $myEvent->start_time = $event->event_start_time;
            $myEvent->end_time = $event->event_end_time;
            $myEvent->start_date = $event->event_start_date;
            $myEvent->end_date = $event->event_end_date;
            $myEvent->detail = $event->post_content;

            $url = '';
            $url = DB::table('wp_posts')->where('post_parent', $event->post_id)->where('post_type', 'attachment')->first()
                ? DB::table('wp_posts')->where('post_parent', $event->post_id)->where('post_type', 'attachment')->first()->guid : '';
            $myEvent->avatar_url = $url;
            if ($myEvent->avatar_url == '') {
                $pattern = '/(src=")(.+?)(")/';
                preg_match($pattern, $myEvent->detail, $matches);
                if ($matches)
                    $myEvent->avatar_url = $matches[2];
            }
            $myEvent->avatar_url = str_replace('http://up-co.vn/wp-content/uploads/', 'http://d2xbg5ewmrmfml.cloudfront.net/up/images/', $myEvent->avatar_url);
            $myEvent->cover_url = $myEvent->avatar_url;
            foreach (preg_split("/((\r?\n)|(\r\n?))/", $event->post_content) as $line) {
                $myEvent->detail = str_replace($line, '<p>' . $line . '</p>', $myEvent->detail);
                $myEvent->detail = str_replace('<strong>', '<p><h6>', $myEvent->detail);
                $myEvent->detail = str_replace('</strong>', '</h6></p>', $myEvent->detail);
            }
            $myEvent->save();
        }
        dd($events);
    }
}