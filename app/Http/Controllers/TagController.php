<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

use App\Http\Requests;

class TagController extends ManageController
{
    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 25;
    }

    public function index()
    {
        $tags = Tag::all()->sortByDesc('created_at');

        $this->data['tags'] = $tags;

        return view('manage.tag.all_tags', $this->data);
    }

    public function new_tag()
    {
        $this->data['tag'] = null;
        return view('manage.tag.detail', $this->data);
    }

    public function delete_tag($id)
    {
        Tag::find($id)->delete();
        return redirect('manage/producttags');
    }


    public function store_tag(Request $request)
    {
        $name = $request->name;
        $tag = new Tag;


        $tag->name = $name;

        $tag->save();

        return redirect('manage/producttags');
    }
}
