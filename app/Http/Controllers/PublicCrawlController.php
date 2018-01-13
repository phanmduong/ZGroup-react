<?php

namespace App\Http\Controllers;

use App\Base;
use App\Colorme\Transformers\CourseTransformer;
use App\Colorme\Transformers\ProductTransformer;
use App\Course;
use App\Gen;
use App\Lesson;
use App\Order;
use App\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PublicCrawlController extends CrawlController
{
    protected $productTransformer;
    protected $courseTransformer;

    public function __construct(ProductTransformer $productTransformer, CourseTransformer $courseTransformer)
    {
        parent::__construct();
        $this->productTransformer = $productTransformer;
        $this->courseTransformer = $courseTransformer;
        $courses = Course::where('status', '1')->orderBy('created_at', 'asc')->get();
        $this->data['courses'] = $courses;
    }

    public function home()
    {
        $current_gen = Gen::getCurrentGen();
        $this->data['gen_cover'] = $current_gen->cover_url;
        return view('2018-beta', $this->data);
    }

    public function graphics_dot()
    {
        return view('beta');
    }

    public function buy_book()
    {
        if ($this->isCrawler()) {
            $num_orders = Order::count() + 251;
            $courses = Course::all();
            $data = ['num_orders' => $num_orders, 'courses' => $courses];
            return view('crawler.buy_book', $data);
        } else {
            return view('beta');
        }
    }

    public function course($linkId, $saler_id = null, $campaign_id = null)
    {
        $courses = Course::all();
        foreach ($courses as $key) {
            if (convert_vi_to_en($key->name) === $linkId)
                $course = $key;
        }
        $course_id = $course->id;
        $current_gen = Gen::getCurrentGen();
        $this->data['current_gen_id'] = $current_gen->id;
        $this->data['gen_cover'] = $current_gen->cover_url;
        $this->data['course'] = $course;
        $this->data['course_id'] = $course_id;
        $this->data['bases'] = Base::orderBy('created_at', 'asc')->get()->filter(function ($base) use ($course_id, $current_gen) {
            return $base->classes()->where('course_id', $course_id)->where('gen_id', $current_gen->id)->count() > 0;
        });
        $this->data['saler_id'] = $saler_id;
        $this->data['campaign_id'] = $campaign_id;
        $this->data['pixels'] = $course->coursePixels;
        return view('2018-course', $this->data);
    }

    public function post($LinkId)
    {
        if ($this->isCrawler()) {
            $start = strrpos($LinkId, '-') + 1;
            $id = substr($LinkId, $start, strlen($LinkId));
            $product = Product::find($id);
            $courses = Course::all();

            $this->data['product'] = $this->productTransformer->transform($product);
            $this->data['courses'] = $courses;
            if ($product->content) {
                $this->data['content'] = $product->content;
            } else {
                $this->data['content'] = $product->title;
            }
            if (!array_key_exists('image_url', $this->data['product'])) {
                $this->data['product']['image_url'] = "http://d1j8r0kxyu9tj8.cloudfront.net/images/1476329226kzmufzT4STvvKY1.jpg";
            }
            $this->data['more_products'] = $this->productTransformer->transformCollection($product->author->products()->where('id', '!=', $product->id)
                ->orderBy(DB::raw('RAND()'))->take(4)->orderBy('created_at')->get());
            return view('crawler.post', $this->data);
        } else {
            return view('beta');
        }
    }
}
