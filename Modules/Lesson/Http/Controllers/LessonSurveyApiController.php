<?php

namespace Modules\Lesson\Http\Controllers;

use App\Colorme\Transformers\TermTransformer;
use App\Http\Controllers\ManageApiController;

class LessonSurveyApiController extends ManageApiController
{

    protected $termTransformer;

    public function __construct(TermTransformer $termTransformer)
    {
        parent::__construct();
        $this->termTransformer = $termTransformer;
    }

}
