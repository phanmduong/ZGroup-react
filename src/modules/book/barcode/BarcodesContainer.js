import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Link} from "react-router";
import * as barcodeActions from './barcodeActions';
import {Button} from "react-bootstrap";
import CreateBarcodeModalContainer from "./CreateBarcodeModalContainer";

class BarcodesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openCreateBarcodeModal = this.openCreateBarcodeModal.bind(this);
    }

    openCreateBarcodeModal() {
        this.props.barcodeActions.showCreateBarcodeModal(true);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">assignment</i></div>
                <div className="card-content">
                    <h4 className="card-title">Barcode</h4>
                    <Button className="btn btn-rose" onClick={this.openCreateBarcodeModal}>
                        Tạo barcode
                    </Button>
                    <div className="table-responsive">
                        <CreateBarcodeModalContainer/>
                        <table className="table">
                            <thead className="text-rose">
                            <tr>
                                <th>Giá trị</th>
                                <th>Khả dụng</th>
                                <th>Thời gian làm</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.barcodes.map((barcode, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{barcode.value}</td>
                                            <td>{barcode.used ? <i className="material-icons text-success">clear</i> :
                                                <i className="material-icons text-danger">done</i>}</td>
                                            <td>{barcode.created_at}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

BarcodesContainer.propTypes = {
    barcodes: PropTypes.array.isRequired,
    barcodeActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        barcodes: state.good.barcode.barcodeList.barcodes,
        isLoading: state.good.barcode.barcodeList.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        barcodeActions: bindActionCreators(barcodeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodesContainer);