import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import * as importGoodActions from "../importGoods/importGoodActions";
import {Link, IndexLink}                from 'react-router';

class ImportOrderContainer extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.itemPath = "/item";
        this.printPath = "/print";

    }
    render(){
        let {location, children} = this.props;
        return (
            <div className="row">
            <div className="col-md-12">
                <div className="card">

                    <div className="card-header card-header-tabs" data-background-color="rose">
                        <div className="nav-tabs-navigation">
                            <div className="nav-tabs-wrapper">
                                <ul className="nav nav-tabs" data-tabs="tabs">
                                    <li className={location.pathname === `/business/import-order${this.itemPath}` ? 'active' : ''}>
                                        <IndexLink to={`/business/import-order${this.itemPath}`}>
                                            <i className="material-icons">local_mall
                                            </i> Nhập hàng từ đơn đặt hàng
                                            <div className="ripple-container" />
                                        </IndexLink>
                                    </li>
                                    <li className={location.pathname === `/business/import-order${this.printPath}` ? 'active' : ''}>
                                        <Link to={`/business/import-order${this.printPath}`}>
                                            <i className="material-icons">local_printshop</i> Nhập hàng từ đơn đặt in
                                            <div className="ripple-container" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>{children}</div>

                </div>

            </div>
            </div>
        );
    }
}



ImportOrderContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    location: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired,

};

function mapStateToProps(state) {
    return {
        isLoading: state.importOrder.isLoading,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        importOrderActions: bindActionCreators(importGoodActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportOrderContainer);
