import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as barcodeActions from './barcodeActions';
//import { Button } from 'react-bootstrap';
import CreateBarcodeModalContainer from './CreateBarcodeModalContainer';
import Loading from '../../../components/common/Loading';
import Pagination from '../../../components/common/Pagination';
import {Link} from 'react-router';
import Search from '../../../components/common/Search';
import TooltipButton from '../../../components/common/TooltipButton';
import {confirm} from "../../../helpers/helper";

class BarcodesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: ''
        };
        this.timeOut = null;
        this.openCreateBarcodeModal = this.openCreateBarcodeModal.bind(this);
        this.delete = this.delete.bind(this);
        this.barcodesSearchChange = this.barcodesSearchChange.bind(this);
    }

    componentWillMount() {
        this.props.barcodeActions.loadBarcodes(1, this.props.params.type, null);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.params.type !== this.props.params.type) {
            this.props.barcodeActions.loadBarcodes(1, nextProps.params.type, this.state.query);
        }
    }

    openCreateBarcodeModal(data) {
        this.props.barcodeActions.showCreateBarcodeModal(data);
    }

    delete(barcodeId) {
        confirm("warning", "Xoá barcode", "Bạn có chắc muốn xoá barcode này?",
            () => this.props.barcodeActions
                .deleteBarcode(barcodeId)
                .then(() =>
                    this.props.barcodeActions.loadBarcodes(
                        this.props.currentPage,
                        this.props.params.type,
                        this.state.query
                    )
                )
        );

    }

    barcodesSearchChange(value) {
        this.setState({
            query: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.barcodeActions.loadBarcodes(1, this.props.params.type, value);
            }.bind(this),
            500
        );
    }

    render() {
        return (
            <div className="card" style={{marginTop: 20}}>
                <div className="card-content">

                    <div className="flex flex-row">
                        <h4 className="card-title">
                            <strong>Barcode</strong>
                        </h4>
                        <div>
                            <TooltipButton text="Thêm barcode" placement="top">
                                <button onClick={() => this.openCreateBarcodeModal(null)}
                                        className="btn btn-rose btn-round btn-xs button-add none-margin">
                                    <strong>+</strong>
                                </button>
                            </TooltipButton>
                        </div>

                    </div>

                    <div className="row">
                        <Search
                            className="col-sm-12"
                            onChange={this.barcodesSearchChange}
                            value={this.state.query}
                            placeholder="Tìm kiếm barcode theo giá trị hoặc tên sản phẩm"
                        />
                    </div>
                    <div className="table-responsive">
                        <CreateBarcodeModalContainer type={this.props.params.type}
                                                     currentPage={this.props.currentPage}
                        />
                        {this.props.isLoading ? (
                            <div style={{width: '100%'}}>
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
                                {this.props.barcodes.map((barcode, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{barcode.value}</td>
                                            <td>
                                                {barcode.image_url && (
                                                    <img
                                                        style={{
                                                            height: '25px',
                                                            width: '150px'
                                                        }}
                                                        src={barcode.image_url}
                                                        alt=""
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                {barcode.good ? (
                                                    <Link to={`/manufacture/good/${barcode.good.id}/detail`}>
                                                        {barcode.good.name}
                                                    </Link>
                                                ) : (
                                                    <div>Chưa gắn</div>
                                                )}
                                            </td>
                                            <td>
                                                {/*{!barcode.good && (*/}
                                                <a onClick={() => this.openCreateBarcodeModal(barcode)}>
                                                    <i className="material-icons text-danger">
                                                        edit
                                                    </i>
                                                </a>
                                                {/*)}*/}
                                                {!barcode.good && (
                                                    <a onClick={() => this.delete(barcode.id)}>
                                                        <i className="material-icons text-danger">
                                                            delete
                                                        </i>
                                                    </a>
                                                )}
                                            </td>

                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <Pagination
                        loadDataPage={this.props.barcodeActions.loadBarcodes}
                        currentPage={this.props.currentPage}
                        totalPages={this.props.totalPages}
                    />
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
    currentPage: PropTypes.number.isRequired,
    params: PropTypes.object.isRequired
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
