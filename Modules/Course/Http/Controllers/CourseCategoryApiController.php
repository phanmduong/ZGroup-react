<?php

namespace Modules\Course\Http\Controllers;

use App\CourseCategory;
use App\Http\Controllers\ManageApiController;
use Illuminate\Http\Request;

class CourseCategoryApiController extends ManageApiController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function assignCategoryInfo(&$category, $request)
    {
        $category->name = $request->name;
        $category->image_url = $request->image_url;
        $category->color = $request->color;
        $category->icon_url = $request->icon_url;
        $category->cover_url = $request->cover_url;
        $category->short_description = $request->short_description;
        $category->description = $request->description;
        $category->save();
    }

    public function getCategories(Request $request)
    {
        $limit = $request->limit ? $request->limit : 20;
        $search = $request->search;

        $categories = CourseCategory::query();
        $categories = $categories->where('name', 'like', '%' . $search . '%');
        if ($limit == -1) {
            $categories = $categories->orderBy('created_at', 'desc')->get();
            return $this->respondSuccessWithStatus([
                'categories' => $categories->map(function ($category) {
                    return $category->getData();
                })
            ]);
        }

        $categories = $categories->orderBy('created_at', 'desc')->paginate($limit);
        return $this->respondWithPagination(
            $categories,
            [
                'categories' => $categories->map(function ($category) {
                    return $category->getData();
                })
            ]);
    }

    public function createCategory(Request $request)
    {
        if ($request->name == null && trim($request->name) == '')
            return $this->respondErrorWithStatus(['message' => 'Tên: bắt buộc']);
        $category = new CourseCategory;
        $this->assignCategoryInfo($category, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function editCategory($categoryId, Request $request)
    {
        if ($request->name == null && trim($request->name) == '')
            return $this->respondErrorWithStatus(['message' => 'Tên: bắt buộc']);
        $category = CourseCategory::find($categoryId);
        if ($category == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại category'
            ]);
        $this->assignCategoryInfo($category, $request);
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

    public function deleteCategory($categoryId, Request $request)
    {
        $category = CourseCategory::find($categoryId);
        if ($category == null)
            return $this->respondErrorWithStatus([
                'message' => 'Không tồn tại category'
            ]);
        $category->delete();
        return $this->respondSuccessWithStatus([
            'message' => 'SUCCESS'
        ]);
    }

}
