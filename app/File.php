<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $table = "files";

    public function goods()
    {
        return $this->belongsToMany(Good::class, "file_good", "file_id", "good_id");
    }

    public function transform(){
        return [
            "id" => $this->id,
            "name" => $this->name,
            "url" => generate_protocol_url($this->url),
            "ext" => $this->ext,
            "size" => $this->size,
            "file_key" => $this->file_key,
            "created_at" => format_time_main(strtotime($this->created_at))
        ];
    }
}
