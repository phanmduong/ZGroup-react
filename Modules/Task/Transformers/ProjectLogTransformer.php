<?php

namespace Modules\Task\Transformers;

use App\Colorme\Transformers\Transformer;

class ProjectLogTransformer extends Transformer
{

    public function transform($projectLog)
    {
        $data = [
            "id" => $projectLog->id,
            "type" => $projectLog->type,
            "create_at" => format_time_to_mysql(strtotime($projectLog->created_at)),
            "actor" => [
                "id" => $projectLog->actor->id,
                "name" => $projectLog->actor->name,
                "email" => $projectLog->actor->email
            ]
        ];

        if ($projectLog->card) {
            $data['card'] = [
                "id" => $projectLog->card->id,
                "title" => $projectLog->card->title
            ];
        }

        if ($projectLog->project) {
            $data['project'] = [
                "id" => $projectLog->project->id,
                "title" => $projectLog->project->title
            ];
        }

        return $data;
    }
}