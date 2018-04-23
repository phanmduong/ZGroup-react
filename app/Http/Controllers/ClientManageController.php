<?php

namespace App\Http\Controllers;

use App\Tab;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

use App\Http\Requests;
class ClientManageController extends Controller
{
    public function __construct()
    {
        $this->middleware('is_keetool_server');
    }

    public function respond($data, $headers = [], $statusCode = 200)
    {
        return response()->json($data, $statusCode, $headers);
    }

    public function responseBadRequest($message = 'Bad Request!')
    {
        return $this->setStatusCode(Response::HTTP_BAD_REQUEST)->responseWithError($message);
    }

    public function ping()
    {
        return $this->respond(['status' => 1, 'message' => "Ok"]);
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
            }
            $t->name = $tab->name;
            $t->url = $tab->url;
            $t->parent_id = $tab->parent_id;
            $t->order = $tab->order;
            $t->icon = $tab->icon;
            $t->save();
        }
        return $this->respond(['status' => 1, 'message' => "Thay đổi tính năng thành công"]);
    }

    public function update()
    {
//        putenv('COMPOSER_HOME = ' . __DIR__ . ' / vendor / bin / composer');
//        putenv('COMPOSER_HOME=/usr/local/bin/composer');
        exec("/home/sync.sh 2>&1", $outputAndErrors, $return_value);
        return $this->respond([
            'status' => 1,
            'message' => "Thay đổi tính năng thành công",
            'output' => $outputAndErrors,
            'result' => $return_value
        ]);
    }

    public function writeEnv(Request $request)
    {
        file_put_contents(base_path() . "/.env", $request->env);
        $content = "module.exports=" . $request->server_socket;
        file_put_contents(base_path() . "/socketEnv.js", $content);
        Artisan::call('config:cache');
        return $this->respond([
            'status' => 1,
            "message" => "Write successfully"
        ]);
    }

    public function writeEnvClient(Request $request)
    {
//        $request->config
        $content = "var env=" . $request->env;
        file_put_contents(public_path() . "/config.js", $content);

        return $this->respond([
            'status' => 1,
            "message" => "Write successfully",
            "content" => $content
        ]);
    }

    public function writeCSS(Request $request)
    {
//        $request->config
        $content = $request->css;
        file_put_contents(public_path() . "/config.css", $content);

        return $this->respond([
            'status' => 1,
            "message" => "Write successfully",
            "content" => $content
        ]);
    }
}