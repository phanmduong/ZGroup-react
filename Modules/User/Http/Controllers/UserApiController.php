<?php
namespace Modules\User\Http\Controllers;

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use App\Repositories\ClassRepository;

class UserApiController extends ApiController
{
    protected $classRepository;

    public function __construct(ClassRepository $classRepository)
    {
        parent::__construct();
        $this->classRepository = $classRepository;
    }

    public function userSchedule(Request $request)
    {
        $user = $this->user;
     
        $registers = $user->registers()->where('status', 1)->get();

        return $registers->map(function($register) {
            $class = $register->studyClass;
            $data = $this->classRepository->get_class($class);
            $data['edit_status'] = $this->classRepository->edit_status($this->user);
            $data['is_delete_class'] = $this->classRepository->is_delete($this->user, $class);
            $data['is_duplicate'] = $this->classRepository->is_duplicate($this->user);            
            return $data;
        });
    }
}