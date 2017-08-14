<?php

namespace App\Http\Controllers;

use App\Tab;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Http\Requests;

class ClientManageController extends Controller
{
    public function respond($data, $headers = [], $statusCode = 200)
    {
        return response()->json($data, $statusCode, $headers);
    }

    public function ping()
    {
        return $this->respond("Ok");
    }

    public function setTabs(Request $request)
    {
        $newTabs = collect(json_decode($request->tabs));
        $newTabIds = $newTabs->pluck("id");

        // delete redundant tabs
        DB::table('tabs')->whereNotIn('id', $newTabIds)->delete();

        foreach ($newTabs as $tab) {
            $t = Tab::find($tab->id);
            if ($t == null) {
                $t = new Tab();
                $t->id = $tab->id;
                $t->name = $tab->name;
                $t->url = $tab->url;
                $t->parent_id = $tab->parent_id;
                $t->order = $tab->order;
                $t->icon = $tab->icon;
                $t->save();
            }
        }
        return $this->respond(['message' => "Thay đổi tính năng thành công"]);
    }

    public function update()
    {
        exec("/home/sync.sh 2>&1", $outputAndErrors, $return_value);
        exec("cd /home/ec2-user", $outputAndErrors1, $return_value1);
        return $this->respond([
            'updated' => "Thay đổi tính năng thành công",
            'output' => $outputAndErrors,
            'result' => $return_value,
            'output1' => $outputAndErrors1,
            'result1' => $return_value1,

        ]);
    }
}