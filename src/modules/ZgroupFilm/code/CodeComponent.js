import React from "react";


class CodeComponent extends React.Component{
    render(){
        return(
            <div className="table-responsive">
                <table className="table table-hover table-striped">
                    <thead className="text-rose">
                    <tr className="text-rose">
                        <th>STT</th>
                        <th>Ý nghĩa</th>
                        <th>Giảm giá</th>
                        <th>Số lượng</th>
                        <th>Ngày áp dụng</th>
                        <th>Ngày kết thúc</th>
                        <th/>
                    </tr>
                    </thead>
                    <tbody>

                            <tr>
                                <td>1</td>
                                <td className="film-name">
                                    Thế chắc tui thuộc 1% còn lại chắc
                                </td>
                                <td><b>10.000 đ</b></td>
                                <td>
                                    23
                                </td>
                                <td>
                                    2917-23-12
                                </td>
                                <td>
                                    2917-23-12
                                </td>


                                <td>

                                    <div className="btn-group-action">
                                        <div style={{display: "inline-block"}}>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"
                                               onClick={() => {

                                               }}>
                                                <i className="material-icons">edit</i>
                                            </a>
                                        </div>

                                        <div style={{display: "inline-block"}}>
                                            <a style={{color: "#878787"}}
                                               data-toggle="tooltip" title=""
                                               type="button" rel="tooltip"
                                               data-original-title="Sửa"
                                               onClick={() =>{}}>
                                                <i className="material-icons">delete</i>
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>

                    </tbody>
                </table>
            </div>
        );
    }


}

export default CodeComponent;