import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as modalProductAction from './modalProductAction';

class WareHouseModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showWareHouseModal = this.showWareHouseModal.bind(this);
    }

    showWareHouseModal(e) {
        e.preventDefault();
        this.props.showWareHouseModal(this.props.productEditing.productPresent);
    }

    render() {
        return (
            <Modal show={this.props.wareHouseModal}
                   onHide={this.showWareHouseModal}>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Danh sách sản phẩm của nhóm hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr className="text-rose">
                                <th>STT</th>
                                <th>Tên kho</th>
                                <th>Địa chỉ</th>
                                <th>Cơ sở</th>
                                <th>Số lượng</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.productEditing.productPresent.warehouses && this.props.productEditing.productPresent.warehouses.map((warehouse, id) => {
                                    return (
                                        <tr key={warehouse.id}>
                                            <td>{id + 1}</td>
                                            <td>{warehouse.name}</td>
                                            <td>{warehouse.address}</td>
                                            <td>Cơ sở 1</td>
                                            <td>10</td>
                                            <td>
                                                <div className="btn-group-action">
                                                    <a data-toggle="tooltip" title="" type="button"
                                                       rel="tooltip" href="good/11/edit"
                                                       data-original-title="Sửa"><i className="material-icons">edit</i></a>
                                                    <a
                                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                        data-original-title="Không thể xoá"><i
                                                        className="material-icons">delete_forever</i></a>
                                                    <a
                                                        data-toggle="tooltip" title="" type="button" rel="tooltip"
                                                        data-original-title="Chuyển kho"><i
                                                        className="material-icons">swap_horiz</i></a>

                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                            <tr>
                                <td/>
                                <td><b>Tổng</b></td>
                                <td/>
                                <td/>
                                <td><b>200</b></td>
                                <td/>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

WareHouseModalContainer.propTypes = {
    wareHouseModal: PropTypes.bool,
    modalProductAction: PropTypes.object.isRequired,
    showWareHouseModal: PropTypes.func.isRequired,
    productEditing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        wareHouseModal: state.productList.modalInProduct.wareHouseModal,
        productEditing: state.productList.productEditing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalProductAction: bindActionCreators(modalProductAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WareHouseModalContainer);