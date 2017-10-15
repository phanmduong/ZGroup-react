<?php

namespace Modules\Graphics\Http\Controllers;

use App\Good;
use App\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;

class GraphicsController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        $books = Good::where('type', 'book')->get();
        $book_arr = [];
        foreach ($books as $book) {
            $properties = GoodProperty::where('good_id', $book->id)->get();
            $bookdata = [
                'id' => $book->id,
                'cover' => $book->cover_url,
                'avatar' => $book->avatar_url,
                'type' => $book->type,
                'name' => $book->name,
                'description' => $book->description,
                'price' => $book->price
            ];
            foreach ($properties as $property) {
                $bookdata[$property->name] = $property->value;
            }
            $book_arr[]=$bookdata;
        }
        return view('graphics::index', [
            'books' => $book_arr,
        ]);
    }

    public function about_us()
    {
        return view('graphics::about_us');
    }

    public function book($good_id)
    {
        $good = Good::find($good_id);
        $properties = GoodProperty::where('good_id', $good_id)->get();

        $data = [
            'cover' => $good->cover_url,
            'avatar' => $good->avatar_url,
            'type' => $good->type,
            'name' => $good->name
        ];
        foreach ($properties as $property) {
            $data[$property->name] = $property->value;
        }
        return view('graphics::book', [
            'properties' => $data,
        ]);
    }
    public function contact_us(){
        return view('graphics::contact_us');
    }
    public function contact_info(Request $request){
         $data=['email'=>$request->email, 'name'=> $request->name, 'message_str'=> $request->message_str];

        Mail::send('emails.contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Graphics');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->subject($subject);
        });
        Mail::send('emails.contact_us', $data, function ($m) use ($request) {
            $m->from('no-reply@colorme.vn', 'Graphics');
            $subject = "Xác nhận thông tin";
            $m->to($request->email, $request->name)->subject($subject);
        });
        return "OK";
    }
    public function post($blog_id){
        $blog=Product::find($blog_id);
        $user_name=User::find($blog->author_id)->name;
        return view('graphics::post',[
            'blog' => $blog,
            'user_name'=>$user_name
        ]);
    }
    public function blog(){
        $blogs=Product::Where('type',2)->orderBy('created_at','desc')->paginate(9);
        return view('graphics::blogs',[
            'blogs' => $blogs
        ]);
    }
}
