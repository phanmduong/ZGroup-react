<?php

namespace App\Http\Controllers;

use App\Attendance;
use App\Colorme\Transformers\ProductTransformer;
use App\Colorme\Transformers\ProgressTransformer;
use App\Good;
use App\Group;
use App\GroupMember;
use App\Order;
use App\Services\EmailService;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserPublicApiController extends ApiController
{
    protected $productTransformer, $progressTransformer, $emailService;

    public function __construct(
        ProductTransformer $productTransformer,
        ProgressTransformer $progressTransformer,
        EmailService $emailService
    )
    {
        $this->productTransformer = $productTransformer;
        $this->progressTransformer = $progressTransformer;
        $this->emailService = $emailService;
    }

    public function load_user_side_nav_groups($user_id, Request $request)
    {
        $user = User::find($user_id);
        $page = $request->page;
        $limit = 5;
        $data['groups'] = $user->groups()->orderBy('created_at', 'desc')->take($limit)->skip(($page - 1) * $limit)->get()->map(function ($group) {
            return [
                'link' => $group->link,
                'id' => $group->id,
                'name' => $group->name,
                'mems_count' => $group->members()->count(),
                'topics_count' => $group->topics()->count(),
                'avatar_url' => $group->avatar_url
            ];
        });

        return $this->respond($data);
    }

    public function user_side_nav_info($user_id)
    {
        $user = User::find($user_id);

        $data = [];
        $data['project_count'] = $user->products()->count();

        $data['project_likes'] = $user->products->reduce(function ($carry, $product) {
            return $carry + $product->likes()->count();
        }, 0);
        $data['project_views'] = $user->products->reduce(function ($carry, $product) {
            return $carry + $product->views;
        }, 0);

        $registers = $user->registers()->join('classes', 'classes.id', '=', 'registers.class_id')
            ->where('name', 'like', '%.%')->where('registers.status', 1)
            ->select('registers.id as id', 'registers.*')->get();


        $data['registers'] = $registers->map(function ($register) use ($user_id) {
            $total = $register->attendances()->count();

            $attended = Attendance::where('register_id', $register->id)->where('status', 1)->count();

            $group = $register->studyClass->group;
            $data = [
                'name' => $register->studyClass->name,
                'avatar_url' => $register->studyClass->course->icon_url,
                'total' => $total,
                'attended' => $attended,
                'total_topics' => 0,
                'submitted_topics' => 0
            ];
            if ($group) {
                $total_topics_count = $group->topics()->count();
                $submitted_topics_count = $group->topics()
                    ->join('topic_attendances', 'topic_attendances.topic_id', '=', 'topics.id')
                    ->where('user_id', $user_id)
                    ->where('product_id', "!=", NULL)->count();
                $data['total_topics'] = $total_topics_count;
                $data['submitted_topics'] = $submitted_topics_count;
            }

            return $data;
        });

        $data['groups'] = $user->groups()->orderBy('created_at', 'desc')->take(5)->get()->map(function ($group) {
            return [
                'link' => $group->link,
                'id' => $group->id,
                'name' => $group->name,
                'mems_count' => $group->members()->count(),
                'topics_count' => $group->topics()->count(),
                'avatar_url' => $group->avatar_url
            ];
        });

        return $this->respond($data);
    }

    public function user_progress($username)
    {
        $target_user = User::where('username', $username)->first();
        if ($target_user) {
            $registers = $target_user->registers()
                ->where('status', 1)->whereExists(function ($query) {
                    $query->select(DB::raw(1))
                        ->from('classes')
                        ->whereRaw('classes.id = registers.class_id')
                        ->where('name', 'like', '%.%');
                })->orderBy('created_at', 'desc')->get();
            return $this->respond($this->progressTransformer->transformCollection($registers));
        } else {
            return $this->responseBadRequest("username not existed");
        }
    }

    public function user_profile($username)
    {
        $target_user = User::where('username', $username)->first();
        if ($target_user) {
            $return_data = [
                'id' => $target_user->id,
                'email' => $target_user->email,
                'username' => $target_user->username,
                'name' => $target_user->name,
                'university' => $target_user->university,
                "description" => $target_user->description,
                "avatar_url" => $target_user->avatar_url ? $target_user->avatar_url : "http://colorme.vn/img/user.png",
                "work" => $target_user->work,
                "address" => $target_user->address,
                "phone" => $target_user->phone,
                "dob" => $target_user->dob,
                "gender" => $target_user->gender . "",
                "courses" => $target_user->registers->map(function ($register) {
                    return [
                        'linkId' => convert_vi_to_en($register->studyClass->course->name),
                        'icon_url' => $register->studyClass->course->icon_url
                    ];
                })->reduce(function ($carry, $item) {
                    if (!in_array($item, $carry)) {
                        $carry[] = $item;
                    }
                    return $carry;
                }, [])
            ];
            if ($target_user->cv) {
                $return_data["cv"] = [
                    "id" => $target_user->cv->id,
                    "url" => $target_user->cv->url,
                    "thumb_url" => $target_user->cv->thumb_url
                ];
            }

            return $this->respond(['user' => $return_data]);
        } else {
            return $this->responseBadRequest("username not existed");
        }
    }

    public function user_products($username, Request $request)
    {
        $target_user = User::where('username', $username)->first();
        if ($target_user) {
            if ($request->token) {
                $user = JWTAuth::parseToken()->authenticate();
                $this->productTransformer->setUser($user);
            }

            if ($request->limit) {
                $limit = $request->limit;
            } else {
                $limit = 20;
            }
            $products = $target_user->products()->orderBy('created_at', 'desc')->paginate($limit);
            return $this->respondWithPagination($products, ['products' => $this->productTransformer->transformCollection($products)]);
        } else {
            return $this->responseBadRequest("username not existed");
        }
    }

    public function create_order(Request $request)
    {
        $errors = [];
        if (!$request->name) {
            $errors['name'] = "Bạn vui lòng nhập tên";
        }
        if (!$request->phone) {
            $errors['phone'] = "Bạn vui lòng nhập số điện thoại";
        }
        if (!$request->address) {
            $errors['address'] = "Bạn vui lòng nhập địa chỉ giao hàng";
        }
        if (!$request->amount) {
            $errors['amount'] = "Bạn vui lòng nhập số lượng";
        }
        if (!$request->email) {
            $errors['email'] = "Bạn vui lòng nhập email";
        }
        if (!empty($errors)) {
            return $this->responseBadRequest($errors);
        }
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $order = new Order();
        $order->name = $request->name;
        $order->phone = $phone;
        $order->address = $request->address;
        $order->quantity = $request->amount;
        $order->note = $request->note;
        $order->email = $request->email;
        $order->good_id = 1;
        $order->status = "ship_uncall";

        $order->save();

        $this->emailService->send_mail_confirm_order($order, ['colormevn.book@gmail.com']);
        return $this->respond(['message' => 'Bạn đã đăng kí đặt mua sách thành công, vui lòng kiểm tra email để xác nhận đơn hàng. ColorME sẽ liên hệ với bạn trong vòng 24h tới. Cảm ơn bạn!']);
    }

    public function change_order_status(Request $request)
    {
        $status = $request->status;
        $order_id = $request->order_id;
        $order = Order::find($order_id);
        $order->status = $status;
        $order->save();
        return $this->respond(['message' => "Đổi trạng thái đơn hàng thành công"]);
    }

    public function item($item_id)
    {
        $item = Good::find($item_id);
        return $this->respond(['num_orders' => $item->orders()->count() + 251]);
    }

    public function search_users(Request $request)
    {
        $searchTerm = $request->term;
        $groupLink = $request->group_link;

        $group = Group::where('link', $groupLink)->first();
        if ($group) {
            if ($searchTerm) {
                $users = User::where("email", "like", "%" . $searchTerm . "%")->take(30)->orderBy('created_at')->get();
                if ($users->isEmpty()) {
                    return $this->respond([
                        "status" => 0,
                        "message" => "Không có kết quả nào phù hợp"
                    ]);
                } else {
                    return $this->respond([
                        "status" => 1,
                        "users" => $users->map(function ($user) use ($group) {
                            $groupMember = GroupMember::where("group_id", $group->id)->where('user_id', $user->id)->first();
                            return [
                                'id' => $user->id,
                                "name" => $user->name,
                                "email" => $user->email,
                                'joined' => $groupMember != null,
                                "username" => $user->username,
                                "avatar_url" => $user->avatar_url ? $user->avatar_url : "http://d1j8r0kxyu9tj8.cloudfront.net/webs/user.png"
                            ];
                        })
                    ]);
                }
            } else {
                return $this->respond([
                    "status" => 0,
                    "message" => "Bạn cần nhập nội dung tìm kiếm"
                ]);
            }
        } else {
            return $this->respondErrorWithStatus("Không tồn tại group này");
        }
    }

    public function store_user(Request $request)
    {
        $errors = [];
        $user = User::where('email', '=', $request->email)->first();
        if ($user) {
            $errors['email'] = "Email đã có người sử dụng";
        }
        $username = ($request->username && trim($request->username)!=='') ? trim($request->username) : $request->email ;
        $user = User::where('username', '=', $username)->first();
        if ($user) {
            $errors['username'] = "Username đã có người sử dụng";
        }

        if (!empty($errors)) {
            return $this->responseBadRequest($errors);
        }
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $user = new User;
        $user->name = $request->name ? $request->name : $request->email;
        $user->phone = $phone;
        $user->email = $request->email;
        $user->university = $request->school;
        $user->work = $request->work;
        $user->address = $request->address;
        $user->how_know = $request->how_know;
        $user->username = $username;
        $user->facebook = $request->facebook;
        $user->gender = $request->gender;
        $user->dob = $request->dob;

        $user->password = bcrypt($request->password);
        $user->save();
        $token = JWTAuth::fromUser($user);
        return $this->respond([
            "user" => $user,
            'token' => $token
        ]);
    }
}
