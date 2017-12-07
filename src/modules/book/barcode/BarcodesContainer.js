import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as barcodeActions from './barcodeActions';
import {Button} from "react-bootstrap";
import CreateBarcodeModalContainer from "./CreateBarcodeModalContainer";
import Loading from "../../../components/common/Loading";
import Pagination from "../../../components/common/Pagination";

class BarcodesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.openCreateBarcodeModal = this.openCreateBarcodeModal.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentWillMount() {
        this.props.barcodeActions.loadBarcodes(1);
    }

    openCreateBarcodeModal() {
        this.props.barcodeActions.showCreateBarcodeModal(true);
    }

    delete() {
        // this.props.
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
                        {
                            this.props.isLoading ? (
                                <div style={{width: "100%"}}>
                                    <Loading/>
                                </div>
                            ) : (
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th>Giá trị</th>
                                        <th>Barcode</th>
                                        <th>Sản phẩm</th>
                                        <th/>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {
                                        this.props.barcodes.map((barcode, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{barcode.value}</td>
                                                    <td>
                                                        {
                                                            barcode.image_url && (
                                                                <img src={barcode.image_url} alt=""/>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            barcode.good ? (
                                                                <Link
                                                                    to={`good/${barcode.good.id}/detail`}>{barcode.good.name}</Link>
                                                            ) : (
                                                                <div>Chưa gắn</div>
                                                            )
                                                        }
                                                    </td>
                                                    <td>
                                                        <a onClick={this.delete}>
                                                            <i className="material-icons">delete</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            )
                        }

                    </div>
                    <Pagination
                        loadDataPage={this.props.barcodeActions.loadBarcodes}
                        currentPage={this.props.currentPage}
                        totalPages={this.props.totalPages}/>
                </div>
            </div>
        );
    }
}

BarcodesContainer.propTypes = {
    barcodes: PropTypes.array.isRequired,
    barcodeActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        barcodes: state.good.barcode.barcodeList.barcodes,
        isLoading: state.good.barcode.barcodeList.isLoading,
        currentPage: state.good.barcode.barcodeList.currentPage,
        totalPages: state.good.barcode.barcodeList.totalPages
    };
}

function mapDispatchToProps(dispatch) {
    return {
        barcodeActions: bindActionCreators(barcodeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BarcodesContainer);