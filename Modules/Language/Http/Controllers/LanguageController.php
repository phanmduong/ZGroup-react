<?php

namespace Modules\Language\Http\Controllers;

use App\Http\Controllers\ManageApiController;
use App\Language;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class LanguageController extends ManageApiController
{
    public function getAllLanguage(){
        $languages = Language::all();
        return $this->respondSuccessWithStatus([
           "languages" => $languages->map(function($language){
                return $language->transform();
           })
        ]);
    }

    public function createLanguage(Request $request){
        $language = new Language;
        $language->name = $request->name;
        $language->encoding = $request->encoding;
        $language->save();
        return $this->respondSuccessWithStatus([
            "language" => $language->transform(),
            "message" => "Tạo ngôn ngữ thành công",
        ]);
    }
    public function editLanguage($languageId,Request $request){
        $language = Language::find($languageId);
        $language->name = $request->name;
        $language->encoding = $request->encoding;
        $language->save();
        return $this->respondSuccessWithStatus([
            "message" => "Sửa ngôn ngữ thành công"
        ]);
    }
}
