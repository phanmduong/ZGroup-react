<?php

namespace Modules\XHH\Http\Controllers;

use App\Good;
use App\Http\Controllers\ApiPublicController;
use App\Product;
use Modules\Good\Entities\GoodProperty;
use Illuminate\Http\Request;


class XHHApiController extends ApiPublicController
{

    public function blogs($subfix, Request $request)
    {
        $limit = $request->limit ? $request->limit : 6;

        $this->data = array();
        $date = new \DateTime();
        $date->modify("+1 day");
        $endDate = $date->format("Y-m-d h:i:s");
        $date->modify("-31 days");
        $startDate = $date->format("Y-m-d h:i:s");
        $countNewBlogs = Product::where('type', 2)->where('status', 1)->whereBetween('created_at', array($startDate, $endDate))->count();

        $blogs = Product::where('type', 2)->where('status', 1);

        $search = $request->search;

        if ($search) {
            $blogs = $blogs->where('title', 'like', '%' . $search . '%');
        }

        $blogs = $blogs->orderBy('created_at', 'desc')->paginate(6);


        $this->data['blogs'] = $blogs->map(function ($blog) {
            $blog->author;
            $blog->category;
            return $blog;
        });
        $this->data['total_new_blog'] = $countNewBlogs;

        return $this->respondWithPagination($blogs, $this->data);
    }

    public function allBooks($subfix, Request $request)
    {

        $limit = 12;

        $books = Good::where('type', 'book');

        $type = $request->type;

        $search = $request->search;

        $books = $books->leftJoin('good_properties', 'goods.id', '=', 'good_properties.good_id')
            ->where(function ($q) {
                $q->where('good_properties.name', 'TYPE_BOOK');
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

        $this->data['books'] = $books->map(function ($book) {
            $book->properties;
            return $book;
        });;

        return $this->respondWithPagination($books, $this->data);
    }

    public function typesBook()
    {
        $type_books = GoodProperty::where('name', 'TYPE_BOOK')->distinct('value')->pluck('value')->toArray();
        $arrTypeBooks = array();

        foreach ($type_books as $type_book) {
            if (!in_array(trim($type_book), $arrTypeBooks)) {
                $arrTypeBooks[] = trim($type_book);
            }
        }

        return $this->respondSuccessWithStatus([
            'type_books' => $arrTypeBooks
        ]);

    }

}
