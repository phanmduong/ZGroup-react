<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class RegisterFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'address' => 'required',
            'how_know' => 'required',
            'facebook' => 'required',
            'university' => 'required',
            'gender' => 'required',
            'dob' => 'required'
        ];
    }
}
