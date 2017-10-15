<?php

namespace Modules\Graphics\Http\Controllers;

use App\Good;
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
        return view('graphics::index');
    }

    public function aboutUs()
    {
        return view('graphics::about_us');
    }

    public function book($good_id)
    {
        $good = Good::find($good_id);
        $properties = GoodProperty::where('good_id', $good_id)->get();

        $data = [
            "cover" => $good->cover_url,
            "avatar" => $good->avatar_url,
            "type" => $good->type,
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
    }
}
