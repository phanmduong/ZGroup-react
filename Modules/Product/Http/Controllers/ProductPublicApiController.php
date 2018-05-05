<?php

namespace Modules\Product\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\CategoryProduct;
use App\Http\Controllers\PublicApiController;
use App\Services\EmailService;
use App\Product;
use Carbon\Carbon;

class ProductPublicApiController extends PublicApiController
{
    protected $emailService;

    public function __construct(EmailService $emailService)
    {
        // parent::__construct();
        $this->emailService = $emailService;
    }

    public function mailViews($views)
    {
        if ($views < 10) {
            return false;
        }
        while ($views != 0) {
            if ($views > 10 && $views % 10 != 0) {
                return false;
            }
            if ($views < 10 && ($views == 1 || $views == 2 || $views == 5)) {
                return true;
            }
            $views /= 10;
        }
    }

    public function timeCal($time)
    {
        $diff = abs(strtotime($time) - strtotime(Carbon::now()->toDateTimeString()));
        $diff /= 60;
        if ($diff < 60) {
            return floor($diff) . ' phút trước';
        }
        $diff /= 60;
        if ($diff < 24) {
            return floor($diff) . ' giờ trước';
        }
        $diff /= 24;
        if ($diff <= 30) {
            return floor($diff) . ' ngày trước';
        }
        return date('d-m-Y', strtotime($time));
    }

    public function blogs(Request $request)
    {
        $limit = $request->limit ? $request->limit : 6;
        $blogs = Product::where('kind', 'blog')->where('status', 1)
            ->where('title', 'like', "%$request->search%");

        if ($request->tag)
            $blogs = $blogs->where('tags', 'like', "%$request->tag%");
        if ($request->author_id)
            $blogs = $blogs->where('author_id', $request->author_id);
        if ($request->category_id)
            $blogs = $blog->where('category_id', $request->category_id);
        $blogs = $blogs->orderBy('created_at', 'desc')->paginate($limit);

        return $this->respondWithPagination($blogs, [
            'blogs' => $blogs->map(function ($blog) {
                $data = $blog->blogTransform();
                $data['time'] = $this->timeCal(date($blog->created_at));
                return $data;
            })
        ]);
    }

    public function blog($slug, Request $request)
    {
        $blog = Product::where('slug', $slug)->first();
        if($blog == null)
            return $this->respondErrorWithStatus('Không tồn tại bài viết');
        $blog->views += 1;
        $blog->save();
        if ($this->mailViews($blog->views) === true) {
            $this->emailService->send_mail_blog($blog, $blog->author, $blog->views);
        }
        $data = $blog->blogDetailTransform();
        $data['time'] = $this->timeCal(date($blog->created_at));
        $data['related_blogs'] = Product::where('id', '<>', $blog->id)->where('kind', 'blog')->where('status', 1)->where('author_id', $blog->author_id)
            ->limit(4)->get()->map(function ($related_blog) {
                return $related_blog->blogTransform();
            });

        return $this->respondSuccessWithStatus([
            'blog' => $data,
        ]);
    }
}
