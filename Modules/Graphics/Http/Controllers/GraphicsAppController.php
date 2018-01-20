<?php
/**
 * Created by PhpStorm.
 * User: tt
 * Date: 10/11/2017
 * Time: 15:18
 */

namespace Modules\Graphics\Http\Controllers;


use App\Good;
use App\Http\Controllers\Controller;
use App\Http\Controllers\NoAuthApiController;

use App\Order;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Modules\Good\Entities\GoodProperty;
use Modules\Graphics\Repositories\BookRepository;

class GraphicsAppController extends NoAuthApiController
{
    private $bookRepository;

    public function __construct(BookRepository $bookRepository)
    {
        $this->bookRepository = $bookRepository;
    }

    public function index()
    {
        $bookArr = $this->bookRepository->getAllBooks();

        return $this->respondSuccessWithStatus([
            "books" => $bookArr
        ]);
    }

    public function detailedBook( $book_id, Request $request)
    {
        $bookData = $this->bookRepository->getBookDetail($book_id);

        return $this->respondSuccessWithStatus([
            "book" => $bookData
        ]);
    }

    public function saveOrder( Request $request)
    {
        $phone = preg_replace('/[^0-9]+/', '', $request->phone);
        $email = $request->email;
        $name = $request->name;
        $phone = $phone;
        $address = $request->address;
        $payment = $request->payment;

        if (!$name) return $this->respondErrorWithStatus("Thiếu tên");
        if (!$phone) return $this->respondErrorWithStatus("Thiếu số điện thoại");
        if (!$address) return $this->respondErrorWithStatus("Thiếu địa chỉ");
        if (!$payment) return $this->respondErrorWithStatus("Thiếu phương thức thanh toán");
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->respondErrorWithStatus("Email không hợp lệ");
        }

        $goods_str = $request->books;
        $goods_arr = json_decode($goods_str);
        if (count($goods_arr) > 0) {
            $this->bookRepository->saveOrder($email, $phone, $name, "", "", $address, $payment, $goods_arr);
            return $this->respondSuccessWithStatus([
                "message" => "Đặt hàng thành công"
            ]);
        } else {
            return $this->respondErrorWithStatus("Bạn chưa đặt cuốn sách nào");
        }
    }

}