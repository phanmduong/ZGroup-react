<?php

namespace Modules\Rule\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Repositories\RuleRepository;
use App\Rule;
use App\RuleChapter;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\View;

class ManageRuleApiController extends ManageApiController
{
    protected $ruleRepository;

    public function __construct(RuleRepository $ruleRepository)
    {
        parent::__construct();
        $this->ruleRepository = $ruleRepository;
    }

    public function get_rule()
    {
        $rule_chapters = RuleChapter::orderBy('order')->get();
        $rule_chapters = $this->ruleRepository->rule_chapters($rule_chapters);
//return $this->respondSuccessWithStatus($rule_chapters);
        $view = View::make('rule::index', ['rule_chapters' => $rule_chapters]);
        $contents = $view->render();
        return $this->respondSuccessWithStatus([
            'content' => $contents
        ]);
    }
}
