import React, { Component } from "react";
import Barchart from "./Barchart";
import { store } from "../dashboardStaffStore";

export default class RegisterChart extends Component {
    render() {
        return (
            <div>
                <div className="row" id="register-by-date">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title">
                                        <strong>Đăng kí/đóng tiền theo ngày</strong>
                                    </h4>
                                    <br />
                                    <br />
                                    <Barchart
                                        label={store.user.date_array}
                                        data={[store.user.registers_by_date, store.user.paid_by_date]}
                                        id="barchar_register_by_date"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row" id="money-by-date">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <div className="tab-content">
                                    <h4 className="card-title">
                                        <strong>Doanh thu theo ngày</strong>
                                    </h4>
                                    <br />
                                    <br />
                                    <Barchart
                                        label={store.user.date_array}
                                        data={[store.user.money_by_date]}
                                        id="barchar_money_by_date"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
