<?php

namespace App\Http\Controllers;

use App\Category;
use App\CategoryProduct;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageProductController extends ManageController
{

    public function __construct()
    {
        parent::__construct();
        $this->data['current_tab'] = 24;
    }

    public function index()
    {
        $categories = CategoryProduct::all();

        $this->data['categories'] = $categories;

        return view('manage.product.all', $this->data);
    }

    public function new_category()
    {
        $this->data['category'] = null;
        return view('manage.product.category', $this->data);
    }

    public function edit_category($id)
    {
        $this->data['category'] = CategoryProduct::find($id);
        return view('manage.product.category', $this->data);
    }

    public function delete_category($id){

        CategoryProduct::find($id)->delete();
        return redirect('manage/categories');
    }


    public function store_category_product(Request $request)
    {
        $name = $request->name;
        $id = $request->id;
        if ($id == null) {
            $category = new CategoryProduct;
        } else {
            $category = CategoryProduct::find($id);
        }

        $category->name = $name;

        $category->save();

        return redirect('manage/categories');
    }
}
