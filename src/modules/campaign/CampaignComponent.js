import React from 'react';
import Pagination from "../../components/common/Pagination";
// import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
import TooltipButton from "../../components/common/TooltipButton";

class CampaignComponent extends React.Component {
    render() {
        return (
            <div className="campaign-content">
                <div className="form-group is-empty">
                    <div className="flex-row flex">
                        <h5 className="card-title" style={{lineHeight: "0px"}}>
                            <strong>Tên chiến dịch</strong>
                        </h5>
                        <div className="dropdown">
                            <button data-toggle="dropdown" aria-expanded="false"
                                    className="dropdown-toggle button-plus">
                                <i className="material-icons" style={{fontSize: "20px"}}>add</i>
                            </button>
                            <ul className="dropdown-menu dropdown-primary">
                                <li>
                                    <a href="#">Thêm tin</a>
                                </li>
                                <li>
                                    <a href="#">Thêm người nhận</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <input
                        style={{paddingTop: "20px"}}
                        type="search" className="form-control" placeholder="Tìm kiếm khảo sát" value=""/>
                </div>
                <br/><br/><br/>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="text-rose">
                        <tr className="text-rose">
                            <th/>
                            <th>Tên tin nhắn</th>
                            <th>Nội dung</th>
                            <th>Số tin đã gửi</th>
                            <th>Ngày gửi</th>
                            <th>Tạm tính</th>
                            <th>Loại tin nhắn</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <button className="sent"
                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                        data-original-title="Đã gửi tin">
                                    6
                                </button>
                            </td>
                            <td>
                                <b>Chiết khấu 30%</b>
                            </td>
                            <td>
                                bat man can change the war
                            </td>
                            <td>
                                <h6>12/22</h6>
                                <div className="progress progress-line-danger">
                                    <TooltipButton placement="top"
                                                   text={`${17} tin nhắn đã gửi`}>
                                        <div className="progress-bar progress-bar-success"
                                             style={{width: 12 * 100 / 22 + '%'}}/>
                                    </TooltipButton>
                                </div>
                            </td>
                            <td>
                                {new Date().toLocaleDateString()}
                            </td>
                            <td>
                                <div  data-toggle="tooltip" title="" type="button" rel="tooltip"
                                      data-original-title="Ngân sách">
                                    23.800.000đ
                                </div>
                            </td>
                            <td>
                                world
                            </td>
                            <td>
                                <div className="btn-group-action">
                                    <div style={{display: "inline-block"}}>
                                        <a data-toggle="tooltip" title="" type="button"
                                           rel="tooltip" data-original-title="Sửa"><i
                                            className="material-icons">edit</i>
                                        </a>
                                    </div>
                                    <a data-toggle="tooltip" title="" type="button" rel="tooltip"
                                       data-original-title="Xoá"><i className="material-icons">delete</i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="unsent"
                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                        data-original-title="Chưa gửi tin">
                                    2
                                </button>
                            </td>
                            <td>
                                <b>Giảm giá 50%</b>
                            </td>
                            <td>
                                Nhân dịp ngày nhà giáo việt nam...
                            </td>
                            <td>
                                <h6>17/22</h6>
                                <div className="progress progress-line-danger">
                                    <TooltipButton placement="top"
                                                   text={`${17} tin nhắn đã gửi`}>
                                        <div className="progress-bar progress-bar-success"
                                             style={{width: 17 * 100 / 22 + '%'}}/>
                                    </TooltipButton>
                                </div>
                            </td>
                            <td>
                                12/4/2018
                            </td>
                            <td>
                                <div  data-toggle="tooltip" title="" type="button" rel="tooltip"
                                      data-original-title="Ngân sách">
                                    9.800.000đ
                                </div>
                            </td>
                            <td>
                                world
                            </td>
                            <td>
                                <div className="btn-group-action">
                                    <div style={{display: "inline-block"}}>
                                        <a data-toggle="tooltip" title="" type="button"
                                           rel="tooltip" data-original-title="Sửa"><i
                                            className="material-icons">edit</i>
                                        </a>
                                    </div>
                                    <a data-toggle="tooltip" title="" type="button" rel="tooltip"
                                       data-original-title="Xoá"><i className="material-icons">delete</i>
                                    </a>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row float-right">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                         style={{textAlign: 'right'}}>
                        <b style={{marginRight: '15px'}}>
                            Hiển thị kêt quả từ 1
                            - 20/34</b><br/>
                        <Pagination
                            totalPages={4}
                            currentPage={3}
                            loadDataPage={2}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CampaignComponent;