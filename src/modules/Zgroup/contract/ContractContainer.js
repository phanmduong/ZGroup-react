import React, { Component } from "react";
import { store } from "./contractStore";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { } from "../../../helpers/helper";
import Loading from "../../../components/common/Loading";

@observer
export default class ContractContainer extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount() {
        store.loadAllContract();
    }

    @observable startTime = "";
    @observable endTime = "";

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-content">
                                <h4 className="card-title">
                                    <strong>Hợp đồng</strong>
                                </h4>

                                <Loading />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
