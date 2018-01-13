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
use App\Course;
use App\CourseKey;
use App\Gen;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use App\Like;
use App\Register;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ElearningAuthApiController extends ApiController
{
    public function __construct()
    {
        $this->middleware('auth');
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

    public function registerStore(Request $request)
    {
        dd("ád");
        if ($request->course_id == null) {
            return $this->respondErrorWithStatus("Thiếu course");
        }

        $course = Course::find($request->course_id);

        if ($course == null) {
            return $this->respondErrorWithStatus("Khóa học không tồn tại");
        }

        $register = Register::find($request->register_id);

        if ($register == null) {
            if ($this->user) {
                $current_gen = Gen::getCurrentGen();
                $register = new Register();
                $register->user_id = $this->user->id;
                $register->gen_id = $current_gen->id;
                $register->course_id = $course->id;
                $register->save();
            } else {
                $user = User::where('email', '=', $request->email)->first();
                if ($user) {
                    return $this->respondErrorWithStatus("Tài khoản đã tồn tại");
                } else {
                    $phone = preg_replace('/[^0-9]+/', '', $request->phone);
                    $user = new User();
                    $user->name = $request->name;
                    $user->phone = $phone;
                    $user->email = $request->email;
                    $user->password = bcrypt($user->phone);
                    $user->save();

                    $current_gen = Gen::getCurrentGen();
                    $register = new Register();
                    $register->user_id = $this->user->id;
                    $register->gen_id = $current_gen->id;
                    $register->course_id = $current_gen->course_id;
                    $register->save();
                }
            }
        }

        $code = CourseKey::where('code', $request->code)->first();

        if ($code && $code->course_id == $course->id && $code->status == 1 && $code->times < $code->limit) {
            $register->course_key_id = $code->id;
            $register->active_time = format_time_to_mysql(time());
            $register->status = 1;
            $register->save();

            $code->times += $code->times;
            $code->save();
            return [
                'status' => 1,
                'message' => 'Thành công'
            ];
        } else {
            return [
                'status' => 0,
                'message' => 'Mã không khả dụng. Vui lòng thử lại',
                'register_id' => $register->id,
            ];
        }
    }
}