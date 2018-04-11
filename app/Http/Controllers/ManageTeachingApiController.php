<?php
/**
 * Created by PhpStorm.
 * User: phanmduong
 * Date: 7/20/17
 * Time: 17:25
 */

namespace App\Http\Controllers;


use App\Providers\AppServiceProvider;
use App\StudyClass;
use App\Role;
use App\Register;
use App\User;
use Illuminate\Http\Request;

use App\Http\Requests;

class ManageTeachingApiController extends ApiController
{

    public function __construct()
    {
        parent::__construct();
    }
}