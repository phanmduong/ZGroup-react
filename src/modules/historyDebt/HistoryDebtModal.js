import React from "react";
import Loading from "../../components/common/Loading";
import {Modal} from 'react-bootstrap';
import moment from "moment";
import {DATETIME_FORMAT,DATETIME_FORMAT_SQL} from "../../constants/constants";
import Pagination from "../../components/common/Pagination";
import PropTypes from 'prop-types';
class HistoryDebtModal extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
        };
        this.loadHistoryDebt = this.loadHistoryDebt.bind(this);
    }
    loadHistoryDebt(page){
        this.props.loadHistoryDebt(this.props.id,page);
    }
    render(){
        return(
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <div className="content">
                        <div className="container-fluid">
                            <h4> <strong> Lịch sử công nợ </strong> </h4>
                            {this.props.isLoading ? <Loading /> :
                                <div>

                                    <div className="table-responsive">

                                        <table id="datatables"
                                               className="table table-hover"
                                               cellSpacing="0" width="100%" style={{width: "100%"}}>
                                            <thead className="text-rose">
                                            <tr>
                                                <th/>
                                                <th>STT</th>
                                                <th>Ngày</th>
                                                <th>Loại</th>
                                                <th>Nợ</th>
                                                <th>Trả</th>
                                                <th>Dư nợ</th>
                                                <th/>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.props.data.map((pp, index) => {
                                                    let time = moment(pp.date , [DATETIME_FORMAT,  DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
                                                    return (
                                                        <tr key={pp.id}>
                                                            <td/>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                {time}
                                                            </td>
                                                            <td>{
                                                                    (pp.type === "import") ? "Nhập hàng" :
                                                                        (pp.type === "export") ? "Xuất hàng" :
                                                                        "Thanh toán"
                                                            }</td>
                                                            <td>
                                                                {pp.value < 0 ? pp.value : ""}
                                                            </td>
                                                            <td>
                                                                {pp.value > 0 ? pp.value : ""}
                                                            </td>
                                                            <td> {pp.total_value}</td>
                                                            <td/>
                                                        </tr>
                                                    );
                                                })
                                            }
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            }
                            <div className="card-content">
                                <Pagination
                                    totalPages={this.props.paginator.total_pages}
                                    currentPage={this.props.paginator.current_page}
                                    loadDataPage={this.loadHistoryDebt}
                                />
                            </div>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>

        );
    }
}
HistoryDebtModal.propTypes = {
    paginator: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    id: PropTypes.string,
    loadHistoryDebt: PropTypes.func.isRequired,
};
export default HistoryDebtModal;