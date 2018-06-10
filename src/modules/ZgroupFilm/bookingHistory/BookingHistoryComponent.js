import React from "react";
//import TooltipButton from '../../../components/common/TooltipButton';

class BookingHistoryComponent extends React.Component{
    render(){
        return (
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Họ tên</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Phim</th>
                        <th>Phòng</th>
                        <th>Ghế</th>
                        <th>Mã giảm giá</th>
                        <th>Tiền</th>
                        <th>Thời gian đặt vé</th>
                        <th>Loại thanh toán</th>
                    </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>1</td>
                        <td>
                           Nguyễn Đại Lộn
                        </td>
                        <td>Loiabcxyz@gmail.com</td>
                        <td>
                            01626544271
                        </td>
                        <td>
                            Start War
                        </td>
                        <td>
                            Cơ sỡ 1 - Phòng 4
                        </td>
                        <td>A1</td>
                        <td>TT1oT9qDFPIl</td>
                        <td>30.000d</td>
                        <td>25-12-2018 12:34</td>
                        <td>Online</td>

                        {/*<td>*/}

                            {/*<div className="btn-group-action">*/}
                                {/*<TooltipButton text="Sửa" placement="top" style={{display: "inline-block"}}>*/}
                                    {/*<a style={{color: "#878787"}}*/}
                                       {/*onClick={() => {*/}
                                       {/*}}>*/}
                                        {/*<i className="material-icons">edit</i>*/}
                                    {/*</a>*/}
                                {/*</TooltipButton>*/}

                                {/*<TooltipButton text="Xóa" placement="top" style={{display: "inline-block"}}>*/}
                                    {/*<a style={{color: "#878787"}}*/}
                                       {/*onClick={() => {*/}
                                       {/*}}>*/}
                                        {/*<i className="material-icons">delete</i>*/}
                                    {/*</a>*/}
                                {/*</TooltipButton>*/}
                            {/*</div>*/}
                        {/*</td>*/}
                    </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default BookingHistoryComponent;