<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\CourseTransformer;
use App\Colorme\Transformers\ProductTransformer;
use App\Course;
use App\Order;
use App\Product;
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
    }

    public function home()
    {
        if ($this->isCrawler()) {
            $products = Product::orderBy('created_at', 'desc')->limit(20)->get();
            $courses = Course::all();
            return view('crawler.home', ['products' => $products, 'courses' => $courses]);
        } else {
            return view('beta');
        }
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

    public function course($linkId)
    {
        if ($this->isCrawler()) {
            $courses = Course::all();
            $return_data = new \stdClass();
            foreach ($courses as $course) {
                if ($linkId == convert_vi_to_en($course->name)) {
                    $return_data = $this->courseTransformer->transform($course);
                }
            }
            return view('crawler.course', ['course' => $return_data, 'courses' => $courses]);
        } else {
            return view('beta');
        }
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
