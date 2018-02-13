/* eslint-disable no-undef */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as orderedGoodActions from "./orderedGoodAction";
import * as PropTypes from "prop-types";
import Loading from "../../../components/common/Loading";

class CreateOrderedGood extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: defaultData,
        };

    }

    componentWillMount() {

    }


    render() {
        let {isLoading} = this.props;
        return (

                    <div className="content">
                        <div className="container-fluid">
                            {(isLoading) ? <Loading/> :
                                <form role="form" id="form-job-assignment" onSubmit={(e) => e.preventDefault()}>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">event_available</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Sản phẩm</h4>

                                                </div>

                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">local_shipping</i>
                                                </div>

                                                <div className="card-content">
                                                    <h4 className="card-title">Nhà phân phối</h4>

                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                </form>}
                        </div>
                    </div>

        );
    }
}

CreateOrderedGood.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isLoading: state.orderedGood.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        orderedGoodActions: bindActionCreators(orderedGoodActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderedGood);

let defaultData = {
    company: {id: null, name: ""},
    staff: {id: null, name: ""},
    good: {id: null, name: ""},
    warehouse: {id: null, name: ""},
    quantity: 1,
    total_price: 0,
    discount: 0,
};