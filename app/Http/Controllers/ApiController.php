<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ApiController extends Controller
{
    protected $statusCode = 200;
    protected $user;
    protected $s3_url;

    public function __construct()
    {
        $this->middleware('jwt.auth');
        $this->user = JWTAuth::parseToken()->authenticate();
        $this->s3_url = config('app.s3_url');
    }

    public function respondErrorWithStatus($message)
    {
        return $this->respond([
            'message' => $message,
            'status' => 0
        ]);
    }

    public function respondSuccessV2($data)
    {
        $data['status'] = 1;
        return $this->respond($data);
    }

    public function respondSuccessWithStatus($data)
    {
        return $this->respond([
            'data' => $data,
            'status' => 1
        ]);
    }

    public function getStatusCode()
    {
        return $this->statusCode;
    }

    public function setStatusCode($statusCode)
    {
        $this->statusCode = $statusCode;
        return $this;
    }

    public function respond($data, $headers = [])
    {
        return response()->json($data, $this->getStatusCode(), $headers);
    }

    protected function respondWithPagination(LengthAwarePaginator $items, $data)
    {
        $data = array_merge($data, [
            'paginator' => [
                'total_count' => $items->total(),
                'total_pages' => ceil($items->total() / $items->perPage()),
                'current_page' => $items->currentPage(),
                'limit' => $items->perPage()
            ]
        ]);
        return $this->respond($data);
    }

    public function responseWithError($message)
    {
        return response()->json([
            'error' => $message
        ], $this->getStatusCode());
    }

    public function responseNotFound($message = 'Not Found!')
    {
        return $this->setStatusCode(Response::HTTP_NOT_FOUND)->responseWithError($message);
    }

    public function responseBadRequest($message = 'Bad Request!')
    {
        return $this->setStatusCode(Response::HTTP_BAD_REQUEST)->responseWithError($message);
    }

    public function responseUnAuthorized($message = 'Un Authorized!')
    {
        return $this->setStatusCode(Response::HTTP_UNAUTHORIZED)->responseWithError($message);
    }
}
