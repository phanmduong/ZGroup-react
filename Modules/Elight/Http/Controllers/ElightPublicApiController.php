<?php

namespace Modules\Elight\Http\Controllers;

use App\District;
use App\Course;
use App\Good;
use App\Http\Controllers\ApiPublicController;
use App\Http\Controllers\PublicApiController;
use App\Lesson;
use App\Product;
use App\Province;
use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;

class ElightPublicApiController extends ApiPublicController
{

    public function __construct()
    {
        parent::__construct();
    }

    public function lesson($lesson_id)
    {
        $lesson = Lesson::find($lesson_id);

        $sound_cloud_track_id = sound_cloud_track_id($lesson->audio_url);

        $audio_url = 'https://api.soundcloud.com/tracks/' . $sound_cloud_track_id . '/stream' . '?client_id=' . config("app.sound_cloud_client_id");

        return $this->respond([
            "name" => $lesson->name,
            "detail" => $lesson->detail_content,
            "order" => $lesson->order,
            "id" => $lesson->id,
            "image_url" => $lesson->image_url,
            "audio_url" => $audio_url,
        ]);
    }
}
