<?php

namespace Modules\XHH\Http\Controllers;

use App\CategoryProduct;
use App\Good;
use App\Product;
use Faker\Provider\DateTime;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;

class XHHController extends Controller
{

    public function __construct()
    {
        $this->data = array();
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $totalBlogs = Product::where('type', 2)->where('status', 1)->count();
        $countNewBlogs = Product::where('type', 2)->where('status', 1)->whereBetween('created_at', array($startDate, $endDate))->count();
        $totalBooks = Good::where('type', 'book')->count();
        $this->data = [
            'count_new_blogs' => $countNewBlogs,
            'total_blogs' => $totalBlogs,
            'total_books' => $totalBooks
        ];
    }

    public function index()
    {
        $newestBlog = Product::where('type', 2)->where('status', 1)->orderBy('created_at', 'desc')->first();
        if ($newestBlog) {
            $newestTop3 = Product::where('type', 2)->where('status', 1)->where('id', '<>', $newestBlog->id)->orderBy('created_at', 'desc')->limit(3)->get();
        } else {
            $newestTop3 = Product::where('type', 2)->where('status', 1)->orderBy('created_at', 'desc')->limit(3)->get();
        }
        $blogSection1 = Product::where('type', 2)->where('status', 1)->where('category_id', 2)->orderBy('created_at', 'desc')->limit(2)->get();
        $blogSection2 = Product::where('type', 2)->where('status', 1)->where(function ($q) {
            $q->where('category_id', 3)->orWhere('category_id', 13);
        })->orderBy('created_at', 'desc')->limit(3)->get();
        $newestBlog2 = Product::where('type', 2)->where('status', 1)->where('category_id', 7)->orderBy('created_at', 'desc')->first();
        if ($newestBlog2) {
            $blogSection4 = Product::where('type', 2)->where('status', 1)->where('id', '<>', $newestBlog2->id)->where('category_id', 7)->orderBy('created_at', 'desc')->limit(3)->get();
        } else {
            $blogSection4 = Product::where('type', 2)->where('status', 1)->where('category_id', 7)->orderBy('created_at', 'desc')->limit(3)->get();
        }
        $books = Good::where('type', 'book')->orderBy('created_at', 'desc')->limit(8)->get();

        $this->data['newestBlog'] = $newestBlog;
        $this->data['newestTop3'] = $newestTop3;
        $this->data['blogSection1'] = $blogSection1;
        $this->data['blogSection2'] = $blogSection2;
        $this->data['newestBlog2'] = $newestBlog2;
        $this->data['blogSection4'] = $blogSection4;
        $this->data['blogSection4'] = $blogSection4;
        $this->data['books'] = $books;
        return view('xhh::index', $this->data);
    }

    public function blog($subfix, Request $request)
    {
        $blogs = Product::where('type', 2)->where('status', 1);

        $search = $request->search;
        $type = $request->type;
        $type_name = CategoryProduct::find($type);
        $type_name = $type_name ? $type_name->name : '';

        if ($search) {
            $blogs = $blogs->where('title', 'like', '%' . $search . '%');
        }

        if ($type) {
            $blogs = $blogs->where('category_id', $type);
        }

        $blogs = $blogs->orderBy('created_at', 'desc')->paginate(6);

        $categories = CategoryProduct::orderBy('name')->get();


        $this->data['type'] = $type;
        $this->data['type_name'] = $type_name;
        $this->data['blogs'] = $blogs;
        $this->data['display'] = $blogs;
        $this->data['search'] = $search;
        $this->data['categories'] = $categories;

        $this->data['total_pages'] = ceil($blogs->total() / $blogs->perPage());
        $this->data['current_page'] = $blogs->currentPage();

        return view('xhh::blogs', $this->data);
    }

    public function post($subfix, $post_id)
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
        return view('xhh::post', $this->data);
    }

    public function book($subfix, $book_id)
    {
        $book = Good::find($book_id);
        $newestBooks = Good::where('type', 'book')->where('id', '<>', $book_id)->limit(4)->get();

        $author = $book->properties()->where('name', 'AUTHOR_BOOK')->first();
        $author = $author ? $author->value : 'Không có';
        $language = $book->properties()->where('name', 'LANGUAGE_BOOK')->first();
        $language = $language ? $language->value : 'Không có';
        $publisher = $book->properties()->where('name', 'PUBLISHER_BOOK')->first();
        $publisher = $publisher ? $publisher->value : 'Không có';

        $this->data['book'] = $book;
        $this->data['newestBooks'] = $newestBooks;
        $this->data['author'] = $author;
        $this->data['language'] = $language;
        $this->data['publisher'] = $publisher;
        return view('xhh::book', $this->data);
    }

    public function allBooks($subfix, Request $request)
    {

        $limit = 12;

        $books = Good::where('type', 'book');
        $type_books = GoodProperty::where('name', 'TYPE_BOOK')->distinct('value')->pluck('value')->toArray();
        $arrTypeBooks = array();

        foreach ($type_books as $type_book) {
            if (!in_array(trim($type_book), $arrTypeBooks)) {
                $arrTypeBooks[] = trim($type_book);
            }
        }

        $type = $request->type;

        $search = $request->search;

        $books = $books->leftJoin('good_properties', 'goods.id', '=', 'good_properties.good_id')
            ->where(function ($q) {
                $q->where('good_properties.name', 'like', '%TYPE_BOOK%');
            });

        if ($search) {
            $books = $books->where(function ($q) use ($search) {
                $q->where('goods.name', 'like', '%' . $search . '%')
                    ->orWhere('goods.code', 'like', '%' . $search . '%');
            });
        }

        if ($type) {
            $books = $books->where(function ($q1) use ($type) {
                $q1->where('good_properties.name', 'TYPE_BOOK')
                    ->where('good_properties.value', 'like', '%' . $type . '%');
            });
        }

        $books = $books->select('goods.*')->paginate($limit);

        $this->data['books'] = $books;
        $this->data['search'] = $search;
        $this->data['type'] = $type;
        $this->data['type_books'] = $arrTypeBooks;

        $this->data['total_pages'] = ceil($books->total() / $books->perPage());
        $this->data['current_page'] = $books->currentPage();

        return view('xhh::library', $this->data);
    }

    public function aboutUs($subfix)
    {
        return view('xhh::about-us', $this->data);
    }

    public function contactUs($subfix)
    {
        return view('xhh::contact-us', $this->data);
    }
}
