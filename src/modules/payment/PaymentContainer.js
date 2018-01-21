import React from "react";
import {Link} from "react-router";

class PaymentContainer extends React.Component{
    render(){
        return(
            <div className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">home</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Quản lý danh sách hóa đơn</h4>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-3">
                                                <Link className="btn btn-rose" to="/business/company/payment/create">
                                                    <i className="material-icons keetool-card">add</i>
                                                    Tạo hóa đơn
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default PaymentContainer;