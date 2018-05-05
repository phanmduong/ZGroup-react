<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Tymon\JWTAuth\Facades\JWTAuth;

class ManageApiController extends Controller
{
    protected $statusCode = 200;
    protected $user;
    protected $s3_url;

    public function __construct()
    {
        $this->middleware('is_staff');
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

    public function respondErrorWithData($data)
    {
        return $this->respond([
            'data' => $data,
            'status' => 0
        ]);
    }

    public function respondSuccessWithStatus($data)
    {
        return $this->respond([
            'data' => $data,
            'status' => 1
        ]);
    }

    public function respondSuccess($message)
    {
        return $this->respond([
            'message' => $message,
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

    public function respondSuccessV2($data)
    {
        $data['status'] = 1;
        return $data;
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

    protected function respondWithSimplePagination(Paginator $items, $data)
    {
        $data = array_merge($data, [
            'paginator' => [
                'total_count' => $items->perPage(),
                'total_pages' => $items->currentPage(),
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

    public function responseInternalServerError($message = 'Internal Server Error!')
    {
        return $this->setStatusCode(Response::HTTP_INTERNAL_SERVER_ERROR)->responseWithError($message);
    }
}
