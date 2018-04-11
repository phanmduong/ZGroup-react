<?php

namespace App\Http\Controllers;

use App\Colorme\Transformers\StudentTransformer;
use App\Gen;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;
use Illuminate\Support\Facades\DB;

class TelesaleController extends ManageController
{
    protected $studentTransformer;

    public function __construct(StudentTransformer $studentTransformer)
    {
        parent::__construct();
        $this->studentTransformer = $studentTransformer;
    }

    public function search_student(Request $request)
    {
        $search = "";
        if ($request->q) {
            $search = $request->q;
        }

        $gen = Gen::getCurrentGen();
        $students = User::where('role', 0)
            ->whereExists(function ($query) use ($gen) {
                $query->select(DB::raw(1))
                    ->from('registers')
                    ->where('status', 0)
                    ->where('gen_id', $gen->id)
                    ->where('call_status', 0)
                    ->whereRaw('registers.user_id = users.id');
            })
            ->where(function ($query) use ($search) {
                $query->where('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('name', 'like', '%' . $search . '%');
            })
            ->orderBy('created_at', 'desc')
            ->take(20)
            ->get();
        return response()->json(['students' => $this->studentTransformer->transformCollection($students)]);
    }
}
