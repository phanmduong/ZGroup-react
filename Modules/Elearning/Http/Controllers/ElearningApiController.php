<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 1/6/18
 * Time: 09:49
 */

namespace Modules\Elearning\Http\Controllers;


use App\Comment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ElearningApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->data = array();

        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
    }

    public function uploadImageComment(Request $request)
    {

    }

    public function storeComment($lesson_id, Request $request)
    {

        $comment = Comment::find($request->comment_id);

        if ($comment == null) {
            $comment = new Comment();
        }

        $comment->lesson_id = $lesson_id;
        $comment->commenter_id = $this->user->id;
        $comment->content = $request->content_comment;
        $comment->image_url = $request->image_url;
        $comment->parent_id = $request->parent_id ? $request->parent_id : 0;
        $comment->save();


        return [
            "status" => 1,
            "comment" => [
                'id' => $comment->id,
                'created_at' => format_full_time_date($comment->created_at),
                'content' => $comment->content,
                'commenter' => [
                    'avatar_url' => $comment->commenter->avatar_url,
                    'name' => $comment->commenter->name,
                    'username' => $comment->commenter->username
                ],
            ]
        ];


    }
}