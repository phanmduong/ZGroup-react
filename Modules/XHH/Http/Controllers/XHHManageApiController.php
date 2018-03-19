<?php

namespace Modules\XHH\Http\Controllers;

use App\Good;
use App\Http\Controllers\ManageApiController;
use App\Product;
use Illuminate\Support\Facades\DB;
use Modules\Good\Entities\GoodProperty;


class XHHManageApiController extends ManageApiController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function dashboard()
    {
        $totalBlogsToday = Product::where('type', 2)->whereRaw('date(now()) = date(created_at)')->count();
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->count();
        $countNewBlogs = Product::where('type', 2)->whereBetween('created_at', array($startDate, $endDate))->count();

        $analyticsBlogs = Product::select(DB::raw('author_id, count(1) as total'))->where('type', 2)->groupBy(DB::raw('author_id'))->get();
        $analyticsBlogTypes = Product::select(DB::raw('category_id, count(1) as total'))->where('type', 2)->groupBy(DB::raw('category_id'))->get();

        $totalBooks = Good::where('type', 'book')->count();

        $analyticsBlogs = $analyticsBlogs->map(function ($blog) {
            return [
                'name' => $blog->author->name,
                'color' => $blog->author->color,
                'total' => $blog->total
            ];
        });

        $analyticsBlogTypes = $analyticsBlogTypes->map(function ($blog) {
            return [
                'name' => $blog->category->name,
                'total' => $blog->total
            ];
        });

        $type_books = GoodProperty::where('name', 'TYPE_BOOK')->distinct('value')->pluck('value')->toArray();
        $arrTypeBooks = array();

        foreach ($type_books as $type_book) {
            if (!in_array(trim($type_book), $arrTypeBooks)) {
                $arrTypeBooks[] = trim($type_book);
            }
        }

        foreach ($arrTypeBooks as &$type_book) {
            $total = GoodProperty::where('value', 'like', '%' . $type_book . '%')->count();
            $type_book = [
                'name' => $type_book,
                'total' => $total,
            ];
        }

        $data = [
            'total_blogs_today' => $totalBlogsToday,
            'total_blogs' => $totalBlogs,
            'total_blogs_30' => $countNewBlogs,
            'analytics_blogs' => $analyticsBlogs,
            'analytics_blog_types' => $analyticsBlogTypes,
            'total_books' => $totalBooks,
            'type_books' => $arrTypeBooks,
        ];
        $user = $this->user;

        $data['user'] = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
            'username' => $user->username,
            'avatar_url' => generate_protocol_url($user->avatar_url),
            'color' => $user->color,
            'current_role' => [
                'id' => $user->current_role->id,
                'role_title' => $user->current_role->role_title
            ],
            'role' => $user->role,
        ];


        return $this->respondSuccessWithStatus($data);
    }

}
