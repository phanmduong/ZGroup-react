import React from "react";
import {Modal} from "react-bootstrap";
import PropTypes from "prop-types";
import Pagination from "../../../components/common/Pagination";

class HistoryGoodComponent extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.loadHistoryGood = this.loadHistoryGood.bind(this);
    }
    loadHistoryGood(page){
        this.props.loadHistory(page,this.props.id);
    }
    render(){
        return(
            <div>
                <Modal
                    show={this.props.show}
                    onHide={this.props.onHide}
                    bsSize="large"
                >
                    <Modal.Header closeButton/>
                    <Modal.Body>
                        <div className="table-responsive" style={{minHeight: 400}}>

                            <table id="datatables"
                                   className="table table-hover"
                                   cellSpacing="0" width="100%" style={{width: "100%"}}>
                                <thead className="text-rose">
                                <tr>
                                    <th/>
                                    <th>STT</th>
                                    <th>Ngày</th>
                                    <th>Trạng thái</th>
                                    <th>Số lượng</th>
                                    <th>Kho hàng</th>
                                    <th>Mã giao dịch</th>
                                    <th> Người thực hiện </th>


                                </tr>
                                </thead>

                                <tbody>
                                {
                                    this.props.data && this.props.data.map((pp,index) =>{
                                        return(
                                            <tr key={index}>
                                                <td/>
                                                <td> {index+1} </td>
                                                <td> {pp.order.created_at} </td>
                                                <td> {pp.order.type === "be-ordered" ? "Xuất hàng" : "Nhập hàng" }</td>
                                                <td>  {pp.quantity}</td>
                                                <td>  {pp.warehouse.name}</td>
                                                <td> {pp.order.command_code} </td>
                                                <td> {pp.order.staff.name} </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </table>
                            <Pagination
                                totalPages={this.props.paginator.total_pages}
                                currentPage={this.props.paginator.current_page}
                                loadDataPage={this.loadHistoryGood}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
            </div>

        );

    }
}
HistoryGoodComponent.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    data: PropTypes.array,
    paginator: PropTypes.object,
    id: PropTypes.number,
    loadHistory: PropTypes.func,
};
export default HistoryGoodComponent;