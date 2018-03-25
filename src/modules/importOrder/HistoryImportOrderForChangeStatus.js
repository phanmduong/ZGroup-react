import React from "react";
import {Modal} from "react-bootstrap";
import Pagination from "../../components/common/Pagination";
import PropTypes from "prop-types";
//import * as helper from "../../helpers/helper";

class HistoryImportOrderForChangeStatus extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1
        };
        this.loadHistoryImportOrder = this.loadHistoryImportOrder.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
    }

    loadHistoryImportOrder(page) {
        this.setState({page: page});
        this.props.loadHistoryImportOrder(page, this.props.id);
    }
    changeStatus(){

        // helper.confirm("warning","Xác Nhận Duyệt","Sau khi duyệt sẽ không thể hoàn tác?",
        //     ()=> {this.props.changeStatus(this.props.id);this.closeModal();}
        // );
        this.props.changeStatus(this.props.id, ()=>{
            this.closeModal();
        });
        

    }
    closeModal(){
        this.props.onHide();
    }
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                bsSize="large"
            >
                <Modal.Header closeButton/>
                <Modal.Body>
                    <div>
                        <h3> Lịch sử nhập hàng </h3>
                        <div className="table-responsive">

                            <table id="datatables"
                                   className="table table-hover"
                                   cellSpacing="0" width="100%" style={{width: "100%"}}>
                                <thead className="text-rose">
                                <tr>
                                    <th/>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng nhập</th>
                                    <th> Kho nhập </th>
                                    <th/>
                                </tr>
                                </thead>
                                <tbody>
                                {

                                    this.props.data && this.props.data.map((pp, index) => {
                                        return (
                                            <tr key={pp.id}>
                                                <td/>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td> {pp.good.name}</td>
                                                <td> {pp.imported_quantity}</td>
                                                <td> {pp.warehouse.name ? pp.warehouse.name : "Chưa có"}</td>
                                                <td/>

                                            </tr>
                                        );
                                    })
                                }
                                </tbody>

                            </table>
                        </div>
                        <div className="card-content">
                            <Pagination
                                totalPages={this.props.paginator.total_pages}
                                currentPage={this.state.page}
                                loadDataPage={this.loadHistoryImportOrder}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>

                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <button className="btn btn-fill btn-rose" type="button"
                                onClick={this.changeStatus}
                        ><i className="material-icons">done</i> Duyệt
                        </button>
                        <button className="btn btn-fill" type="button"
                                onClick={this.closeModal}
                        ><i className="material-icons">cancel</i> Hủy
                        </button>
                    </div>

                </Modal.Footer>
            </Modal>
        );
    }
}
HistoryImportOrderForChangeStatus.propTypes = {
    show: PropTypes.bool,
    onHide: PropTypes.func,
    paginator: PropTypes.object,
    loadHistoryImportOrder: PropTypes.func,
    data: PropTypes.array.isRequired,
    id: PropTypes.number,
    changeStatus: PropTypes.func,
};

export default HistoryImportOrderForChangeStatus;