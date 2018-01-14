<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 1/6/18
 * Time: 09:49
 */

namespace Modules\Elearning\Http\Controllers;


use App\Comment;
use App\CommentLike;
use App\Http\Controllers\Controller;
use App\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ElearningApiController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->data = array();
        $this->s3_url = config('app.s3_url');
        if (!empty(Auth::user())) {
            $this->user = Auth::user();
            $this->data['user'] = $this->user;
        }
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
            "comment" => $comment->transform($this->user)
        ];
    }

    public function changeLikeComment($commentId, Request $request)
    {
        $comment = Comment::find($commentId);

        if ($comment == null) {
            return [
                'status' => 0,
                'message' => "Không tồn tại"
            ];
        }

        if ($request->liked == 1) {
            if ($comment->comment_likes()->where('user_id', $this->user->id)->first() != null) {
                return [
                    'status' => 0,
                    'message' => "Đã like"
                ];
            } else {
                $like = new CommentLike();

                $like->user_id = $this->user->id;
                $like->comment_id = $comment->id;
                $like->save();
                $comment->likes = $comment->likes + 1;
            }
        } else {
            $like = $comment->comment_likes()->where('user_id', $this->user->id)->first();
            if ($like != null) {
                $like->delete();
                $comment->likes = $comment->likes - 1;
            }
        }

        $comment->save();

        return [
            'status' => 1,
            'message' => 'Thành công'
        ];
    }

    public function uploadImageComment(Request $request)
    {
        $image_name = uploadFileToS3($request, 'image', 800, null);
        return (['link' => config('app.protocol') . trim_url($this->s3_url . $image_name)]);
    }
}