<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 10/11/2017
 * Time: 15:18
 */

namespace Modules\Graphics\Http\Controllers;


use App\Good;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NoAuthApiController;
use Modules\Good\Entities\GoodProperty;

class GraphicsAppController extends NoAuthApiController
{

    public function index(){
        $books = Good::where('type', 'book')->get();
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'name' => $book->name,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
               if($property->name=="short_description") $bookdata[$property->name] = $property->value;
            }
            $book_arr[] = $bookdata;
        }

        return $this->respondSuccessWithStatus([
           "books" => $book_arr
        ]);
    }
}